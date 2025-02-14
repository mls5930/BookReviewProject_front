document.addEventListener("DOMContentLoaded", () => {
    const chatIcon = document.getElementById("chat-icon");
    const closeBtn = document.getElementById("close-btn");
    const chatContainer = document.getElementById("chat-container");
    const chatInput = document.getElementById("chat-input");

    chatIcon.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", minimizeChat);
    chatInput.addEventListener("keydown", handleKeyPress);
    

    async function sendMessage(nickname="사용자") {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage(nickname, message);
        chatInput.value = "";

        const json = {
            model: "qwen2.5:14b",
            messages: [{ role: "user", content: message }],
            stream: true
        };

        try {
            const response = await fetch(`http://116.126.12.88:11434/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(json)
            });

            const decoder = new TextDecoder("utf-8");
            await processStream(response.body.getReader(), decoder);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function processStream(reader, decoder, timeout = 60000) {
        let responseBuffer = "";
        let lastReadTime = Date.now();
        let messageDiv = null;

        return new Promise((resolve, reject) => {
            function readNext() {
                Promise.race([
                    reader.read(),
                    new Promise(res => setTimeout(() => res({ done: true }), timeout))
                ])
                .then(({ done, value }) => {
                    if (done || Date.now() - lastReadTime > timeout) return resolve();

                    if (value) {
                        lastReadTime = Date.now();
                        responseBuffer += decoder.decode(value, { stream: true });

                        try {
                            const { message: { content: aiMessage }, done } = JSON.parse(responseBuffer);
                            if (done) return resolve(); // 종료 시 처리

                            for (let part of aiMessage) {
                                if (!messageDiv || part.trim() === ".") {
                                    if (messageDiv && part.trim() === ".") {
                                        messageDiv.innerHTML += part;
                                        part = ""; //초기화
                                    }
                                    if (!done) messageDiv = addMessage("이루", "");
                                }
                                messageDiv.innerHTML += part;
                            }

                            responseBuffer = "";
                            scrollToBottom();
                        } catch (error) {
                            console.error("JSON Parsing Error:", error);
                        }
                    }
                    readNext();
                })
                .catch(reject);
            }
            readNext();
        });
    }

    function addMessage(sender, message) {
        const chatBody = document.getElementById("chat-body");
        const newDiv = document.createElement("div");
        newDiv.classList.add("message", sender === "사용자" ? "user" : "ai");
        newDiv.textContent = `${sender}: ${message}`;
        chatBody.appendChild(newDiv);
        scrollToBottom();
        return newDiv;
    }

    function toggleChat() {
        chatContainer.classList.toggle("expanded");
        chatContainer.classList.toggle("minimized");
    }

    function minimizeChat() {
        chatContainer.classList.remove("expanded");
        chatContainer.classList.add("minimized");
    }

    function handleKeyPress(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }

    function scrollToBottom() {
        const chatBody = document.getElementById("chat-body");
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});
