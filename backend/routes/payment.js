import express from "express";
import Payment from "../models/Payment";

const paymentRouter = express.Router() 

paymentRouter.get("/transaction/initialize", async (req, res) => {
    return res.status(200).send({ message: "Payment Initialized."});
});

export default paymentRouter;