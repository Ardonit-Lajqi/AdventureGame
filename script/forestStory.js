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
            { text: "Open the door", specialAction: true, id:"OpentheHutDoor" },
            { text: "Knock on the door", specialAction: true, id:"KnockOnTheHutDoor" },
            { text: "Peek through window", specialAction: true, id:"PeekThroughHutWindow" }
        ]
    },

    inHut: {
        text: "You find yourself inside the hut.",
        question: "What do you want to do?",
        choices: [
            { text: "Leave", next: "leaveHut" },
            { text: "Search hut", specialAction: true, id:"SearchHut" }
        ]
    },

    trapdoor: {
        text: "You find a trapdoor.",
        question: "What do you want to do?",
        choices: [
            { text: "Leave", next: "inHut" },
            { text: "Enter", specialAction: true, id:"YouFindATrapdoorInHut" }
        ]
    },

    escapedMonster: {
        text: "You managed to escape the monster.",
        question: "What do you want to do?",
        choices: [
            { text: "Leave", next: "leave" },
            { text: "Return to fight monster", specialAction: true, id:"ReturnToFightMonster" }
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
        question: "What do you want to do",
        choices: [
            { text: "Walk", next: "walk" }
        ]
    },

    portal: {
        text: "You see a room with a demoic circle in the middle.",
        question: "What do you want to do?",
        choices: [
            { text: "Leave circle", specialAction: true, id: "LeaveHutCircle" },
            { text: "Search circle", specialAction: true, id: "SearchHutCircle" },
            { text: "Summon", specialAction: true, id: "Summon" }
        ]
    },

    dead: {
        text: "You died",
        question: "You are dead",
        choices: [
            { text: "Restart", specialAction: true, id: "restart" }
        ]
    },

    demonSummon: {
        text: "Do you want to attempt to summon a demon?",
        question: "What do you want to do",
        choices: [
            { text: "Summon demon", specialAction: true, id: "SummonDemon" },
            { text: "Leave", next: "portal" }
        ]
    },

    afterMonster: {
        text: "You defeat the monster, whould you like to spare it's life?",
        question: "What do you want to do",
        choices: [
            { text: "Kill the monster", specialAction: true, id: "KillHutMonster" },
            { text: "Let it go", specialAction: true, id: "SpareHutMonster" }
        ]
    },

    backToHut: {
        text: "You find yourself in the forest",
        question: "What do you want to do",
        choices: [
            { text: "Return to the hut", next: "hut" },
            { text: "Continue into the forest", next: "OutsideCity" }
        ]
    },

    startDeepForest: {
        text: "You enter a deep part of the forest, You feel it will be easy to get lost here",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", next: "forwardF"},
            { text: "Right", next: "rightR"},
            { text: "Left", next: "leftL"}
        ]
    },

    leftL: {
        text: "You go left",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", next: "forwardLF"},
            { text: "Left", next: "leftLL"} 
        ]
    },

    forwardLF: {
        text: "You go Forward",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", next: "forwardLFF"},
            { text: "Left", next: "rightLFL"},
            { text: "Right", next: "rightLFR"}
        ]
    },

    forwardLFF: {
        text: "You go Forward",
        question: "Where do you wanna go?",
        choices: [
            { text: "Left", specialAction: true, id: "DeepForestStart"},
            { text: "Forward", next: "forwardLFFF"}
        ]
    },

    leftLL: {
        text: "You go left",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", specialAction: true, id: "LLF"}, // här ska den ge en blomma!
            { text: "Back", next: "leftL"},
            { text: "Right", next: "rightLFL"}
        ]
    },

    leftLLF: {
        text: "You go foward",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", specialAction: true, id: "LFFFR"}, // här ska den ge en grön mossa!
            { text: "Right", next: "rightLFL"},
        ]
    },

    rightLFL: {
        text: "You go Right",
        question: "Where do you wanna go?",
        choices: [
            { text: "Right", specialAction: true, id:"DeepForestStart"},
            { text: "Back", next: "backLF" }
        ]
    },





};

