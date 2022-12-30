document.querySelector('.btn1').addEventListener('click', (e) => {
    e.target.parentElement.classList.add('menu--hide')
})
document.querySelector('.btn2').addEventListener('click', (e) => {
    e.target.parentElement.classList.add('menu--hide')
})
document.querySelector('.btn3').addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('menu--hide')
})