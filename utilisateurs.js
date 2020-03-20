// Connexion BD
const bd = require('./bd.js')
const axios = require('axios')
const bcrypt = require('bcrypt')

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
 * Ajoute un utilisateur.
 * @param titre :Titre de l'article 
 * @param desc : Description de l'article 
 * @param date : Date de création de l'article 
 */
async function add(data) {
	const api = bd.address+'/utilisateurs'

	let headers = bd.headers
	headers.json = true

	data.mdp = await crypteMdp(data.mdp)

	return await axios.post(api, data, headers)
	.then(function (response) {
		return response.data
	})
	.catch(function (err) {
		console.error(err)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données.",})
	})
}

/**
 * Crypte un mot de passe avec bcrypt.
 * @param mdp : Le mot de passe à crypter
 * @return Le mot de passe crypté
 */
async function crypteMdp(mdp) {
	return await bcrypt.hash(mdp, 5)
	.then(function (hash) {
		return hash
	})
	.catch(function (err) {
		console.error(err)
	})
}

/**
 * Compare un mot de passe avec un mot de passe crypté
 * @param mdp : Le mot de passe à vérifier
 * @param mdpCrypt : Le mot de passe crypté
 * @return Vrai si c'est le même mot de passe, sinon faux
 */
async function compareMdp(mdp, mdpCrypt) {
	return await bcrypt.compare(mdp, mdpCrypt)
	.then(function (res) {
		return res
	})
	.catch(function (err) {
		console.error(err)
		return false
	})
}

// Exports des fonctionnalités
module.exports = {
	crypteMdp: crypteMdp,
	compareMdp: compareMdp,
	addUtilisateur: add,
	getUtilisateurs: getUtilisateurs
}