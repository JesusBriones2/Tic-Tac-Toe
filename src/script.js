(() => {

    // Controles del menu principal.
    const menu = document.getElementById('menu');
    const gameContainer = document.querySelector('.game-container');

    menu.addEventListener('click', (e) => {
        if (e.target.id == 'cta-computer') {
            console.log('output1');
            gameContainer.classList.add('menu--hide');
        }
        else if (e.target.id == 'cta-2players') {
            console.log('output2');
            gameContainer.classList.add('menu--hide');
        }
    });

    document.getElementById('cta-back').addEventListener('click', () => {
        gameContainer.classList.remove('menu--hide');
    });


})();

