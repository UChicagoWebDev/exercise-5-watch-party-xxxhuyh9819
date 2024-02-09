/* For index.html */

// TODO: If a user clicks to create a chat, create an auth key for them
// and save it. Redirect the user to /chat/<chat_id>
function createChat() {

}

/* For chat.html */

// TODO: Fetch the list of existing chat messages.
// POST to the API when the user posts a new message.
// Automatically poll for new messages on a regular interval.
function postMessage() {
  return;
}

// GET to get all messages in a room
function getMessage() {
    const inviteLink = document.querySelector(".invite")
    // src: https://stackoverflow.com/questions/10539299/getting-link-text-within-a-div
    const text = inviteLink
                   .getElementsByTagName('a')[0].innerHTML
    const room_id = Number(text.slice(text.length - 1))
    const url = `/api/rooms/${room_id}/messages`
    fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": WATCH_PARTY_API_KEY
        }
    }).then(response => response.json())
        .then(data => {
            const container = document.querySelector(".messages");
            container.innerHTML = "";
            data.forEach(msg => {
              renderMessages(msg, container)
            });
        })
        .catch(error => console.log(`Error: ${error}`))

}

// render each message on HTML
function renderMessages(msg, container) {
    const messageElement = document.createElement("message");
    const authorElement = document.createElement("author")
    const contentElement = document.createElement("content")
    contentElement.textContent = msg["body"]
    authorElement.textContent = msg["name"]
    messageElement.appendChild(contentElement)
    messageElement.appendChild(authorElement)
    container.appendChild(messageElement);
}

function startMessagePolling() {
    setTimeout(getMessage, 200)
}

// update username
function updateUserName() {
    const name = document.getElementById("name_input").value
    const url = '/api/user/name'
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": WATCH_PARTY_API_KEY
        },
        body: JSON.stringify({name: name})
    })
    .then(response => response.json())
        .then(() => {
            alert('Username updated successfully');
        })
    .catch(error => console.error(`Error: ${error}`));
}

// update password
function updatePassword() {
    const password = document.getElementById("pwd_input").value
    const url = '/api/user/password'
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": WATCH_PARTY_API_KEY
        },
        body: JSON.stringify({password: password})
    })
    .then(response => response.json())
        .then(() => {
            alert('Password updated successfully');
        })
    .catch(error => console.error(`Error: ${error}`));
}
