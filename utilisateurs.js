
const express 	= require('../calc/node_modules/express')
const session 	= require('../calc/node_modules/express-session')

const passport 	= require('passport')
const jwt 		= require('jsonwebtoken')

const LocalStrategy = require('passport-local').Strategy
const JwtStrategy 	= require('passport-jwt').Strategy
const ExtractJwt 	= require('passport-jwt').ExtractJwt

const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({
	extended: false
}) 

const app = express()
const router = express.Router()

/* UTILISATEURS */
const users = [
	{
		id : 0,
		name : 'John Doe',
		login : 'jdoe',
		password : '1234'
	},
	{
		id : 1,
		name : 'Karl Marx',
		login : 'kmarx',
		password : '1234'
	},
	{
		id : 2,
		name : 'General Kenobi',
		login : 'gk',
		password : '1234'
	}
]

//Middleware
router.use('/login', function(req, res, next) {
	console.log(req.body)
	res.status(401).send('Erreur de connexion');
	next()
})

// Serveur
app.listen(3000, function(callback=null) {
  console.log('Auth app listening on port 3000!')
})

passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'mysecrethasher'
    },
    function (jwtPayload, callback) {
    	console.log('jwtPayload')
    	console.log(jwtPayload)
        return callback(null,jwtPayload)
    }
))

/* Routes */
app.post('/', passport.authenticate('jwt', { session: false}),
(req, res) => {
	res.send(`Hello there ${req.user.name}`)
})

app.post('/login', urlEncodedParser, function(req,res){
	// Recuperation donnees
	const un = req.body.username
	const pw = req.body.password

	const user = users.find(user => (user.login == un &&
									 user.password == pw))

	// Verif si dans tableau
	if (typeof user === "undefined") {
		res.status(401).send('Erreur de connexion')
	} else {
		const tkn= jwt.sign({
			exp: Math.floor(Date.now()/1000)+3600,
			id: user.id,
			name: user.name
		}, 'mysecrethasher');
		res.json({'user': tkn})
	}
})
