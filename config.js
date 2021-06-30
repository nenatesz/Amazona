'use strict';

const dotenv = require('dotenv');


// const  {
//     MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/amazona",
//     JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
//     PORT: process.env.PORT || 5000,
//     PAYSTACK_PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_a0ed13f5ddbe5075fc118b2b22f59ac966ae1021',
//     PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'AZuK72N0vg6u7WuzxiPJdkJhPtM26qDAYqXxpC2y7w3jrZTgQ-_iAuxN1ih8wvhNqPgWOPC_YXQYyPcb',
    
// };

dotenv.config()
const {
    MONGODB_URL,
    JWT_SECRET,
    PORT,
    PAYSTACK_PUBLIC_KEY,
    PAYPAL_CLIENT_ID
} = process.env


module.exports = {
    MONGODB_URL: MONGODB_URL,
    JWT_SECRET: JWT_SECRET,
    PORT: PORT,
    PAYSTACK_PUBLIC_KEY: PAYSTACK_PUBLIC_KEY,
    PAYPAL_CLIENT_ID: PAYPAL_CLIENT_ID
}