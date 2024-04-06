const express=require('express');
const app=express();
const mongoose=require('mongoose');
const votersRoute=require('./routes/voters');
const partyRoute=require('./routes/evm');
const cors=require('cors');
const axios=require('axios');

app.use(cors());
// allow all orgin in cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.json());



//Conect to DB


mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://rahul:21022003@edd.ug2qwpy.mongodb.net/?retryWrites=true&w=majority", {
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });




app.get("/",(req,res)=>{
  var ip = req.ip
    console.log(ip);
    res.send("SERVICE BLOCKED => AUTHORIZED PERSONNEL ONLY \n your IP = "+ip);
  }); 



app.use("/voters",votersRoute);
app.use("/evm",partyRoute);




  app.listen(8800, () => {
    console.log("Backend is live");
  });