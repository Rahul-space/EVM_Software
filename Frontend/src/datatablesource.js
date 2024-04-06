export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];



export const voted=[
  {
    _id:1,
    name: "Rahul",
    gender:"male",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:1,
    age:21,
    voted:true,
    votedAt:Date.now()
  },
  {
    _id:2,
    name: "sudha",
    gender:"female",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 7397334170,
    voterID:2,
    age:21,
    voted:true,
    votedAt:Date.now()
  },
  {
    _id:3,
    name: "jitesh",
    gender:"male",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:4,
    age:18,
    voted:true,
    votedAt:Date.now()
  },
  {
    _id:4,
    name: "Ragu",
    gender:"male",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:5,
    age:19,
    voted:true,
    votedAt:Date.now()
  },
  {
    _id:5,
    name: "hedhav",
    gender:"female",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:6,
    age:19,
    voted:true,
    votedAt:Date.now()
  },
  {
    _id:6,
    name: "samurtha",
    gender:"female",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:7,
    age:19,
    voted:true,
    votedAt:Date.now()
  },
  {
    _id:7,
    name: "Rahul",
    gender:"female",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:8,
    age:20,
    voted:true,
    votedAt:Date.now()
  },
  {
    _id:8,
    name: "Rahul092",
    gender:"female",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:9,
    age:45,
    voted:true,
    votedAt:Date.now()
  }
];



export const notvoted=[
  {
    _id:1,
    name: "Rahul",
    gender:"male",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:1,
    age:21,
    voted:false,
    votedAt:"Not Voted Yet"
  },
  {
    _id:2,
    name: "sudha",
    gender:"female",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 7397334170,
    voterID:2,
    age:21,
    voted:false,
    votedAt:Date.now()
  },
  {
    _id:3,
    name: "jitesh",
    gender:"male",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:4,
    age:18,
    voted:false,
    votedAt:Date.now()
  },
  {
    _id:4,
    name: "Ragu",
    gender:"male",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:5,
    age:19,
    voted:false,
    votedAt:Date.now()
  },
  {
    _id:5,
    name: "hedhav",
    gender:"male",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:6,
    age:19,
    voted:false,
    votedAt:Date.now()
  },
  {
    _id:6,
    name: "samurtha",
    gender:"female",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:7,
    age:19,
    voted:false,
    votedAt:Date.now()
  },
  {
    _id:7,
    name: "Rahul",
    gender:"female",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:8,
    age:20,
    voted:false,
    votedAt:Date.now()
  },
  {
    _id:8,
    name: "Rahul092",
    gender:"female",
    photo:"https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559",
    phone: 9940599231,
    voterID:9,
    age:45,
    voted:false,
    votedAt:Date.now()
  }
];

