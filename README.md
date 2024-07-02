Dream Real Estate

Project Overview: This is a real-estate e-commerce website. This website different access levels of admin,agent,user. Each access level holder have a different dashboard. It also has a fraud validation feature where if a admin deems some one as fraud then they will be restricted of access.<br/>
This website features:<br/>
1. Access levels user, agent, admin.<br/>
2. Each access level has a different dashboard. <br/>
3. Payment system integration. <br/>
4. Fraud validation. <br/>

This is one of my favourate projects. I faced lots of issues regarding the dashboard layout for different access levels. One of them was regarding the responsiveness of the tables shown in the dashboard. Then I tried something new. I made the tables for small devices hidden for large devices and block for medium devices. I made a reusable layout for small and large devices and used them. It kind of took a round about approch but I learned something new. 

Client Side Website Live Link: https://dream-real-estate-efecd.web.app
<br/>
Client Side Github Link: https://github.com/md-yamin/dream-real-estate-client.git

Server Side Live Link: https://dream-real-estate-server.vercel.app
<br/>
Server Side Github Link: https://github.com/md-yamin/dream-real-estate-server.git

If you want to clone this website you would need to clone both the client and server ripositories.

1. Clone the Client-Side Repository:<br/>
 a. git clone https://github.com/md-yamin/dream-real-estate-client.git<br/>
 b. cd/ your project name<br/>

2. Install Packages:
 a. npm install<br/>
 
3. Add Firebase Environment Variables:<br/>
  Ensure you add your Firebase environment variables to a .env file in the root directory.
  
4. Update Request URLs:<br/>
  Replace all request URLs from https://dream-real-estate-server.vercel.app to the URL where your server is hosted. If running the server locally, use 
  http://localhost:5000.
  
5.Clone the Server-Side Repository:<br/>
  a. git clone https://github.com/md-yamin/dream-real-estate-server.git<br/>
  b. cd/ your project name<br/>

6.Configure CORS:<br/>
Add the local URL of the client to the CORS origin if running locally. Alternatively, use * to allow access from any origin.

7. Set Up Environment Variables:<br/>
  a. Create a .env file with the following variables:<br/>
  b. DB_USER=your-mongodb-uri-username<br/>
  c. DB_PASS=your-mongodb-uri-password<br/>
  d. ACCESS_TOKEN_SECRET=your-64bit-hexadecimal-token(you need to generate this)
  
8. Run the Server and Client:<br/>

  a. Start the server:<br/>
  
   1. Open a terminal<br/>
   2. change directory to your project folder cd/ your project name<br/>
   3. nodemon index.js<br/>
   
  b. Start the client:<br/>
  
   1. Open a terminal<br/>
   2. change directory to your project folder cd/ your project name<br/>
   3. npm run dev<br/>
   
Now you are ready to go!






