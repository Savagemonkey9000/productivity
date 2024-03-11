const container = document.querySelector('.container');
const link = document.querySelector('.link');
const registerLink = document.querySelector('.register-link');
const btnLogin = document.querySelector('.btnLogin');
const closeIcon = document.querySelector('.closeIcon');

registerLink.addEventListener('click', ()=> {
    container.classList.add('active');
});

link.addEventListener('click', ()=> {
    container.classList.remove('active');
});

btnLogin.addEventListener('click', ()=> {
    container.classList.add('active-popup');
});

closeIcon.addEventListener('click', ()=> {
    container.classList.remove('active-popup');
    container.classList.remove('active');
});


