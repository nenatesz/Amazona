import express from 'express';
import Order from '../models/orderModel';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../util';


const orderRouter = express.Router();

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.send(orders);
}))

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({message: 'Cart is empty'})
    }else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.itemsPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id, 
        })
        const createdOrder = await order.save()
        res.status(201).send({message: 'New Order Created', order: createdOrder})
    }
}
));

orderRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message: 'Order Not Found'})
    }
}))

orderRouter.put('/:id/pay', isAuth,expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email: req.body.email
        };
    const updatedOrder = await order.save();
    res.send({message: 'order Paid', order: updatedOrder})
    } else{
       res.status(404).send({message: 'Order Not found'}) 
    }
}
));


export default orderRouter;