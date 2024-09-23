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
        text: "You find yourself inside the hut.",
        question: "What do you want to do?",
        choices: [
            { text: "Leave", next: "leaveHut" },
            { text: "Search hut", specialAction: true }
        ]
    },

    trapdoor: {
        text: "You find a trapdoor.",
        question: "What do you want to do?",
        choices: [
            { text: "Leave", next: "inHut" },
            { text: "Enter", specialAction: true }
        ]
    },

    escapedMonster: {
        text: "You managed to escape the monster.",
        question: "What do you want to do?",
        choices: [
            { text: "Leave", next: "leave" },
            { text: "Return to fight monster", specialAction: true }
        ]
    },

    fightMonster: {
        text: "You return and find the monster, it attacks.",
        question: "Fight screen",
        choices: [
            { text: "Attack", next: "attack" },
            { text: "Leave", next: "leaveHut" }
        ]
    },

    leaveHut: {
        text: "You leave the hut and continue forward.",
        question: "What do you do",
        choices: [
            { text: "Walk", next: "walk" }
        ]
    },

    portal: {
        text: "You see a room with a demoic circle in the middle.",
        question: "What do you want to do?",
        choices: [
            { text: "Leave cricle", specialAction: true },
            { text: "Search cirle", specialAction: true },
            { text: "Summon", specialAction: true }
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

