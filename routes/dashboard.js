const express = require('express');
const router = express.Router();

//get route for homepage/dashboard
router.get('/',(req,res)=>{
    //renders index.ejs from views folder
    res.render('index');
   });


module.exports = router;