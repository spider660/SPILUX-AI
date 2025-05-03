const chatBox = document.querySelector('.chatbox');
const chatInput = document.querySelector('.chat-input textarea');
const sendButton = document.querySelector('.chat-input span');

function displayMessage(message, type) {
  const div = document.createElement('div');
  div.className = `chat ${type}`;
  const p = document.createElement('p');
  p.textContent = message;
  div.appendChild(p);
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(message) {
  displayMessage(message, 'outgoing');

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    displayMessage(data.reply, 'incoming');
  } catch (err) {
    displayMessage('Error: could not connect to AI.', 'incoming');
  }
}

sendButton.addEventListener('click', () => {
  const msg = chatInput.value.trim();
  if (msg) {
    sendMessage(msg);
    chatInput.value = '';
  }
});

chatInput.addEventListener('keypress', e => {
  if (e.key === 'Enter' && chatInput.value.trim()) {
    sendMessage(chatInput.value.trim());
    chatInput.value = '';
  }
});
