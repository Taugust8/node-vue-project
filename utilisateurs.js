// Connexion BD
const bd = require('./bd.js')
const axios = require('axios')

/**
 * Récupère la liste des utilisateurs.
 */
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

/**
 * Ajoute un utilisateurd.
 * @param titre Titre de l'article 
 * @param desc Description de l'article 
 * @param date Date de création de l'article 
 */
async function add(data) {
	const api = bd.address+'/utilisateurs'

	let headers = bd.headers
	headers.json = true

	data.mdp = crypteMdp(data.mdp)

	return await axios.post(api, data, headers)
	.then(function (response) {
		return response.data
	})
	.catch(function (err) {
		console.error(err)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données.",})
	})
}

function crypteMdp(mdp) {
	return ('mySalty'+mdp+'salt')
}

// Exports des fonctionnalités
module.exports = {
	crypteMdp: crypteMdp,
	addUtilisateur: add,
	getUtilisateurs: getUtilisateurs
}