const Potion = require('../lib/Potion');
const Character = require('./Character');

class Player extends Character { // with 'extends' we're telling it to use the Character constructor 
    // Player class will inherit from Character class
    constructor(name = '') {
        // passes the name argument to the constructor() of the Character class,
        // where name and other properties like health are officially defined
        super(name); 
        // removing name, health, strength, and agility bc of inheritance
        // this.name = name;

        // this.health = Math.floor(Math.random() * 10 + 95);
        // this.strength = Math.floor(Math.random() * 5 + 7);
        // this.agility = Math.floor(Math.random() * 5 + 7);

        this.inventory = [new Potion('health'), new Potion()];
    }
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }
    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    }
    addPotion(potion) {
        this.inventory.push(potion);
    }
    usePotion(index) {
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
    }

}

// inherit prototype methods from Character
Player.prototype = Object.create(Character.prototype);

module.exports = Player;


// refactored old code

// function Player(name = '') {
//     // name parameter sets a default empty string if no name is provided
//     this.name = name;

//     this.health = Math.floor(Math.random() * 10 + 95);
//     this.strength = Math.floor(Math.random() * 5 + 7);
//     this.agility = Math.floor(Math.random() * 5 + 7);

//     this.inventory = [new Potion('health'), new Potion()];

//     // // returns the inventory array or false if empty
//     // this.getInventory = function() {
//     //     if (this.inventory.length) {
//     //         return this.inventory;
//     //     }
//     //     return false;
//     // };
// }

// inherit prototype methods from Character
// Player.prototype = Object.create(Character.prototype);
// adding down here as Protoypes as part of refactoring
// prototype is the best way to add a method to a constructor function
// Player.prototype.getStats = function() {
//     return {
//         potions: this.inventory.length,
//         health: this.health,
//         strength: this.strength,
//         agility: this.agility
//     };
// };


// returns the inventory array or false if empty
// Player.prototype.getInventory = function() {
//     if (this.inventory.length) {
//         return this.inventory;
//     }
//     return false;
// };

// Player.prototype.addPotion = function(potion) {
//     this.inventory.push(potion);
// };

// Player.prototype.usePotion = function(index) {
//     /** The .splice() method removes items from an array and returns the removed item(s)
//      * as a new array
//     two things are happening here:
//     1. original inventory array has a single Potion removed at the specified
//     index value and put into a new "removed items" array
//     2. then the Potion at index [0] of this "removed items" array is saved in a potion variable
//     **/
//     const potion = this.getInventory().splice(index, 1)[0];

//     switch (potion.name) {
//         case 'agility':
//             this.agility += potion.value;
//             break;
//         case 'health':
//             this.health += potion.value;
//             break;
//         case 'strength':
//             this.strength += potion.value;
//             break;
//     }
// };
