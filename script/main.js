// Initialize the bars
const staminaBar = document.getElementById("stamina");
const healthBar = document.getElementById("health");
const manaBar = document.getElementById("mana");
const wantedRating = document.getElementById("wantedRating");
const coins = document.getElementById("coins");

// Set initial values and styles
staminaBar.style.width = "100%";
healthBar.style.width = "100%";
manaBar.style.width = "100%";
wantedRating.innerHTML = "0";
coins.innerHTML = "0";

export let stamina = 10;
export let health = 10;
export let mana = 10;
export let wanted = 0;
export let coin = 0;

export function setStamina(value) {
    stamina = value;
    staminaBar.innerHTML = value + " Sp";
    staminaBar.style.width = (value * 10) + "%"; // Adjust percentage as needed
}

export function setHealth(value) {
    health = value;
    healthBar.innerHTML = value + " Hp";
    healthBar.style.width = (value * 10) + "%"; // Adjust percentage as needed
}

export function setMana(value) {
    mana = value;
    manaBar.innerHTML = value + " Mp";
    manaBar.style.width = (value * 10) + "%"; // Adjust percentage as needed
}

export function setCoins(value) {
    coin = value;
    coins.innerHTML = value;
}

export function setWanted(value) {
    wanted = value;
    wantedRating.innerHTML = value + "/100";
}
