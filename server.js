const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(morgan('dev'));

app.use((req, res) => {
	res.send('Hello, world');
});

const PORT = 8000;

app.listen(PORT, () => {
	console.log(`Listening to Port ${PORT}`);
});
