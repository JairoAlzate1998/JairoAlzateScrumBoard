const mongoose = require("mongoose");

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection to DB succesfull");
    }catch(e){
        console.log("Connection to DB failed", e);
        throw new Error("Connection to DB failed");
    }
}

module.exports = { dbConnection };