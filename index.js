// Modules
const express = require('express')
const cors = require('cors')
const axios = require('axios')

// Constantes
const articles = require('./articles.js')
const PORT = process.env.PORT || 5000 // this is very important
const DB_ADDR= "https://exerciceheroku-44f5.restdb.io/rest"
const DB_KEY = "af9663389cc62ce8b90c780b7bcc83c0679cc"
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
app.get('/', function (req, res) {
  res.json({msg: 'tp node vue'})
})


// Utilitaires
async function getAllUsers() {
	return await axios.get(DB_ADDR+'/utilisateurs', DB_HEADERS)
	.then(function (response) {
		return response.data
	})
	.catch(function (error) {
		console.error(error)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données."})
	})
}