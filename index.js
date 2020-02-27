// Modules
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const session = require('express-session')

// Repositories
const articlesRepository = require('./articles.js')

// Constantes
const PORT = process.env.PORT || 5000 // par défaut si non trouvé

const secret = '%s3cReT_eNc0d3r!'
/*const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret
}*/

// Config serveur
const app = express()
app.use(cors())

app.listen(PORT, function () {
	console.log('Server listening port ' + PORT)
})

// Routes
app.get('/', async function (req, res) {
	const users = await getUtilisateurs();
	res.json(users)
})

// Ajouter article
app.get('/article/add', async function (req, res) {
	// recuperer des params
	const titre= 'Mon article'
	const desc = 'Ma description'
	const date = '21-08-1996 16:35'

	const article = await articlesRepository.addArticle(titre,desc,date);
	res.json(article)
})

// Supprimer article
app.get('/article/remove/:id', async function (req, res) {
	const id = req.params.id
	const articles = await articlesRepository.removeArticle(id);
	res.json(articles)
})

// Modifier article
app.get('/article/edit/:id', async function (req, res) {
	const id = req.params.id
	const articles = await articlesRepository.editArticle(id);
	res.json(articles)
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
app.get('/new-account', async function (req, res) {
	res.json({error: "pas implementé."})
})

// Se connecter
app.get('/login', async function (req, res) {
	const users = await articlesRepository.getArticles();
	res.json(users)
})
