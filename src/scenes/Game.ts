import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.player={}
    this.shots = []
    this.levelClear = false;
  }
  levels=[
    {
      message:'Bro, It\'s finally nice outside! You\'ve been working so hard on that great body bro and it\'s time to take it to the NUDE BEACH!! We\'re going to have so much fun. We\'re sure to scope some HOTTIES and sip some SHANDYs, bro. What a great day! \n\nI love you, Bro.'
    },
    {
      message:'These docks are the best place to find HOTTIES, bro. Look at her over there! \n\n Use the left and right arrow keys to get those SHANDYS, Then when you have enough confidence you can hold space to shoot your shot, bro!',
      hottie: 'hottie-1',
      hottieIdleAnim: 'hottie-1-idle',
      name: 'Ashley'
    },
    {
      message:'She swooned for those amazing pecs, bro! Nice job!\n\n This next HOTTIE is a little higher level though bro. You\'re going to need a few extra SHANDYS.',
      hottie: 'hottie-2',
      hottieIdleAnim: 'hottie-2-idle',
      name: 'Alex'
    },
    {
      message:'He couldn\'t resist you bro!\n\nGet a few more SHANDYS because this next HOTTIE looks fierce!',
      hottie: 'hottie-3',
      hottieIdleAnim: 'hottie-3-idle',
      name: 'Bernie'
    },
    {
      message:'She was definitely knocked out by those spectacular abs, bro! Grab yourself a few SHANDYS.',
      hottie: 'hottie-4',
      hottieIdleAnim: 'hottie-4-idle',
      name: 'Gigi'
    },
    {
      message:'Oh my gosh, bro! This next HOTTIE is the hottest HOTTIE on the whole beach! You got this, bro. You can do anything, bro. I love you bro and I beleive in you so much.',
      hottie: 'hottie-5',
      hottieIdleAnim: 'hottie-5-idle',
      name: 'Halley'
    },
  ]
  showMessage(text){
    this.rollText.setText(text);
    this.rollText.y = (this.rollText.displayHeight/2)
  }
  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('front-dock', 'assets/front-dock.png');
    this.load.image('back-dock', 'assets/back-dock.png');
    this.load.image('heart', 'assets/heart.png');
    this.load.spritesheet('front-post', 'assets/front-post.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('back-post', 'assets/back-post.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('bro', 'assets/bro.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('hottie-1', 'assets/hottie-1.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('hottie-2', 'assets/hottie-2.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('hottie-3', 'assets/hottie-3.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('hottie-4', 'assets/hottie-4.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('hottie-5', 'assets/hottie-5.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('shandy', 'assets/shandy.png', { frameWidth: 64, frameHeight: 64 });
    this.load.audio('theme', [
      'assets/music.mp3'
    ]);
  }

  create() {
    let { width, height } = this.sys.game.canvas;
    this.width=width
    this.height=height
    this.level = 0

    this.keys = this.input.keyboard.addKeys({
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
      space: 'space'
    })

    this.background = this.add.image(400, 70, 'background');
    this.frontDock = this.add.image( this.width/2, 495, 'front-dock');
    this.backDock = this.add.image((width/2)-5, 250, 'back-dock');

    this.particles = this.add.particles('heart');

    const frontWavesAnimation = this.anims.create({
      key: 'front-waves',
      frames: this.anims.generateFrameNumbers('front-post'),
      frameRate: 2,
      repeat:-1,
    });
    const backWavesAnimation = this.anims.create({
      key: 'back-waves',
      frames: this.anims.generateFrameNumbers('back-post'),
      frameRate: 2,
      repeat:-1,
    });
    const walkRightAnimation = this.anims.create({
      key: 'bro-walk-right',
      frames: this.anims.generateFrameNumbers('bro', { frames: [144, 145, 146, 147, 148, 149, 150, 151] }),
      frameRate: 8,
      repeat:-1,
    });
    const walkLeftAnimation = this.anims.create({
      key: 'bro-walk-left',
      frames: this.anims.generateFrameNumbers('bro', { frames: [118, 119, 120, 121, 122, 123, 124, 125] }),
      frameRate: 8,
      repeat:-1,
    });

    const idleAnimation = this.anims.create({
      key: 'bro-idle',
      frames: this.anims.generateFrameNumbers('bro', { frames: [0,0,0,0,0,0,0,0,0,1,0,0,0,0] }),
      frameRate: 2,
      repeat:-1,
    });

    const shootAnimation = this.anims.create({
      key: 'bro-shoot',
      frames: this.anims.generateFrameNumbers('bro', { frames: [1,2,1] }),
      frameRate: 8,
      repeat:-1,
    });

    const hottie1Animation = this.anims.create({
      key: 'hottie-1-idle',
      frames: this.anims.generateFrameNumbers('hottie-1',{frames: [13,13,13,13,13,1313,13,13,13,13,14]}),
      frameRate: 4,
      repeat:-1,
    });

    const hottie2Animation = this.anims.create({
      key: 'hottie-2-idle',
      frames: this.anims.generateFrameNumbers('hottie-2',{frames: [26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,28,28,28,28,28,28,28,28,27]}),
      frameRate: 4,
      repeat:-1,
    });
    const hottie3Animation = this.anims.create({
      key: 'hottie-3-idle',
      frames: this.anims.generateFrameNumbers('hottie-3',{frames: [13,13,13,13,13,1313,13,13,13,13,14]}),
      frameRate: 4,
      repeat:-1,
    });
    const hottie4Animation = this.anims.create({
      key: 'hottie-4-idle',
      frames: this.anims.generateFrameNumbers('hottie-4',{frames: [13,13,13,13,13,1313,13,13,13,13,14]}),
      frameRate: 4,
      repeat:-1,
    });
    const hottie5Animation = this.anims.create({
      key: 'hottie-5-idle',
      frames: this.anims.generateFrameNumbers('hottie-5',{frames: [170, 170, 170, 170, 170,170, 170, 170, 170, 170,170, 170, 170, 170, 170,170, 170, 170, 170, 170,170, 170, 170, 170, 170,170, 170, 170, 170, 170, 158, 159,160,161]}),
      frameRate: 4,
      repeat:-1,
    });

    const shandyAnimation = this.anims.create({
      key: 'shandy-got',
      frames: this.anims.generateFrameNumbers('shandy',{frames: [0,1]}),
      frameRate: 8,
      repeat:-1,
    });

    this.backPost = [
      this.add.sprite(200, 256, 'back-post'),
      this.add.sprite(520, 256, 'back-post'),
    ];
    this.frontPost = [
      this.add.sprite(100, 496, 'front-post'),
      this.add.sprite(700, 496, 'front-post'),
    ];
    this.frontPost[0].play({key:'front-waves'})
    this.frontPost[1].play({key:'front-waves', startFrame: 1})
    this.backPost[0].play({key:'back-waves'})
    this.backPost[1].play({key:'back-waves', startFrame: 1})

    this.music = this.sound.add('theme');

    this.logo = this.add.image(-600, 350, 'logo')

    this.rollText = this.add.text(200, -1000, '--', {
      font: "18px Consolas",
      color: '#000000',
      wordWrap: {
          width: 400
      }
    })
    
    this.initGame()
    
  }

  initGame(){
    this.tweens.add({
      targets: this.logo,
      x: this.width/2,
      ease: 'Power1',
      duration: 300,
    }) 
    this.music.play();
    this.level = 0;
    this.showMessage(this.levels[this.level].message);
  }
  setPlayerState(state){
    if(this.player.state== state) return
    this.player.state = state;
    if(this.player.state=='walk-right'){
      this.bro.play({key:'bro-walk-right'})
    }else if(this.player.state=='walk-left'){
      this.bro.play({key:'bro-walk-left'})
    }else if(this.player.state=='shoot'){
      this.bro.play({key:'bro-shoot'})
    }else{
      this.bro.play({key:'bro-idle'})
    }
  }
  update(time: number, delta: number): void {
    if(this.level==0){//Title screen
      if(this.keys.space.isDown){
        this.nextLevel();
      }
    }else{
      if(this.keys.right.isDown){
        this.setPlayerState('walk-right')
      }else if(this.keys.left.isDown){
        this.setPlayerState('walk-left')
      }else if(this.keys.space.isDown){
        this.setPlayerState('shoot')
      }else if(this.keys.up.isDown){
        this.confidence+=20
      }else{
        this.setPlayerState('idle')
      }
      if(this.player.state=='walk-right'){
        if(this.bro.x<650){
          this.bro.x+=2
        }else{
          if(this.backDock.x>350){
            this.backDock.x-=.25
            this.backPost[0].x-=.25
            this.backPost[1].x-=.25
            this.hottie.x-=.25
            this.shandy.x--
            this.frontDock.x--
            this.frontPost[0].x--
            this.frontPost[1].x--
          }
        }
      }else if(this.player.state=='walk-left'){
        if(this.bro.x>150){
          this.bro.x-=2
        }else{
          if(this.backDock.x<450){
            this.backDock.x+=.25
            this.backPost[0].x+=.25
            this.backPost[1].x+=.25
            this.hottie.x+=.25
            this.shandy.x++
            this.frontDock.x++
            this.frontPost[0].x++
            this.frontPost[1].x++  
          }
        }
      }else if(this.player.state=='shoot' && Math.round(time/50) % 10 == 0){
        const s = this.add.image(this.bro.x, 360, 'heart')
        this.shots.push(s)
        this.tweens.add({
          targets: s,
          x: this.bro.x,
          y: 360-(this.confidence-this.level*10),
          ease: 'Power1',
          duration: (10*this.confidence)+200,
          scaleX:0,
          scaleY:0,
          alpha: .5,
          onCompleteScope: s,
          onComplete: function(){
            s.destroy()
          }
        })
      }
      if(!this.drinking&&this.shandy.y>0&&Math.abs(this.bro.x-this.shandy.x)<32){
        this.shandy.setFrame(1)
        this.drinking=true;
        this.time.delayedCall(50, function(){
          this.shandy.y = -400
          this.shandy.setFrame(0)
          console.log('confidence');
          this.confidence+=Math.round(Math.random()*50)
          this.confidenceText.setText('Confidence: '+this.confidence)  
          this.drinking=false;
          if(this.won) this.nextLevel()
        },{},this)
      }
      if(Math.random()*300<this.level){
        console.log('SHANDY!')
        this.shandy.y=-500
        this.shandy.x=Math.random()*this.width
        this.tweens.add({
          targets: this.shandy,
          y: 450,
          ease: 'Power1',
          duration: 300,
        }) 
      }

    }
    if(this.rollText.y>-1000&&!this.won){
      this.rollText.y-=.25
    }
    const _this = this
    for (const shot of this.shots) {
      //shot.y--
      if(!this.won&&this.levelClear==false&&shot.y<255 && shot.y > 100 && Math.abs(shot.x-_this.hottie.x)<15){
        shot.destroy()
        this.levelClear = true
        break
      }
    }
    if(this.levelClear==true){
        if(this.levelClear){
          for (const shot of this.shots) {
            shot.destroy()
          }
          this.shots = []
          this.nextLevel();
          //console.log('levelup')
        }
    }
  }

  nextLevel(){
    //unload levels
    if(this.level==0){
      this.game.sound.stopAll();
      this.logo.x=-600
      this.bro = this.add.sprite(this.width/2, 420, 'bro');
      this.bro.setScale(2)
      this.frontPost[0].setDepth(1)
      this.frontPost[1].setDepth(1)
      this.shandy = this.add.sprite(0, -420, 'shandy');
        
      this.confidenceText = this.add.text(20, 550, 'CONFIDENCE: 0', {
        font: "28px Consolas",
        color: '#000000',
      })
      this.hottieText = this.add.text(550, 550, '', {
        font: "28px Consolas",
        color: '#000000',
      })
  

    }
    if(this.hottie && !this.won) {
      this.particles.createEmitter({
        alpha: { start: 1, end: .25 },
        scale: { start: 0, end: .5 },
        //tint: { start: 0xff945e, end: 0xff945e },
        speed: 20,
        accelerationY: -400,
        angle: { min: -180, max: 180 },
        rotate: { min: -45, max: 45 },
        lifespan: { min: 500, max: 600 },
        frequency: 10,
        maxParticles: this.level*3,
        x: this.hottie.x,
        y: this.hottie.y
      });
      this.hottie.destroy()
    }
    this.level++    
    if(this.level>=this.levels.length){
      //this.initGame()
      this.showMessage('YOU DID IT BRO! You win! Every HOTTIE is into that scrumptious body!\n\nThis day has been so perfect, bro. I could sit here and drink SHANDYS forever!')
      this.won = true;
      this.hottieText.destroy()
    }else{
      this.confidence=0
      this.confidenceText.setText('Confidence: '+this.confidence)
      this.hottieText.setText('Hottie: '+this.levels[this.level].name)
      //load levels
      this.showMessage(this.levels[this.level].message)
      
      this.hottie = this.add.sprite(this.width/2+((Math.random()-.5)*100), 215, this.levels[this.level].hottie);
      this.hottie.play({key:this.levels[this.level].hottieIdleAnim})
      this.hottie.alpha = 0
      this.tweens.add({
        targets: this.hottie,
        ease: 'Power1',
        duration: 3000,
        alpha: 1,
      })
  
    }
    this.levelClear = false
    console.log(this.level)
  };

}
