function Treasure(params)
{
    this.id = params.id;
    this.x = params.x;
    this.y = params.y;
    this.destroy = false;
    this.value = game.rnd.integerInRange(100, 10000);
}

Treasure.prototype.Update = function(dt)
{

}