// Connexion BD
const bd = require('./bd.js')

// Requetes DB doc
//https://restdb.io/docs/rest-api#restdb

// Listes des requetes sous API Docs
//https://nodevueproject-c032.restdb.io/home/db/nodevueproject-c032/cards/5df8e275688c775700005abf?devmode=true

// Requetes
const axios = require('axios')

/**
 * Va chercher un article particulier.
 * @param id Identifiant de l'article à récupérer 
 */
async function getArticle(id) {
	const api = bd.address+'/articles/'+id

	return await axios.get(api, bd.headers)
	.then(function (response) {
		return response.data
	})
	.catch(function (error) {
		console.error(error)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données."})
	})
}

/**
 * Va chercher les articles.
 */
async function getArticles() {
	const api = bd.address+'/articles'

	return await axios.get(api, bd.headers)
	.then(function (response) {
		return response.data
	})
	.catch(function (error) {
		console.error(error)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données."})
	})
}

/**
 * Ajoute un article.
 * @param data Les données de l'article (titre, description, date)
 */
async function add(data) {
	const api = bd.address+'/articles'

	let headers = bd.headers
	headers.json = true

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
 * Supprime un article.
 * @param id Identifiant de l'article à supprimer 
 */
async function remove(id) {
	const api = bd.address+'/articles/'+id

	return await axios.delete(api, bd.headers)
	.then(function (response) {
		return response.data
	})
	.catch(function (err) {
		console.error(err)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données.",})
	})
	
}

/**
 * Modifie un article.
 * @param id Identifiant de l'article à modifier 
 * @param newData Objet contenant les nouvelles valeurs
 */
async function edit(id, newData) {
	const api = bd.address+'/articles/'+id

	let headers = bd.headers
	headers.json = true

	return await axios.put(api, newData, headers)
	.then(function (response) {
		return response.data
	})
	.catch(function (err) {
		console.error(err)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données.",})
	})
}

// Exports des fonctionnalités
module.exports = {
	getArticle: getArticle,
	getArticles: getArticles,
	addArticle: add,
	editArticle: edit,
	removeArticle: remove
}