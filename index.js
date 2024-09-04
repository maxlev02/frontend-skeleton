// för att kunna läsa konsolen
const readline = require('readline');
const axios = require('axios');

// backend url
// const url = "localhost:5000/api/";
const url = "https://reqres.in/api/"; // dummy api
// jwt token för inloggad
let token = null

// menyval, ej inloggad
const unAuthChoices = [
    {val:1, label: "login"},
    {val:2, label: "register"},
]

// menyval, inloggad
const authChoices = [
    {val:1, label: "list chats"},
    {val:2, label: "search user"},
    {val:3, label: "go to chat"},
]

// avsluta
const quit = [{val: 9, label: "quit"}]

async function getRequests(path, data) {
	try {
		return await axios.get(
			`${url}${path}`,
			{
				headers: {
					'token': token
				},
				params: data
			}
		);
	} catch (err) {
		console.log(err);
	}
};

async function postRequests(path, data) {
	try {
		return await axios.post(
			`${url}${path}`,
			{
				headers: {
					'token': token
				},
				params: data
			}
		);
	} catch (err) {
		console.log(err);
	}
};

function read(msg) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(msg, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function auth() {
    console.log('auth')
    const username = await read("username: ");
    const password = await read("password: ");

    const data = await postRequests('login', {email: username, password: password});
    console.log(data);
}

async function register() {
    const username = await read("username: ");
    const password = await read("password: ");
    const password2 = await read("RE-password: ");
    if (!password || password !== password2) register();

    //  handle registration
}

async function listChats() {

}

async function selectChat() {

}

async function searchUser() {

}

async function writeMessage() {

}

async function handleOption(opt) {
    if (!token) {
        switch (parseInt(opt)) {
            case 1:
                await auth();
                break;
            case 2:
                await register();
                break;
        }

        return;
    }

    // if logged in .....
}

async function run() {
    let option = null;
    
    do {
        handleOption(option);
        
        const list = [...(token ? authChoices : unAuthChoices), ...quit];
        let readable = list.map(obj => `(${obj.val}) ${obj.label}`)
        console.log(readable.join('\n'));
        option = await read("Select an option: ");
    } while (option != 9);
}

run();