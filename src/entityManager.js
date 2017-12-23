function EntityManager()
{
    this.entities = new Array();
}

EntityManager.prototype.AddEntity = function(entityClass)
{
    var entityConstructorParams = Array.prototype.slice.call(arguments, 1);
    var entity = new entityClass(...entityConstructorParams);
    entity.isDestroyed = false;

    this.entities.push(entity);

    return entity;
}

EntityManager.prototype.RemoveEntity = function(entity)
{
    // Mark for deletion during update
    entity.isDestroyed = true;
}

EntityManager.prototype.RemoveAllEntities = function()
{
    for (var i = 0; i < this.entities.length; i++)
    {
        if (this.entities[i].OnDestroy != undefined)
        {
            this.entities[i].OnDestroy();
        }
    }

    this.entities = new Array();
}

EntityManager.prototype.GetEntityByClass = function(entityClass)
{
    for (var i = 0; i < this.entities.length; i++)
    {
        if (this.entities[i] instanceof entityClass)
        {
            return this.entities[i];
        }
    }

    return null;
}

EntityManager.prototype.Update = function()
{
    var dt = game.time.physicsElapsed;

    for (var i = 0; i < this.entities.length; i++)
    {
        if (this.entities[i].Update != undefined)
        {
            this.entities[i].Update(dt);
        }
    }

    // Remove all destroyed entities
    for (var i = this.entities.length - 1; i >= 0; i--)
    {
        if (this.entities[i].isDestroyed == true)
        {
            if (this.entities[i].OnDestroy != undefined)
            {
                this.entities[i].OnDestroy();
            }

            this.entities.splice(i, 1);
        }
    }
}