const mongoose = require("mongoose");

const URI ='mongodb+srv://locahost:shah11066@nodeapi-okjyv.mongodb.net/localhost?retryWrites=true&w=majority';

//db
mongoose.Promise = global.Promise;

const connectDB = async () => {
  await mongoose
    .connect(URI, {
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("DB Connected!"))
    .catch(err => {
      console.log(`DB Connection Error: ${err.message}`);
    });
};
module.exports = connectDB;