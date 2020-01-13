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
	return await axios.get(bd.address+'/articles/'+id, bd.headers)
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
	/*return {
		'id' : 0,
		'titre' : titre,
		'description' : description,
		'date' : date
	}*/

	let hdrs = bd.headers
	hdrs.body = { titre: 'Mon article', description: 'Ma description', date: '21-08-1996 16:35' }
	hdrs.json = true

	return await axios.post(bd.address+'/articles', hdrs)
	.then(function (response) {
		return response.data
	})
	.catch(function (error) {
		console.error(error)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données."})
	})
	/*axios.post(
        URL,
        {headers: {
          Authorization: authorizationToken
        },
        data:{
          source:source
        }}
      );*/
}

/**
 * Supprime un article.
 * @param id Identifiant de l'article à supprimer 
 */
async function remove(id) {
	return id/*
	axios.delete(
        URL,
        {headers: {
          Authorization: authorizationToken
        },
        data:{
          source:source
        }}
      );*/
}

/**
 * Modifie un article.
 * @param id Identifiant de l'article à modifier 
 */
async function edit(id) {
	return id/*
	axios.put( //ou patch
        URL,
        {headers: {
          Authorization: authorizationToken
        },
        data:{
          source:source
        }}
      );*/
}


// Exports des fonctionnalités
module.exports = {
	getArticle: getArticle,
	getArticles: getArticles,
	addArticle: add,
	editArticle: edit,
	removeArticle: remove
}