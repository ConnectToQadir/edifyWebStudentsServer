const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')



app.use(express.json())
app.use(cors())


// User Model
const studentsModel = mongoose.model('students',new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is Required!"],
        unique:[true,"Username already exists!"],
        trim:true
    },
    password:{
        type:String,
        minlength:[8,"Password Must Contain 8 Charactors"],
        required:[true,"Password Must be Entered"],
        trim:true
    }

}))


app.post("/enrollStudent",async (req,res)=>{

    await studentsModel.create({username:req.body.username,password:req.body.password})

    res.send("User Saved")

    // var {username,password} = req.body
    // await studentsModel.create({username,password})
})


app.get("/getStudents",async (req,res)=>{

    // Pagination
    var limit = req.body.limit || 10
    var page = req.body.page || 1
    var s = (page - 1) * limit

    var match = {}

    if(req.body.username){
        match.username = new RegExp(req.body.username,"i")
    }



    var students = {}
    students.data = await studentsModel.find(match).sort({username:1}).limit(limit).skip(s)
    students.count = await studentsModel.find(match).count()

    // Regex
    // var students = await studentsModel.find({username:new RegExp("abd","i")}).sort({username:1}).limit(limit).skip(s)

    // Pagination
    // var students = await studentsModel.find({username:"ali"}).sort({username:1}).limit(limit).skip(s)

    // Project
    // var students = await studentsModel.findOne({username:req.body.username},{__v:0,username:0})

    res.json(students)
})


app.delete("/delStudent/:id",async (req,res)=>{
    await studentsModel.findByIdAndDelete(req.params.id)
    res.send("Student Deleted")
})


app.put('/updateStudent',async(req,res)=>{
    await studentsModel.updateOne({username:req.query.name},{$set:{username:req.query.newName}})
    res.send("user updated")
})



// Test API Server
app.get("/",(req,res)=>{
    res.send("Server is Working")
})





mongoose.connect('mongodb://localhost:27017/college').then(()=>console.log("Database Connected!")).catch(()=>console.log("Not Connected!"))



app.listen(4600,()=>{
    console.log("Server is Running on Port 4600")
})


