
const express =require('express');
const router=express.Router();
// const path = require('path');
// const Razorpay = require('razorpay');
// const shortid = require('shortid');
const users= require('../modules/laundrySchema');



// router.get("/"||(req||res)=>{
//     console.log("connect");
// })

// const razorpay = new Razorpay({
// 	key_id: 'rzp_test_Pu22U0p6ZcdFdE',
// 	key_secret: 'A81W6NHgswJe3PzD8GPj8S9A'
// })

// router.get('./icon.svg',(req,res)=>{
//     res.sendFile(path.join(__dirname,'icon.svg'))
// });

// router.post('/verification', (req, res) => {
	
// 	const secret = 'laundrycleaner'

// 	console.log(req.body)

// 	const crypto = require('crypto')

// 	const shasum = crypto.createHmac('sha256', secret)
// 	shasum.update(JSON.stringify(req.body))
// 	const digest = shasum.digest('hex')

// 	console.log(digest, req.headers['x-razorpay-signature'])

// 	if (digest === req.headers['x-razorpay-signature']) {
// 		console.log('request is legit')
// 		// process it
// 		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
// 	} else {
// 		// pass it
// 	}
// 	res.json({ status: 'ok' })
// });
// router.post('/createOrder', (req, res)=>{ 
  
//     // STEP 1:
//     const {amount,currency,receipt, notes}  = req.body;      
          
//     // STEP 2:  
      
//     razorpay.orders.create({amount, currency, receipt, notes}, 
//         (err, order)=>{
          
//           //STEP 3 & 4: 
//           if(!err)
//             res.json(order)
//           else
//             res.send(err);
//         }
//     )
// });


// router.post('/razorpay',  async(req, res) => {
// 	const payment_capture = 1
// 	const amount = req.body.amount
// 	const currency = 'INR'

// 	const options = {
// 		// amount: amount * 100,
// 		currency,
// 		receipt: shortid.generate(),
// 		payment_capture
// 	}

// 	try {
// 		const response = await razorpay.orders.create(options)
// 		console.log(response)
// 		res.json({
// 			id: response.id,
// 			currency: response.currency,
// 			amount: response.amount
// 		})
// 	} catch (error) {
// 		console.log(error)
// 	}
// });




//to get all users

router.post('/userdetails',async(req,res)=>{
    // console.log(req.body);
    const {fname, email, preferences,discount,address,phone,sms,price,nopackageselected} = req.body;

    if(!fname|| !email|| !preferences||!discount||!address||!phone||!sms||!price||!nopackageselected){
        res.status(422).json("plz fill the data");

    }

    try {

        let preuser= await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this is user is already present");
        }else{
            const adduser=new users({
                fname, email, preferences,discount,address,phone,sms,price,nopackageselected
            });
            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
        
    } catch (error) {
        res.status(422).json(error);
        
    }
    
});

// get userdata

router.get("/getdatabyuser",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata);
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
});
// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})

// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
});
// delete user
router.delete("/deleteusers/:id",async (req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
});

// get customer by Name for earch by Name 
// router.use('/',(req,res,next)=>{
//     const filters=req.query;
//     const filteruser=users.filter(user=>{
//         let isValid=true;
//         for(key in filters){
//             console.log(key,user[key],filters[key]);
//             isValid=isValid && user[key]==filters[key];

//         }
//         return isValid;
//     });
//     res.send(filteruser);
// })


module.exports=router;