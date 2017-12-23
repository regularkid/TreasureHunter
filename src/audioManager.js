function AudioManager()
{
    this.audio = {}
}

AudioManager.prototype.AddSound = function(name, isLooping)
{
    this.audio[name] = game.add.audio(name);
    this.audio[name].loop = isLooping;
}

AudioManager.prototype.PlaySound = function(name)
{
    this.audio[name].play();
}

AudioManager.prototype.SetSoundVolume = function(name, volume)
{
    this.audio[name].volume = volume;
}