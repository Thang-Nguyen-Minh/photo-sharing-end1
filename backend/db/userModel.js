const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    first_name:String,
    last_name:String,
    location:String,
    description:String,
    occupation:String,
    username:String,
    password:String,
});
module.exports=mongoose.model.User || mongoose.model("User",userSchema);