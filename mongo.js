import mongoose from "app.js";
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


