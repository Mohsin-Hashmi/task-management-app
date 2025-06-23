
const mongoose= require('mongoose');
const dotenv= require('dotenv');
dotenv.config();

const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
    }catch(err){
        console.error(`Error connecting to the database: ${err.message}`); 
    }
}

module.exports= connectDB;