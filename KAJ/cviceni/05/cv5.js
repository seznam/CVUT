//
// Render character names into the list
//
function renderUsers(data) {
	const targetEl = document.querySelector("#users");

	for (const item of data) {
		const li = document.createElement("li");
		li.textContent = item.name;
		targetEl.append(li);
	}
}

//
// 1. Request with classic XMLHttpRequest
//
const request = new XMLHttpRequest();
// request.responseType = "json";  // if "responseType" would be set, we would get parsed JSON data in "response"
request.addEventListener("load", e => {
	const data = e.target.responseText;
	const dataJson = JSON.parse(data);  // parse users data from JSON into JavaScript array
	// const dataJson = e.target.response;  // if "responseType" was set, we could use this
	renderUsers(dataJson);  // Render character names into the list
});
request.addEventListener("error", e => console.log(e));
request.open("GET", "https://jsonplaceholder.typicode.com/users");
request.send();

//
// 2. Request with our own promisified wrapper around XMLHttpRequest
//
function myRequest (url) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.addEventListener("load", e => {
			resolve(e);
		});
		request.addEventListener("error", e => {
			reject(e);
		});
		request.open("GET", url);
		request.send();
	});
}

//
// Switch from XMLHttpRequest to your "myRequest"
//
// myRequest("https://jsonplaceholder.typicode.com/users")
//	 .then(e => {
//		 const data = e.target.responseText;
//		 const dataJson = JSON.parse(data);
//		 renderUsers(dataJson);
//	 })
//	 .catch(e => {
//		 console.log(e);
//	 });

//
// Request with fetch API
//
// fetch("https://jsonplaceholder.typicode.com/users")
//	 .then(res => res.json())
//	 .then(renderUsers)
//	 .catch(e => console.log(e));

//
// Async/Await with myRequest
//
async function fetchUsersWithMyRequest() {
	try {
		const e = await myRequest("https://jsonplaceholder.typicode.com/users");
		const data = e.target.responseText;
		const dataJson = JSON.parse(data);
		renderUsers(dataJson);
	} catch (e) {
		console.log(e);
	}
}
// fetchUsersWithMyRequest();

//
// Async/Await with fetch API
//
async function fetchUsersWithFetch() {
	try {
		const res = await fetch("https://jsonplaceholder.typicode.com/users");
		const data = await res.json();
		renderUsers(data);
	} catch (e) {
		console.log(e);
	}
}
// fetchUsersWithFetch();

//
// Bonus: WebSockets chat
//
const textarea = document.querySelector("#chat");
const ws = new WebSocket("wss://kaj-chat.deno.dev");

ws.addEventListener("open", e => {
	textarea.value += "[connected to chat]\n";
});

ws.addEventListener("error", e => {
	console.log(e);
	textarea.value += "[error]\n";
});

ws.addEventListener("message", e => {
	textarea.value += `${e.data}\n`;
});

const input = document.querySelector("#chat-input");
input.addEventListener("keydown", e => {
	if (e.key !== "Enter") return;

	const chatMessage = e.target.value;
	if (!chatMessage) return;

	textarea.value += `${chatMessage}\n`;
	e.target.value = "";
	ws.send(chatMessage);
});