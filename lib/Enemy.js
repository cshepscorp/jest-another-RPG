const Potion = require('./Potion');
const Character = require('./Character');

class Enemy extends Character {
    constructor(name, weapon) {
        // passes the name argument to the constructor() of the Character class,
        // where name and other properties like health are officially defined
        super(name);
        // removing name, health, strength, and agility bc of inheritance
        // this.name = name;
        this.weapon = weapon;
        this.potion = new Potion();

        // this.health = Math.floor(Math.random() * 10 + 85);
        // this.strength = Math.floor(Math.random() * 5 + 5);
        // this.agility = Math.floor(Math.random() * 5 + 5); 
    }
    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    }

}

module.exports = Enemy;

// old refactored code
// function Enemy(name, weapon) {
//     this.name = name;
//     this.weapon = weapon;
//     this.potion = new Potion();

//     this.health = Math.floor(Math.random() * 10 + 85);
//     this.strength = Math.floor(Math.random() * 5 + 5);
//     this.agility = Math.floor(Math.random() * 5 + 5);  
// }

// Enemy.prototype = Object.create(Character.prototype);

// Enemy.prototype.getDescription = function() {
//     return `A ${this.name} holding a ${this.weapon} has appeared!`;
// };