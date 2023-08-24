const express = require('express');
const app = express();
const PORT = 1999

app.use(express.urlencoded());
app.set("view engine","ejs");

    const student = [
        {   
            id: "09",
            name: "krunal",
            email: "krunal@gmail.com",
            age: "24",
            gender: "male",
            contact: "7069808822",
            address: "301, Aashirvad app., Patel Mill Road, Keshod-362220"
        },
        {
            id: "04",
            name: "devu",
            email: "devu@gmail.com",
            age: "22",
            gender:"female",
            contact: "9408880818",
            address: "11,Ravi park socity, Kalavad Road, Rajkot-360005"
        },
    ];

    app.get('/',(req,res) => {
    res.render('embedform',{
        student: student
    })
});

// --------------UPDATE CODE------------------------------------
app.get("/update/:id",(req,res)=>{
    let index = student.findIndex(st=>st.id==req.params.id);
    return res.render('update',{
        singleobj:student[index]
    })
})

// app.post("/editdata",(req,res)=>{
//     for(var i=0; i<student.length; i++)
//     {
//         if(student[i].id==req.body.id)
//         {
//             student[i]=req.body
//         }
//     }    
//     res.redirect("/")
// })

// --------------DELETE CODE------------------------------------
app.get("/delete/:id", (req, res) => {
    const idDel = parseInt(req.params.id);
    const index = student.findIndex(st => st.id === idDel);

    if (index !== 0) {
        student.splice(index, 1);
        res.redirect("/");
    } else {
       res.status(404).send("Student not found");
    }
});

// --------------EDIT CODE------------------------------------
app.post("/editdata",(req,res)=>{
    const editdStudent = req.body;

    const index = student.findIndex(st => st.id == editdStudent.id);

    if (index !== 0) {
        student[index] = {
            id: editdStudent.id,
            name: editdStudent.name,
            email: editdStudent.email,
            age: parseInt(editdStudent.age),
            gender: editdStudent.gender,
            contact: parseInt(editdStudent.contact),
            address: editdStudent.address
        };
        res.redirect("/");
        // console.log(req.body);

        
    } else {
        res.status(404).send("Student not found");
    }
});  

// --------------INSERT DATA IN TABLE------------------------------------
app.post("/insertRecord",async(req , res) =>
{
    console.log(req.body)

    var name=req.body.name
    var email=req.body.email
    var age=req.body.age
    var gender=req.body.gender
    var contact=req.body.contact
    var address=req.body.address

    const st ={
        id:Math.round(Math.random()*1000),
        name :name,
        email :email,
        age : parseInt (age),
        gender : gender,
        contact :parseInt (contact),
        address :address
    }
   
    student.push(st);
    res.redirect("/")
})
// -------------- PORT RUN -----------------------
app.listen(PORT, ()=> {
    console.log(`server is running....${PORT}`)
})