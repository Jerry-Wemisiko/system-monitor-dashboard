//import required modules
const express = require('express');
const path = require('path');

//initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

//set view engine to ejs
app.set('view engine', 'ejs');  

//set folder for static files
app.use(express.static(path.join(__dirname, 'public')));

//set up routes
const dashboardRoute = require('./routes/dashboard');
app.use('/', dashboardRoute);

//start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
