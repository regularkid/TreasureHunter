var g_EntityManager = new EntityManager();
var g_AudioManager = new AudioManager();

var loadState =
{
    preload: function()
    {
        game.load.image("Logo", "assets/Logo_512x32.png");
        game.load.image("ClickToStart", "assets/ClickToStart.png");
        game.load.image("Square", "assets/Square.png");
        game.load.image("Detector", "assets/Detector.png");
        game.load.image("GameBackground", "assets/GameBackground.png");
        game.load.image("Chest", 'assets/Chest.png');
        game.load.spritesheet("Items", 'assets/Items.png', 128, 128, 64);
        game.load.bitmapFont("font", "assets/font.png", "assets/font.fnt");
        game.load.audio("DamageChest", ["assets/sounds/DamageChest.wav"]);
        game.load.audio("DigMiss", ["assets/sounds/DigMiss.wav"]);
        game.load.audio("FindChest", ["assets/sounds/FindChest.wav"]);
        game.load.audio("NewMap", ["assets/sounds/NewMap.wav"]);
        game.load.audio("OpenChest", ["assets/sounds/OpenChest.wav"]);
        game.load.audio("Music", ["assets/sounds/ILikeJumpRope.mp3"]);
    },

    create: function()
    {
        var keyStart = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        keyStart.onDown.add(this.onStartPressed, this);

        var background = game.add.sprite(0, 0, "GameBackground");

        var logoShadow = game.add.sprite(this.game.world.centerX - 3, this.game.world.centerY + 3, "Logo");
        logoShadow.anchor.setTo(0.5, 0.5);
        logoShadow.tint = 0x000000;
        logoShadow.smoothed = false;

        var logo = game.add.sprite(this.game.world.centerX, this.game.world.centerY, "Logo");
        logo.anchor.setTo(0.5, 0.5);
        logo.tint = 0xFFFFFF;
        logo.smoothed = false;

        var startShadow = game.add.sprite(this.game.world.centerX - 3, this.game.world.centerY + 43, "ClickToStart");
        startShadow.anchor.setTo(0.5, 0.5);
        startShadow.tint = 0x000000;
        startShadow.smoothed = false;

        var start = game.add.sprite(this.game.world.centerX, this.game.world.centerY + 40, "ClickToStart");
        start.anchor.setTo(0.5, 0.5);
        start.tint = 0xFFFFFF;
        start.smoothed = false;

        g_AudioManager.AddSound("Music", true);
        g_AudioManager.PlaySound("Music");
        g_AudioManager.SetSoundVolume("Music", 0.35);
    },

    update: function()
    {
        if (game.input.activePointer.isDown)
        {
            game.state.start("play");
        }
    },

    onStartPressed: function()
    {
        game.state.start("play");
    },
};