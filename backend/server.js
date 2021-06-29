
const express = require("express"); 
const dotenv = require("dotenv") ;
const config = require("./config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {userRouter} = require("./routes/userRoute");
const {productRouter}= require("./routes/productRoute");
// import paymentRouter from "./routes/payment.js";
const {orderRouter}= require("./routes/orderRoute");
// import paymentRouter from "./routes/paymentRouter";

dotenv.config();

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
app.use(cors({ origin: true }));
app.use(bodyParser.json())
const mongodbUrl = config.MONGODB_URL
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).catch(error => console.log(error.reason))



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', async(req, res) => {
    res.send(config.PAYPAL_CLIENT_ID)
})

// MiddleWare
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})
 
 
// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id
//     const product = data.products.find(x => x._id === productId)
//     if(product)
//         res.send(product);
//     else
//         res.status(404).send({msg: "Product Not Found"})
       
// });
// app.get("/api/products", (req, res) => {
//     res.send(data.products);
// });

const port = config.PORT || 5000;
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})




