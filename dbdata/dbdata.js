const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const PORT = 9800;
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Collect-Info",{
    useNewUrlParser : true,
    useUnifiedTopology: true    
});
    
const UserSchema={
    name:String,
    email:String
}
const User= mongoose.model("User",UserSchema);

const app = express();
app.use(bodyParser.urlencoded({
    extended : true
}))

app.set("view engine","ejs");

//  app.get("/dbdata",function (req ,res) {
 app.get("/",function (req ,res) {
    res.render("dbdata");
 });

 app.post("/insertdata",function(req,res)
 {
    const data = new User({
        name:  req.body.name,
        email: req.body.email
    })

    data.save().then(()=>{ 
        res.render("dbdata")
    }).catch(function (err){
        console.log(`error in saving ${err}`);
    })
 })
//-----port listen-----
app.listen(PORT,() =>{
    console.log(`Server is running on port............... ${PORT}`);
})