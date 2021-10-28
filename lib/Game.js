const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = []; // new Array();
    this.currentEnemy; // currently undefined
    this.player; // Will assign when the initializeGame() method is called
}

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];

    inquirer
    .prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?'
    })
    // destructure name from prompt object
    .then(({ name }) => {
        this.player = new Player(name);

        // test object creation
        // console.log(this.currentEnemy, this.player);

        // kick off the first battle and then
        // called again anytime a new round starts
        this.startNewBattle();
    });
};

Game.prototype.startNewBattle = function() {
    // player's turn depends on who has higher agility
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    console.log('Your stats are as follows:');
    console.log(this.player.getStats());

    console.log(this.currentEnemy.getDescription());

    // responsible for each individual turn in the round
    // The battle() method is the main event of the game that
    // will run an indefinite number of times
    this.battle();
};

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then (({ action }) => {
                if (action === 'Use potion') {
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return;
                    }

                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            // We're using that index to create a human-readable number for the user.
                            // Many users might not know that arrays start at 0, 1 will make more sense
                            // We can always subtract 1 later to get the true value
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({ action }) => {
                            const potionDetails = action.split(': '); // pull out index number only 

                            this.player.usePotion(potionDetails[0] - 1); // - 1 to account for adding 1 in choices above
                            console.log(`You used a ${potionDetails[1]} potion`);
                        })
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                }

            });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};

module.exports = Game;