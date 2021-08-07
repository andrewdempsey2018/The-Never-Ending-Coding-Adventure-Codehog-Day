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

const gameState = {
    PLAY: "play",
    PREPARE: "prepare",
}

let state = gameState.PREPARE;

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

var hit;

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

    let level = levelData.bricks.map(brick => bricks.create(brick.x, brick.y, brick.name))

    this.physics.add.collider(ball, bricks, killBrick, null, this);

}

function update() {
    if (keyLeft.isDown) {
        paddle.x -= 3;
    }

    if (keyRight.isDown) {
        paddle.x += 3;
    }

    if (ball.y > paddle.y) {
        state = gameState.PREPARE;
        console.log("Player dropped the ball");
        ball.y = 500;
    }

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

function killBrick(ball, brick) {
    brick.disableBody(true, true);
    ball.setBounceY(1);
    hit.play();
    console.log("KILL");
}