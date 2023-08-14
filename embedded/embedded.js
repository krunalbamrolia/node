const express = require('express');
const PORT = 1001
const app = express();

app.set("view engine","ejs");
app.get('/',(req,res) => {
    // const employee = {
    //     name: "Rahul",
    //     age:"35",
    // }

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
    res.render('embedded',{
        // employee: employee,
        student: student
    })

});

app.listen(PORT, ()=> {
    console.log("server is running....")
})