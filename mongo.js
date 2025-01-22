// mongo db 
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://chiranjeevmishra4:1234@cluster0.y12b5.mongodb.net/react-login-tut?retryWrites=true&w=majority")

.then(() => {
    console.log('MongoDB connected');
  })
.catch((err) => {
    console.error('MongoDB connection failed:', err);
  });
const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
}
)
const collection = mongoose.model('collection',newSchema)
module.exports.collection = collection

const linkSchema = new mongoose.Schema({
  user: {
    type: String,
    required:true
  },
  linkname:{
    type:String,
    required: true,
  },
  link:{
    type:String,
    required:true
  }
})


const hyperlinks = mongoose.model('hyperlinks',linkSchema)
module.exports.hyperlinks = hyperlinks


