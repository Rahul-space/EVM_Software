import "./widget.scss";
import Woman2Icon from '@mui/icons-material/Woman2';
import Man2Icon from '@mui/icons-material/Man2';
import Groups2Icon from '@mui/icons-material/Groups2';

const Widget = ({ title,datas,voted,icon }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

      data = {
        icon:[ (
          <Woman2Icon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
          

        ),
        (
          <Man2Icon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
          

        ),
        (
          <Groups2Icon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
          

        ),
      ]};
      let main=data.icon[0];
      if(icon=="male")
      main=data.icon[1];
      if(icon=="total")
      main=data.icon[2];

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">
          {voted}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {datas}
        </div>
        {main}
      </div>
    </div>
  );
};

export default Widget;
