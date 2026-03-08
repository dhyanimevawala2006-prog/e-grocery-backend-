const express = require('express')
const app = express()
const port = 3000
const cors=require('cors');
const productRoute=require('./routes/productroute')
const userRoute=require('./routes/userroute')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/upload',express.static('upload'));

app.use('/api',productRoute)
app.use('/api',userRoute)
app.use('/api',require('./routes/cartRoute'))
app.use('/api/order',require('./routes/orderRoute'))

const mongoose=require('mongoose');


mongoose
    .connect("mongodb://localhost:27017/grocery_db")
    .then(()=>{
        console.log("db connected");
    })

    .catch((err)=>{
        console.log("err");
    });
    
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))