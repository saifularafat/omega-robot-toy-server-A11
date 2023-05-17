const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())


app.get('/', (req,  res) => {
    res.send('This is Omega Robot Server site..')
})

//server site listen by cmd console
app.listen(port, () => {
    console.log(`kids Robot server site Port: ${port}`);
})