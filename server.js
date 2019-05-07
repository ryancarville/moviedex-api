require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const MOVIES = require('./movieData.json');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

console.log(process.env.API_TOKEN);
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use(function validationBearerToken(req, res, next) {
	const apiToken = process.env.API_TOKEN;
	const authToken = req.get('Authorization');
	if (!authToken || authToken.split(' ')[1] !== apiToken) {
		return res.status(401).send({ error: 'Unauthorized access' });
	}
	next();
});

app.get('/movie', function handleGetMovies(req, res) {
	let response = MOVIES;
	const genre = req.query.genre;
	const country = req.query.country;
	const avg_vote = req.query.avg_vote;
	console.log(avg_vote);
	if (genre) {
		response = response.filter(movie =>
			movie.genre
				.toLowerCase()
				.replace('//g,')
				.includes(genre.toLowerCase().replace('//g,'))
		);
	}
	if (country) {
		response = response.filter(movie =>
			movie.country.toLowerCase().includes(country.toLowerCase())
		);
	}
	if (avg_vote) {
		response = response.filter(
			movie => Number(movie.avg_vote) >= Number(avg_vote)
		);
	}
	res.json(response);
});

const PORT = 8000;

app.listen(PORT, () => {
	console.log(`Listening to Port ${PORT}`);
});
