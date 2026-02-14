const express = require('express');
const mongoose = require('mongoose');
const Feedback = require("./models/feedback");
const app = express();
const port = 3000;


mongoose.connect("mongodb://127.0.0.1:27017/guestbookDB")
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});


app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.post('/submit', async (req,res)=>{

    const username = req.body.username;
    const email = req.body.email;
    const message = req.body.message;

    try{
        const newFeedback = new Feedback({
            username,
            email,
            message
        });

        await newFeedback.save();

        console.log("Saved:", newFeedback);

        res.send("Feedback stored in MongoDB 🎉");

    }catch(err){
        console.log(err);
        res.send("Database error");
    }
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})