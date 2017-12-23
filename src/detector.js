var detector = null;

function Detector()
{
    this.spriteMinScale = 30.0;
    this.spriteMaxScale = 150.0;

    this.spriteInfoByDistFactor = new Array();
    this.spriteInfoByDistFactor.push({ distFactor: 0.5, rotationSpeed: 2.0, tint: 0x00FF00 });
    this.spriteInfoByDistFactor.push({ distFactor: 0.2, rotationSpeed: 3.0, tint: 0xFFFF00 });
    this.spriteInfoByDistFactor.push({ distFactor: 0.05, rotationSpeed: 4.5, tint: 0xFF6A00 });
    this.spriteInfoByDistFactor.push({ distFactor: 0.0, rotationSpeed: 7.0, tint: 0xFF0000 });

    this.InitDisplay();
}

Detector.prototype.OnDestroy = function()
{
    this.group.destroy(true);
}

Detector.prototype.InitDisplay = function()
{
    this.group = game.add.group();
    this.group.x = 0;
    this.group.y = 0;

    this.spriteShadow = game.add.sprite(-3, 3, "Detector", 0, this.group);
    this.spriteShadow.width = 1.0;
    this.spriteShadow.height = 1.0;
    this.spriteShadow.anchor.setTo(0.5, 0.5);
    this.spriteShadow.tint = 0x000000;

    this.sprite = game.add.sprite(0, 0, "Detector", 0, this.group);
    this.sprite.width = 1.0;
    this.sprite.height = 1.0;
    this.sprite.anchor.setTo(0.5, 0.5);

    this.Update(0.0);
}

Detector.prototype.Update = function(dt)
{
    this.group.x = game.input.activePointer.x;
    this.group.y = game.input.activePointer.y;

    var treasureManager = g_EntityManager.GetEntityByClass(TreasureManager);
    var closestTreasureInfo = treasureManager.GetClosestTreasureInfo(this.group);
    this.UpdateSprite(dt, closestTreasureInfo);
}

Detector.prototype.UpdateSprite = function(dt, closestTreasureInfo)
{
    if (closestTreasureInfo == null)
    {
        return;
    }

    var scale = game.math.linear(this.spriteMinScale, this.spriteMaxScale, closestTreasureInfo.distFactor);
    this.sprite.width = scale;
    this.sprite.height = scale;
    this.spriteShadow.width = scale;
    this.spriteShadow.height = scale;

    for (var i = 0; i < this.spriteInfoByDistFactor.length; i++)
    {
        var spriteInfo = this.spriteInfoByDistFactor[i];

        if (closestTreasureInfo.distFactor > spriteInfo.distFactor)
        {
            this.sprite.tint = spriteInfo.tint;
            this.sprite.rotation = (this.sprite.rotation + dt*spriteInfo.rotationSpeed) % game.math.PI2;
            this.spriteShadow.rotation = this.sprite.rotation;
            break;
        }
    }
}