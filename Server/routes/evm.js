const router = require('express').Router();
const Partys=require('../models/Party');
const Voters = require('../models/Voters');
const smsTwilio = require('twilio')("AC756acd0563e4dbb03a9ad46d0ff08ad0", "09d6a27b2c739127393aeb09d47f17ca");

const mongoose = require('mongoose');


const verified=[9940599231,9500727827,9677747596]
// const verified=[9940599231]
const sendSMS = (to, name,time) =>{
    const message = `(^v^)\n\nDear ${name},\n Your vote has been registered,\nRegisterd at  ${time}\n\n if not you then reply STOP and urge to Election commison office  \n\n Regards,\nElection Commission of R M D`;
    smsTwilio.messages
      .create({
        body: message,
        from: "+18729017430" ,
        to: to
      })
      .then(message => console.log(`Voted confirmation SMS : ${message.sid}`))
      .catch(error => console.error(error));
  }
//Register a party
router.post("/register", async (req, res) => {
    const newParty = new Partys(req.body);
    try {
        const savedParty = await newParty.save();
        res.status(200).json(savedParty);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get all partys
router.get("/", async (req, res) => {
    try {
        const partys = await Partys.find();
        res.status(200).json(partys);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Make a user Voted

router.post("/vote/", async (req, res) => {
    console.log("Connectiuon Established");
    console.log(req.headers.username);
    try {
        const voter = await Voters.findOne({voterID:req.headers.username});
        if(!voter){
            res.status(400).json("Voter not found");
        }
        else{
            voter.voted=true;
            const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
            voter.votedAt=date.slice(11,24) + " IST";
            await voter.save();
            if (verified.includes(voter.phone)){
            sendSMS("+91"+voter.phone,voter.name,voter.votedAt);
            }
            res.status(200).json("Voter has been updated");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});












//Clear all voters
router.post("/clear", async (req, res) => {
    try{
        await Voters.updateMany({voted:true},{$set:{voted:false,votedAt:"Not Voted Yet"}});
        res.status(200).json("All voters have been cleared");
    }
    catch(err){
        res.status(500).json(err);
    }
});


//Random Vote
router.post("/random", async (req, res) => {
    try{
        const voters = await Voters.find({voted:false});
        const randomVoter = voters[Math.floor(Math.random()*voters.length)];
        randomVoter.voted=true;
        const utc = new Date();
        const date=utc.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        randomVoter.votedAt=date.slice(11,24)+" IST";
        // console.log(randomVoter.votedAt);
        await randomVoter.save();
        res.status(200).json(randomVoter.name + " has been updated as voted");
    }
    catch(err){
        res.status(500).json(err);
    }
});


//Finger Print Mismatch logic

var mismatch={};
var mismatchFlag=false;

router.post("/not", async (req, res) => {
    try{
        const voter = await Voters.findOne({voterID:req.headers.username});
        if(!voter){
            res.status(401).json("not route debugging is failure");
        }
        else if(voter.voted==false){
            console.log("Finger Print Mismatch for "+voter.name);
            mismatchFlag=true;
            mismatch=voter;
            res.status(200).json("Finger Print Mismatch for "+voter.name);
        }
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/mismatch", (req, res) => {
    if(mismatchFlag){
        res.status(200).json(mismatch);
        mismatchFlag=false;
        mismatch={};

    }
    else{
        res.status(204).json("No Mismatch");
    }
});







module.exports=router;