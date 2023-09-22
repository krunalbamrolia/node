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
//------------ fetch data -----------------
app.get("/fetchdata", async function (req, res) {
    try {
      const users = await User.find({}).exec();
  
      res.render("fetchdata", { users: users });
    } catch (err) {
      console.error(`Error fetching data: ${err}`);
      res.status(500).send("Error fetching data");
    }
  });
  
  app.get("/", function (req, res) {
    res.redirect("/fetchdata");
  });
  

//-------- update data -----------------
app.get("/update/:id", async function (req, res) {
  try {
    const user = await User.findById(req.params.id).exec();
    res.render("update", { user: user });
  } catch (err) {
    console.error(`Error finding user: ${err}`);
    res.status(500).send("Error finding user");
  }
});

app.post("/update/:id", async function (req, res) {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email
    }).exec();
    res.redirect("/fetchdata");
  } catch (err) {
    console.error(`Error updating user: ${err}`);
    res.status(500).send("Error updating user");
  }
});


//---------- delete data ----------------
app.get("/delete/:id", async function (req, res) {
  try {
    const user = await User.findById(req.params.id).exec();
    res.render("delete", { user: user });
  } catch (err) {
    console.error(`Error finding user: ${err}`);
    res.status(500).send("Error finding user");
  }
});

app.post("/delete/:id", async function (req, res) {
  try {
    await User.findByIdAndDelete(req.params.id).exec();
    res.redirect("/fetchdata");
  } catch (err) {
    console.error(`Error deleting user: ${err}`);
    res.status(500).send("Error deleting user");
  }
});

// ---------- reverse data print --------------
app.get("/fetchdata", async function (req, res) {
  try {
    const users = await User.find({}).exec();

    users.reverse();

    res.render("fetchdata", { users: users });
  } catch (err) {
    console.error(`Error fetching data: ${err}`);
    res.status(500).send("Error fetching data");
  }
});

//-----port listen-----
app.listen(PORT,() =>{
    console.log(`Server is running on port............... ${PORT}`);
})