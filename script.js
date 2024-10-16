// JavaScript 코드 (Fetch API 사용하여 메시지 등록 및 조회)
const form = document.getElementById('guestbookForm');
const messageList = document.getElementById('messageList');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const message = document.getElementById('me   
ssage').value;

  fetch('/addMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, message })
  })
  .then(response => response.json())
  .then(data   
 => {
    // 메시지 목록 새로고침
    fetchMessages();
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

function fetchMessages() {
  fetch('/messages')
  .then(response => response.json())
  .then(data => {
    messageList.innerHTML = '';
    data.forEach(message => {
      const p = document.createElement('p');
      p.textContent = `${message.name}: ${message.message}`;
      messageList.appendChild(p);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

fetchMessages();