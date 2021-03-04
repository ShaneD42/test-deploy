const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");


// Express App 
const app = express();
app.use(bodyParser.json());

// Initiailize Mongoose DB
mongoose.connect(
	'mongodb://localhost/mitten-msp-db',
	{
	  useNewUrlParser: true,
	  useUnifiedTopology: true,
	  useCreateIndex: true,
	  useFindAndModify: false
	}
  );

// define and create service model
const Service = mongoose.model(
    "services",
    new mongoose.Schema({
      _id: { type: String, default: shortid.generate },
      title: String,
      description: String,
      image: String,
      price: Number,
      productType: [String],
    })
  );

// Endpoints 


// Get - list of all services 
app.get("/api/services", async (req, res) => {
    const services = await Service.find({});
    res.send(services);
  });

// Post - create new service 
   app.post("/api/services", async (req, res) => {
       const newService = new Service(req.body);
       const savedService = await newService.save();
       res.send(savedService);
   });

// Delete Product 
app.delete("/api/services/:id", async (req,res) => {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    res.send(deletedService);
});

const Order = mongoose.model("order", new mongoose.Schema({
  _id:{
    type: String, 
    default: shortid.generate
  },
  email: String,
  name: String, 
  address: String,
  total: Number,
  cartItems: [{
    _id: String,
    title: String,
    price: Number, 
    count: Number
  }]
},
{
  timestamps: true,
    }
  )
);

app.post("/api/orders", async(req, res)=> {
if(!req.body.name || 
  !req.body.email || 
  !req.body.address || 
  !req.body.total ||
  !req.body.cartItems 
  ){
    return res.send({ message:"Required Data Is Missing" });
  }
  const order = await Order(req.body).save();
  res.send(order);
});

// Listen to Port and Launch Server 

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("serve at http://localhost:8000"));




