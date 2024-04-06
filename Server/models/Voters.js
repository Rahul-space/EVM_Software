const mongoose=require('mongoose');

const VotersSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
    photo:{
        type:String,
        default:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559"
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        default:"male"
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    voterID:{
        type:String,
        required:true,
        unique:true
    },
    voted:{
        type:Boolean,
        default:false
    },
    votedAt:{
        type:String,
        default:"Not Voted Yet"
    }
},{timestamps:true});

module.exports=mongoose.model("Voters",VotersSchema);