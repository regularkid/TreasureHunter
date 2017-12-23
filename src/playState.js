var playState =
{
    preload: function()
    {
    },

    create: function()
    {
        g_EntityManager.AddEntity(TreasureManager);
        g_EntityManager.AddEntity(Map);
        g_EntityManager.AddEntity(MapRenderer, g_EntityManager.GetEntityByClass(Map));
        g_EntityManager.AddEntity(HUD);
        g_EntityManager.AddEntity(TrophyCase);

        g_AudioManager.AddSound("DamageChest", false);
        g_AudioManager.AddSound("DigMiss", false);
        g_AudioManager.AddSound("FindChest", false);
        g_AudioManager.AddSound("NewMap", false);
        g_AudioManager.AddSound("OpenChest", false);

        game.input.onDown.add(this.onMouseDown, this);        
        //game.time.advancedTiming = true;

        this.spawnNextTreasure();
    },

    shutdown: function()
    {
        g_EntityManager.RemoveAllEntities();
    },

    update: function()
    {
        g_EntityManager.Update();
    },

    render: function()
    {
        //game.debug.text(game.time.fps, 2, 14, "#00ff00");
    },

    onMouseDown: function()
    {
        var treasureManager = g_EntityManager.GetEntityByClass(TreasureManager);
        var closestTreasureInfo = treasureManager.GetClosestTreasureInfo(game.input.activePointer);
        if (closestTreasureInfo.treasure != null && closestTreasureInfo.distFactor <= 0.05)
        {
            treasureManager.DigUpTreasure(closestTreasureInfo.treasure);
            g_EntityManager.GetEntityByClass(TrophyCase).OnTreasureFound(closestTreasureInfo.treasure);
            g_EntityManager.RemoveEntity(g_EntityManager.GetEntityByClass(Detector));
            g_AudioManager.PlaySound("FindChest");
            g_AudioManager.PlaySound("DigMiss");
        }
        else if (g_EntityManager.GetEntityByClass(Detector) != null)
        {
            g_AudioManager.PlaySound("DigMiss");
        }
    },

    spawnNextTreasure: function()
    {
        var treasureManager = g_EntityManager.GetEntityByClass(TreasureManager);

        treasureManager.DestroyAllTreasures();
        treasureManager.CreateTreasure(game.rnd.integerInRange(0, 63));

        g_EntityManager.AddEntity(Detector);
        g_AudioManager.PlaySound("NewMap");
    },
};