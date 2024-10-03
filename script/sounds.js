/*
const forestSound = document.getElementById("forest");

function playForest(){
    forestSound.play();
}
*/

const buttonClick = new Audio('./sound/ClickSound.mp3');
const pickUp = new Audio('./sound/effects/inventory.mp3');

function btnPlay() {
    buttonClick.play();
}

function invPickUp(){
    pickUp.play();
}

const forestSound = new Audio('./sound/Forest-sound.flac');
const ladderBreak = new Audio('./sound/effects/ladderBreak.mp3');
const ropeThrowUp = new Audio('.sound/effects/ropeThrowAndAttach.mp3');
const jail = new Audio('./sound/effects/prison.mp3');
const deepForestSound = new Audio('./sound/Deep-forest-sound.wav');

        function playForest() {
            // Check if the audio is not already playing
            if (forestSound.paused) {
                forestSound.play().catch(error => {
                    console.error("Playback failed: ", error);
                });
            }
        }

        // Event listener to repeat the sound when it ends
        forestSound.addEventListener('ended', function() {
            forestSound.currentTime = 0; // Reset to the start
            forestSound.play();           // Play again
        });


        function playDeepForest() {
            if (deepForestSound.paused) {
                deepForestSound.play().catch(error => {
                    console.error("Deep Forest failed to play: ", error);
                });
            }
        }

        deepForestSound.addEventListener('ended', function() {
            deepForestSound.currentTime = 0;
            deepForestSound.play();
        });

        // Volume control
        const soundRange = document.getElementById('soundRange');

        const savedVolume = localStorage.getItem('forestSoundVolume');
        forestSound.volume = savedVolume !== null ? savedVolume : 1.0;  // Set volume
        soundRange.value = forestSound.volume * 100; // Update slider position

        window.addEventListener('load', function () {
            const savedVolume = localStorage.getItem('forestSoundVolume');
            if (savedVolume !== null) {
                forestSound.volume = savedVolume;
                soundRange.value = savedVolume * 100; // Update slider position
            } else {
                forestSound.volume = 1.0;  // Default to maximum volume
                soundRange.value = 100;    // Set slider to 100
            }
            playForest(); // Start playing the sound after the volume is set
        });

        // Update volume based on slider value
        soundRange.addEventListener('input', function() {
            forestSound.volume = soundRange.value / 100;
            localStorage.setItem('forestSoundVolume', forestSound.volume);  // Save volume
        });