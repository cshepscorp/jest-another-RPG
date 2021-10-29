class Potion { // replaced 'function' keyword with 'class'
    constructor(name) { // moved 'name' param into nested 'constructor' method
        this.types = ['strength', 'agility', 'health'];

        this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

        if(this.name === 'health') {
            // if the potion is a health potion, its value is a number between 30 and 40
            this.value = Math.floor(Math.random() * 10 + 30);
        } else {
            // take in a name parameter and assign the value property
            // to be a random number between 7 and 12
            this.value = Math.floor(Math.random() * 5 + 7);
        }
    }
}

module.exports = Potion;

// we refactored this into a class above
// function Potion(name) {
//     this.types = ['strength', 'agility', 'health'];
//     // if name is truthy—that is to say, it can be coerced to true—then this.name = name.
//     // If name is not truthy, then 
//     // this.name = this.types[Math.floor(Math.random() * this.types.length)]
//     // or a random type of potion
//     this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

//     if(this.name === 'health') {
//         // if the potion is a health potion, its value is a number between 30 and 40
//         this.value = Math.floor(Math.random() * 10 + 30);
//     } else {
//         // take in a name parameter and assign the value property
//         // to be a random number between 7 and 12
//         this.value = Math.floor(Math.random() * 5 + 7);
//     }
// }