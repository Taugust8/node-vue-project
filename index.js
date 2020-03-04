// Modules
const express    = require('express')
const cors       = require('cors')
const axios      = require('axios')
const session    = require('express-session')
const bodyParser = require('body-parser')

// Auth
const passport = require('passport')
const jwt      = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy 	= require('passport-jwt').Strategy
const ExtractJwt 	= require('passport-jwt').ExtractJwt

// Repositories
const articlesRepository = require('./articles.js')
const utilisateursRepository = require('./utilisateurs.js')

// Constantes
const PORT = process.env.PORT || 5000 // par défaut si non trouvé

const secret = '%s3cReT_eNc0d3r!'

/* UTILISATEURS */
const users = await utilisateursRepository.getUtilisateurs();

/*const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret
}*/

// Config serveur
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.listen(PORT, function () {
	console.log('Server listening port ' + PORT)
})

// Routes
app.get('/', async function (req, res) {
	const users = await getUtilisateurs();
	res.json(users)
})

// Ajouter article
app.post('/article/add', async function (req, res) {
	const data = req.body	

	const nouvelArticle = await articlesRepository.addArticle(data);
	res.json(nouvelArticle)
})

// Supprimer article
app.get('/article/remove/:id', async function (req, res) {
	const id = req.params.id

	const articles = await articlesRepository.removeArticle(id);
	res.json(articles)
})

// Modifier article
app.post('/article/edit/:id', async function (req, res) {
	// Récuperation des paramètres
	const id = req.params.id
	const data = req.body

	const editedArticle = await articlesRepository.editArticle(id, data);
	
	res.json(editedArticle)
})

// Un article
app.get('/article/:id', async function (req, res) {
	const id = req.params.id
	const articles = await articlesRepository.getArticle(id);
	res.json(articles)
})

// Tous les articles
app.get('/articles', async function (req, res) {
	const articles = await articlesRepository.getArticles();
	res.json(articles)
})

// Creer compte
app.post('/new-account', async function (req, res) {
	res.json({error: "pas implementé."})
})

// Se connecter
app.post('/login', async function (req, res) {
	const users = await articlesRepository.getArticles();
	res.json(users)
})
