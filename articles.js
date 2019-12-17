function getArticle(id) {
	return id
}
function getArticles() {
	return 0
}
function add(titre,description,date) {
	return {
		'id' : 0,
		'titre' : titre,
		'description' : description,
		'date' : date
	}
}
function remove(id) {
	return id
}
function edit(id) {
	return id
}

module.exports = {
	getArticle: getArticle,
	getArticles: getArticles,
	addArticle: add,
	editArticle: edit,
	removeArticle: remove
}