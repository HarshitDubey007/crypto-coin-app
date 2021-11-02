const express = require('express');
const app = express();
const env = require('dotenv');
const cors = require('cors');
// const fileupload = require("express-fileupload");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

// routes
const userRoutes = require('./routers/auth');

// invoirment variable
env.config();
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fqkuj.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => { console.log('Database Connected') })


app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use('/api', userRoutes);



app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})
