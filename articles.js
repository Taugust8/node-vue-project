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
	/*return { // forme d un article
		'id' : 0,
		'titre' : titre,
		'description' : description,
		'date' : date
	}*/

	let headers = bd.headers
	headers.body = { /*id: '0', */titre: 'Mon article', description: 'Ma description', date: '2017-10-09T22:00:00.000Z' }
	headers.json = true

	return await axios.post(bd.address+'/articles', headers)
	.then(function (response) {
		return response.data
	})
	.catch(function (error) {
		console.error(error)
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données."})
	})

	/*
	axios.post(
		URL,
        {headers: {
          Authorization: authorizationToken
        },
        data:{
          source:source
        }}
    );
    */
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
	let headers = bd.headers
	headers.body = { titre: 'Mon article', description: 'Ma description', date: '2017-10-09T22:00:00.000Z' }
	headers.json = true

	headers = {
		headers: {
			'cache-control': 'no-cache',
	        'x-apikey': 'f357c01f6bcc8f8ff088604ca622201bb441b',
	        'content-type': 'application/json' },
	    body: { titre: 'Mon article', description: 'Ma description', date: '2017-10-09T22:00:00.000Z' },
		json: true
	}

	const api = bd.address+'/articles/'+id

	console.log(api)
	console.log(headers)

	return await axios.put(api, headers)
	.then(function (response) {
		return response.data
	})
	.catch(function (error) {
		console.log("=============")
		console.error(error)
		console.log("=============")
		return ({error: "Une erreur c'est produite lors de la connexion à la base de données."})
	})

	/*
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