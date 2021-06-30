
const express = require("express"); 
// const dotenv = require("dotenv") ;
const config = require("./config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {userRouter} = require("./backend/routes/userRoute");
const {productRouter}= require("./backend/routes/productRoute");
// import paymentRouter from "./routes/payment.js";
const {orderRouter}= require("./backend/routes/orderRoute");
const cors = require('cors');
const path = require('path')
// import paymentRouter from "./routes/paymentRouter";



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors({ origin: true }));
const mongodbUrl = config.MONGODB_URL
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).catch(error => console.log(error.reason))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    });
}



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




