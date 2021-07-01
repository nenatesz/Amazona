const bcrypt = require('bcryptjs'); 
const data = {
  users: [
    {
       name: 'Tessy',
       email: 'admin@example.com',
       password: bcrypt.hashSync('1234', 8),
       isAdmin: true,
    },
    {
       name: 'John',
       email: 'john@example.com',
       password: bcrypt.hashSync('1234', 8),
       isAdmin: false,
    },

  ],
    products: [
        {
          name: 'Ladies black bag',  
          price: 60,
          image: '../images/image1.jpg',
          brand: 'chanel',
          category: 'bag',
          countInStock: 0,
          rating: 4.5,
          numReviews: 10,
          

        },
        {
            name: 'pink hand bag',
            price: 50,
            image: '../images/image2.jpg',
            brand: 'chanel',
            category: 'bag',
            countInStock: 10,
            rating: 4.2,
            numReviews: 12,
           
  
          },
          {
            name: 'Ladies hand bag',
            price: 70,
            image: '../images/image3.jpg',
            brand: 'chanel',
            category: 'bag',
            countInStock: 6,
            rating: 4.8,
            numReviews: 14,
            
  
          } 
    ]
}

module.exports = data;
