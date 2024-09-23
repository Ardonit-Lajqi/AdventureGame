export let storyNode = {
    start: {
        text: "You find yourself in a thick forest.",
        question: "Where do you want to go?",
        choices: [
            { text: "Hut", next: "hut"},
            { text: "Continue Forward", next: "OutsideCity" },
            { text: "Deeper Forest", next: "startDeepForest" }
        ]
    },

    hut: {
        text: "You arrive at a small, abandoned hut.",
        question: "What do you want to do?",
        choices: [
            { text: "Leave", next: "leave" },
            { text: "Open the door", specialAction: true },
            { text: "Knock on the door", specialAction: true },
            { text: "Peek through window", specialAction: true }
        ]
    },

    inHut: {
        text: "You enter the hut.",
        question: "What do you want to do?",
        choices: [
            { text: "Leave", next: "leave" },
        ]
    },

    escapedMonster: {
        text: "You managed to escape the monster.",
        question: "What do you want to do?",
        choices: [
            { text: "Leave", next: "leave" },
            { text: "Return to fight monster", next: "fightMonster" }
        ]
    },

    fightMonster: {
        text: "You return and find the monster, it attacks.",
        question: "Fight screen",
        choices: [
            { text: "Attack", next: "attack" },
            { text: "Flee", next: "flee" }
        ]
    },

    dead: {
        text: "You died",
        question: "You are dead",
        choices: [
            { text: "Restart", next: "restart" },
        ]
    },
};

export let monsterInHut = true;
export let monsterDead = false;
export let haveShoes = true;