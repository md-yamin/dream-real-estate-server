const express = require('express');
const app = express()
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware

app.use(cors({
    origin: [
        'http://localhost:5173'
    ],
}))
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.brerg1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {


        const userCollection = client.db("realEstateDB").collection("users");
        const propertyCollection = client.db("realEstateDB").collection("properties");
        const reviewsCollection = client.db("realEstateDB").collection("reviews");
        const wishlistCollection = client.db("realEstateDB").collection("wishlist");


        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.Token_Secret, {
                expiresIn: '3h'
            })
            res.send({ token })
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const existingUser = await userCollection.findOne(query)
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            const result = await userCollection.insertOne(user)
            res.send(result)
        })
        app.patch('/users/agent/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    role: 'agent'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })
        app.patch('/users/admin/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })
        app.patch('/users/fraud/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    role: 'fraud'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        app.get('/users', async (req, res) => {
            const result = await userCollection.find().toArray()
            res.send(result)
        })
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })

        app.post('/wishlist', async (req, res) => {
            const cursor = req.body;
            const result = await wishlistCollection.insertOne(cursor)
            res.send(result)
        })

        app.get('/wishlist', async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const result = await wishlistCollection.find(query).toArray()
            res.send(result)
        })
        app.delete('/wishlist/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await wishlistCollection.deleteOne(query)
            res.send(result)
        })

        app.post('/property', async (req, res) => {
            const newProperty = req.body;
            const result = await propertyCollection.insertOne(newProperty)
            res.send(result)
        })

        app.delete('/property/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await propertyCollection.deleteOne(query)
            res.send(result)
        })

        app.patch('/property/:id', async (req, res) => {
            const id = req.params.id;
            const updatedProperty = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    property_image: updatedProperty.property_image,
                    property_title: updatedProperty.property_title,
                    property_location: updatedProperty.property_location,
                    property_description: updatedProperty.property_description,
                    min_price_range: updatedProperty.min_price_range,
                    max_price_range: updatedProperty.max_price_range,
                    agent_name: updatedProperty.agent_name,
                    agent_image: updatedProperty.agent_image,
                    email:updatedProperty.email,
                    nation:updatedProperty.nation,
                    verification_status:updatedProperty.verification_status,
                }
            }
            const result = await propertyCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })
        app.patch('/property/status/:id', async (req, res) => {
            const id = req.params.id;
            const {verification_status} = req.body;
            console.log(verification_status);
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    verification_status:verification_status,
                }
            }
            const result = await propertyCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })
        app.delete('/property/:email', async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const result = await propertyCollection.deleteMany(query)
            res.send(result)
        })

        app.get('/property', async (req, res) => {
            const result = await propertyCollection.find().toArray()
            res.send(result)
        })

        app.get('/property/my-property', async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const result = await propertyCollection.find(query).toArray()
            res.send(result)
        })

        app.get('/property/verified', async (req, res) => {
            const verified = req.query.verification_status
            const query = { verification_status: verified }
            const result = await propertyCollection.find(query).toArray()
            res.send(result)
        })

        app.get('/property/details/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await propertyCollection.findOne(query);
            res.send(result)
        })
        app.get('/property/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await propertyCollection.findOne(query);
            res.send(result)
        })

        app.post('/reviews', async (req, res) => {
            const cursor = req.body;
            const result = await reviewsCollection.insertOne(cursor)
            res.send(result)
        })

        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await reviewsCollection.deleteOne(query)
            res.send(result)
        })


        app.get('/reviews', async (req, res) => {
            const result = await reviewsCollection.find().toArray()
            res.send(result)
        })

        app.get('/reviews/my-reviews', async (req, res) => {
            const email = req.query.email
            const query = { userEmail: email }
            const result = await reviewsCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { propertyId: id }
            const result = await reviewsCollection.find(query).toArray();
            res.send(result)
        })

        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('server is running properly, no issues here')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})