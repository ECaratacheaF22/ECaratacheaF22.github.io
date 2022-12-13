const gameState = {};

//The Sprites//
function preload() {
  this.load.image('Player', './Invasion/Player.png');
  this.load.image('Ground', './Invasion/Ground_.png');
  this.load.image('Bullets', './Invasion/Bullet.png');
  this.load.image('UFO2', './Invasion/UFO_2.png');
  this.load.image('Beams', './Invasion/Beam.png');
}


function create() {


  //Score
  gameState.Score = 0
 gameState.ScoreText = this.add.text(15, 20, 'Score=' + gameState.Score, { fontSize: '25px', fill: '#000' });

    //Ammo
  gameState.Ammo = 150
 gameState.AmmoText = this.add.text(15, 40, 'Ammo=' + gameState.Ammo, { fontSize: '25px', fill: '#000' });


  //Important stuff//
  gameState.active = true
  gameState.cursors = this.input.keyboard.createCursorKeys();

  //Player//
  gameState.player = this.physics.add.sprite(300, 300, 'Player').setScale(.275).setGravityY(200);
  gameState.player.setCollideWorldBounds(true);

  //Platforms//
  const platforms = this.physics.add.staticGroup();
  platforms.create(360, 630, 'Ground').setScale(1.2, .5).refreshBody();

  //Enemies//
  gameState.Enemies = this.physics.add.group();

  for (let y = 1; y < 7; y++) {
    for (let x = 1; x < 6; x++) {
      gameState.Enemies.create(400 + 50 * x, 75 * y, 'UFO2').setScale(.35);
    }
  }




  //Bullets
  gameState.Bullets = this.physics.add.group();
  const Beams = this.physics.add.group();

  const genBeams = () => {
    let randomBeams = Phaser.Utils.Array.GetRandom(gameState.Enemies.getChildren());
    Beams.create(randomBeams.x, randomBeams.y, 'Beams').setScale(.1).setVelocityX(-160);
  }

  gameState.BeamsLoop = this.time.addEvent({
    delay: 300,
    callback: genBeams,
    callbackScope: this,
    loop: true
  });
  this.physics.add.collider(Beams, platforms,
    (Beams) => {
      Beams.destroy();
    });

  this.physics.add.collider(Beams, gameState.player, () => {

    gameState.active = false
    gameState.BeamsLoop.destroy();
    this.physics.pause();
    this.add.text(150, 200, 'Game Over /n Click to Restart', { fontSize: '25px', fill: '#000' })

  })





  //Once Var//
  gameState.var, Once = 0


  //Restart//
  this.input.on('pointerup', () => {
    if (gameState.active === false) {
      this.scene.restart();
    }
  });

  //Colliders//
  this.physics.add.collider(platforms, gameState.player, () => {
    gameState.active = false
    this.physics.pause();
    this.add.text(150, 200, 'Game Over Click to Restart', { fontSize: '25px', fill: '#000' })
  })

  this.physics.add.collider(gameState.Enemies, gameState.player, () => {
    gameState.active = false
    this.physics.pause();
    this.add.text(150, 200, 'Game Over Click to Restart', { fontSize: '25px', fill: '#000' })
  })

  this.physics.add.collider(gameState.Enemies, gameState.Bullets, (enemy, bullet) => {
    enemy.destroy();
    bullet.destroy();
    gameState.Score++;
    gameState.ScoreText.setText( 'Score=' + gameState.Score);
    console.log(gameState.Score)
})







}
function update() {



  //The Bullet Shoot//
  if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space) & gameState.Ammo > 0) {
    gameState.Bullets.create(gameState.player.x + 40, gameState.player.y, 'Bullets').setVelocityX(500).setScale(.25).setGravityY(0);
       gameState.Ammo--;
    gameState.AmmoText.setText( 'Ammo=' + gameState.Ammo);
    console.log(gameState.Ammo)
  }

  //This is so i can only use one movement at a time//
  if (gameState.cursors.up.isDown) {
    gameState.Once = 1
  } else {
    gameState.Once = 0
  }

  //Movement//
  if (gameState.cursors.down.isDown) {
    gameState.player.setVelocityY(275);
  } else if (gameState.cursors.up.isDown && (gameState.Once = 1)) {
    gameState.player.setVelocityY(-200);
  }

  if (gameState.cursors.right.isDown) {
    gameState.player.setVelocityX(200);
  } else if (gameState.cursors.left.isDown) {
    gameState.player.setVelocityX(-200);
  } else {
    gameState.player.setVelocityX(0);
  }
}





const config = {
  type: Phaser.AUTO,
  width: 720,
  height: 655,
  backgroundColor: "134074",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      enableBody: true,
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};
const game = new Phaser.Game(config);