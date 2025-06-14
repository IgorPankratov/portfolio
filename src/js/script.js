const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const close = document.querySelector('.menu__close');

//Анимация меню при нажатии на гамбургер
hamburger.addEventListener('click', function () {
        menu.classList.add('active');
    });


close.addEventListener('click', function () {
        menu.classList.remove('active');
    });

// Делаем rating-line 

const counters = document.querySelectorAll('.skills__ratings-counter');
const lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});