const mongoose = require("mongoose")

const Connection = async() => {
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDb Connected")
    }
    catch(err){
        console.log(err);
        
    }
}
module.exports = Connection