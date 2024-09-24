import * as main from './main.js';
import { storyNode } from './forestStory.js';

let isDead = false;
let searchedHut = false;
let containerCount = 0;
let monsterInHut = false;
let monsterDead = false;
let haveShoes = true;
let trapdoorBroken = false;
let haveRope = false;
let createdContainers = [];

// Set initial game state
main.setStamina(10);
main.setHealth(10);
main.setMana(10);
main.setWanted(0);
main.setCoins(0);

window.onload = function() {
    if (localStorage.length !== 0) {
        let savedContainers = [];

        // Iterate over all items in localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            // Only process keys that start with "container"
            if (key.startsWith("container")) {
                const value = localStorage.getItem(key);
                let parsedValue;

                try {
                    parsedValue = JSON.parse(value);
                } catch (e) {
                    console.error(`Error parsing value for key ${key}:`, value);
                    parsedValue = null;
                }

                // Ensure we have valid card data
                if (parsedValue && parsedValue.storyNodeKey && parsedValue.containerNumber !== undefined) {
                    savedContainers.push(parsedValue);
                } else {
                    console.error("Invalid card data found in localStorage:", parsedValue);
                }
            }
        }

        // Sort saved containers by their containerNumber (as numbers, not strings)
        savedContainers.sort((a, b) => a.containerNumber - b.containerNumber);

        // Load the cards in the correct order
        savedContainers.forEach(container => {
            createStoryContainer(container.storyNodeKey, container.containerNumber);
        });

        // Set containerCount to the highest containerNumber + 1
        if (savedContainers.length > 0) {
            containerCount = savedContainers[savedContainers.length - 1].containerNumber + 1;
        }
    } else {
        createStoryContainer('start');
    }

    setupInventoryListeners();
};

function setupInventoryListeners() {
    const items = [
        { id: 'sword', text: 'A rather rusted sword.' },
        { id: 'spellbook', text: 'A book filled with demonic magic. It states that with the following items you can summon a demon: Bottled soul, Black death plant, Bones, A ritual knife.' },
        { id: 'rope', text: 'An ordinary bundle of rope.' },
    ];

    items.forEach(item => {
        const itemClick = document.getElementById(item.id);
        itemClick.addEventListener('click', function() {
            updateStoryLog(item.text);
        });
    });
}

function clearSaveData() {
    localStorage.clear();  // Clear local storage
    console.log("All saved data has been cleared.");
    window.location.reload();  // Reload the site
}

// Make sure the clear button calls clearSaveData when clicked
document.getElementById("clear").onclick = clearSaveData;

function createStoryContainer(storyNodeKey, containerNumber = null) {
    if (!storyNode[storyNodeKey]) {
        console.error(`Story node "${storyNodeKey}" does not exist.`);
        return;
    }

    const currentContainerCount = containerNumber !== null ? containerNumber : containerCount;
    const randomMarginLeft = Math.floor(Math.random() * 20) + 10;
    const container = document.createElement('div');
    container.classList.add('card', 'card-question', 'shadow', 'mt-5', 'p-4');
    container.id = "card" + currentContainerCount;

    container.style.marginLeft = randomMarginLeft + "vh";
    container.style.width = "50vh";
    container.style.transform = `translateX(${randomMarginLeft}vh)`;

    const questionTitle = document.createElement('h2');
    questionTitle.classList.add('text-center', 'text-light', 'mt-2');
    questionTitle.innerHTML = storyNode[storyNodeKey].question;
    container.appendChild(questionTitle);

    updateStoryLog(storyNode[storyNodeKey].text, function() {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('row', 'text-center', 'mt-3');
        container.appendChild(buttonContainer);

        storyNode[storyNodeKey].choices.forEach((choice) => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.classList.add('btn', 'button', 'm-2');

            button.addEventListener('click', function () {
                disableButtons(container, button);
                if (choice.specialAction) {
                    handleSpecialActions(choice);
                } else {
                    createStoryContainer(choice.next);
                }
            });

            const buttonCol = document.createElement('div');
            buttonCol.classList.add('col-4');
            buttonCol.appendChild(button);
            buttonContainer.appendChild(buttonCol);
        });

        // Add the new container to the createdContainers array
        createdContainers.push(container);

        // Append containers in order based on containerNumber
        createdContainers.sort((a, b) => {
            return parseInt(a.id.replace('card', '')) - parseInt(b.id.replace('card', ''));
        });

        // Clear the game element and reappend in order
        const gameElement = document.getElementById('game');
        gameElement.innerHTML = ''; // Clear existing cards
        createdContainers.forEach(card => gameElement.appendChild(card));

        if (currentContainerCount > 0) {
            new LeaderLine(
                document.getElementById('card' + (currentContainerCount - 1)),
                document.getElementById('card' + currentContainerCount),
                {
                    path: 'grid',
                    startSocket: 'bottom',
                    endSocket: 'top',
                    color: '#327117',
                    size: 4,
                    outline: false,
                    dropShadow: true
                }
            );
        }
        
        // Save the created container to localStorage
        let savedContainer = {
            id: container.id,
            storyNodeKey: storyNodeKey,
            choices: JSON.parse(JSON.stringify(storyNode[storyNodeKey].choices)),
            createdAt: new Date().toISOString(),
            containerNumber: currentContainerCount
        };

        localStorage.setItem("container" + currentContainerCount, JSON.stringify(savedContainer));

        if (containerNumber === null) {
            containerCount++;
        }
    });
}



function handleSpecialActions(choice) {
    let nextNode = choice.next;

    if (choice.specialAction) {
        console.log("Special action triggered for:", choice.text);
        let rand = Math.floor(Math.random() * 100);
        switch (choice.text) {
            case "Open the door":
                console.log(choice.text);
                if (monsterInHut) {
                    if (haveShoes) {
                        rand = Math.floor(Math.random() * 100);
                        if (rand >= 50) {
                            main.setStamina(main.stamina - 1);
                            warningCard();
                            nextNode = "escapedMonster";
                        } else {
                            isDead = true;
                            warningCard();
                            updateStoryLog("The monster caught you.", function() {
                                nextNode = "dead";
                                createStoryContainer(nextNode);
                            });
                        }
                    } else {
                        isDead = true;
                        updateStoryLog("You slip and are caught by the monster.", function() {
                            nextNode = "dead";
                            createStoryContainer(nextNode);
                        });
                    }
                } else {
                    nextNode = "inHut";
                }
                break;
            case "Knock on the door":
                if (monsterInHut) {
                    rand = Math.floor(Math.random() * 100);
                    if (rand >= 50) {
                        updateStoryLog("You hear a growl from inside. The monster doesn't seem to notice you.", function() {
                            nextNode = "hut";
                            createStoryContainer(nextNode);
                        });
                    } else {
                        if (haveShoes) {
                            rand = Math.floor(Math.random() * 100);
                            if (rand >= 20) {
                                nextNode = "escapedMonster";
                            } else {
                                isDead = true;
                                updateStoryLog("You slip and are caught by the monster.", function() {
                                    nextNode = "dead";
                                    createStoryContainer(nextNode);
                                });
                            }
                        } else {
                            rand = Math.floor(Math.random() * 100);
                            if (rand >= 50) {
                                nextNode = "escapedMonster";
                            } else {
                                isDead = true;
                                updateStoryLog("You slip and are caught by the monster.", function() {
                                    nextNode = "dead";
                                    createStoryContainer(nextNode);
                                });
                            }
                        }
                    }
                } else {
                    updateStoryLog("with no response from inside, you enter.", function() {
                        nextNode = "inHut";
                        createStoryContainer(nextNode);
                    });
                }
                break;
            case "Peek through window":
                if (monsterInHut) {
                    warningCard();
                    updateStoryLog("You see the monster through the window.", function() {
                        setTimeout(function() {
                            rand = Math.floor(Math.random() * 100);
                            if (rand >= 5) {
                                updateStoryLog("As you see the monster you slip away unnoticed.", function() {
                                    nextNode = "escapedMonster";
                                    createStoryContainer(nextNode);
                                });
                            } else {
                                isDead = true;
                                updateStoryLog("As you peek through the window the monster rushes to attack you.", function() {
                                    nextNode = "dead";
                                    createStoryContainer(nextNode);
                                });
                            }
                        }, 250);
                    });
                } else {
                    updateStoryLog("You see nothing noteworthy inside.", function() {
                        nextNode = "hut";
                        createStoryContainer(nextNode);
                    });
                }
                break;
            case "Search hut":
                if (!searchedHut) {
                    searchedHut = true;
                    updateStoryLogQueue(["You start searching the hut.", "You find (hut items)."], function() {
                        nextNode = "trapdoor";
                        createStoryContainer(nextNode);
                    });
                } else {
                    nextNode = "trapdoor";
                    createStoryContainer(nextNode);
                }
                break;
            case "Enter":
                rand = Math.floor(Math.random() * 100);
                updateStoryLog("You attempt to climb down the rickety ladder.", function() {
                    setTimeout(function() {
                        if (rand >= 50) {
                            updateStoryLog("You successfully climb down.", function() {
                                nextNode = "portal";
                                createStoryContainer(nextNode);
                            });
                        } else {
                            updateStoryLog("The ladder breaks as you fall down and take 1 damage.", function() {
                                main.setHealth(main.health - 1);
                                nextNode = "portal";
                                createStoryContainer(nextNode);
                            });
                        }
                    });
                });
                break;
            case "Leave circle":
                updateStoryLog("You go back to leave through the trapdoor", function() {
                    if (trapdoorBroken) {
                        updateStoryLog("You realize that you broke the ladder during your entry", function() {
                            // click rope
                        });
                    } else {
                        // Handle the else case here if needed
                    }
                });
                break;
            case "Return to fight monster":
                monsterBattle();
                break;
        }
    }

    createStoryContainer(nextNode);
}

function monsterBattle() {
    const fightCard = document.createElement("div");
    fightCard.classList.add("fightCard")
    fightCard.innerHTML = `
        <div class="card fightScene shadow px-3 py-3">
            <div class="row">
                <div class="col-2">
                    <div class="card monster-lvl">
                        <h2 class="text-center text-light" id="lvl">lvl 12</h2>
                    </div>
                </div>
                <div class="col-10">
                    <div class="row align-items-center g-0 mb-2">
                        <div class="col-auto">
                            <div class="bg-dark progress-icon d-flex align-items-center justify-content-center" style="width: 25px;">
                                <img src="img/icons/heart.png" alt="health" class="img-fluid">
                            </div>
                        </div>
                        <div class="col">
                            <div class="progress bg-dark" style="height: 25px;">
                                <div class="progress-bar healthbar" role="progressbar" style="background-color: #A1142D; border: 2px solid black; width: 100%;" id="monsterHealth" aria-valuenow="10" aria-valuemin="0" aria-valuemax="10"></div>
                            </div>
                        </div>
                    </div>

                    <div class="row align-items-center g-0 mb-2">
                        <div class="col-auto">
                            <div class="bg-dark progress-icon d-flex align-items-center justify-content-center" style="width: 25px;">
                                <img src="img/icons/lighting.png" alt="stamina" class="img-fluid">
                            </div>
                        </div>
                        <div class="col">
                            <div class="progress bg-dark" style="height: 25px;">
                                <div class="progress-bar bg-warning" role="progressbar" style="border: 2px solid black; width: 100%;" id="monsterStamina" aria-valuenow="10" aria-valuemin="0" aria-valuemax="10"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="img/startPage-img/forest.jpg" alt="monster" id="monsterImg">
            </div>
        </div>
        
        <div class="card card-option shadow mt-3 p-3">
            <div class="row d-flex justify-content-center text-center">
                <div class="col-6">
                    <button class="btn btn-attack fs-2">
                        <span><img src="img/icons/sword (3).png" alt="" style="width: 50px;" id="btnAttack"></span>ATTACK
                    </button>
                </div>
                <div class="col-6">
                    <button class="btn btn-flee fs-2">
                        <span><img src="img/icons/running.png" alt="" style="width: 50px;" id="btnFlee"></span>FLEE
                    </button>
                </div>
                <div class="col-6 mt-2">
                    <button class="btn btn-block fs-2">
                        <span><img src="img/icons/defence.png" alt="" style="width: 50px;" id="btnBlock"></span>BLOCK
                    </button>
                </div>
                <div class="col-6 mt-2">
                    <button class="btn btn-wait fs-2">
                        <span><img src="img/icons/hourglass.png" alt="" style="width: 50px;" id="btnWait"></span>WAIT
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('game').appendChild(fightCard);
}

function warningCard() {
    let previousCard = document.getElementById('card' + (containerCount - 1));
    previousCard.classList.add("warning");
    previousCard.innerHTML += 
    '<span class="position-absolute top-0 start-0 m-2">!</span><span class="position-absolute top-0 end-0 m-2">!</span><span class="position-absolute bottom-0 start-0 m-2">!</span><span class="position-absolute bottom-0 end-0 m-2">!</span>';
}

function disableButtons(container, clickedButton) {
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button !== clickedButton) {
            button.classList.add('disabled');
        } else {
            button.classList.add('pressed');
        }
    });
}

function updateStoryLogQueue(textArray, callback) {
    let index = 0;

    function processNext() {
        if (index < textArray.length) {
            updateStoryLog(textArray[index], function() {
                index++;
                processNext();
            });
        } else if (callback) {
            callback();
        }
    }

    processNext();
}

let lastStoryLogTime = 0;

function updateStoryLog(storyText, callback, speed = 30) {
    const logContainer = document.getElementById('text-log');

    const oldLogs = logContainer.querySelectorAll('p.story-log');
    oldLogs.forEach(log => {
        log.classList.add('old-logs');
    });

    const logEntry = document.createElement('p');
    logEntry.classList.add('story-log');
    logContainer.appendChild(logEntry);

    let p = 0;
    typeWriter(storyText, speed, p, logEntry, function() {
        setTimeout(() => {
            if (callback) {
                callback();
            }
        }, 250);
    });

    logContainer.scrollTop = logContainer.scrollHeight;
}

function typeWriter(txt, speed, p, logEntry, onComplete) {
    if (p < txt.length) {
        logEntry.innerHTML += txt.charAt(p);
        p++;
        setTimeout(function () {
            typeWriter(txt, speed, p, logEntry, onComplete);
        }, speed);
    } else if (onComplete) {
        onComplete();
    }
}

/*
// Usage example
updateStoryLog("You enter the dark forest, and hear rustling sounds.", function() {
    updateStoryLog("Your heart races as you take a cautious step forward.", function() {
        // Continue with the next actions here
        console.log("Next action can proceed here.");
    });
});
*/
