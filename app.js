const express = require('express')
const database = require('./mongo')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({extended:true}))

const corsOptions = {
    origin:'*',
    methods:['GET','POST'],
    credentials:true

}

app.use(cors(corsOptions))
app.use(express.json())
database.connectDB()



const collection = database.collection
const hyperlinks = database.hyperlinks

app.get("/",cors(),(req,res)=>{
    res.send("Hello")
})

app.post('/',async(req,res)=>{
    const email = req.body.email
    const pass = req.body.password
    console.log(req.body)

    try{
        const check = await collection.findOne({email:email});
        console.log(email)
        if (check){
            console.log('this');
            res.json("exist");
        }
        else{
            res.json("not exist");
        }

    }
    catch(e){
        console.log(e);
        res.json("not exist")

    }
})




app.post('/signup',async(req,res)=>{
    // const [email,password] = req.body
    const email = req.body.email
    const pass = req.body.password
    console.log(req.body)

    const data = {
        email:email,
        password:pass
    }


    try{
        const check = await collection.findOne({email:email});
        
        if (check){
            res.json("exist");
        }
        else{
            res.json("not exist");
            await collection.insertMany([data])
        }

    }
    catch(e){
        console.log(e);
        res.json("not exist")

    }
})



app.post(`/home`,async(req,res) =>{
    // console.log(req.body)
    const linkname = req.body.linkname
    const hyperlink = req.body.link
    const user = req.body.user
    console.log(user)
    const data = {
        linkname : linkname,
        link : hyperlink,
        user : user
    }

    try{
        const check = await hyperlinks.find({user:user}).findOne({linkname:linkname});
        
        if (check){
            res.json("linkName already exist");
        }
        else{
            res.json("not exist");
            await hyperlinks.insertMany([data])
        }

    }
    catch(e){
        console.log(e);
        res.json("not exist")

    }
})


app.get('/home/:userEmail', async (req, res) => {
    try {
      const user = req.params.userEmail;
    //   console.log(user)
      const links = await hyperlinks.find({user:user})
    //   console.log(links);


      // Send transformed data to frontend
      console.log(typeof(JSON.stringify(links)))
      res.json(links);



    } catch (error) {
      console.error('Error fetching hyperlinks:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });



const PORT = 8000 || process.env.PORT

app.listen(PORT,() =>{
    console.log(`port connected at ${PORT}`);
})


