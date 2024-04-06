import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import { useContext } from "react";
import { VotersContext } from "../../context/dataContext";
import { VotedContext } from "../../context/VotedContext";
import axios from "axios";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const [fet,setFet]=useState(false);
  const [dataFlag,setDataFlag]=useState(false);
  const Password=localStorage.getItem('password');
  useEffect(()=>{
    const fetchMismatch = async () => {
      const res=await axios.get("http://localhost:8800/evm/mismatch");
      if(res.status==200){
        setDataFlag(true);
        Swal.fire({
          icon: 'warning',
          title: 'Finger Print Mismatch',
          text: res.data.name +' id - '+res.data.voterID,
          confirmButtonText: 'Manual Verification',
          showCancelButton: true,
          cancelButtonText: 'Retry/Push Out',
          cancelButtonColor: 'red',
          
        }).then((act)=>{
          if(act.isConfirmed){
            Swal.fire({
              title: 'Voter Verification',
              text: "I hearby confirm that the voter has been verified and allowed to vote and I confirm his/her identity",
              input: 'password',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              confirmButtonText: 'Confirm',
              confirmButtonColor: 'green',
              cancelButtonText: 'Not the voter',
              cancelButtonColor: 'red',
              showLoaderOnConfirm: true,
              preConfirm: async (enteredPassword) => {
                // Verify password
                if (enteredPassword === Password) {
                  Swal.fire({
                      title: 'Admin Verified!',
                      text: "The voter has been manually verified and allowed to vote",
                      icon: 'success',
                      timer: 3000,
                      timerProgressBar: true,
                      });
                      const dd=await axios.post("http://localhost:8800/voters/allowVote");
                      if(dd.status==200){
                        Swal.fire({
                          title: 'Voting Allowed',
                          icon: 'success'
                        });
                      }
                } else {
                  Swal.fire({
                    title: 'Incorrect Password',
                    icon: 'error'
                  });
                }
              }
            });
          }else{
            Swal.fire({
              icon: 'info',
              title: 'Process Terminated',
              text: res.data.name+ ' will only be allowed to vote when his finger print is verified or else the EVM will terminate the voting process'+<br/>+' Insist next voter to place the card first even thoug it shows the finger print mismatch',
            });
          }
        });
      }
    };
    fetchMismatch();
    if(dataFlag==false){
     const timer= setTimeout(() => {
        setFet(!fet)
      }, 2000);
      
    }
    console.log("i am fetching")
    console.log(fet+" ... "+dataFlag)
    
  },[fet])




  const voters = useContext(VotersContext);
  const voted = useContext(VotedContext);
  var maleCount=0,femaleCount=0,maleVoted=0,femaleVoted=0;
  voters.forEach(voter=>{
    if(voter.gender=="male"){
      maleCount+=1;
      if(voter.voted)
      maleVoted+=1;
    }else{
      femaleCount+=1;
      if(voter.voted)
      femaleVoted+=1;
    }
  });
  var calc={
    totalVoters:voters.length,
    totalVoted:voted.length,
  }; 
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget title="Total" datas={calc.totalVoters} voted={calc.totalVoted} icon="total"/>
          <Widget title="Male Voters" datas={maleCount} voted={maleVoted} icon="male"/>
          <Widget title="Female Voters" datas={femaleCount} voted={femaleVoted} icon="female"/>
        </div>
        <div className="charts" >
          <Featured  voted={calc.totalVoted} voters={calc.totalVoters}  />
          <Chart title="Voted , Not voted age comparison"aspect={3 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
