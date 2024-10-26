// script.js

// Function to fetch response from the backend server
async function fetchGPT4Response(userInput) {
    try {
        const response = await fetch("http://localhost:5001/api/gpt4", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: userInput })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return "Sorry, there was an issue connecting to the assistant. Please try again.";
    }
}

// Function to display a message in the chat log
function displayMessage(message, sender) {
    const chatLog = document.getElementById("chat-log");
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender);
    messageElement.innerText = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Function to handle user input and send it to GPT-4
async function sendMessage(event) {
    if (event.key === "Enter") {
        const inputField = document.getElementById("chat-input");
        const userInput = inputField.value.trim();
        if (!userInput) return;

        // Display user's message
        displayMessage(userInput, "user");

        // Clear the input field
        inputField.value = "";

        // Get GPT-4 response from the backend
        const botResponse = await fetchGPT4Response(userInput);
        displayMessage(botResponse, "bot");
    }
}

// Initialize with a greeting message
window.onload = function() {
    displayMessage("Hello! I’m here to help with diabetes management. How can I assist you today?", "bot");
}
