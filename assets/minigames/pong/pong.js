/* initialise the Phaser library and setup our scene */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

/* game has two states, prepare to play and gameplay itself */
const gameState = {
    PLAY: "play",
    PREPARE: "prepare",
}

let state = gameState.PREPARE;

function preload() {
    /* load images, sounds and setup keyboard input */
    this.load.image('ball', 'assets/ball.png');
    this.load.image('area', 'assets/area.png');
    this.load.image('paddle', 'assets/paddle.png');

    this.load.image('win', 'assets/win.png');
    this.load.image('lose', 'assets/lose.png');

    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    this.load.audio('hit', 'assets/hit.wav');
    this.load.audio('serve', 'assets/serve.wav');
    this.load.audio('lose', 'assets/lose.wav');
    this.load.audio('win', 'assets/win.wav');
}

var hit;

/* determines if the ai will win or lose < 3 is too slow to win >= 3 will always win */
var aiSpeed = 3;

/* needs refactoring, should not use global variable for playing a sound */
var hit;

function create() {

    /* initialise physics variables and setup sprites to starting positions */
    hit = this.sound.add('hit');
    serve = this.sound.add('serve');
    win = this.sound.add('win');
    lose = this.sound.add('lose');

    area = this.add.sprite(400, 300, 'area');

    ball = this.physics.add.sprite(70, 300, 'ball');
    ball.setCollideWorldBounds(true);
    ball.setBounce(1.0);
    ball.setVelocityX(200);
    ball.setVelocityY(200);

    paddle = this.physics.add.sprite(32, 300, 'paddle').setImmovable(true);
    paddle.setCollideWorldBounds(true);

    /* Call hit paddle function when ball and paddles collide */
    this.physics.add.collider(ball, paddle, hitPaddle, null, this);

    paddle2 = this.physics.add.sprite(768, 300, 'paddle').setImmovable(true);
    paddle2.setCollideWorldBounds(true);
    this.physics.add.collider(ball, paddle2, hitPaddle, null, this);

    /* Load text for win / lose state. Set text to invisible initially */
    winText = this.add.sprite(400, 100, 'win');
    loseText = this.add.sprite(400, 500, 'lose');

    winText.visible = false;
    loseText.visible = false;

}

function update() {
    if (keyUp.isDown) {
        paddle.y -= 4;
    }

    if (keyDown.isDown) {
        paddle.y += 4;
    }

    /* Ball did not collide with paddles so determine winner */
    if (ball.x < paddle.x) {
        state = gameState.PREPARE;
        console.log("Player 1 lost");
        loseText.visible = true;
        ball.x = 70;
        lose.play();
    }

    if (ball.x > paddle2.x) {
        state = gameState.PREPARE;
        console.log("Player 2 lost");
        winText.visible = true;
        ball.x = 70;
        win.play();
    }

    /* ball is stuck to player 1 paddle during preparation for play 
       allowing player 1 to "serve" the ball */
    if (state === gameState.PREPARE) {
        ball.setVelocityX(0);
        ball.setVelocityY(0);

        ball.y = paddle.y;

        if (keySpace.isDown) {
            state = gameState.PLAY;
            ball.setVelocityX(200);
            ball.setVelocityY(-200);

            winText.visible = false;
            loseText.visible = false;

            serve.play();

            /* Before the ball is served, a random number is generated to determine
               how difficult the AI opponent will be. More times than not, the AI will be difficult
               but the game is still pretty winable */
            if (Math.floor(Math.random() * 5) === 2) {
                aiSpeed = 2;
                console.log("AI will lose");
            } else {
                aiSpeed = 3;
                console.log("AI will win!!");
            }
        }

    }

    /* if the ball is in play, the ai will move the opponets paddle */
    if (state === gameState.PLAY) {
        ai();
    }
}

function ai() {
    /* Player 2 paddle movement is based on the position of the ball */
    if (paddle2.y < ball.y) {
        paddle2.y += aiSpeed;
    }

    if (paddle2.y > ball.y) {
        paddle2.y -= aiSpeed;
    }


    /* Prevent player2 paddle from moving beyond the playfield */
    if (paddle2.y < 64) {
        paddle2.y = 64;
    }

    if (paddle2.y > 536) {
        paddle2.y = 536;
    }
}

function hitPaddle () {
    hit.play();
}