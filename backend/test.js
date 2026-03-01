import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Tushar:Tushar295@cluster0.7sdjuuy.mongodb.net/?appName=Cluster0")
.then(()=>console.log("CONNECTED"))
.catch(err=>console.log("ERROR:",err.message));