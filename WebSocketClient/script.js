(function () {
    "use strict";
    
    const URL = "ws://localhost:5000/ws";

    const connect = () => {
        let socket = new WebSocket(URL);
        socket.onopen = (event) => {
            console.log("OPEN");
        };
        socket.onclose = (event) => {
            console.log("CLOSE");
        };
        socket.onerror = (error) => {
            console.error(error.message);
        };
        socket.onmessage = (event) => {
            const message = event.data;
            const list_messages = document.getElementById("list-messages");
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(message));
            list_messages.appendChild(li);
        };
        return socket;
    }

    const onSubmitForm = (socket) => (
        (event) => {
            event.preventDefault();
            let input_message = document.getElementById("input-message");
            const message = input_message.value;
            input_message.value = "";
            socket.send(message);
        }
    );

    const closeSocket = (socket) => (
        () => {
            socket.close();
        }
    );

    const onLoad = () => {
        const socket = connect();
        document.getElementById("form-message").addEventListener("submit", onSubmitForm(socket));
        document.getElementById("button-close").addEventListener("click", closeSocket(socket));
    }

    document.addEventListener("DOMContentLoaded", onLoad, false);
})();
