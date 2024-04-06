const router = require('express').Router();
const Voters = require('../models/Voters');
const mongoose = require('mongoose');
const smsTwilio = require('twilio')("AC756acd0563e4dbb03a9ad46d0ff08ad0", "09d6a27b2c739127393aeb09d47f17ca");
const callTwilio= require('twilio')("ACea556e77270c024dd4ec3684b9eb082c","cc0c59871343740cfcdb9cec99421625");
// const audio=require('./audio.mp3');
const axios = require('axios'); 

function sendSMS(to, message) {
    smsTwilio.messages
      .create({
        body: message,
        from: "+18729017430" ,
        to: to
      })
      .then(message => console.log(`SMS sent: ${message.sid}`))
      .catch(error => console.error(error));
  }


    function makecall(to,name){
        const message = `Dear ${name}, This is the final reminder for the ongoing election. Your vote is important to us. Our Vote, Our Right. Regards, Election Commission of R M D`;
        callTwilio.calls
        .create({
                twiml: '<Response><Say>'+message+'</Say></Response>',
                // twiml: '<Response><Say>Dear Rohith P, This is the final remainder for the ongoing election. Your vote is important for us. Our Vote Our Right. Regards, Election Commission of R M D</Say></Response>',
                to: to,
                from: '+19108213600'
        }).then(call => {console.log(call.sid)}).catch(error => console.error(error));
    }






router.post("/call",async(req,res)=>{
    try{
        makecall(req.body.phone,req.body.name);
        res.status(200).json("Call made");
    }catch(err){
        res.status(500).json(err);
    }
})



router.post("/allowVote", async (req, res) => {
    try {
        const postData = { serialData: "YES" };
        const headers = { username: "iotbegin484" };
        const response = await axios.post('https://www.iotbegineer.com/api/devices/serialData', postData, { headers });
        res.status(response.status).json(response.data.message);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/register", async (req, res) => {
    const newVoter = new Voters(req.body);
    try {
        const savedVoter = await newVoter.save();
        res.status(200).json(savedVoter);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get all voters
router.get("/", async (req, res) => {
    try {
        const voters = await Voters.find();
        res.status(200).json(voters);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get not voted voters
router.get("/notVoted", async (req, res) => {
    try {
        const voters = await Voters.find({ voted: false });
        res.status(200).json(voters);
    } catch (err) {
        res.status(500).json(err);
    }
}); 

//Get voted voters
router.get("/voted", async (req, res) => {
    try {
        const voters = await Voters.find({ voted: true });
        res.status(200).json(voters);
    } catch (err) {
        res.status(500).json(err);
    }
});


// send Sms from dashboard;
const verified=[9940599231,9677747596,9500727827]



router.post("/sendSms", async (req, res) => {
    try {
            smsTwilio.messages
                .create({
                    body: "(^-^) \n\nDear "+req.body.name+",\n\nThis is Special Remainder Directly from the ward administator dashboard . Your vote is important for us.\nOur Vote Our Right \n\nRegards,\nElection Commission of R M D",
                    from: '+18729017430',
                    to: "+91"+req.body.phone,
                })
                .then(message => console.log(message.sid));
        res.status(200).json("Messages sent ");
    } catch (err) {
        res.status(500).json(err.message);
    }
});


router.post("/makeDedicatedCall", async (req, res) => {
    const message = `Dear ${req.body.name}, This is the final reminder for the ongoing election. Your vote is important to us. Our Vote, Our Right. Regards, Election Commission of R M D`;
    try {
        callTwilio.calls
        .create({
            twiml: '<Response><Say>'+message+'</Say></Response>',
            // twiml: '<Response><Say>Dear Rohith P, This is the final remainder for the ongoing election. Your vote is important for us. Our Vote Our Right. Regards, Election Commission of R M D</Say></Response>',
            to: "+91"+req.body.phone,
            from: '+19108213600'
        })
        .then(call => {console.log(call.sid)
            res.status(200).json("Call made Sid "+call.sid);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

















function messages(name,attempt){
    const a= [
        "(^-^) \n\nDear "+name+",\n\nThis is a Remainder for the ongoing election . Your vote is important for us.\nOur Vote Our Right \n\nRegards,\nElection Commission of R M D",
        "(^-^) \n\nDear "+name+",\n\nwe have found that you forgot to vote. Please keep in mind if you did'nt vote in this election you will be fined.\n This is your Final SMS remainder  \nOur Vote Our Right \n\nRegards,\nElection Commission of R M D"," ",
        "(^-^) \n\nDear "+name+",\n\nSince you did'nt  vote and not provided the Details,We Post fine  \n Visit Commision office for further details.\n\nFrom,\nElection Commission of R M D"
    ];
    return a[attempt];
}















//IMPORTANT PART















async function sendSMSForNotVoters(attempt) {
    const voters=await Voters.find({voted:false,phone:{$in:verified}});
    console.log(attempt+1);
    voters.forEach((recipient) => {
    // console.log(messages(recipient.name,attempt)) // Send SMS to each recipient
    if(attempt==2){
        if(verified.includes(recipient.phone)){
            makecall("+91"+recipient.phone,recipient.name);
        }
    }else{
        sendSMS("+91"+recipient.phone, messages(recipient.name,attempt));
    }
    });
  }
  
  // Send SMS to the group on server startup
  async function sendSMSOnStartup() {
    for (let i = 0; i <4; i++) {
      await sendSMSForNotVoters(i); // No delay needed within the attempt, send all at once
      await new Promise(resolve => setTimeout(resolve, 20000)); // Wait 30 seconds between attempts
    }
  }
  
  // Call the sendSMSOnStartup function immediately after server starts



  sendSMSOnStartup();



//CHECK ABOVE CODE



module.exports=router;






