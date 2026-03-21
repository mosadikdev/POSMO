const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const saleRoutes = require("./routes/saleRoutes");
const productRoutes = require("./routes/productRoutes");


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/posmo")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});



app.use("/products", productRoutes);


app.use("/sales", saleRoutes);