const moongose= require('mongoose');

const connection_url= 'mongodb+srv://shiwani:Y4d7pT1YcMXX4OI3@cluster0.8nyua.mongodb.net/laundry?retryWrites=true&w=majority';


moongose.connect(connection_url,{
    useNewUrlParser: true, 
    
    useUnifiedTopology: true 
        
    }, err => {
    if(err) throw err;
      console.log('Connected to MongoDB!!!')
})