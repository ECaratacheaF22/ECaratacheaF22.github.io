const gameState = {};

function preload(){
  this.load.image('Player', './Invasion/Player.png');
  this.load.image('Ground', './Invasion/Ground_.png');
  this.load.image('Bullet', './Invasion/Bullet.png');
  this.load.image('UFO2', './Invasion/UFO_2.png');
}

function create(){ 
gameState.var, Once = 0
   gameState.active = true

    this.input.on('pointerup', () => {
    if (gameState.active === false){
        this.scene.restart();
    }
  });
  
    gameState.player = this.physics.add.sprite(300,300,'Player').setScale(.375).setGravityY(200);
    const platforms = this.physics.add.staticGroup();
    platforms.create(360,630,'Ground').setScale(1.2,.5).refreshBody();

    gameState.player.setCollideWorldBounds(true);
   
gameState.cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(platforms,gameState.player,() => {
    
        gameState.active = false
    this.physics.pause();
    this.add.text(150,200, 'Game Over Click to Restart',{ fontSize: '25px', fill: '#000'})
    
  })

gameState.enemies = this.physics.add.group();
 
    for (let y = 1; y < 5; y++){
        for (let x = 1; x < 2; x++){
          gameState.enemies.create(600,100*y,'UFO2').setScale(.4);
        }
    }
gameState.Bullet = this.physics.add.group();

  this.physics.add.collider(gameState.enemies,gameState.player,() => {
    player.destroy();
        gameState.active = false
    this.physics.pause();
    this.add.text(150,200, 'Game Over Click to Restart',{ fontSize: '25px', fill: '#000'})
    
  })
  
}
function update(){

if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {

  gameState.Bullet.create(gameState.player.x+40, gameState.player.y,'Bullet').setVelocityX(200).setScale(.25).setGravityY(0);
}
  
     if (gameState.cursors.up.isDown){
    gameState.Once = 1
    } else {
    gameState.Once = 0
    }

   if (gameState.cursors.down.isDown){
    gameState.player.setVelocityY(275);
    } else if (gameState.cursors.up.isDown && (gameState.Once = 1)){
    gameState.player.setVelocityY(-200);
    }
  
  if (gameState.cursors.right.isDown){
    gameState.player.setVelocityX(200);
    } else if  (gameState.cursors.left.isDown){
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