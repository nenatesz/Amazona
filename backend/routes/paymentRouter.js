import express from "express";
import Payment from "../models/PaymentModel";

const paymentRouter = express.Router() 

paymentRouter.post("/api.paystack.co/transaction/initialize", async (req, res) => {
    const payment = new Payment({
        name: req.body.name,
        email: req.body.email,
        totalPrice: req.body.totalPrice
        
    })
   const newPayment = await payment.save();
   res.status(201).send(newPayment);
})
   

export default paymentRouter;