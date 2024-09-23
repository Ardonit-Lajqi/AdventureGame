import * as main from './main.js';
import { storyNode } from './forestStory.js';

main.setStamina(10);
main.setHealth(10);
main.setMana(10);
main.setWanted(0);
main.setCoins(0);

let isDead = false;
let searchedHut = false;
let containerCount = 0;
let monsterInHut = false;
let monsterDead = false;
let haveShoes = true;
let trapdoorBroken = false;
let haveRope = false;

window.onload = function() {
    createStoryContainer('start');
    setupInventoryListeners();
}

function setupInventoryListeners() {
    const items = [
        { id: 'sword', text: 'You have a sword!' },
        { id: 'spellbook', text: 'You have a spellbook!' },
        { id: 'rope', text: 'You have a rope!' },
        // Add more items as needed
    ];

    items.forEach(item => {
        const img = document.getElementById(item.id);
        img.addEventListener('click', function() {
            updateStoryLog(item.text);
        });
    });
}

function createStoryContainer(storyNodeKey) {
    if (!storyNode[storyNodeKey]) {
        console.error(`Story node "${storyNodeKey}" does not exist.`);
        return;
    }

    console.log(`Creating container for: ${storyNodeKey}`);

    const randomMarginLeft = Math.floor(Math.random() * 20) + 10;
    const container = document.createElement('div');
    container.classList.add('card', 'card-question', 'shadow', 'mt-5', 'p-4');
    container.id = "card" + containerCount;

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

        storyNode[storyNodeKey].choices.forEach((choice, index) => {
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

        document.getElementById('game').appendChild(container);

        if (containerCount > 0) {
            new LeaderLine(
                document.getElementById('card' + (containerCount - 1)),
                document.getElementById('card' + containerCount),
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

        containerCount++;
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
                            updateStoryLog("The monster caught you.");
                            nextNode = "dead";
                        }
                    } else {
                        isDead = true;
                        updateStoryLog("You slip and are caught by the monster.");
                        nextNode = "dead";
                    }
                } else {
                    nextNode = "inHut";
                }
                break;
            case "Knock on the door":
                if (monsterInHut) {
                    rand = Math.floor(Math.random() * 100);
                    if (rand >= 50) {
                        updateStoryLog("You hear a growl from inside. The monster doesn't seem to notice you.");
                        nextNode = "hut";
                    } else {
                        if (haveShoes) {
                            rand = Math.floor(Math.random() * 100);
                            if (rand >= 20) {
                                nextNode = "escapedMonster";
                            } else {
                                isDead = true;
                                updateStoryLog("You slip and are caught by the monster.");
                                nextNode = "dead";
                            }
                        } else {
                            rand = Math.floor(Math.random() * 100);
                            if (rand >= 50) {
                                nextNode = "escapedMonster";
                            } else {
                                isDead = true;
                                updateStoryLog("You slip and are caught by the monster.");
                                nextNode = "dead";
                            }
                        }
                    }
                } else {
                    console.log("with no response from inside, you enter.");
                    nextNode = "inHut";  
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
                case "Leave cricle":
                    updateStoryLog("You go back to leave the through the trapdoor", function() {
                        if (trapdoorBroken) {
                            updateStoryLog("You relsize that you broke the ladder during your entry", function() {
                                // click item rope
                            });
                        } else {

                        }
                    });
                    break;
                
        }
    }

    if (!isDead) {
        createStoryContainer(nextNode);
    }
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