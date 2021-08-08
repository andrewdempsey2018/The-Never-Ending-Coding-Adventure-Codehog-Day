/* initialise Phaser library. Set the screen size and add physics to the game world */

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

/* game is an instance of a Phaser scene */
var game = new Phaser.Game(config);

/* two states, ball moving and lsing state where player launches ball */
const gameState = {
    PLAY: "play",
    PREPARE: "prepare",
};

/* initial state, player will launch ball */
let state = gameState.PREPARE;

/* load graphics assets, sounds and initialise player input variables */
function preload() {
    this.load.image('ball', 'assets/ball.png');
    this.load.image('paddle', 'assets/paddle.png');

    this.load.image('redbrick', 'assets/redbrick.png');
    this.load.image('yellowbrick', 'assets/yellowbrick.png');
    this.load.image('greenbrick', 'assets/greenbrick.png');
    this.load.image('bluebrick', 'assets/bluebrick.png');
    this.load.image('purplebrick', 'assets/purplebrick.png');
    this.load.image('pinkbrick', 'assets/pinkbrick.png');

    this.load.json('level', 'assets/level.json');

    cursors = this.input.keyboard.createCursorKeys();

    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    this.load.audio('hit', 'assets/hit.wav');
}

/* BAD CODE (maybe?) the hit sound is a global variable so it can be used in the "killBrick function */
var hit;

/* initialise the level, assets and physics of the game world */
function create() {

    hit = this.sound.add('hit');

    ball = this.physics.add.sprite(400, 500, 'ball');
    ball.setCollideWorldBounds(true);
    ball.setBounce(1.0);
    ball.setVelocityX(200);
    ball.setVelocityY(200);

    paddle = this.physics.add.sprite(400, 580, 'paddle').setImmovable(true);

    this.physics.add.collider(ball, paddle);

    bricks = this.physics.add.staticGroup();

    let levelData = this.cache.json.get('level');

    let level = levelData.bricks.map(brick => bricks.create(brick.x, brick.y, brick.name));

    /* when a collision is detected between the ball and a brick, the killBrick function fires
    the ball bounces, the brick is destroyed and the 'hit' sound plays */
    this.physics.add.collider(ball, bricks, killBrick, null, this);

}

/* handle things that happen constantly suring the game loop such as player input and moving sprites */
function update() {
    if (keyLeft.isDown) {
        paddle.x -= 3; //horizontal position of the paddle is reduced
    }

    if (keyRight.isDown) {
        paddle.x += 3; //horizontal position of the paddle is increased
    }

    /* vertical position of the ball is under the paddle, so the player has missed the ball,
       trigger game lose state */
    if (ball.y > paddle.y) {
        state = gameState.PREPARE;
        console.log("Player dropped the ball");
        ball.y = 500;
    }

    /* game lose state, ball velocity is zero, ball is fixed to the position of the paddle so the
       player can pick where to launch. Player launches the ball with spacebar, thereby setting the balls velocity
       to maximum */
    if (state === gameState.PREPARE) {
        ball.setVelocityX(0);
        ball.setVelocityY(0);

        ball.x = paddle.x;

        if (keySpace.isDown) {
            state = gameState.PLAY;
            ball.setVelocityX(200);
            ball.setVelocityY(-200);
        }

    }

    if (state === gameState.PLAY) {
    }
}

/* called when a collision is detected between the ball and a brick */
function killBrick(ball, brick) {
    brick.disableBody(true, true);
    ball.setBounceY(1);
    hit.play();
    console.log("KILL");
}