const fs = require("fs");
const contect ="hello, good morning starbucks customer";

fs.writeFileSync("starbucks.txt",contect);
const mydata=fs.readFileSync("starbucks.txt","utf-8");
console.log(mydata);