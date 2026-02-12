const socket = io();
const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");

const username = prompt("Enter your name");

function sendMessage() {
  if (input.value.trim() !== "") {
    socket.emit("chat message", {
      user: username,
      text: input.value
    });
    input.value = "";
  }
}

socket.on("chat message", (msg) => {
  const div = document.createElement("div");
  div.classList.add("message");

  if (msg.user === username) {
    div.classList.add("sent");
  } else {
    div.classList.add("received");
  }

  div.textContent = msg.user + ": " + msg.text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});