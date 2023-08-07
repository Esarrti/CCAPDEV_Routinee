# CCAPDEV_Routinee

MCO for Routinee, a game-based routine tracker

HOW TO SETUP AND RUN LOCAL SERVER:

IMPORTANT: You can only connect to the cluster when using DLSU IP

1. Open the folder in Visual Studio Code, and open the "src" folder.
2. Inside, click on the "index.js" file, and run it by pressing the arrow on the top right.
3. Now, the server should say "Port connected" and "Connected to MongoDB". This shows that the server is successfully running.
4. Afterwards, open your browser and type in "http://localhost:3000/". This is the website in which you will be logging in and registering.
5. You have now successfully opened and connected to the server. Any information you will register with will be stored in the database.

---

INSTALLED MODULES:

1. Express.js - Helps simplify and ease the process of creating a flexbile website, especially for database integration
2. HBS - Handlebar JS contains HTML code, while allowing the use of handlebars to further enhance the functionality of the login and signup process
3. Mongoose - Mongoose is an ODM library that will help connect to the database of MongoDB. This'll translate the code from MongoDB to the Node.js servers
4. Nodemon - Nodemon is the main tool that'll help with the development of Node.js

---

ADDITIONAL INSTALLATIONS/THINGS:

1. MongoDB - MongoDB is the main database that will store all the user information. By using Mongoose and other code, the data will be successfully read and stored in the MongoDB database. This is generally accessible locally.
2. FullCalendar.io - FullCalendar provided the script for the main calendar implemented in the website. This allows for adding and removing events from the calendar.
