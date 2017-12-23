function TrophyCase()
{
    this.backgroundWidth = 500.0;
    this.backgroundHeight = 525.0;

    this.itemBaseX = 205.0;
    this.itemBaseY = 120.0;
    this.itemOffsetX = 56.0;
    this.itemOffsetY = 56.0;
    this.itemSize = 64.0;

    this.inputRegionMinX = game.width - 270.0;
    this.inputRegionMinY = 40.0;

    this.InitDisplay();
}

TrophyCase.prototype.OnDestroy = function()
{
    this.group.destroy(true);
}

TrophyCase.prototype.InitDisplay = function()
{
    this.group = game.add.group();
    this.group.x = 0;
    this.group.y = 0;
    this.group.visible = false;

    this.backgroundShadowSprite = game.add.image((game.width * 0.5) - 3, (game.height * 0.5) + 3, "Square", 0, this.group);
    this.backgroundShadowSprite.anchor.setTo(0.5, 0.5);
    this.backgroundShadowSprite.width = this.backgroundWidth;
    this.backgroundShadowSprite.height = this.backgroundHeight;
    this.backgroundShadowSprite.tint = 0x000000;
    this.backgroundShadowSprite.smoothed = false;

    this.backgroundSprite = game.add.image(game.width * 0.5, game.height * 0.5, "Square", 0, this.group);
    this.backgroundSprite.anchor.setTo(0.5, 0.5);
    this.backgroundSprite.width = this.backgroundWidth;
    this.backgroundSprite.height = this.backgroundHeight;
    this.backgroundSprite.tint = 0x888888;
    this.backgroundSprite.smoothed = false;
    
    this.titleShadowText = game.add.bitmapText((game.width * 0.5) - 2, 62, "font", this.GetNumTreasuresFound().toString() + " / 64", 40, this.group);
    this.titleShadowText.anchor.setTo(0.5, 0.5);
    this.titleShadowText.tint = 0x000000;
    this.titleShadowText.smoothed = false;

    this.titleText = game.add.bitmapText(game.width * 0.5, 60.0, "font", this.GetNumTreasuresFound().toString() + " / 64", 40, this.group);
    this.titleText.anchor.setTo(0.5, 0.5);
    this.titleText.tint = 0xFFFFFF;
    this.titleText.smoothed = false;

    this.items = new Array();
    for (var i = 0; i < 64; i++)
    {
        var col = i % 8;
        var row = Math.floor(i / 8);
        var itemSprite = game.add.image(this.itemBaseX + this.itemOffsetX*col, this.itemBaseY + this.itemOffsetY*row, "Items", i, this.group);
        itemSprite.anchor.setTo(0.5, 0.5);
        itemSprite.width = this.itemSize;
        itemSprite.height = this.itemSize;
        itemSprite.smoothed = false;

        if (GetCookie("Item" + i) != 1)
        {
            itemSprite.tint = 0x000000;
        }

        this.items.push(itemSprite);
    }
}

TrophyCase.prototype.Update = function(dt)
{
    if (game.input.activePointer.x >= this.inputRegionMinX &&
        game.input.activePointer.y <= this.inputRegionMinY)
    {
        this.group.visible = true;
        game.world.bringToTop(this.group);
    }
    else
    {
        this.group.visible = false;
    }
}

TrophyCase.prototype.OnTreasureFound = function(treasure)
{
    SetCookie("Item" + treasure.id, "1", 365);

    this.items[treasure.id].tint = 0xFFFFFF;
    this.titleShadowText.text = this.GetNumTreasuresFound().toString() + " / 64";
    this.titleText.text = this.GetNumTreasuresFound().toString() + " / 64";
}

TrophyCase.prototype.GetNumTreasuresFound = function()
{
    var numTreasures = 0;

    for (var i = 0; i < 64; i++)
    {
        if (GetCookie("Item" + i) == 1)
        {
            numTreasures++;
        }
    }

    return numTreasures;
}