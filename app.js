const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public'));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index,html');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});