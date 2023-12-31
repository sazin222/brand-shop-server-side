const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



const port= process.env.PORT || 5000 


// middleware 
app.use(cors());
app.use(express.json()) 
  


const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@cluster0.na448cw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    
    const userCollection = client.db('productDB').collection('product')
    const brandCollection= client.db('brandDB').collection('brand') 
    
    
    app.post('/products', async(req,res)=>{
      const product = req.body 
      console.log(product); 
      const result = await userCollection.insertOne(product)
      res.send(result)
   }) 

//    app.get('/product', async (req,res)=>{
//     const coursor= userCollection.find()
//     const product = await coursor.toArray() 
//     res.send(product)
//  })

 
 app.get('/products/:brand', async(req,res)=>{
  const brand = req.params.brand 
  const query ={ brandname: brand}
  const coursor= userCollection.find(query)
  const result = await coursor.toArray()
  res.send(result)
})
  
 app.get('/product/:id', async(req,res)=>{
  const id = req.params.id 
  console.log(id);
  const query ={ _id: new ObjectId(id) }
  const result = await userCollection.findOne(query)
  res.send(result)
})
  
 app.get('/productbrand/:id', async(req,res)=>{
  const id = req.params.id 
  console.log(id);
  const query ={ _id: new ObjectId(id) }
  const result = await userCollection.findOne(query)
  res.send(result)
})

 
 app.put('/product/:id', async(req,res)=>{
  const id = req.params.id
  console.log(id);
  const filter ={_id: new ObjectId(id) }
  const UpdateProduct= req.body
  const options = { upsert: true };
  const Product= {
    $set:{
      image: UpdateProduct.image,
      name : UpdateProduct.name ,
      brandname: UpdateProduct.brandname,
      type: UpdateProduct.type,
      price: UpdateProduct.price,
      description: UpdateProduct.description,
      rating : UpdateProduct.rating
    }
  }
  const result = await userCollection.updateOne(filter,Product,options) 
  res.send(result)
})



app.post('/brand', async(req,res)=>{
  const brand = req.body 
  console.log(brand); 
  const result = await brandCollection.insertOne(brand)
  res.send(result)
}) 


app.get('/brand', async(req,res)=>{
  const coursor= brandCollection.find()
  const result = await coursor.toArray()
  res.send(result)

}) 

app.delete('/brands/:id', async (req,res)=>{
const id = req.params.id
console.log({id});
const query ={_id: id}
const result = await brandCollection.deleteOne(query)
res.send(result)
}) 



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('Automotive website information ')
}) 



app.listen(port,()=>{
    console.log(`Automotive website information is running on port : ${port}`);
})