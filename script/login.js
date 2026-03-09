const website = document.getElementById('website');
const loginPage = document.getElementById('loginPage');

document.getElementById('submitBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        loginPage.classList.add('hidden');
        website.classList.remove('hidden');
    } else {
        alert('Invalid credentials');
    }
})