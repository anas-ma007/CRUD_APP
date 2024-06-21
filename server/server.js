const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();



// const corsOptions = {
//   origin: 'http://your-production-site.com',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

//schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

//read
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({
    success: true,
    data: data,
  });
});

// create data || save data
app.post("/create", async (req, res) => {
  const data = new userModel(req.body);
  // console.log(data, "data in usermodel");
  await data.save();
  res.json({
    success: true,
    message: "Data saved succefully", SavedData:data
  });
});

// update data
app.put("/update", async (req, res) => {
    const { _id, ...rest} = req.body
  // console.log(rest, "id and rest");
  const data = await userModel.updateOne(
    { _id: _id },
    rest 
  );

  res.json({ success: true, message: "data Update successfully" , updatedData : data} );
});


// delete method 

app.delete("/delete/:id", async(req, res)=>{
const id =req.params.id
console.log(id, "id");
let data = await userModel.deleteOne({_id : id})
res.json({success : true, message : "data deleted succesfully", deletedData : data })
})

mongoose
  .connect(process.env.DATABASE_URL
  )
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server Connected to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Something Error happen when connecting mongodb " + err);
  });
