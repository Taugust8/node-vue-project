// Modules
const express    = require('express')
const cors       = require('cors')
const axios      = require('axios')
const session    = require('express-session')
const bodyParser = require('body-parser')

// Authentification
const passport   = require('passport')
const jwt        = require('jsonwebtoken')
const JwtStrat   = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Repositories
const articlesRepository = require('./articles.js')
const utilisateursRepository = require('./utilisateurs.js')

// Constantes
const PORT = process.env.PORT || 5000 // Port Heroku || Local

// Secret d'encodage
const secret = '%s3cReT_eNc0d3r!'

// Strategies Json WEB Token (Vérification d'accès aux pages)
const jwtStrategy = new JwtStrat({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: secret
	},
	async function(payload, callback) {

		const users = await utilisateursRepository.getUtilisateurs()
console.log(users)
		const user = users.find(user => user.email === payload.email)
console.log(payload)

		if (user) {
			callback(null, user) //return
		} else {
			callback(null, false)
		}
	}
)
passport.use(jwtStrategy)

// Config serveur
const app = express()

// Handle CORS
app.use(cors())

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// Parse application/json
app.use(bodyParser.json())

// Server starts
app.listen(PORT, function () {
	console.log('Server listening port ' + PORT)
})

//var urlEncodedParser = bodyParser.urlencoded({ extended: false })

/*
//Middleware (inutile)
const router = express.Router()
router.use('/login', function(req, res, next) {
	console.log(req.body)
	res.status(401).send('Erreur de connexion')
	next()
})
*/



// ROUTES //

// Afficher tous les articles
app.get('/articles', async function (req, res) {
	const articles = await articlesRepository.getArticles()
	res.json(articles)
})

// Afficher un article
app.get('/article/:id', async function (req, res) {
	const id = req.params.id
	const articles = await articlesRepository.getArticle(id)
	res.json(articles)
})

// Ajouter article (jwt)
app.post('/article/add', passport.authenticate('jwt', { session: false}), async function (req, res) {
	const data = req.body	

	const nouvelArticle = await articlesRepository.addArticle(data)
	res.json(nouvelArticle)
})

// Supprimer article (jwt)
app.get('/article/remove/:id', passport.authenticate('jwt', { session: false}), async function (req, res) {
	const id = req.params.id

	const articles = await articlesRepository.removeArticle(id)
	res.json(articles)
})

// Modifier article (jwt)
app.post('/article/edit/:id', passport.authenticate('jwt', { session: false}), async function (req, res) {
	// Récuperation des paramètres
	const id = req.params.id
	const data = req.body

	const editedArticle = await articlesRepository.editArticle(id, data)
	
	res.json(editedArticle)
})

// Créer compte
app.post('/new-account', async function (req, res) {
	const data = req.body	

	const newUser = await utilisateursRepository.addUtilisateur(data)
	res.json(newUser)
})

// Se connecter
app.post('/login', async function (req, res) {
	const email = req.body.email
	let mdp = req.body.mdp

	if (!email) {
		res.status(401).json({ error: 'Veuillez renseigner l\'email de connection.' })
		return
	}

	if (!mdp || mdp.length < 5) {
		res.status(401).json({ error: 'Veuillez renseigner un mot de passe de minimum 5 caractères.' })
		return
	}
	mdp = utilisateursRepository.crypteMdp(mdp)

	const users = await utilisateursRepository.getUtilisateurs()
	const user = users.find(user => user.email === email)

	if (!user) {
		res.status(401).json({ error: 'Compte inconnu. Voulez-vous créer un compte ?' })
		return
	}

	if (mdp !== user.mdp) {
		res.status(401).json({ error: 'Mot de passe incorrect.' })
		return
	}

	const tkn = jwt.sign({
			exp: Math.floor(Date.now()/1000)+3600, // Expiration du token dans 1h
			id: user.id,
			email: user.email,
			nom: user.nom,
			prenom: user.prenom
		}, secret);

	res.json({'jwt': tkn })
})