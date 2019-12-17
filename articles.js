// Connexion BD
const bd = require('./bd.js')

// Requetes
const axios = require('axios')

/**
 * Va chercher un article particulier.
 * @param id Identifiant de l'article à récupérer 
 */
async function getArticle(id) {
	return id
}

/**
 * Va chercher les articles.
 */
async function getArticles() {
	return await axios.get(bd.address+'/articles', bd.headers)
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
 * @param titre Titre de l'article 
 * @param desc Description de l'article 
 * @param date Date de création de l'article 
 */
async function add(titre,desc,date) {
	return {
		'id' : 0,
		'titre' : titre,
		'description' : description,
		'date' : date
	}
}

/**
 * Supprime un article.
 * @param id Identifiant de l'article à supprimer 
 */
async function remove(id) {
	return id
}

/**
 * Modifie un article.
 * @param id Identifiant de l'article à modifier 
 */
async function edit(id) {
	return id
}


// Exports des fonctionnalités
module.exports = {
	getArticle: getArticle,
	getArticles: getArticles,
	addArticle: add,
	editArticle: edit,
	removeArticle: remove
}