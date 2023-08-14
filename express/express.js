const express = require("express");
const PORT = 4200
const app= express();

app.get('/',(req,res)=>{
    res.send('Hello World')
});

// console.log(app);

app.listen(PORT,()=> 
{
    console.log("server is running....")
})