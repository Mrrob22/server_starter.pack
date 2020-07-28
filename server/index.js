const express = require('express');
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://Mrrob:Misha1234321@cluster0.muqng.mongodb.net/test_server?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
});

app.use(cors());

app.use('/', graphqlHTTP({
    schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, error => {
    error ? console.log(error): console.log(`server started on port ${PORT}`)
});
