/* WARNING WARNING WARNING */
/* HORRIFIC CODE AHEAD!! */

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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

const difficulty = 3;

var score = 0;

hasScored1 = false;
hasScored2 = false;

var loseSnd;

var titleAlpha = 1;

function preload() {
    this.load.image('obstacleTop', 'assets/obstacleTop.png');
    this.load.image('obstacleBottom', 'assets/obstacleBottom.png');
    //this.load.image('ghost', 'ghost.png');
    this.load.image('bg2', 'assets/bg2.png');
    this.load.image('bg10', 'assets/bg10.png');
    this.load.image('egg', 'assets/egg.png');
    this.load.image('title', 'assets/title.png');

    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.load.bitmapFont('desyrel', 'assets/desyrel.png', 'assets/desyrel.xml');

    this.load.audio('flap', 'assets/flap.wav');
    this.load.audio('score', 'assets/score.wav');
    this.load.audio('lose', 'assets/lose.wav');

    var flapSndPlay = false;

    this.load.spritesheet('ghost',
        'assets/ghost.png',
        { frameWidth: 40, frameHeight: 35 }
    );

    this.load.image('grass', 'assets/grass.png');
}

function create() {

    flap = this.sound.add('flap');
    scoreSnd = this.sound.add('score');
    loseSnd = this.sound.add('lose');

    this.add.image(400, 300, 'bg2');
    egg = this.add.sprite(400, 300, 'egg').setAlpha(0);
    bg10 = this.add.sprite(400, 300, 'bg10').setAlpha(0.50);
    bg11 = this.add.sprite(0, 300, 'bg10').setAlpha(0.45);

    obstacleTop = this.physics.add.sprite(1400, -150, 'obstacleTop').setImmovable(true);
    obstacleTop.setGravity(0, -300);

    obstacleBottom = this.physics.add.sprite(1400, 500, 'obstacleBottom').setImmovable(true);
    obstacleBottom.setGravity(0, -300);

    obstacle2Top = this.physics.add.sprite(1800, -150, 'obstacleTop').setImmovable(true);
    obstacle2Top.setGravity(0, -300);

    obstacle2Bottom = this.physics.add.sprite(1800, 500, 'obstacleBottom').setImmovable(true);
    obstacle2Bottom.setGravity(0, -300);

    ghost = this.physics.add.sprite(300, 300, 'ghost');
    ghost.setGravity(0, 0);

    this.physics.add.collider(ghost, obstacleTop, lose);
    this.physics.add.collider(ghost, obstacleBottom, lose);
    this.physics.add.collider(ghost, obstacle2Top, lose);
    this.physics.add.collider(ghost, obstacle2Bottom, lose);

    //scoreText = this.add.bitmapText(650, 20, 'desyrel', '00', 64);
    this.dynamic = this.add.bitmapText(650, 20, 'desyrel', '');

    this.anims.create({
        key: 'flap',
        frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    grass1 = this.add.sprite(400, 540, 'grass');
    grass2 = this.add.sprite(1200, 540, 'grass');

    title = this.add.sprite(500, 200, 'title').setAlpha(titleAlpha);
}

function lose() {
    score = 0;
    obstacleTop.x = 1400;
    obstacleBottom.x = 1400;
    obstacle2Top.x = 1800;
    obstacle2Bottom.x = 1800;
    hasScored1 = false;
    hasScored2 = false;
    loseSnd.play();
    ghost.y = 230;
    ghost.setVelocityY(0);
    titleAlpha = 1;
}

function update() {

    if (titleAlpha > 0) {
        titleAlpha -= 0.0075;
        title.setAlpha(titleAlpha);
    }

    grass1.x -= 3;
    grass2.x -= 3;

    if (grass1.x <= -400) {
        grass1.x = 1200;
    }

    if (grass2.x <= -400) {
        grass2.x = 1200;
    }

    ghost.anims.play('flap', true);

    obstacleTop.x -= difficulty;
    obstacleBottom.x -= difficulty;

    if (obstacleTop.x <= -40) {
        obstacleTop.x = 840;
        obstacleBottom.x = 840;

        obstacleTop.y = getRandomArbitrary(-150, 120)
        //console.log(obstacleTop.y);
        obstacleBottom.y = obstacleTop.y + 650;
        hasScored1 = false;
    }

    obstacle2Top.x -= difficulty;
    obstacle2Bottom.x -= difficulty;

    if (obstacle2Top.x <= -40) {
        obstacle2Top.x = 840;
        obstacle2Bottom.x = 840;

        obstacle2Top.y = getRandomArbitrary(-150, 120)
        //console.log(obstacle2Top.y);
        obstacle2Bottom.y = obstacle2Top.y + 650;

        hasScored2 = false;
    }

    if (keySpace.isDown && flapSndPlay === false) {
        flapSndPlay = true;
        ghost.setVelocityY(-250);
        flap.play();
        ghost.angle = -40;
    }

    console.log("angle: " + ghost.angle);



    if (ghost.angle < 40) {
        ghost.angle += 1;
    }

    if (keySpace.isUp) {
        flapSndPlay = false;
    }

    bg10.x -= 2;
    if (bg10.x <= -400) {
        bg10.x = 1200;
    }

    bg11.x -= 3;
    if (bg11.x <= -400) {
        bg11.x = 1200;
    }

    this.dynamic.text = score;

    if (score === 1000) {
        egg.setAlpha(100);
    }

    if (ghost.x >= obstacle2Top.x && hasScored2 === false) {
        hasScored2 = true;
        score++;
        scoreSnd.play();
    }

    if (ghost.x >= obstacleTop.x && hasScored1 === false) {
        hasScored1 = true;
        score++;
        scoreSnd.play();
    }

    if (ghost.y > 600) {
        lose();
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
