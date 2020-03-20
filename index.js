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

// Strategies json WEB Token (Vérification d'accès aux pages)
const jwtStrategy = new JwtStrat({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: secret
	},
	async function(payload, callback) {

		const users = await utilisateursRepository.getUtilisateurs()
		const user = users.find(user => user.email === payload.email)

		if (user) {
			callback(null, user)
		} else {
			callback(null, false)
		}
	}
)
passport.use(jwtStrategy)

// Config serveur
const app = express()

// Gestion des CORS
app.use(cors())

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))

// Parse application/json
app.use(bodyParser.json())

// Démarrage du serveur
app.listen(PORT, function () {
	console.log('Server listening port ' + PORT)
})


// ROUTES //

// Afficher tous les articles
app.get('/articles', async function (req, res) {
	const articles = await articlesRepository.getArticles()
	res.json(articles)
})

// Afficher un article
app.get('/article/:id', async function (req, res) {
	const id = req.params.id
	const article = await articlesRepository.getArticle(id)
	res.json(article)
})

// Ajouter article (jwt)
app.post('/article/add', passport.authenticate('jwt', { session: false}), async function (req, res) {
	const data = req.body	

	// Défini l'utilisateur connecté comme auteur de l'article
	const userid = req.user.id
	data.id_auteur = userid

	const nouvelArticle = await articlesRepository.addArticle(data)
	res.json(nouvelArticle)
})

// Supprimer article (jwt)
app.get('/article/remove/:id', passport.authenticate('jwt', { session: false}), async function (req, res) {
	const id = req.params.id

	// Vérification que la modification soit faite par l'auteur
	const userid = req.user.id

	if (await isAuteurArticle(userid, id)) {
		const article = await articlesRepository.removeArticle(id)
		res.json(article)
	} else {
		res.json({ error: 'Vous n\'êtes pas l\'auteur de cet article.' })
	}
})

// Modifier article (jwt)
app.post('/article/edit/:id', passport.authenticate('jwt', { session: false}), async function (req, res) {
	// Récuperation des paramètres
	const id = req.params.id
	let body = req.body

	// Vérification que la modification soit faite par l'auteur
	const userid = req.user.id

	if (await isAuteurArticle(userid, id)) {
		body.id_auteur = userid
		const editedArticle = await articlesRepository.editArticle(id, body)
		res.json(editedArticle)
	} else {
		res.json({ error: 'Vous n\'êtes pas l\'auteur de cet article.' })
	}

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

	const users = await utilisateursRepository.getUtilisateurs()
	const user = users.find(user => user.email === email)

	if (!user) {
		res.status(401).json({ error: 'Compte inconnu. Voulez-vous créer un compte ?' })
		return
	}

	if (!await utilisateursRepository.compareMdp(mdp, user.mdp)) {
		res.status(401).json({ error: 'Mot de passe incorrect.' })
		return
	}

	const tkn = jwt.sign({
			exp: Math.floor(Date.now()/1000)+3600, // Expiration du token dans 1h
			id: user.id,
			email: user.email,
			nom: user.nom,
			prenom: user.prenom
		}, secret)

	res.json({'jwt': tkn })
})

/**
 * Contrôle qu'un utilisateur soit l'auteur d'un article
 * @param idUtilisateur : Identifiant unique de l'utilisateur (id)
 * @param idArticle : Identifiant unique de l'article (_id)
 * @return Vrai si l'utilisateur est bien l'auteur, faux sinon
 */
async function isAuteurArticle(idUtilisateur, idArticle) {
	const article = await articlesRepository.getArticle(idArticle)

	if (article.id_auteur == idUtilisateur)
		return true
	else
		return false
}