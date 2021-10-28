const Potion = require('../lib/Potion');

function Player(name = '') {
    // name parameter sets a default empty string if no name is provided
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];

    // returns an object with various player properties
    // this.getStats = function() {
    //     return {
    //         potions: this.inventory.length,
    //         health: this.health,
    //         strength: this.strength,
    //         agility: this.agility
    //     };
    // };

    // // returns the inventory array or false if empty
    // this.getInventory = function() {
    //     if (this.inventory.length) {
    //         return this.inventory;
    //     }
    //     return false;
    // };
}

// adding down here as Protoypes as part of refactoring
// prototype is the best way to add a method to a constructor function

Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`;
};

Player.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};


// returns the inventory array or false if empty
Player.prototype.getInventory = function() {
    if (this.inventory.length) {
        return this.inventory;
    }
    return false;
};

Player.prototype.isAlive = function() {
    if(this.health === 0) {
        return false;
    }
    return true;
};

Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion);
};

Player.prototype.usePotion = function(index) {
    /** The .splice() method removes items from an array and returns the removed item(s)
     * as a new array
    two things are happening here:
    1. original inventory array has a single Potion removed at the specified
    index value and put into a new "removed items" array
    2. then the Potion at index [0] of this "removed items" array is saved in a potion variable
    **/
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
            break;
    }
};

Player.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
};

Player.prototype.reduceHealth = function(health) {
    this.health -= health;

    if(this.health < 0) {
        // include this line to make sure health never goes into the negatives
        this.health = 0;
    }
};



module.exports = Player;