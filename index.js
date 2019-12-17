// Modules
const express = require('express')
const cors = require('cors')
const axios = require('axios')

// Repositories
const articles = require('./articles.js')

// Constantes
const PORT = process.env.PORT || 5000 // this is very important
const DB_ADDR = "https://nodevueproject-c032.restdb.io/rest"
const DB_KEY = "f357c01f6bcc8f8ff088604ca622201bb441b"
const DB_HEADERS = {
	headers: {
		"Content-Type": "application/json",
		"x-apikey": DB_KEY,
		"Cache-Control": "no-cache"
	}
}
const secret = '%s3cReT_eNc0d3r!'
/*const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret
}*/

// Config serveur
const app = express()
app.use(cors())

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})

// Routes
app.get('/', async function (req, res) {
  const users = await getUtilisateurs();
  res.json(users)
})


// Utilitaires
async function getUtilisateurs() {
	return await axios.get(DB_ADDR+'/utilisateurs', DB_HEADERS)
	.then(function (response) {
		return response.data
	})
	.catch(function (error) {
		console.error(error)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données."})
	})
}

async function getArticles() {
	return await axios.get(DB_ADDR+'/articles', DB_HEADERS)
	.then(function (response) {
		return response.data
	})
	.catch(function (error) {
		console.error(error)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données."})
	})
}


