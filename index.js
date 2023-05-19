const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DATA_USER}:${process.env.DATA_PASS}@cluster0.guqonkt.mongodb.net/?retryWrites=true&w=majority`;

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
        await client.connect();

        const robotCollection = client.db('kidsRobot').collection('robotProducts')

        //data read rout
        app.get('/robotProducts', async(req, res) => {
            const cursor = robotCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        // one items read
        app.get('/robotProducts/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await robotCollection.findOne(query);
            res.send(result)
        })

        /* new item add rout  */
        app.post('/robotProducts', async(req, res) => {
            const newRobot = req.body;
            console.log('new robot router',newRobot);
            const result = await robotCollection.insertOne(newRobot);
            res.send(result)
        })
  
       

        //unique 

        //simple
        app.get('/carRobot', async(req, res) => {
            console.log(req.query);
            const query = {category_name:'Car Robot'}
            const cursor = robotCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })

        // one items delete read 
        app.delete('/robotProducts/:id', async(req, res ) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await robotCollection.deleteOne(query);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Kids Omega Robot Server You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('This is Omega Robot Server site..')
})

//server site listen by cmd console
app.listen(port, () => {
    console.log(`kids Robot server site Port: ${port}`);
})