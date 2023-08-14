const http = require("http")
const fs = require("fs")

const PORT = 1090;

http.createServer( (req, res) => {
    let temp=""
    
    switch(req.url){
    case "/":
        temp = "home.html";
    break;    
    case "/about":
        temp = "about.html";
    break;    
    case "/service":
        temp = "service.html";
    break;    
    default:
        temp = "error.html";    
    }

    fs.readFile(temp, (err,data)=> {
        res.write(data);
        res.end();
    })

}).listen(PORT,"127.0.0.1",()=> {
    console.log("server is running....")
})

