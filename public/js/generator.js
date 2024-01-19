const levier = document.getElementById("levier");
const boule = document.getElementById("boule");
const machine = document.getElementById("machine-container");
const liquidOne = document.querySelectorAll(".liquid-one");
const liquidTwo = document.querySelectorAll(".liquid-two");
const bottle = document.querySelectorAll(".bottle");
const door = document.getElementById('door');
const glassLiquid = document.getElementById('glass-liquid');
const stream = document.getElementById('stream');
const generatorTitle = document.getElementById('generator-title');

const audio = {
    stickSound: new Audio('../audio/stick.mp3'),
    slotSound: new Audio('../audio/slot-sound.mp3'),
    liquidSound: new Audio('../audio/liquid.mp3'),
    shakerSound: new Audio('../audio/shaker.mp3'),
    glassSound: new Audio('../audio/glass.mp3'),
    ding: new Audio('../audio/ding.mp3'),
}

const muteBtn = document.querySelector('.fa-solid');
let isMuted = false;

document.addEventListener("DOMContentLoaded", () => {
    boule.addEventListener('click', animateMachine);

    // Fonction mute
    muteBtn.addEventListener('click', () => {
        muteBtn.classList.toggle("fa-volume-xmark");
        muteBtn.classList.toggle("fa-volume-high");
        isMuted = !isMuted; // Inverser l'état du son
        for (var key in audio) {
            if (audio.hasOwnProperty(key)) {
              audio[key].muted = isMuted; // Appliquer l'état du son à tous les fichiers audio
            }
          }
    })

    // Au clic sur le levier
    function animateMachine() {

        // Desactivation du clic sur le levier le temps de l'animation
        boule.removeEventListener('click', animateMachine);
        boule.style.boxShadow = 'inset 0 0 1.5em white';
        boule.style.transition = "box-shadow 0.2s ease-in-out";

        audio.stickSound.play();
        audio.stickSound.volume = "0.3";

        // Changement titre
        generatorTitle.textContent = "...";

        // Réinitialisation état porte et liquide
        door.style.height = "60px";
        door.style.bottom = "";
        glassLiquid.style.height = "0px";
        door.style.transition = "all 0.1s ease-in-out"

        // Animation machine
        setTimeout (() => {
            machine.classList.add('animate__animated');
            machine.classList.add('animate__rubberBand');
        }, "0500")
        setTimeout (() => {
            audio.slotSound.play();
            audio.slotSound.volume = "0.3";
        }, "0150")

        // Animation machine 2
        setTimeout (() => {
            audio.shakerSound.play();
            audio.shakerSound.volume = "0.4";
            machine.classList.add('animate__tada');
        }, "2400")

        // Animation du liquide des bouteilles
        liquidOne.forEach((liquidOne) => {
            const randomNumber = Math.floor(Math.random() * (105 - 20)) + 20;
            setTimeout (() => {
                liquidOne.style.height = "0%";
                liquidOne.style.transition = "all 1.5s ease-in-out";
                audio.liquidSound.play();
            }, "0800")
            setTimeout (() => {
                liquidOne.style.height = `${randomNumber}%`;
                liquidOne.style.transition = "all 1.5s ease-in-out";
            }, "3600")
        })

        liquidTwo.forEach((liquidTwo) => {
            setTimeout (() => {
                liquidTwo.style.height = "0%";
                liquidTwo.style.transition = "height 0.4s ease-in-out";
            }, "2300")
            setTimeout (() => {
                liquidTwo.style.height = "100%";
                liquidTwo.style.transition = "all 0.4s ease-in-out";
            }, "3200")
        })

        // Animation du levier
        levier.style.transform = "translateY(210px) scaleY(-1)";
        levier.style.transition = "all 0.1s";
        levier.style.filter = "blur(0.4rem)";
        setTimeout (() => {
            levier.style.filter = "blur(0rem)";
        }, "0070")
        setTimeout (() => {
            levier.style.transform = "translateY(0px) scaleY(1)";
            levier.style.transition = "all 0.4s";
        }, "1000")

        // Animation de la porte et changement du titre
        setTimeout (() => {
            door.style.height = "0";
            door.style.bottom = "100%";
            door.style.transition = "all 1s ease-in-out";
            generatorTitle.textContent = "Tadaaa !";
          }, "3400")
        setTimeout (() => {
            audio.ding.play();
            audio.ding.volume = "0.6";
        }, "2600")

        // Animation du liquide dans le verre
        setTimeout (() => {
            audio.glassSound.play();
            audio.glassSound.volume = "0.4";
            stream.style.width = "5px";
            glassLiquid.style.height = "30px";
        }, "4400")
        setTimeout (() => {
            stream.style.width = "0px";
        }, "6000")

        // Reinitialisation machine
        setTimeout (() => {
            machine.classList.remove('animate__tada');
            machine.classList.remove('animate__rubberBand');
            boule.addEventListener('click', animateMachine);
        }, "6400")

        // Etat initial boule
        setTimeout (() => {
            boule.style.boxShadow = 'none';
            boule.style.transition = "box-shadow 1s ease-in-out";
        }, "6700")
    }
});