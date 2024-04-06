import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Featured = ({voters,voted}) => {
  const calc={
    totalVoters:voters,
    totalVoted:voted,
    percentage:Math.round((voted/voters)*100),
  };
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Election Overview</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar className="round" value={calc.percentage} text={calc.percentage+"%"} strokeWidth={5} />
        </div>
        <p className="title">Total Voted</p>
        <p className="amount">{voted}</p>
        <p className="desc">
          Total voted will be updated every 10 seconds
        </p>
      </div>
    </div>
  );
};

export default Featured;
