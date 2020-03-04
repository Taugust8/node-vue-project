// Connexion BD
const bd = require('./bd.js')
const app = express()


async function getUtilisateurs() {
	return await axios.get(bd.address+'/utilisateurs', bd.headers)
	.then(function (response) {
		return response.data
	})
	.catch(function (error) {
		console.error(error)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données."})
	})
}

//Middleware
const router = express.Router()
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
