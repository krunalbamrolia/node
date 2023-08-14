const express = require('express');
const PORT = 4500
const app = express();
app.use(express.urlencoded());
app.set("view engine","ejs");
app.get('/',(req,res) => {

    const student =[
        {
            name: "raj",
            age: "23",
            email: "raj@gmail.com",
        },
        {
            name: "rajdeep",
            age: "22",
            email: "rajdeep@gmail.com",
        },
        {
            name: "deep",
            age: "21",
            email: "deep@gmail.com",
        },
    ]
    res.render('embedform',{
        student: student
    })
});

app.post("/insertRecord",async(req,res)=>
{
    // -----------add for date 
        // const currentDate = new Date().toLocaleDateString();
        // const formWithDate ={
        //     ...req.body,
        //     date: currentDate,
        // };
        // console.log(formWithDate);
    // -----------
    console.log(req.body);
})
app.listen(PORT, ()=> {
    console.log("server is running....")
})