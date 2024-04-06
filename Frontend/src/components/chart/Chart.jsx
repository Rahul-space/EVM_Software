import "./chart.scss";
import {
  BarChart,
  LineChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  Line,
  Bar,
} from "recharts";
import { Select,MenuItem } from "@mui/material";
import { useState,useContext } from "react";
import { VotersContext } from "../../context/dataContext";
const Chart = ({ aspect, title }) => {
  const [mode, setMode] = useState("Line");
  const data=useContext(VotersContext);
  var ageData=[];
  var ageCount=[];
  var ageVoted=[];
  data.forEach((voter)=>{
    if(ageData.includes(voter.age)){
      ageCount[ageData.indexOf(voter.age)]+=1;
      if(voter.voted)
      ageVoted[ageData.indexOf(voter.age)]+=1;
    }else{
      ageData.push(voter.age);
      ageCount.push(1);
      if(voter.voted)
      ageVoted.push(1);
      else
      ageVoted.push(0);
    }
  }) 
  const d = ageCount.map((count,index)=>({age:ageData[index],Total:count,voted:ageVoted[index],notvoted:count-ageVoted[index]}));
  const dataa = d.sort((a, b) => a.age - b.age);

  const selectSection = (e) => {
    setMode(e.target.value);
  }
  return (
    <div className="chart">
      <div className="top">
      <div className="title">{title}</div>
        <Select
          className="chartSelect"
          value={mode}
          label="mode"
          onChange={selectSection}
        >
            <MenuItem value={"Line"}>Line Chart</MenuItem>
            <MenuItem value={"Bar"}>Bar Chart</MenuItem>
          </Select>
      </div>

      <ResponsiveContainer width="100%" aspect={aspect}>
        {mode === "Line" ? (
        <LineChart
          width={730}
          height={250}
          data={dataa}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <YAxis dataKey="Total" stroke="gray" />
          <XAxis dataKey="age" stroke="gray" />
          <Line type="monotone" dataKey="Total" stroke="#0000FF" />
          <Line type="monotone" dataKey="voted" stroke="#008000" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
        </LineChart>):(
        <BarChart
          width={730}
          height={250}
          data={dataa}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="age" stroke="gray" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Total" fill="#8884d8" />
          <Bar dataKey="voted" fill="#82ca9d" />
        </BarChart>)}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
