export let storyNode = {
    start: {
        text: "You find yourself in a thick forest.",
        question: "Where do you want to go?",
        choices: [
            { text: "Hut", next: "hut"},
            { text: "Continue Forward", specialAction: true, id:"continueForward" },
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
            { text: "Leave circle", specialAction: true, id:"LeaveHutCircle" },
            { text: "Search circle", specialAction: true, id:"SearchHutCircle" },
            { text: "Summon", specialAction: true, id:"Summon" }
        ]
    },

    dead: {
        text: "You died",
        question: "You are dead",
        choices: [
            { text: "Restart", next: "restart" }
        ]
    },

    demonSummon: {
        text: "Do you want to attempt to summon a demon?",
        question: "What do you want to do",
        choices: [
            { text: "Summon demon", specialAction: true, id:"SummonDemon" },
            { text: "Leave", next: "portal" }
        ]
    },

    forestCity: {
        text: "You pass a small town in the forest",
        question: "What do you want to do?",
        choices: [
            { text: "look around",}, //Behöver fixa SpecialAction för lämna Staden
            { text: "investigate"} // investigera har inte fixat än
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

    forwardF: {
        text: "You go forward",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", next: "forwardFF"},
            { text: "Right", next: "rightFR"}
        ]
    },

    forwardFF: {
        text: "You go forward",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", next: "forwardFFF"},
            { text: "Left", next: "rightFFL"}
        ]
    },

    forwardFFF: {
        text: "You go Forward",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", next: "forwardFFFF"}
        ]
    },

    forwardFFFF: {
        text: "You go Forward",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", next: "forwardFFFFF"},
            { text: "Left", next: "leftFFFFL"},
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

    rightLFR: {
        text: "You go Right",
        question: "Where do you wanna go?",
        choices: [
            { text: "Right", next: "forwardF"},
            { text: "Left", next: "leftLFRL"}
        ]
    },

    leftLFRL: {
        text: "You go Left",
        question: "Where do you wanna go?",
        choices: [
            { text: "Left", next: "leftLFFFR"},
            { text: "Forward", specialAction: true, id: "LFRL"} // Får röd mossa
        ]
    },

    leftLFFFR: {
        text: "You go Left",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", specialAction: true, id: "LFFFRF"},
            { text: "Left", specialAction: true, id: "FallDownInPit" }
        ]
    },

    forwardLFFFRF: {
        text: "You go Forward",
        question: "Where do you wanna go?",
        choices: [
            { text: "Right", next: "rightLFFFRFL"}
        ]
    },

    forwardLFF: {
        text: "You go Forward",
        question: "Where do you wanna go?",
        choices: [
            { text: "Left", specialAction: true, id: "DeepForestStart"},
            { text: "Forward", next: "forwardLFFF"},
            { text: "Right", next: "rightFFL"}
        ]
    },

    forwardLFFF: {
        text: "You go Forward",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", next: "forwardLFFFF"},
            { text: "Left", next: "hut"},
            { text: "Right", next: "leftLFFFR"}
        ]
    },

    forwardLFFFF: {
        text: "You go Forward",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", next: "forwardLLF" },
            { text: "Left", specialAction: true, id: "startDeepForest"}
        ]
    },

    rightFFL: {
        text: "You go right",
        question: "Where do you wanna go?",
        choices: [
            { text: "Forward", next: "forwardLFF"},
            { text: "Left", next: "rightR"},
            { text: "Right", next: "rightFFFFL"}
        ]
    },

    rightFFFFL: {
        text: "You go Right",
        question: "Where do you wanna go?",
        choices: [
            { text: "Right", specialAction: true, id:"DeepForestExit"},
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

    forwardLLF: {
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
            { text: "Back", next: "forwardLF" }
        ]
    },





};

