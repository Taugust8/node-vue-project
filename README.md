# API blog d'articles

## Installation / Déploiement
L'application se déploie automatiquement sur Heroku à l'adresse suivante :
https://projet-nodejs-theo-mathis.herokuapp.com/

Si vous souhaitez utiliser cette application comme squelette pour votre développement vous pouvez effectuer les commandes suivantes :
> Prérequis : NodeJS -v 8.0.0 minimum
 - `git clone https://github.com/Taugust8/node-vue-project.git`
 - `cd node-vue-project`
 - `npm install`
 - `node index.js`
 
 Et voilà ! Munissez-vous de PostMan ou tout autre logiciel vous permettant de tester votre API et vous pouvez commencer de coder.

## Utilisation
Vous disposez des routes suivantes pour exploiter l'api :
- **[GET]** /articles
- **[GET]** /article/{id}
- **[POST]** /article/add
- **[GET]** /article/remove/{id}
- **[POST]** /article/edit/{id}
- **[POST]** /new-account
- **[POST]** /login
