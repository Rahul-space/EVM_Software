import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useContext,useState,useEffect } from "react";
import { VotersContext } from "../../context/dataContext";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import Fingerprint from "@mui/icons-material/Fingerprint";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
const New = ({ title }) => {
  const voters=useContext(VotersContext);
  const { voterID } = useParams();
  const voter=voters.find((v)=>v.voterID===voterID);
  console.log(voter)



  const [count,setCount] = useState(0);
  useEffect(() => {
    localStorage.getItem("smsCount")? setCount(parseInt(localStorage.getItem("smsCount"))):localStorage.setItem("smsCount",0);
  }, [])








    
  
  
  const handleSendSms  = (data) =>{
    
    Swal.fire({
      title: "Send SMS to "+data.name+" ?",
      text: "This will be not counted in reminder SMS count! You have "+(2-count)+" SMS left!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send SMS",
      timer: 8000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed) {

        setCount(count+1);
        localStorage.setItem("smsCount",count+1);
          async function sendSms(data){
          await axios.post("http://localhost:8800/voters/sendSms",data).then((res)=>{
            console.log("send sms is accepted",res);
            Swal.fire({
              title: "SMS Sent!",
              text: "SMS Sent to "+data.name+" successfully!",
              icon: "success",
              timer: 8000,
              timerProgressBar: true,
            });
          })
        }
        sendSms(data);
      }
    })
  };

  const handleException = ()=>{
    Swal.fire({
      title: "Make Exception Declined !",
      icon: "error",
      iconColor: "blue",
      text: " Make exception is only active when the voter finished the fingerprint scanning proccess",
      confirmButtonText: "OK",
      confirmButtonColor: "green",

    })
  }








  


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                voter.photo
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput" key={1}>
                  <label>Name</label>
                  <input value={voter.name} disabled/>
                </div>
                <div className="formInput" >
                  <label>ID Number</label>
                  <input value={voter.voterID} disabled/>
                </div>
                <div className="formInput" key={2}>
                  <label>Phone</label>
                  <input  value={voter.phone} disabled/>
                </div>
                <div className="formInput" key={3}>
                  <label>Age</label>
                  <input value={voter.age} disabled/>
                </div>
                <div className="formInput" key={4}>
                  <label>Gender</label>
                  <input value={voter.gender} disabled/>
                </div>
                <div className="formInput" key={5}>
                  <label>Voted ?</label>
                  <input value={voter.voted ? "Voted":"Not Voted"} disabled/>
                </div>
                {voter.voted?(<div className="formInput" key={6}>
                  <label>Voted time</label>
                  <input type={Date} value={voter.votedAt} disabled/>
                </div>):(<div className="formInput" key={7}>
                  <label>Send Manual Notification ( SMS )</label>
                  <Button variant="outlined" onClick={()=>handleSendSms(voter)} className="send" endIcon={<SendIcon />} color="primary">
                    Send SMS
                  </Button>
                </div>)}
                {
                  !voter.voted ? (<div className="formInput" key={8}>
                  <label>Make Exception</label>
                  <Button variant="outlined" onClick={()=>handleException()} className="exception" endIcon={<Fingerprint />} color="success">
                    Make Exception
                  </Button>
                  </div>):null
                }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
