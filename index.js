
const express=require('express');
const moongose= require('mongoose');
const LaundryModel=require('./modules/laundrySchema');
require('./db/conn');
const router=require('./routes/router');
const users=require('./modules/laundrySchema');
const cors=require('cors');


const app=express();
//Y4d7pT1YcMXX4OI3, 27.57.250.70

app.use(cors());

app.use(express.json());

app.use(router);




app.listen(3007,()=>{
    console.log(`server is running on 3007`);
})

