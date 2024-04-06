import React from 'react'
import './settings.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Button from '@mui/material/Button';
import axios, { AxiosHeaders } from 'axios'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import Swal from 'sweetalert2';
import { useState } from 'react';
import Fingerprint from '@mui/icons-material/Fingerprint';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(localStorage.getItem('disabled') === 'true' ? true : false);
    const correctPassword = localStorage.getItem('password');

    var but=(data) =>loading ? <CircularProgress color='inherit'/> :disabled? "Disabled" :data;








const handleSwitchToggle = () => {
  // Prompt for password
  Swal.fire({
    title: 'Enter Password',
    input: 'password',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    showLoaderOnConfirm: true,
    preConfirm: async (enteredPassword) => {
      // Verify password
      if (enteredPassword === correctPassword) {
        setDisabled(!disabled);
        localStorage.setItem('disabled', !disabled);
        Swal.fire({
            title: 'Settings Updated!',
            text: "Password Verified! and settings updated.",
            icon: 'success'
            });

      } else {
        Swal.fire({
          title: 'Incorrect Password',
          icon: 'error'
        });
      }
    }
  });
};






    const handleReset = async () => {
        setLoading(true);
        setTimeout(() => {}, 5000);
        try {
            const res = await axios.post('http://localhost:8800/evm/clear');
            setLoading(false);
            Swal.fire({
                text: res.data,
                timer: 2000,
                timerProgressBar: true,              
                icon: "success"
              });
              
            console.log(res);
        } catch (err) {
            setLoading(false);
            Swal.fire({
                text: err.message,
                timer: 4000,
                timerProgressBar: true,              
                icon: "error"
              });
            console.log(err);
        }
    };

    const handleNotification = async () => {
        setLoading(true);
        localStorage.setItem('smsCount', 0);
        setLoading(false);
        Swal.fire({
                text: "Notification count reset to 0",
                timer: 4000,
                timerProgressBar: true,              
                icon: "success"
        });
    }
    const handleNotificationup = async () => {
        setLoading(true);
        localStorage.setItem('smsCount', 4);
        setLoading(false);
        Swal.fire({
                text: "Notification System has been disabled for testing purposes.",
                timer: 4000,
                timerProgressBar: true,              
                icon: "success"
        });
    }

    const handleRandom = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8800/evm/random');
            setLoading(false);
            Swal.fire({
                text: res.data,
                timer: 2000,
                timerProgressBar: true,              
                icon: "success"
              });
              
            console.log(res);
        } catch (err) {
            setLoading(false);
            Swal.fire({
                text: err.message,
                timer: 4000,
                timerProgressBar: true,              
                icon: "error"
              });
            console.log(err);
        }
    };
    const handleCall = async () => {
        setDisabled(true);
        setLoading(true);
        localStorage.setItem('disabled', true);
    
        try {
            // const res={data:"Call made"};
            const res = await axios.post('http://localhost:8800/voters/makeDedicatedCall',{phone: 9940599231,name:"Rahul R"});
            setLoading(false);
            Swal.fire({
                text: res.data,
                timer: 2000,
                timerProgressBar: true,              
                icon: "success"
              });
              
            console.log(res);
        } catch (err) {
            setLoading(false);
            Swal.fire({
                text: err.message,
                timer: 4000,
                timerProgressBar: true,              
                icon: "error"
              });
            console.log(err);
        }
    };
    const handleAllowVote = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8800/voters/allowVote');
            setLoading(false);
            Swal.fire({
                text: res.data,
                timer: 2000,
                timerProgressBar: true,              
                icon: "success"
              });
              
            console.log(res);
        } catch (err) {
            setLoading(false);
            Swal.fire({
                text: err.message,
                timer: 4000,
                timerProgressBar: true,              
                icon: "error"
              });
            console.log(err);
        }
    }



  return (
    <div className='settings'>
        <Sidebar />
        <div className="settingsContainer">
        <Navbar />
        <div className="top">
          <h1 >Settings / Debugging / Testing</h1>
        </div>

        <div className="bottom">
                <div className="left">
                    <Alert  icon={<CheckIcon fontSize="inherit" />} className='alert' severity="info">
                        Enable settings .
                    </Alert>
                </div>
                <div className="left">
                    <Switch
                    className='switch'
                        checked={!disabled}
                        onChange={()=>handleSwitchToggle()}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
            </div>
            <div className="bottom">
                <div className="left">
                    <Alert icon={<CheckIcon fontSize="inherit" />} className='alert' severity="success">
                        Reset all the voters details to not voted for testing purpose.
                    </Alert>
                </div>
                <div className="left">
                    <Button className="button clear" disabled={disabled} onClick={()=>handleReset()}>{but("Clear all vote")}</Button>
                </div>
            </div>
            <div className="bottom">
                <div className="left">
                        <Alert icon={<CheckIcon fontSize="inherit" />} className='alert' severity="info">
                            Randomly vote for a candidate for testing purposes.
                        </Alert>
                </div>
                <div className="left">
                    <Button className='button vote' disabled={disabled} onClick={()=>handleRandom()}>{but("Random Vote")}</Button>
                </div>

            </div>
            <div className="bottom">
                <div className="left">
                    <Alert icon={<CheckIcon fontSize="inherit" />} className='alert' severity="warning">
                        Reset the System Notification count to 0.
                    </Alert>
                </div>
                <div className="left">
                    <Button className='button enable' disabled={disabled} onClick={()=>handleNotification()}>{but("Enable SMS")}</Button>
                </div>
            </div>
            <div className="bottom">
                <div className="left">
                    <Alert icon={<CheckIcon fontSize="inherit" />} className='alert' severity="error">
                        Disable the Notification System for testing purposes.
                    </Alert>
                </div>
                <div className="left">
                    <Button className='button disable' disabled={disabled} onClick={()=>handleNotificationup()}>{but("Disable SMS")}</Button>
                </div>
            </div>
            <div className="bottom">
                <div className="left">
                    <Alert icon={<CheckIcon fontSize="inherit" />} className='alert' severity="info">
                        Call Rahul with Integrated voice for showing the call feature.
                    </Alert>
                </div>
                <div className="left">
                    <Button className='button call' disabled={disabled} onClick={()=>handleCall()}>{but("Call Rahul")}</Button>
                </div>
            </div>
            <div className="bottom">
                <div className="left">
                    <Alert icon={<CheckIcon fontSize="inherit" />} className='alert' severity="info">
                        Allow vote for the current voter For testing purpose.
                    </Alert>
                </div>
                <div className="left">
                    <Button className='button allow' disabled={disabled} onClick={()=>handleAllowVote()}>{but("Allow Vote")}</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings