// All of the global variables

let save;

// Sliders for changing the colour of the player
let sliderR;
let sliderG;
let sliderB;

// Canvas stuff
let cnv;
let cnv_x;
let cnv_y;

// Obstacle list
let obstacle_list = [];

// Enemy List
let enemy_list = [];

// Level number tracker
let level_count = 0;

let level_num = 0;

// Gameboard object
let gameboard = {
    // This is the first object that I made so the method here is called update, but in future objects it is called show
    update: function() {
        // Grid
        for (var x = 0; x < width; x += width / 10) {
            for (var y = 0; y < height; y += height / 10) {
                stroke(0);
                strokeWeight(1);
                line(x, 0, x, height);
                line(0, y, width, y);
            }
        }
    }
}

// Player object, this is the biggest boi
let player = {
    // Initial player co-ordinates
    x: 180,
    y: 340,

    // Prevous player values that will be used for a future update introducing the undo button
    prev_x: 180,
    prev_y: 340,

    // Width of the player rectangle
    player_width: 20,

    // These values are used so that the program is more robust, I can just re-use these values whenever I want to change the position or atk stat of the player
    move_val: 40,
    blink_val: 80,
    attack_val: 5,

    // Default RGB values
    red: 177,
    green: 39,
    blue: 219,

    // Default values for moves left
    up_moves_left: 2,
    down_moves_left: 2,
    left_moves_left: 2,
    right_moves_left: 2,

    // Default values for blinks left
    up_blinks_left: 2,
    down_blinks_left: 2,
    left_blinks_left: 2,
    right_blinks_left: 2,

    // Method that draws the player in one of the cells
    show: function() {
        // Draws the player rectangle
        fill(this.red, this.green, this.blue);
        noStroke();
        rect(this.x - (this.player_width / 2), this.y - (this.player_width / 2), this.player_width);

        // Shows the number of moves left for each type of movement avaliable
        document.getElementById('upMovesLeft').innerHTML = this.up_moves_left;
        document.getElementById('downMovesLeft').innerHTML = this.down_moves_left;
        document.getElementById('leftMovesLeft').innerHTML = this.left_moves_left;
        document.getElementById('rightMovesLeft').innerHTML = this.right_moves_left;

        document.getElementById('upBlinksLeft').innerHTML = this.up_blinks_left;
        document.getElementById('downBlinksLeft').innerHTML = this.down_blinks_left;
        document.getElementById('leftBlinksLeft').innerHTML = this.left_blinks_left;
        document.getElementById('rightBlinksLeft').innerHTML = this.right_blinks_left;

        // Shows the attack value for that level
        document.getElementById('attack-power').innerHTML = this.attack_val;
    },
    
    // Movement logic
    moveRight: function() {
        // Gets the span element from the document and displays the number of moves left after the function is called
        document.getElementById('rightMovesLeft').innerHTML = this.right_moves_left;

        // Checks if the player has moves of this kind left
        if (this.right_moves_left > 0) {

            // Checks the positions of all the enemies against the position of the player
            for (let i = 0; i < enemy_list.length; i++) {
                if (this.x == enemy_list[i].x - 40 && this.y == enemy_list[i].y) {
                    alert("You cannot move there, an enemy stands in your way!");
                    this.x = this.x - 40;
                }
            }

            // Same check but for all the obstacles
            for (let i = 0; i < obstacle_list.length; i++) {
                if (this.x == obstacle_list[i].x - 40 && this.y == obstacle_list[i].y) {
                    alert("You cannot move there, an obstacle is blocking your way!");
                    this.x = this.x - 40;
                }
            }
            
            // Moves the player and updates the number of moves left
            this.prev_x = this.x;
            this.x = this.x + this.move_val;
            this.right_moves_left = this.right_moves_left - 1;
            document.getElementById('rightMovesLeft').innerHTML = this.right_moves_left;

        } else {
            alert("No moves of this kind are left, either try a different move, or restart the level.");
        }

    },
    moveLeft: function() {
        document.getElementById('leftMovesLeft').innerHTML = this.left_moves_left;

        if (this.left_moves_left > 0) {
            for (let i = 0; i < enemy_list.length; i++) {
                if (this.x == enemy_list[i].x + 40 && this.y == enemy_list[i].y) {
                    alert("You cannot move there, an enemy stands in your way!");
                    this.x = this.x + 40;
                }
            }
            
            for (let i = 0; i < obstacle_list.length; i++) {
                if (this.x == obstacle_list[i].x + 40 && this.y == obstacle_list[i].y) {
                    alert("You cannot move there, an obstacle is blocking your way!");
                    this.x = this.x + 40;
                }
            }
            
            this.prev_x = this.x;
            this.x = this.x - this.move_val;
            this.left_moves_left = this.left_moves_left - 1;
            document.getElementById('leftMovesLeft').innerHTML = this.left_moves_left;

        } else {
            alert("No moves of this kind are left, either try a different move, or restart the level.");
        }
        
    },
    moveUp: function() {
        document.getElementById('upMovesLeft').innerHTML = this.up_moves_left;

        if (this.up_moves_left > 0) {
            for (let i = 0; i < enemy_list.length; i++) {
                if (this.y == enemy_list[i].y + 40 && this.x == enemy_list[i].x) {
                    alert("You cannot move there, an enemy stands in your way!");
                    this.y = this.y + 40;
                }
            }

            for (let i = 0; i < obstacle_list.length; i++) {
                if (this.y == obstacle_list[i].y + 40 && this.x == obstacle_list[i].x) {
                    alert("You cannot move there, an obstacle is blocking your way!");
                    this.y = this.y + 40;
                }
            }

            this.prev_y = this.y;
            this.y = this.y - this.move_val;
            this.up_moves_left = this.up_moves_left - 1;
            document.getElementById('upMovesLeft').innerHTML = this.up_moves_left;
            
        } else {
            alert("No moves of this kind are left, either try a different move, or restart the level.");
        }
        
    },
    moveDown: function() {
        document.getElementById('downMovesLeft').innerHTML = this.down_moves_left;

        if (this.down_moves_left > 0) {
            for (let i = 0; i < enemy_list.length; i++) {
                if (this.y == enemy_list[i].y - 40 && this.x == enemy_list[i].x) {
                    alert("You cannot move there, an enemy stands in your way!");
                    this.y = this.y - 40;
                }
            }

            for (let i = 0; i < obstacle_list.length; i++) {
                if (this.y == obstacle_list[i].y - 40 && this.x == obstacle_list[i].x) {
                    alert("You cannot move there, an obstacle is blocking your way!");
                    this.y = this.y - 40;
                }
            }

            this.prev_y = this.y;
            this.y = this.y + this.move_val;
            this.down_moves_left = this.down_moves_left - 1;
            document.getElementById('downMovesLeft').innerHTML = this.down_moves_left;
            
        } else {
            alert("No moves of this kind are left, either try a different move, or restart the level.");
        }

    },

    // Blink logic
    // In terms of talking to the HTML, it works in the same way as the normal movement logic
    blinkRight: function() {
        document.getElementById('rightBlinksLeft').innerHTML = this.right_blinks_left;

        // Doesn't run checks for objects or enemies because the player is supposed to be able to blink on and past them
        if (this.right_blinks_left > 0) {
            this.x = this.x + this.blink_val;
            this.right_blinks_left = this.right_blinks_left - 1;
            document.getElementById('rightBlinksLeft').innerHTML = this.right_blinks_left;
        } else {
            alert("No moves of this kind are left, either try a different move, or restart the level.");
        }

    },
    blinkLeft: function() {
        document.getElementById('leftBlinksLeft').innerHTML = this.left_blinks_left;
        if (this.left_blinks_left > 0) {
            this.x = this.x - this.blink_val;
            this.left_blinks_left = this.left_blinks_left - 1;
            document.getElementById('leftBlinksLeft').innerHTML = this.left_blinks_left;
        } else {
            alert("No moves of this kind are left, either try a different move, or restart the level.");
        }

    },
    blinkUp: function() {
        document.getElementById('upBlinksLeft').innerHTML = this.up_blinks_left;
        if (this.up_blinks_left > 0) {
            this.y = this.y - this.blink_val;
            this.up_blinks_left = this.up_blinks_left - 1;
            document.getElementById('upBlinksLeft').innerHTML = this.up_blinks_left;
        } else {
            alert("No moves of this kind are left, either try a different move, or restart the level.");
        } 

    },
    blinkDown: function() {
        document.getElementById('downBlinksLeft').innerHTML = this.down_blinks_left;
        if (this.down_blinks_left > 0) {
            this.y = this.y + this.blink_val;
            this.down_blinks_left = this.down_blinks_left - 1;
            document.getElementById('downBlinksLeft').innerHTML = this.down_blinks_left;
        } else {
            alert("No moves of this kind are left, either try a different move, or restart the level.");
        }

    },

    attack: function() {
        let enemyFound = false;
        for (let i = 0; i < enemy_list.length; i++) {
            if (this.x == enemy_list[i].x + 40 || this.x == enemy_list[i].x - 40 || this.x == enemy_list[i].x) {
                if (this.y == enemy_list[i].y + 40 || this.y == enemy_list[i].y - 40 || this.y == enemy_list[i].y) {
                    enemy_list[i].health = enemy_list[i].health - this.attack_val;
                    enemyFound = true;
                }
            }
        }

        if (enemyFound == false) {
            alert("No adjacent enemies found, what are you even trying to attack?");
        }
    }
}

// Not that interesting, works the same way as the other objects
let success_tile = {
    x: 220,
    y: 20,

    success_tile_width: 15,

    sucess_text_width: 160,
    success_text_height: 45,

    button_width: 80,
    button_height: 40,

    // Mouse check is false by default
    mouseCheck: false,

    show: function() {
        fill(39, 219, 87);
        rect(this.x - (this.success_tile_width / 2), this.y - (this.success_tile_width / 2), this.success_tile_width)
    },

    // Method that displays the success screen which is just an overlayed rectangle with reduced opacity and some text
    success_screen: function() {
        fill(10, 90);
        rect(0, 0, 400, 400);

        fill(47, 224, 65);
        textSize(28);
        text('Level Clear!', (400 - this.sucess_text_width) / 2, (400 - this.success_text_height) / 2, this.sucess_text_width, this.success_text_height);
    },

    // Not really a button, but does its job fine
    continue_button: function() {
        fill(47, 224, 65);
        textSize(20);
        text('click anywhere to continue', (400 - this.sucess_text_width) / 2, (400 - this.success_text_height) / 2 + 40, this.sucess_text_width, this.success_text_height);
        this.mouseCheck = true;
    },

    increment: function() {
        level_count++;
        console.log(level_count);
    }
}

// Obstacle is a class that has a constructor function
// This allows me to spawn as many as I like and talk to each one individually if I want
class Obstacle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.obstacle_width = 15;
    }

    show () {
        fill(0);
        noStroke();
            rect(this.x - (this.obstacle_width / 2), this.y - (this.obstacle_width / 2), this.obstacle_width);
    }

    // Makes the obstacle commit existn't
    destroy () {
        this.x = null;
        this.y = null;
        this.obstacle_width = null;
    }
}

// Same as object, its a class with a constructor function so I can spawn as many as I like
class Enemy {
    constructor (health, x, y) {
        this.health = health;
        this.x = x;
        this.y = y;

        this.enemy_width = 15;

        this.isAlive = true;
    }
    
    show () {
        if (this.isAlive == true) {
            fill(255, 16, 60);
            noStroke();
            rect(this.x - (this.enemy_width / 2), this.y - (this.enemy_width / 2), this.enemy_width);
            textSize(12);   
            text("HP: " + this.health, this.x - 15, this.y - 10);

            // Checks if the enemy is dead, if it is, then it nullifies all of the properties so it existn't
            if (this.health <= 0) {
                this.isAlive = false;
                this.x = null;
                this.y = null;
                this.health = null;
            }
        }
    }

    destroy () {
        this.x = null;
        this.y = null;
        this.enemy_width = null;
    }
}

// Here I use arrow notation for functions that I have created (functions that are not part of p5.js)
// This allows for me, and anyone else reading the code to easily distinguish p5.js functions from my own
level1 = () => {
    // Code for level 1
    // Set the location of the success tile
    success_tile.x = 180;
    success_tile.y = 20;
    
    // Set the number of moves left that the player can use
    player.up_blinks_left = 3;
    player.right_blinks_left = 1;
    player.left_blinks_left = 1;
    player.down_blinks_left = 0;

    player.up_moves_left = 2;
    player.down_moves_left = 0;
    player.left_moves_left = 0;
    player.right_moves_left = 0;

    obstacle_list.push(new Obstacle(180, 220), new Obstacle(220, 220), new Obstacle(140, 220));
}

level2 = () => {
    // Code for level 2
    success_tile.x = 300;
    success_tile.y = 100;

    player.x = 180;
    player.y = 340;

    player.up_blinks_left = 2;
    player.right_blinks_left = 2;
    player.left_blinks_left = 1;
    player.down_blinks_left = 0;

    player.up_moves_left = 5;
    player.down_moves_left = 5;
    player.left_moves_left = 5;
    player.right_moves_left = 5;

    obstacle_list.push(new Obstacle(260, 100), new Obstacle(340, 100), new Obstacle(260, 60), new Obstacle(340, 60), new Obstacle(300, 60), new Obstacle(260, 140), new Obstacle(340, 140));
    enemy_list.push(new Enemy(5, 300, 140));

}

level3 = () => {
    // Code for level 3
    success_tile.x = 180;
    success_tile.y = 220;

    player.x = 180;
    player.y = 340;

    player.up_blinks_left = 1;
    player.right_blinks_left = 0;
    player.left_blinks_left = 0;
    player.down_blinks_left = 0;

    player.up_moves_left = 1;
    player.down_moves_left = 1;
    player.left_moves_left = 0;
    player.right_moves_left = 0;

    obstacle_list.push(
        new Obstacle(success_tile.x - 40, success_tile.y),
        new Obstacle(success_tile.x + 40, success_tile.y),
        new Obstacle(success_tile.x - 40, success_tile.y - 40),
        new Obstacle(success_tile.x, success_tile.y - 40),
        new Obstacle(success_tile.x + 40, success_tile.y - 40),
        new Obstacle(success_tile.x + 40, success_tile.y + 40),
        new Obstacle(success_tile.x, success_tile.y + 40),
        new Obstacle(success_tile.x - 40, success_tile.y + 40));

        enemy_list.push(new Enemy(10, 180, 300));
}

level4 = () => {
    // Code for level4
    success_tile.x = 20;
    success_tile.y = 20;

    player.x = 380;
    player.y = 380;

    player.up_blinks_left = 4;
    player.right_blinks_left = 0;
    player.left_blinks_left = 4;
    player.down_blinks_left = 0;

    player.up_moves_left = 1;
    player.down_moves_left = 1;
    player.left_moves_left = 1;
    player.right_moves_left = 1;

    obstacle_list.push(new Obstacle(success_tile.x + 40, success_tile.y + 40), new Obstacle(success_tile.x + 40, success_tile.y), new Obstacle(success_tile.x, success_tile.y + 40),
    new Obstacle(300, 340), new Obstacle(340, 300), new Obstacle(380, 300), new Obstacle(300, 380), new Obstacle(300, 300));
    enemy_list.push(new Enemy(5, 340, 340), new Enemy(5, 340, 380), new Enemy(5, 380, 340));
}

level5 = () => {
    // Code for level5
    success_tile.x = 140;
    success_tile.y = 260;

    player.x = 220;
    player.y = 380;

    player.up_blinks_left = 1;
    player.right_blinks_left = 0;
    player.left_blinks_left = 0;
    player.down_blinks_left = 0;

    player.up_moves_left = 1;
    player.down_moves_left = 0;
    player.left_moves_left = 1;
    player.right_moves_left = 2;

    // Makes a line of obstacles above the player
    for (let i = 20; i < 400; i+=40) {
        obstacle_list.push(new Obstacle(i, 340));
    }

    enemy_list.push(new Enemy(1, 180, 300), 
    new Enemy(1, 180, 260), 
    new Enemy(1, 180, 220), 
    new Enemy(1, 220, 220), 
    new Enemy(1, 260, 220), 
    new Enemy(1, 260, 260),
    new Enemy(1, 260, 300),
    new Enemy(1, 220, 300));
    
}

// Saves your progress
function saveGame() {
    save = {
        level_count: level_count
    }
    window.localStorage.setItem('save', JSON.stringify(save));
    console.log("Game Saved!")
}

function load() {
    let mySave = JSON.parse(window.localStorage.getItem('save'));
    if (typeof mySave.level_count !== 'undefined') {
        level_count = mySave.level_count;
    }
}

deleteSave = () => {
    save.level_count = 0;
    window.localStorage.setItem('save', JSON.stringify(save));
    console.log('Save data deleted :O');
}

load();

// Nullify function removes all of the properties of all the objects so that they can be replaced in the next level
// This avoids all the levels being displayed at the same time.
nullify = () => {
    for (let i = 0; i < obstacle_list.length; i++) {
        obstacle_list[i].destroy();
    }

    for (let i = 0; i < enemy_list.length; i++) {
        enemy_list[i].destroy();
    }
}

// Checks which level should be run based on the level_count
level_check = () => {
    if (level_count == 0) {
        saveGame();
        level1();
        console.log("level1");
    } else if (level_count == 2) {
        // Nullify function is used to wipe the old objects that they are not drawn on top of the level2 objects
        nullify();
        level2();
        console.log("level2");
    } else if (level_count == 4) {
        nullify();
        level3();
        console.log("level3")
    } else if (level_count == 6) {
        nullify();
        level4();
    } else if (level_count == 8) {
        nullify();
        level5();
        saveGame();
    }
}

// p5.js listener which detects a mouse click
function mouseClicked() {
    // Only does something if the player is on the success_tile
    if (player.x == success_tile.x && player.y == success_tile.y) {
        success_tile.increment();
    }
}

if (success_tile.mouseCheck) {
    success_tile.increment();
    console.log(level_count);
}

// Just centers the canvas
function centerCanvas() {
    cnv_x = (windowWidth - width) / 2;
    cnv_y = 340;
    cnv.position(cnv_x, cnv_y);
  }

// When the window is resized, the canvas location is adjusted so that its centered
function windowResized() {
    centerCanvas();
}

// Only runs once, compared to the draw() function which runs continuosly
function setup() {
    cnv = createCanvas(400, 400);
    centerCanvas();

    sliderR = createSlider(0, 255, 177);
    sliderG = createSlider(0, 255, 39);
    sliderB = createSlider(0, 255, 219);

    sliderR.position(cnv_x, cnv_y + 410);
    sliderG.position(cnv_x, cnv_y + 430);
    sliderB.position(cnv_x, cnv_y + 450);
}

// Function is run before the draw() function so that the first level can be loaded by default
level_check();

// Runs continuously
function draw() {
    background(220);
    
    // Makes the gameboard first so that everything else is on top
    gameboard.update();
    
    // Displays the success tile
    success_tile.show();

    // Shows the player
    player.show();

    // Runs through the list of obstacles and displays all of them
    for (let i = 0; i < obstacle_list.length; i++) {
        obstacle_list[i].show();
    }

    // Runs through the list of enemies and displays all of them
    for (let i = 0; i < enemy_list.length; i++) {
        enemy_list[i].show();
    }  

    // Checks if the player has reached the success tile and then displays the success screen, button and runs the level check
    if (player.x == success_tile.x && player.y == success_tile.y) {
        success_tile.success_screen();
        success_tile.continue_button();
        level_check();
    }

    // Simple position check which ensures that the player cannot leave the gameboard
    if (player.y < 0) {
        player.y = 20;
    } else if (player.x < 0) {
        player.x = 20;
    } else if (player.y > 400) {
        player.y = 380;
    } else if (player.x > 400) {
        player.x = 380;
    }

    // Updates the values of the RGB variables according to the values of the sliders
    player.red = sliderR.value();
    player.green = sliderG.value();
    player.blue = sliderB.value();
}
