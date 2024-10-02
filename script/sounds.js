/*
const forestSound = document.getElementById("forest");

function playForest(){
    forestSound.play();
}
*/

const buttonClick = new Audio('./sound/ClickSound.mp3');

function btnPlay() {
    buttonClick.play();
}

const forestSound = new Audio('./sound/Forest-sound.flac');

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

        // Volume control
        const soundRange = document.getElementById('soundRange');

        // Set initial volume to maximum
        forestSound.volume = 1.0; // Volume ranges from 0.0 to 1.0

        // Update volume based on slider value
        soundRange.addEventListener('input', function() {
            forestSound.volume = soundRange.value / 100;
        }); 