
/* <-- FIX CROSS ORIGIN ISSUE -->
    var image = new Image();
    img.crossOrigin="Anonymous";
    img.src = "http://server-with-CORS-support.com/path/to/image.jpg";
*/

//define the presets array
var presets = [];
var animations = [];

//below goes the animation presets
//0
var Sun = {
    framerate:3,
    images:["spritesheets/Sun100x80.bmp"],
    frames: {width: 100, height:80},
    animations: {
        shine: [0,2,"shine"]
    }
};
var SunSS = new createjs.SpriteSheet(Sun);
var SunShine = new createjs.Sprite(SunSS, "shine");
presets.push(Sun);
animations.push("shine");


function instantiate(e){
    return new createjs.Sprite(new createjs.SpriteSheet(presets[e]), animations[e]);
}

function dragDrop(e){
    e.regX = 50;
    e.regY = 50;
    e.x = 500;
    e.y = 135;
    e.on("pressmove", function(event){
        event.target.x = event.stageX;
        event.target.y = event.stageY;
    });
    e.on("pressup", function(event) {
        e.x = event.stageX;
        e.y = event.stageY;
        updateSession();
    });
}
