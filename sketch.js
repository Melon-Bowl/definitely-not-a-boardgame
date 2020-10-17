// The only global variables that I define.
let sliderR;
let sliderG;
let sliderB;

let cnv;
let cnv_x;
let cnv_y;

let obstacle_list = [];
let obstacle1;
let obstacle2;
let obstacle3;
let obstacle4;
let obstacle5;
let obstacle6;
let obstacle7;
let obstacle8;
let obstacle9;
let obstacle10;


let enemy_list = [];
let enemy1;

let level_count;
level_count = 0;

let gameboard = {
    update: function() {
        // Grid
        for (var x = 0; x < width; x += width / 10) {
            for (var y = 0; y < height; y += height / 10) {
                stroke(0);
                strokeWeight(1);
                line(x, 0, x, height);
                line(0, y, width, y);
            }
    }}
}


let player = {
    // Method that lets the player move
    // Initial player co-ordinates
    x: 180,
    y: 340,

    prev_x: 180,
    prev_y: 340,

    player_width: 20,
    move_val: 40,
    blink_val: 80,

    attack_val: 5,

    red: 177,
    green: 39,
    blue: 219,

    up_moves_left: 2,
    down_moves_left: 2,
    left_moves_left: 2,
    right_moves_left: 2,

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

        if (this.right_moves_left > 0) {
            for (let i = 0; i < enemy_list.length; i++) {
                if (this.x == enemy_list[i].x - 40 && this.y == enemy_list[i].y) {
                    alert("You cannot move there, an enemy stands in your way!");
                    this.x = this.x - 40;
                }
            }

            for (let i = 0; i < obstacle_list.length; i++) {
                if (this.x == obstacle_list[i].x - 40 && this.y == obstacle_list[i].y) {
                    alert("You cannot move there, an obstacle is blocking your way!");
                    this.x = this.x - 40;
                }
            }
            
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
        if (this.x == enemy1.x + 40 || this.x == enemy1.x - 40 || this.x == enemy1.x) {
            if (this.y == enemy1.y + 40 || this.y == enemy1.y - 40 || this.y == enemy1.y) {
                enemy1.health = enemy1.health - this.attack_val;
            } else {
                alert("No adjacent enemies, what are you even trying to attack?");
            }
        } else {
            alert("No adjacent enemies, what are you even trying to attack?");
        }
    }
}

// Obstacle uses a contructor function so that I can spawn as many as I like
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

    destroy () {
        this.x = null;
        this.y = null;
        this.obstacle_width = null;
    }
}

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


let success_tile = {
    x: 220,
    y: 20,

    success_tile_width: 15,

    sucess_text_width: 160,
    success_text_height: 45,

    button_width: 80,
    button_height: 40,

    mouseCheck: false,

    show: function() {
        fill(39, 219, 87);
        rect(this.x - (this.success_tile_width / 2), this.y - (this.success_tile_width / 2), this.success_tile_width)
    },

    success_screen: function() {
        fill(10, 90);
        rect(0, 0, 400, 400);
        fill(47, 224, 65);
        textSize(28);
        text('Level Clear!', (400 - this.sucess_text_width) / 2, (400 - this.success_text_height) / 2, this.sucess_text_width, this.success_text_height);
    },

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

    // Set the position of the obstacles
    obstacle1 = new Obstacle(180, 220);
    obstacle_list.push(obstacle1);

    obstacle2 = new Obstacle(220, 220);
    obstacle_list.push(obstacle2);

    obstacle3 = new Obstacle(140, 220);
    obstacle_list.push(obstacle3);
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

    obstacle1 = new Obstacle(260, 100);
    obstacle_list.push(obstacle1);

    obstacle2 = new Obstacle(340, 100);
    obstacle_list.push(obstacle2);

    obstacle3 = new Obstacle(260, 60);
    obstacle_list.push(obstacle3);

    obstacle4 = new Obstacle(340, 60);
    obstacle_list.push(obstacle4);

    obstacle5 = new Obstacle(300, 60);
    obstacle_list.push(obstacle5);

    obstacle6 = new Obstacle(260, 140);
    obstacle_list.push(obstacle6);

    obstacle7 = new Obstacle(340, 140);
    obstacle_list.push(obstacle7);

    enemy1 = new Enemy(5, 300, 140);
    enemy_list.push(enemy1);

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

    // To the right
    obstacle1 = new Obstacle(success_tile.x - 40, success_tile.y);
    obstacle_list.push(obstacle1);

    // To the left
    obstacle2 = new Obstacle(success_tile.x + 40, success_tile.y);
    obstacle_list.push(obstacle2);

    // Top left
    obstacle3 = new Obstacle(success_tile.x - 40, success_tile.y - 40);
    obstacle_list.push(obstacle3);

    // Top middle
    obstacle4 = new Obstacle(success_tile.x, success_tile.y - 40);
    obstacle_list.push(obstacle4);

    // Top right
    obstacle5 = new Obstacle(success_tile.x + 40, success_tile.y - 40);
    obstacle_list.push(obstacle5);

    // Bottom right
    obstacle6 = new Obstacle(success_tile.x + 40, success_tile.y + 40);
    obstacle_list.push(obstacle6);

    // Bottom middle
    obstacle7 = new Obstacle(success_tile.x, success_tile.y + 40);
    obstacle_list.push(obstacle7);

    // Bottom left
    obstacle8 = new Obstacle(success_tile.x - 40, success_tile.y + 40);
    obstacle_list.push(obstacle8);

    enemy1 = new Enemy(10, 180, 300);
    enemy_list.push(enemy1);
}

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


level_check = () => {
    if (level_count == 0) {
        level1();
        console.log("level1");
    } else if (level_count == 2) {
        nullify();
        level2();
        console.log("level2");
    } else if (level_count == 4) {
        nullify();
        level3();
        console.log("level3")
    }
}

function centerCanvas() {
    cnv_x = (windowWidth - width) / 2;
    cnv_y = 340;
    cnv.position(cnv_x, cnv_y);
  }

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

function windowResized() {
    centerCanvas();
}

function mouseClicked() {
    if (player.x == success_tile.x && player.y == success_tile.y) {
        success_tile.increment();
    }
}

if (success_tile.mouseCheck) {
    success_tile.increment();
    console.log(level_count);
}

level_check();

function draw() {
    background(220);   
    gameboard.update();
    
    success_tile.show();

    player.show();

    for (let i = 0; i < obstacle_list.length; i++) {
        obstacle_list[i].show();
    }

    for (let i = 0; i < enemy_list.length; i++) {
        enemy_list[i].show();
    }  

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

    player.red = sliderR.value();
    player.green = sliderG.value();
    player.blue = sliderB.value();
}
