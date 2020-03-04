const DB_ADDR = "https://nodevueproject-c032.restdb.io/rest"
const DB_KEY = "f357c01f6bcc8f8ff088604ca622201bb441b"
//"5e5fbe2509c313436a69ff59"
const DB_HEADERS = {
	headers: {
		"Content-Type": "application/json",
		"x-apikey": DB_KEY,
		"Cache-Control": "no-cache"
	}
}

module.exports = {
	address: DB_ADDR,
	key: DB_KEY,
	headers: DB_HEADERS
}