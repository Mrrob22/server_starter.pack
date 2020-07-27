const express = require('express');
const PORT = 3000;
const app = express();

app.listen(PORT, error => {
    error ? console.log(error): console.log(`server started on port ${PORT}`)
})