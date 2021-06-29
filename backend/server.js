import express from "express"; 
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
// import paymentRouter from "./routes/payment.js";
import orderRouter from "./routes/orderRoute.js";
// import paymentRouter from "./routes/paymentRouter";

dotenv.config();

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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
app.get('/api/config/paypal', (req, res) => {
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




