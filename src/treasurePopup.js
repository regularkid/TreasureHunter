function TreasurePopup(params)
{
    this.destroy = false;
    this.size = 96.0;
    this.timer = 0.0;
    this.health = 5;
    
    this.bounceTime = 0.425;
    this.bounceHeight = 30.0;
    this.bounceScaleMultMax = 0.2;
    
    this.wiggleIntervalDelta = 2.0;
    this.wiggleIntervalTime = 0.5;
    this.wiggleIntervalSpeed = 3.0;
    this.wiggleAngleMax = game.math.degToRad(10.0);

    this.shakeTime = 0.2;
    this.shakeAmountMax = 2.0;
    this.shakeCurTime = 0.0;

    this.openedDisplayTime = 4.0;
    this.openedRiseTime = 2.0;
    this.openedRiseHeight = 80.0;
    this.openedChestFadeTime = 0.5;
    this.openedItemFadeTime = 0.5;

    this.startPos = new Phaser.Point(params.x, params.y);

    this.InitDisplay(params);

    this.maxTouchDist = 48.0;
    game.input.onDown.add(this.OnMouseDown, this);
}

TreasurePopup.prototype.InitDisplay = function(params)
{
    this.group = game.add.group();
    this.group.x = params.x;
    this.group.y = params.y;
    this.xOrigin = params.x;
    this.yOrigin = params.y;

    this.chestSprite = game.add.sprite(0, 0, "Chest", 0, this.group);
    this.chestSprite.anchor.setTo(0.5, 0.5);
    this.chestSprite.width = this.size;
    this.chestSprite.height = this.size;
    this.chestSprite.visible = true;

    this.itemSprite = game.add.sprite(0, 0, "Items", params.id, this.group);
    this.itemSprite.anchor.setTo(0.5, 0.5);
    this.itemSprite.width = this.size;
    this.itemSprite.height = this.size;
    this.itemSprite.visible = false;
}

TreasurePopup.prototype.OnDestroy = function()
{
    this.itemSprite.kill();
    this.chestSprite.kill();
}

TreasurePopup.prototype.Update = function(dt)
{
    this.timer += dt;
    
    // Treasure state
    if (this.health > 0)
    {
        var bouncePct = Math.min(this.timer / this.bounceTime, 1.0);
        this.group.y = this.startPos.y - Math.sin(bouncePct * Math.PI) * this.bounceHeight;

        var scale = 1.0 + Math.sin(bouncePct * Math.PI) * this.bounceScaleMultMax;
        this.chestSprite.width = this.size * scale;
        this.chestSprite.height = this.size * scale;

        if (this.timer >= (this.wiggleIntervalDelta + this.wiggleIntervalTime))
        {
            var curwiggleIntervalTimer = this.timer % (this.wiggleIntervalDelta + this.wiggleIntervalTime);
            var curwiggleIntervalPct = Math.min(curwiggleIntervalTimer / this.wiggleIntervalTime, 1.0);
            var curAngle = Math.sin(curwiggleIntervalPct * this.wiggleIntervalSpeed * Math.PI * 2.0) * this.wiggleAngleMax;
            this.group.rotation = curAngle;
        }
    }
    // Item display state
    else
    {
        var risePct = Math.min(this.timer / this.openedRiseTime, 1.0);
        var t = (1.0 - risePct)
        t = 1.0 - (t*t*t*t*t*t)
        var riseHeight = t * this.openedRiseHeight;
        this.itemSprite.y = -riseHeight;

        this.chestSprite.alpha = 1.0 - Math.min(this.timer / this.openedChestFadeTime, 1.0);
        this.itemSprite.alpha = Math.min((this.openedDisplayTime - this.timer) / this.openedItemFadeTime, 1.0);

        if (this.timer >= this.openedDisplayTime)
        {
            this.OnDestroy();
            this.destroy = true;
            game.state.start("play");
        }
    }

    this.UpdateShake(dt);
}

TreasurePopup.prototype.StartShake = function()
{
    this.shakeCurTime = this.shakeTime;
    this.timer = this.wiggleIntervalDelta + (this.wiggleIntervalTime * 2.0);
    g_AudioManager.PlaySound("DamageChest");
}

TreasurePopup.prototype.UpdateShake = function(dt)
{
    if (this.shakeCurTime > 0.0)
    {
        var shakePct = this.shakeCurTime / this.shakeTime;
        this.group.x = this.xOrigin + (game.rnd.frac() - 0.5)*this.shakeAmountMax*2.0;
        this.group.y = this.yOrigin + (game.rnd.frac() - 0.5)*this.shakeAmountMax*2.0;

        if (shakePct > 0.9)
        {
            this.chestSprite.width = this.size * 0.8;
            this.chestSprite.height = this.size * 0.8;
        }

        this.shakeCurTime -= dt;
    }
    else
    {
        this.group.x = this.xOrigin;
        this.group.y = this.yOrigin;
    }
}

TreasurePopup.prototype.OnMouseDown = function()
{
    var toMouse = Phaser.Point.subtract(this.group, game.input.activePointer);
    var distToMouse = toMouse.getMagnitude();
    if (distToMouse <= this.maxTouchDist && this.health > 0)
    {
        this.StartShake();

        this.health--;
        if (this.health == 0)
        {
            this.timer = 0.0;
            this.group.rotation = 0.0;
            this.itemSprite.visible = true;
            g_AudioManager.PlaySound("OpenChest");
        }
    }
}