const express = require('express')
const app = express()
const mongoose = require('mongoose')



app.use(express.json())


app.put("/",(req,res)=>{
    res.send("Node JS Learning in Edify and data updating")
})


app.delete("/",(req,res)=>{
    res.send("Node JS Learning in Edify and data deleting")
})


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


app.post("/enrollUser",async (req,res)=>{


    await studentsModel.create({username:req.body.username,password:req.body.password})

    res.send("User Saved")

    // var {username,password} = req.body
    // await studentsModel.create({username,password})
})


app.get("/getStudents",async (req,res)=>{
    var students = await studentsModel.find()
    res.json(students)
})




// async function enrollStudent(){
//     await studentsModel.create({username:"Raza",password:"12345678"})
// }

// enrollStudent()





// mongoose.connect('mongodb://localhost:27017/college').then(()=>console.log("Database Connected!")).catch(()=>console.log("Not Connected!"))


mongoose.connect('mongodb+srv://abdullah:abdullah@cluster0.khxrpg0.mongodb.net/college?retryWrites=true&w=majority').then(()=>console.log("Database Connected!")).catch(()=>console.log("Not Connected!"))

app.listen(4600,()=>{
    console.log("Server is Running on Port 4600")
})


