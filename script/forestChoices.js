import * as main from './main.js';
import { storyNode } from './forestStory.js';

class Enemy {
    constructor(name, health, stamina, level, image) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.stamina = stamina;
        this.maxStamina = stamina;
        this.level = level;
        this.image = image;  // Added image attribute
    }
}

let searchedHut = false;
let searchedCircle = false;

let isDead = false;

let monsterInHut = true;
let monsterDead = false;

let haveShoes = true;

let trapdoorBroken = false;

let haveRope = 0;
let canUseRope = false;
let ropeOnTrapdoor = false;

let haveBook = 0;
let readBook = false;

let haveBottledSoul = false;

let haveBlackDeathPlant = false;

let haveBones = false;

let haveRitualKnife = false;

let haveSword = 0;

let haveMagicPotion = 0;

let haveGlassBottle = 0;

let isSpecialCard = "";

let rewardItem = [];
let rewardedItemsLeft = [];

let containerCount = 0;
let createdContainers = [];

let storyNodeKey = "";

let gamePaused = false;

let fistDamage = 1;
let monsterBlocked = false;
let playerBlocked = false;

let monster = new Enemy("Monster", 10, 10, 5, "../img/monsters/monsterImg.jpg");
let snake = new Enemy("Snake", 2, 3, 1, "");
let boar = new Enemy("Boar", 4, 5, 3, "");
let demon = new Enemy("Demon", 15, 10, 7, "");


// Set initial game state
main.setStamina(10);
main.setHealth(10);
main.setMana(10);
main.setWanted(0);
main.setCoins(0);
let savedContainers = [];

window.onload = function() {
    if (localStorage.length !== 0) {

  
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
                if (parsedValue && parsedValue.cardKey && parsedValue.containerNumber !== undefined) {
                    savedContainers.push(parsedValue);
                } else {
                    console.error("Invalid card data found in localStorage:", parsedValue);
                }

                // If this card had rewards, restore the reward state
                if (parsedValue.rewards && parsedValue.rewards.length > 0) {
                    rewardedItemsLeft = [...parsedValue.rewards];
                    isSpecialCard = parsedValue.specialCard || "";
                }

            } else if (key.startsWith("stats")) {
                let savedStats = JSON.parse(localStorage.getItem("stats"));
                if (savedStats) {
                    main.setHealth(savedStats.Hp);
                    main.setMana(savedStats.Mp);
                    main.setStamina(savedStats.Sp);
                    main.setWanted(savedStats.Crime);
                    main.setCoins(savedStats.Gold);
                }
            } else if (key.startsWith("variables")) {
                let savedVaribles = JSON.parse(localStorage.getItem("variables"));
                if (savedVaribles) {
                    isDead = savedVaribles.dead;
                    searchedHut = savedVaribles.schHut;
                    monsterInHut = savedVaribles.monInHut;
                    monsterDead = savedVaribles.monDead;
                    haveShoes = savedVaribles.shoe;
                    trapdoorBroken = savedVaribles.trapBroke;
                    haveRope = savedVaribles.rope;
                    canUseRope = savedVaribles.useRope;
                    ropeOnTrapdoor = savedVaribles.trapRoped;
                    searchedCircle = savedVaribles.schCircle;
                    haveBook = savedVaribles.book;
                    readBook = savedVaribles.rdBook;
                    haveBottledSoul = savedVaribles.oul;
                    haveBlackDeathPlant = savedVaribles.deathPlant;
                    haveBones = savedVaribles.bone;
                    haveRitualKnife = savedVaribles.knife;
                    haveSword = savedVaribles.sword;
                    haveMagicPotion = savedVaribles.magicPotion;
                    haveGlassBottle = savedVaribles.glassBottle;
                }
            }
        }
  
        // Sort saved containers by their containerNumber (as numbers, not strings)
        savedContainers.sort((a, b) => a.containerNumber - b.containerNumber);
        console.log(savedContainers);
  
        // Load the cards in the correct order
        savedContainers.forEach(container => {
            storyNodeKey = container.cardKey;
            createStoryContainer(container.containerNumber, container.chosenChoice, true);
        });
  
        // Set containerCount to the highest containerNumber + 1
        if (savedContainers.length > 0) {
            containerCount = Math.max(0, parseInt(savedContainers[savedContainers.length - 1].containerNumber) + 1);
        }
        loadInventory(true);
    } else {
        storyNodeKey = "start";
        createStoryContainer();
    }
};

function setupInventory(newItemElement = null, removeItem = false, loading = false) {
    let itemBoxes = document.getElementsByClassName("inventory-item");

    // Add new item or remove it
    let itemAddedOrRemoved = Array.from(itemBoxes).some(item => {
        if (!item.id && !removeItem) {
            // Assign the new item ID to the first empty slot
            item.id = newItemElement;
            switch (newItemElement) {
                case "rope":
                    item.innerHTML = '<img src="img/items/rope.png" alt="rope">';
                    if (!loading) haveRope += 1;
                    break;
                case "spellbook":
                    item.innerHTML = '<img src="img/items/spellbook.png" alt="spellbook" class="locked">';
                    if (!loading) haveBook += 1;
                    break;
                case "sword":
                    item.innerHTML = '<img src="img/items/sword.png" alt="sword">';
                    if (!loading) haveSword += 1;
                    break;
                case "glassBottle":
                    item.innerHTML = '<img src="img/items/glassBottle.png" alt="glassBottle">';
                    if (!loading) haveGlassBottle += 1;
                    break;
                case "magicPotion":
                    item.innerHTML = '<img src="img/items/magicPotion.png" alt="magicPotion">';
                    if (!loading) haveMagicPotion += 1;
                    break;
                default:
                    break;
            }
            addClickEvent(item); // Add click event
            return true; // Stop after adding the item
        } else if (item === newItemElement && removeItem) {
            // Remove the item if `removeItem` is true
            let itemId = item.id;
            switch (itemId) {
                case "rope":
                    haveRope -= 1;
                    break;
                case "spellbook":
                    haveBook -= 1;
                    break;
                case "sword":
                    haveSword -= 1;
                    break;
                case "glassBottle":
                    haveGlassBottle -= 1;
                    break;
                case "magicPotion":
                    haveMagicPotion -= 1;
                    break;
                default:
                    break;
            }

            item.id = ""; // Clear item ID
            item.innerHTML = ""; // Clear item content

            // Remove event listeners from this specific element
            let newItem = item.cloneNode(true); // Clone the node
            item.parentNode.replaceChild(newItem, item); // Replace the old element with the clone

            return true;
        }
        return false;
    });

    if (itemAddedOrRemoved) {
        saveInventory(); // Save inventory after modification
        saveVaribles();
    }
}

// Attach the click event to the inventory item element
function addClickEvent(itemElement) {
    const items = [
        { id: 'sword', text: 'A rather rusted sword.' },
        { id: 'spellbook', text: 'A book filled with demonic magic. It states that with the following items you can summon a demon: Bottled soul, Black death plant, Bones, A ritual knife.' },
        { id: 'rope', text: 'An ordinary bundle of rope.' },
        { id: 'glassBottle', text: 'A plain glass bottle.' },
        { id: 'magicPotion', text: 'A empty potion flask.' }
    ];

    const itemData = items.find(i => i.id === itemElement.id);
    if (itemData) {
        // Attach context menu event for removing item
        if (itemData.id !== "spellbook") {
            console.log("Added contextmenu to " + itemElement);
            itemElement.addEventListener("contextmenu", function (event) {
                event.preventDefault();  // Prevents the default context menu from showing
                setupInventory(itemElement, true); // Pass the item element itself to be removed
            });
        } else {
            itemElement.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                updateStoryLog("You can not remove quest items", function () {});
            });
        }

        // Attach click event for item actions
        itemElement.addEventListener('click', function() {
            if (itemData.id === 'rope' && trapdoorBroken && canUseRope) {
                useRopeToAscend();
            } else if (itemData.id === 'spellbook') {
                readBook = true;
                updateStoryLog(itemData.text);
            } else {
                updateStoryLog(itemData.text);
            }
        });
    }
}




function clearSaveData() {
    localStorage.clear();  // Clear local storage
    window.location.reload();  // Reload the site
}

// Make sure the clear button calls clearSaveData when clicked
document.getElementById("clear").onclick = clearSaveData;

// Function to save container state
function saveContainerState(containerNumber, pressedButton, rewards = [], specialCard = "") {
    let savedContainer = {
        id: "card" + containerNumber,
        cardKey: storyNodeKey,
        choices: JSON.parse(JSON.stringify(storyNode[storyNodeKey].choices)),
        chosenChoice: pressedButton, // Save the pressed button text
        createdAt: new Date().toISOString(),
        containerNumber: parseInt(containerNumber), // Store containerNumber as an integer
        rewards: rewards, // Pass in the specific rewards for this card
        specialCard: specialCard // Pass in the special card status for this card
    };

    localStorage.setItem("container" + containerNumber, JSON.stringify(savedContainer));
}




function saveStats() {
    let saveData = {
        Hp: main.health,
        Mp: main.mana,
        Sp: main.stamina,
        Crime: main.wanted,
        Gold: main.coin
    };

    localStorage.setItem("stats", JSON.stringify(saveData));
}

function saveVaribles() {
    let savedVarData = {
        dead: isDead,
        schHut: searchedHut,
        monInHut: monsterInHut,
        monDead: monsterDead,
        shoe: haveShoes,
        trapBroke: trapdoorBroken,
        rope: haveRope,
        useRope: canUseRope,
        trapRoped: ropeOnTrapdoor,
        schCircle: searchedCircle,
        book: haveBook,
        rdBook: readBook,
        soul: haveBottledSoul,
        deathPlant: haveBlackDeathPlant,
        bone: haveBones,
        knife: haveRitualKnife,
        sword: haveSword,
        magicPotion: haveMagicPotion,
        glassBottle: haveGlassBottle
    };

    localStorage.setItem("variables", JSON.stringify(savedVarData));
}

function saveInventory() {
    let itemBoxes = document.getElementsByClassName("inventory-item");
    let inventoryData = [];

    // Loop through all inventory slots and store the item IDs
    Array.from(itemBoxes).forEach(item => {
        if (item.id) {
            inventoryData.push(item.id);
        } else {
            inventoryData.push(null); // Empty slot
        }
    });

    // Save the inventory data in localStorage
    localStorage.setItem("inventory", JSON.stringify(inventoryData));
    console.log("Inventory saved:", inventoryData);
}

function loadInventory(loading = false) {
    let savedInventory = JSON.parse(localStorage.getItem("inventory"));
    
    if (savedInventory && savedInventory.length > 0) {
        let itemBoxes = document.getElementsByClassName("inventory-item");

        // Loop through saved inventory and set items in their respective slots
        savedInventory.forEach((itemId, index) => {
            if (itemId) {
                setupInventory(itemId, false, loading); // Use the setupInventory function to add the item
            }
        });
        
        console.log("Inventory loaded:", savedInventory);
    }
}


function createStoryContainer(containerNumber = null, pressedButton = null, loading = false) {
    if (!storyNode[storyNodeKey]) {
        console.error(`Story node "${storyNodeKey}" does not exist.`);
        return;
    }
    
    const currentContainerCount = containerNumber !== null ? containerNumber : containerCount;
    const randomMarginLeft = Math.floor(Math.random() * 20) + 10;
    const container = document.createElement('div');
    container.classList.add('card', 'card-question', 'shadow', 'mt-5', 'p-4', 'ani');
    container.id = "card" + currentContainerCount;

    container.style.marginLeft = randomMarginLeft + "vh";
    container.style.width = "50vh";
    container.style.transform = `translateX(${randomMarginLeft}vh)`;

    const questionTitle = document.createElement('h2');
    questionTitle.classList.add('text-center', 'text-light', 'mt-2');
    questionTitle.innerHTML = storyNode[storyNodeKey].question;
    container.appendChild(questionTitle);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('row', 'text-center', 'mt-3');
    container.appendChild(buttonContainer);

    // Load saved container state if loading
    let savedContainer = null;
    if (loading) {
        savedContainer = JSON.parse(localStorage.getItem("container" + currentContainerCount));
        pressedButton = savedContainer ? savedContainer.chosenChoice : null; // Load the pressed button state
    }
    

    storyNode[storyNodeKey].choices.forEach((choice) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
    
        // Initialize button classes
        button.classList.add('btn', 'button', 'm-2'); // Add base button classes
    
        // Set button state based on pressedButton and existing state
        if (loading && savedContainer) {
            if (choice.text === pressedButton) {
                button.classList.add('pressed'); // Add pressed class if this is the chosen button
                button.disabled = true; // Disable the button if it's not pressed
            } else if (pressedButton === null) {
                // Do not disable buttons if chosenChoice is null
                button.classList.remove('disabled'); // Ensure it’s not marked as disabled
                button.disabled = false; // Enable the button
            } else {
                button.classList.add('disabled'); // Add disabled class if it’s not the pressed button
                button.disabled = true; // Disable the button if it's not pressed
            }
        }
    
        button.addEventListener('click', function () {
            disableButtons(container, button);
            if (!button.classList.contains('disabled')) {
                pressedButton = button.textContent;
            }
    
            // Save the state after pressing the button
            saveContainerState(currentContainerCount, pressedButton); // Call save here
    
            // Special actions (like reward cards) should not create new containers
            if (choice.specialAction) {
                handleSpecialActions(choice, pressedButton);
                return;
            }
    
            // Proceed with normal container creation
            storyNodeKey = choice.next;
            createStoryContainer();
        });
    
        const buttonCol = document.createElement('div');
        buttonCol.classList.add('col-4');
        buttonCol.appendChild(button);
        buttonContainer.appendChild(buttonCol);
    });
    

    createdContainers.push({ container, containerNumber: currentContainerCount });

    if (!loading) {
        saveContainerState(currentContainerCount, pressedButton, [], ""); // Reset special state for the next container
        saveStats();
        saveVaribles();
    }

    if (containerNumber === null) {
        containerCount++;
    }

    updateStoryLog(storyNode[storyNodeKey].text, function () {
        const gameElement = document.getElementById('game');
        gameElement.innerHTML = '';
        createdContainers.forEach(({ container }) => gameElement.appendChild(container));

        if (currentContainerCount > 0 && !loading) {
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
        } else if (currentContainerCount > 0 && loading && currentContainerCount == (savedContainers.length-1)) {
            for (let index = 1; index < containerCount; index++) {
                new LeaderLine(
                    document.getElementById('card' + (index - 1)),
                    document.getElementById('card' + index),
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
        }
    });
    //animation
    container.addEventListener('animationend', () => {
        container.classList.remove('ani');
    });
}



function pauseGame() {
    gamePaused = true;
    // You can also add other elements you want to disable
    // e.g. disable click events on certain elements, etc.
}

function resumeGame() {
    gamePaused = false;
    // Re-enable other interactions here if needed
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
    
    // Pause the game when starting the typewriter effect
    pauseGame();

    // Update the text using the typewriter effect
    typeWriter(storyText, speed, p, logEntry, function() {
        // Once the typewriter finishes, resume the game after a short delay
        setTimeout(() => {
            resumeGame();  // Resume game flow here

            if (callback) {
                callback();  // Call the provided callback function
            }
        }, 250);  // You can adjust the delay here
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
        onComplete();  // Call onComplete when typing is done
    }
}

function handleSpecialActions(choice, pressedButton) {
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
                            updateStoryLog("As you open the door you see the monster and run.", function() {
                                storyNodeKey = "escapedMonster";
                                createStoryContainer();
                            });
                        } else {
                            isDead = true;
                            warningCard();
                            updateStoryLog("As you open the door the monster catches you.", function() {
                                storyNodeKey = "dead";
                                createStoryContainer();
                            });
                        }
                    } else {
                        isDead = true;
                        warningCard();
                        updateStoryLog("As you open the door you see the monster and atempt to run.", function() {
                            updateStoryLog("As you run you slip and are caught by the monster.", function() {
                                storyNodeKey = "dead";
                                createStoryContainer();
                            });
                        });
                    }
                } else {
                    storyNodeKey = "inHut";
                    createStoryContainer();
                }
                break;
            case "Knock on the door":
                if (monsterInHut) {
                    rand = Math.floor(Math.random() * 100);
                    if (rand >= 50) {
                        updateStoryLog("You hear a growl from inside. The monster doesn't seem to notice you.", function() {
                            storyNodeKey = "hut";
                            createStoryContainer();
                        });
                    } else {
                        if (haveShoes) {
                            rand = Math.floor(Math.random() * 100);
                            if (rand >= 20) {
                                warningCard();
                                updateStoryLog("As you knock on the door you hear the monster sprint towards you.", function() {
                                    storyNodeKey = "escapedMonster";
                                    createStoryContainer();
                                });
                            } else {
                                isDead = true;
                                warningCard();
                                updateStoryLog("You slip and are caught by the monster.", function() {
                                    storyNodeKey = "dead";
                                    createStoryContainer();
                                });
                            }
                        } else {
                            rand = Math.floor(Math.random() * 100);
                            if (rand >= 50) {
                                warningCard();
                                updateStoryLog("As you knock on the door you hear the monster sprint towards you.", function() {
                                    storyNodeKey = "escapedMonster";
                                    createStoryContainer();
                                });
                            } else {
                                isDead = true;
                                warningCard();
                                updateStoryLog("You slip and are caught by the monster.", function() {
                                    storyNodeKey = "dead";
                                    createStoryContainer();
                                });
                            }
                        }
                    }
                } else {
                    updateStoryLog("with no response from inside, you enter.", function() {
                        storyNodeKey = "inHut";
                        createStoryContainer();
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
                                    storyNodeKey = "escapedMonster";
                                    createStoryContainer();
                                });
                            } else {
                                isDead = true;
                                updateStoryLog("As you peek through the window the monster rushes to attack you.", function() {
                                    storyNodeKey = "dead";
                                    createStoryContainer();
                                });
                            }
                        }, 250);
                    });
                } else {
                    updateStoryLog("You see nothing noteworthy inside.", function() {
                        storyNodeKey = "hut";
                        createStoryContainer();
                    });
                }
                break;
                case "Search hut":
                    if (!searchedHut) {
                        updateStoryLogQueue(["You start searching the hut."], function() {
                            searchedHut = true;
                            rewardItem = randomItems("hut"); // Generate reward items
                            console.log('Reward items before calling rewardCard:', rewardItem); // Log the items

                            rewardCard(pressedButton);
    
                            // Now let storyNodeKey be updated to the next node and create container directly here
                            storyNodeKey = "trapdoor";
                            createStoryContainer(); // Only create the container here
                        });
                        return; // Exit after creating the container
                    } else {
                        storyNodeKey = "trapdoor";
                        createStoryContainer(); // Create container if it's already searched
                        return; // Exit after creating the container
                    }
            case "Enter":
                rand = Math.floor(Math.random() * 100);
                if (ropeOnTrapdoor) {
                    updateStoryLog("You slide down the rope.", function() {
                        storyNodeKey = "portal";
                        createStoryContainer();
                        return; // Exit after creating the container
                    });
                } else {
                    updateStoryLog("You attempt to climb down the rickety ladder.", function() {
                        setTimeout(function() {
                            if (rand >= 50) {
                                updateStoryLog("You successfully climb down.", function() {
                                    storyNodeKey = "portal";
                                    createStoryContainer();
                                    return; // Exit after creating the container
                                });
                            } else {
                                updateStoryLog("The ladder breaks as you fall down and take 1 damage.", function() {
                                    trapdoorBroken = true;
                                    main.setHealth(main.health - 1);
                                    storyNodeKey = "portal";
                                    createStoryContainer();
                                    return; // Exit after creating the container
                                });
                            }
                        });
                    });
                }
                break;
            case "Leave circle":
                updateStoryLog("You go back to leave through the trapdoor", function() {
                    if (ropeOnTrapdoor) {
                        useRopeToAscend();
                    } else {
                        if (trapdoorBroken) {
                            updateStoryLog("You realize that you broke the ladder during your entry", function() {
                                if (haveRope) {
                                    updateStoryLog("You could use the rope to climb up.", function() {
                                        canUseRope = true; // Allow the player to use the rope
                                        setupInventory();
                                    });
                                } else {
                                    updateStoryLog("Without a rope, you can't climb up and are stuck down here.", function() {
                                        updateStoryLog("After a few days you die from thirst.", function() {
                                            storyNodeKey = "dead";
                                            createStoryContainer();
                                        });
                                    });
                                }
                            });
                        } else {
                            updateStoryLog("You climb back up the ladder", function() {
                                storyNodeKey = "trapdoor";
                                createStoryContainer();
                            });
                        }
                    }
                });
                break;
            case "Search circle":
                if (!searchedCircle) {
                    searchedCircle = true;
                    updateStoryLogQueue(["You start searching around the circle."], function() {
                        rewardItem = randomItems("circle"); // Generate reward items
                        console.log('Reward items before calling rewardCard:', rewardItem); // Log the items
                        
                        rewardCard(pressedButton);

                        // Now let storyNodeKey be updated to the next node and create container directly here
                        storyNodeKey = "portal";
                        createStoryContainer(); // Only create the container here
                    });
                } else {
                    updateStoryLogQueue(["You look around but find nothing new."], function() {
                        storyNodeKey = "portal";
                        createStoryContainer();
                    });
                }
                break;
            case "Summon":
                if (haveBlackDeathPlant && haveBones && haveBottledSoul && haveRitualKnife && haveBook && readBook) {
                    updateStoryLogQueue(["You have all the necessary items."], function() {
                        storyNodeKey = "demonSummon";
                        createStoryContainer();
                    });
                } else if (readBook) {
                    updateStoryLogQueue(["From reading the book you know that you need a Bottled soul, Black death plant, Bones and a Ritual knife in order to summon a demon."], function() {
                        storyNodeKey = "portal";
                        createStoryContainer();
                    });
                } else if (haveBook) {
                    updateStoryLogQueue(["You don't know want to do in order to summon anything, perhaps you could read the book you picked up."], function() {
                        storyNodeKey = "portal";
                        createStoryContainer();
                    });
                } else {
                    updateStoryLogQueue(["You don't know want to do in order to summon anything."], function() {
                        storyNodeKey = "portal";
                        createStoryContainer();
                    });
                }
                break;
            case "Summon demon":
                updateStoryLogQueue(["As you follow the instructions in the book you successfully summon a demon."], function() {
                    updateStoryLogQueue(["He thanks you for releasing him before attacking you."], function() {
                        monsterBattle(demon); 
                    });
                });
                break;
            
            case "Return to fight monster":
                monsterBattle(monster);
                break;
        }
    }

}

function randomItems(category) {
    let rewardItem = []; // Initialize rewardItem as a local array
    let numb = 0; // Number of possible reward types
    let minItems = 0; // Ensure at least one item is added
    let maxItems = 0; // Maximum number of items you want to add
    let rand = 0;

    switch (category) {
        case "hut":
            numb = 4;
            minItems = 1;
            maxItems = 4;
            rand = Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

            for (let index = 0; index < rand; index++) {
                let newRand = Math.floor(Math.random() * numb) + 1;

                switch (newRand) {
                    case 1:
                        rewardItem.push("rope");
                        break;
                    case 2:
                        rewardItem.push("sword");
                        break;
                    case 3:
                        rewardItem.push("glassBottle");
                        break;
                    case 4:
                        rewardItem.push("magicPotion");
                        break;
                }
            }
            break;
        case "circle":
            numb = 2;
            minItems = 1;
            maxItems = 3;
            rand = Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

            for (let index = 0; index < rand; index++) {
                let newRand = Math.floor(Math.random() * numb) + 1;

                switch (newRand) {
                    case 1:
                        rewardItem.push("glassBottle");
                        break;
                    case 2:
                        rewardItem.push("magicPotion");
                        break;
                }
            }
            rewardItem.push("spellbook");
            break;
        default:
            break;
    }

    console.log('Generated reward items:', rewardItem); // Check generated items
    return rewardItem;
}




function useRopeToAscend() {
    ropeOnTrapdoor = true;
    canUseRope = false;

    // Find the inventory element for the rope
    let ropeElement = Array.from(document.getElementsByClassName("inventory-item")).find(item => item.id === "rope");

    // Remove the rope from the inventory
    if (ropeElement) {
        setupInventory(ropeElement, true);
    }

    updateStoryLog("You use the rope to climb through the broken trapdoor.", function() {
        storyNodeKey = "trapdoor";
        createStoryContainer();
    });
}


function monsterBattle(selectedMonster) {
    const monster = selectedMonster || monsters[Math.floor(Math.random() * monsters.length)];
    
    const fightCard = createFightCard(monster);
    document.getElementById('game').appendChild(fightCard);
    
    const monsterElements = {
        monsterLevel: document.getElementById('monsterLevel'),
        monsterHealth: document.getElementById('monsterHealth'),
        monsterStamina: document.getElementById('monsterStamina'),
        monsterImage: document.getElementById('monsterImg'),
        monsterName: document.getElementById('monsterName'),
        attackButton: document.getElementById('attackButton'),
        fleeButton: document.getElementById('fleeButton'),
        blockButton: document.getElementById('blockButton'),
        waitButton: document.getElementById('waitButton')
    };

    updateStoryLog("You enter combat with the " + monster.name + ".", function() {
        playersTurn(monster, monsterElements);
        updateMonsterStats(monster, monsterElements);
    });
}

function createFightCard(monster) {
    const fightCard = document.createElement("div");
    fightCard.classList.add("fightCard");
    fightCard.innerHTML = `
        <div class="card fightScene shadow px-3 py-3">
            <div class="row">
                <div class="col-2">
                    <div class="card monster-lvl">
                        <h2 class="text-center text-light" id="monsterLevel">lvl ${monster.level}</h2>
                    </div>
                </div>
                <div class="col-10">
                    <h1 class="monster-name card text-center text-light" id="monsterName">${monster.name}</h1>
                    ${createProgressBar("health", monster.health, monster.maxHealth, "img/icons/heart.png")}
                    ${createProgressBar("stamina", monster.stamina, monster.maxStamina, "img/icons/lighting.png")}
                </div>
                <img src="${monster.image}" alt="${monster.name}" id="monsterImg">
            </div>
        </div>
        
        <div class="card card-option shadow mt-3 p-3">
            <div class="row d-flex justify-content-center text-center">
                <div class="col-6">
                    <button class="btn btn-attack fs-2" id="attackButton">
                        <span><img src="img/icons/sword (3).png" alt="" style="width: 50px;"></span>ATTACK
                    </button>
                </div>
                <div class="col-6">
                    <button class="btn btn-flee fs-2" id="fleeButton">
                        <span><img src="img/icons/running.png" alt="" style="width: 50px;"></span>FLEE
                    </button>
                </div>
                <div class="col-6 mt-2">
                    <button class="btn btn-block fs-2" id="blockButton">
                        <span><img src="img/icons/defence.png" alt="" style="width: 50px;"></span>BLOCK
                    </button>
                </div>
                <div class="col-6 mt-2">
                    <button class="btn btn-wait fs-2" id="waitButton">
                        <span><img src="img/icons/hourglass.png" alt="" style="width: 50px;"></span>WAIT
                    </button>
                </div>
            </div>
        </div>
    `;
    return fightCard;
}

function createProgressBar(type, value, maxValue, icon) {
    return `
        <div class="row align-items-center g-0 mb-2">
            <div class="col-auto">
                <div class="bg-dark progress-icon d-flex align-items-center justify-content-center" style="width: 25px;">
                    <img src="${icon}" alt="${type}" class="img-fluid">
                </div>
            </div>
            <div class="col">
                <div class="progress bg-dark" style="height: 25px;">
                    <div class="progress-bar ${type === 'health' ? 'healthbar' : 'bg-warning'}" role="progressbar" 
                        style="background-color: ${type === 'health' ? '#A1142D' : 'yellow'}; border: 2px solid black; width: ${(value / maxValue) * 100}%;"
                        id="monster${type.charAt(0).toUpperCase() + type.slice(1)}" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${maxValue}"></div>
                </div>
            </div>
        </div>
    `;
}

function playersTurn(monster, monsterElements) {
    saveStats();
    monsterElements.attackButton.addEventListener('click', function() {
        updateStoryLog("Please select an item to use or left-click the attack button to use your fists.", function() {});
    });
    
    monsterElements.attackButton.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        if (main.stamina > 0) {
            updateStoryLog("You punch the " + monster.name + ".", function() {
                // Replace with the actual logic for block checking and damage calculation
                if (monsterBlocked) {
                    updateStoryLog("The monster blocks your punch and loses " + fistDamage + " stamina.", function() {
                        monster.stamina -= fistDamage;  // Reduce stamina
                        updateMonsterStats(monster, monsterElements);  // Update stamina bar
                        monstersTurn(monster, monsterElements);
                    });
                } else {
                    updateStoryLog("You deal " + fistDamage + " damage.", function() {
                        monster.health -= fistDamage;  // Reduce health
                        updateMonsterStats(monster, monsterElements);  // Update health bar
                        monstersTurn(monster, monsterElements);
                    });
                }
            });
        } else {
            updateStoryLog("You don't have enough stamina.", function() {});
        }
    });

    monsterElements.fleeButton.addEventListener('click', function() {
        // Flee logic
    });

    monsterElements.blockButton.addEventListener('click', function() {
        // Block logic
    });

    monsterElements.waitButton.addEventListener('click', function() {
        // Wait logic
    });

    updateStoryLog("You start your turn.", function() {
        updateStoryLog("Please choose an action.", function() {});
    });
}

function updateMonsterStats(monster, monsterElements) {
    monsterElements.monsterLevel.innerHTML = "lvl " + monster.level;

    // Update health display
    monsterElements.monsterHealth.innerHTML = monster.health + " Hp";
    monsterElements.monsterHealth.style.width = (monster.health / monster.maxHealth) * 100 + "%";

    // Update stamina display
    monsterElements.monsterStamina.innerHTML = monster.stamina + " Sp";
    monsterElements.monsterStamina.style.width = (monster.stamina / monster.maxStamina) * 100 + "%";
}

function monstersTurn(monster, monsterElements) {
    updateMonsterStats(monster, monsterElements);
    saveStats();
    updateStoryLog("The " + monster.name + " starts its turn.", function() {
        // Monster turn logic
    });
}



function warningCard() {
    let previousCard = document.getElementById('card' + (containerCount - 1));
    previousCard.classList.add("warning");
    previousCard.innerHTML += 
    '<span class="position-absolute top-0 start-0 m-2">!</span><span class="position-absolute top-0 end-0 m-2">!</span><span class="position-absolute bottom-0 start-0 m-2">!</span><span class="position-absolute bottom-0 end-0 m-2">!</span>';
}

function rewardCard(pressedButton) {
    console.log(containerCount, 'current count');

    let previousCard = document.getElementById('card' + (containerCount - 1));
    console.log(previousCard);
    previousCard.classList.add("reward");

    let specialCard = "reward"; // Mark this as a special card
    let rewardId = (containerCount - 1); // Reward associated with this card

    // Clear previous rewards before adding new ones
    previousCard.innerHTML += `
        <span class="position-absolute top-0 start-0 m-1">⭐</span>
        <span class="position-absolute top-0 end-0 m-1">⭐</span>
        <span class="position-absolute bottom-0 start-0 m-1">⭐</span>
        <span class="position-absolute bottom-0 end-0 m-1">⭐</span>
        <div>
            <h2>Rewards</h2>
            <div id="rewardBox${rewardId}" class="row"> <!-- Unique ID for each reward box -->
            </div>
        </div>`;

    let rewardInventory = document.getElementById(`rewardBox${rewardId}`); // Get the reward box for this card

    // Check if rewardedItemsLeft is populated correctly
    let rewardedItemsLeft = [...rewardItem]; // Create a local copy of reward items
    console.log('Reward items left to claim:', rewardedItemsLeft); // Log remaining items

    // Clear existing content in rewardInventory before adding new items
    rewardInventory.innerHTML = ''; // Ensure the inventory is empty before adding

    rewardedItemsLeft.forEach(item => {
        let rewardElement = document.createElement('div');
        rewardElement.classList.add('col-3');

        rewardElement.innerHTML = `
            <div class="card reward-item">
                <img src="img/items/${item}.png" alt="${item}" id="${item}">
            </div>`;

        rewardInventory.appendChild(rewardElement);

        const rewardClickHandler = function() {
            // Add item to inventory
            setupInventory(item);

            // Clear content of clicked reward item
            rewardElement.innerHTML = `
                <div class="card reward-item">
                </div>`;

            rewardElement.removeEventListener('click', rewardClickHandler); // Remove event listener after click

            // Remove the clicked item from rewardedItemsLeft (only one instance)
            const itemIndex = rewardedItemsLeft.indexOf(item);
            if (itemIndex !== -1) {
                rewardedItemsLeft.splice(itemIndex, 1); // Remove one instance of the item
            }

            // Save container state after each item is clicked
            saveContainerState(rewardId, pressedButton, rewardedItemsLeft, specialCard);

            // Reset reward state when all items are claimed
            if (rewardedItemsLeft.length === 0) {
                resetRewardState(); // Reset the global state
                return;
            }
        };

        // Attach the event listener
        rewardElement.addEventListener('click', rewardClickHandler);
    });

    // Initially save the container state with all rewards before any are claimed
    saveContainerState(rewardId, pressedButton, rewardedItemsLeft, specialCard);
    console.log('Container state saved with rewards'); // Log saving
}



function resetRewardState() {
    rewardItem = []; // Clear reward items
    rewardedItemsLeft = []; // Clear rewarded items left
    isSpecialCard = ""; // Reset special card status
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

