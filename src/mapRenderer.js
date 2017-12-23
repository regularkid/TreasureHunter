function MapRenderer(map)
{
    this.map = map;
    this.tileSize = 8.0;
    this.highlightSize = 11.0;

    this.colorMap =
    [
        { maxVal: 0.2, colorMin: 0x00137F, colorMax: 0x0026FF },
        { maxVal: 0.4, colorMin: 0x0095FF, colorMax: 0x9ED8FF },
        { maxVal: 0.6, colorMin: 0xA09B6A, colorMax: 0xFFF6A8 },
        { maxVal: 0.8, colorMin: 0x005605, colorMax: 0x00F910 },
        { maxVal: 1.0, colorMin: 0x5E4300, colorMax: 0xBC8400 },
    ];

    this.InitDisplay();
}

MapRenderer.prototype.OnDestroy = function()
{
    this.group.destroy(true);
}

MapRenderer.prototype.InitDisplay = function()
{
    this.group = game.add.group();
    this.group.x = 0;
    this.group.y = 0;

    this.texture = game.add.renderTexture(game.width, game.height, "", Phaser.scaleModes.NEAREST);
    game.add.sprite(0, 0, this.texture);

    this.mapTile = game.make.sprite(0, 0, "Square", 0);
    this.mapTile.anchor.setTo(0.5, 0.5);
    this.mapTile.width = this.tileSize;
    this.mapTile.height = this.tileSize;

    for (var row = 0; row < this.map.height; row++)
    {
        for (var col = 0; col < this.map.width; col++)
        {
            var x = (this.tileSize * col) + (this.tileSize * 0.5);
            var y = (this.tileSize * row) + (this.tileSize * 0.5);

            if (x < game.width && y < game.height)
            {
                this.mapTile.tint = this.GetTileColor(col, row);
                this.texture.renderXY(this.mapTile, x, y, false);
            }
        }
    }
}

MapRenderer.prototype.GetTileColor = function(col, row)
{
    var tile = this.map.GetTile(col, row);

    for (var i = 0; i < this.colorMap.length; i++)
    {
        if (tile <= this.colorMap[i].maxVal)
        {
            var randStep = game.rnd.integerInRange(35, 65);
            return Phaser.Color.interpolateColor(this.colorMap[i].colorMin, this.colorMap[i].colorMax, 100, randStep);
        }
    }

    return 0xFFFFFF;
}