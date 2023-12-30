import mongoose from "mongoose";

const connectDB = async ( ) =>{
    try{
        const mongoURI = 'mongodb+srv://A_S_B:Bharath601@museumcluster2.giwmk6j.mongodb.net/Sample_database';
        await mongoose.connect(mongoURI);
        console.log('Mongo connected ...');
    }
    catch(err){
        console.error('MongoDB connection error : ',err.message);
        process.exit(1);

    }
};
export default connectDB;