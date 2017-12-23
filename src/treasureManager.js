function TreasureManager()
{
    this.treasures = new Array();
    this.treasurePopups = new Array();
}

TreasureManager.prototype.CreateTreasure = function(treasureId)
{
    var marginSize = new Phaser.Point(100.0, 100.0);
    var regionSize = new Phaser.Point(game.width - marginSize.x*2.0, game.height - marginSize.y*2.0);
    
    var params =
    {
        id: treasureId,
        x: marginSize.x + game.rnd.frac() * regionSize.x,
        y: marginSize.y + game.rnd.frac() * regionSize.y,
    };

    var newTreasure = new Treasure(params);
    this.treasures.push(newTreasure);
    return newTreasure;
}

TreasureManager.prototype.DestroyTreasure = function(treasure)
{
    // Treasures are freed in Update()
    treasure.destroy = true;
}

TreasureManager.prototype.DestroyAllTreasures = function()
{
    for (var i = 0; i < this.treasures.length; i++)
    {
        var treasure = this.treasures[i];
        treasure.destroy = true;
    }
}

TreasureManager.prototype.Update = function(dt)
{
    for (var i = 0; i < this.treasures.length; i++)
    {
        var treasure = this.treasures[i];
        
        treasure.Update(dt);

        if (treasure.destroy)
        {
            this.treasures.splice(i--, 1);
        }
    }

    // This is silly.. need a game object/component/entity system instead
    for (var i = 0; i < this.treasurePopups.length; i++)
    {
        var treasurePopup = this.treasurePopups[i];
        
        treasurePopup.Update(dt);

        if (treasurePopup.destroy)
        {
            this.treasurePopups.splice(i--, 1);
        }
    }
}

TreasureManager.prototype.GetClosestTreasureInfo = function(pos)
{
    var distMax = game.width * 0.5;
    
    var closestDist = Number.MAX_VALUE;
    var closestTreasureInfo = { dist: Number.MAX_VALUE, distFactor: 1.0, treasure: null };

    for (var i = 0; i < this.treasures.length; i++)
    {
        var treasure = this.treasures[i];

        var toTreasure = Phaser.Point.subtract(treasure, pos);
        var distToTreasure = toTreasure.getMagnitude();
        if (distToTreasure < closestDist)
        {
            closestDist = distToTreasure;
            closestTreasureInfo.dist = closestDist;

            var distFactor = game.math.clamp(distToTreasure / distMax, 0.0, 1.0);
            distFactor = Math.sin(distFactor * Math.PI * 0.5);
            closestTreasureInfo.distFactor = distFactor;

            closestTreasureInfo.treasure = treasure;
        }
    }

    return closestTreasureInfo;
}

TreasureManager.prototype.DigUpTreasure = function(treasure)
{
    treasure.destroy = true;

    var params =
    {
        id: treasure.id,
        x: treasure.x,
        y: treasure.y,
    };

    this.treasurePopups.push(new TreasurePopup(params));
}