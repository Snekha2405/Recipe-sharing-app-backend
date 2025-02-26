const express=require("express")
const app=express()
const port=3000
const mongoose=require("mongoose")

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("Server running on port"+port);
})
mongoose.connect("mongodb+srv://snekha:snekha@snekha.dtlfd.mongodb.net/db001?retryWrites=true&w=majority&appName=snekha").then(
    ()=>console.log("connected")
).catch((err)=>
    console.log(err)
)
app.get('/',(req,res)=>{
    res.send("welcome")
})

