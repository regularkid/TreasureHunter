function HUD()
{
    this.InitDisplay();
}

HUD.prototype.OnDestroy = function()
{
    this.group.destroy(true);
}

HUD.prototype.InitDisplay = function()
{
    this.group = game.add.group();
    this.group.x = 0;
    this.group.y = 0;

    this.trophyCaseShadowText = game.add.bitmapText(game.width - 12, 2, "font", "Trophy Case", 40, this.group);
    this.trophyCaseShadowText.anchor.setTo(1.0, 0.0);
    this.trophyCaseShadowText.tint = 0x000000;
    this.trophyCaseShadowText.smoothed = false;

    this.trophyCaseText = game.add.bitmapText(game.width - 10, 0, "font", "Trophy Case", 40, this.group);
    this.trophyCaseText.anchor.setTo(1.0, 0.0);
    this.trophyCaseText.smoothed = false;
}