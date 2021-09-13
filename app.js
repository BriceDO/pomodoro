const affichageTravail = document.querySelector('.affichageT');
const affichagePause = document.querySelector('.affichageP');
const btnGo = document.querySelector('.b1');
const btnPause = document.querySelector('.b2');
const btnReset = document.querySelector('.b3');
const cycles = document.querySelector('h2');

let checkInterval = false;
// 1800 / 60 = 30min
let tempsInitial = 1800;
// 300 / 60 = 5min
let tempsDeRepos = 300;
let pause = false;
let nbDeCycles = 0;
cycles.innerText = `Nombre de cycles : ${nbDeCycles}`;

// Opération ternaire, Si en dessous des dizaines, on rajoute un zéro
affichageTravail.innerText =`${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
affichagePause.innerText =`${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;

btnGo.addEventListener('click', () => {

    // On empêche le spam du bouton. Si déjà cliqué, on sort de la fonction parce que checkInterval sera true.
    if(checkInterval === false) {
        checkInterval = true;   
    

    // Au clique directement, on commence avec 1sec en moins, sinon il y aurait un délai d'un sec après le clique
    tempsInitial--;
    affichageTravail.innerText =`${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;

    // le timer va se mettre à jour toutes les sec
    let timer = setInterval(() => {

        // Tant qu'il reste du temps, le timer Travail est décompté
        if(pause === false && tempsInitial > 0) {
            tempsInitial--;
            affichageTravail.innerText =`${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
            
            // Si les deux timers sont à 0, on remet tout à zéro et rajoute un cycle
        } else if (pause === false && tempsDeRepos === 0 && tempsInitial === 0) {
            tempsInitial = 1800;
            tempsDeRepos = 300;
            nbDeCycles++;
            cycles.innerText = `Nombre de cycles : ${nbDeCycles}`;
            affichageTravail.innerText =`${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
            affichagePause.innerText =`${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;

            // Sinon s'il arrive à 0, le timer repos prend le relais et est décompté
        } else if (pause === false && tempsInitial === 0) {
            tempsDeRepos--;
            affichagePause.innerText =`${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
        } 

    }, 1000)

    // Bouton Reset
    btnReset.addEventListener('click', () => {
        clearInterval(timer);
        checkInterval = false;
        tempsInitial = 1800;
        tempsDeRepos = 300;
        affichageTravail.innerText =`${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
        affichagePause.innerText =`${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
    })

    } else {
        return;
    }

})

// Bouton Pause
btnPause.addEventListener('click', () => {

    if(pause === false){
        btnPause.innerText = "Reprendre";
    } else if (pause === true) {
        btnPause.innerText = "Pause"
    }

    pause = !pause;
})
