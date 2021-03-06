/* Animation Builder - animate.js
/* Seng Chiat Haw & Francis Piche
/* Copyright (c) 2018
/*
*/

function setWaypoint(e, x, y, time){
    if(sessionStorage.getItem("animate-"+e)==null){
        var anim = [];
        for(k = 0; k < time; k++){
            anim[k] = {
                coordX: 500, //default values
                coordY: 135
            };
        }
        for(k = time; k <= 600; k++){
            anim[k] = {
                coordX: x,
                coordY: y
            };
        }
        sessionStorage.setItem("animate-"+e, JSON.stringify(anim));
    }else{
        var anim = JSON.parse(sessionStorage.getItem("animate-"+e));
            anim[time] = {
                coordX: x,
                coordY: y
            };
            //startCalculate(600);
    }
    sessionStorage.setItem("animate-"+e, JSON.stringify(anim));
}

/*
function calculateTween(e){
    var pre = [];
    var pretime = [];
    anim = JSON.parse(sessionStorage.getItem("animate-"+e));
    anim.forEach(function(e){
        if(pre.includes(e.id)){
            var dX = e.coordX - pretime[e.id].pX;
            var dY = e.coordY - pretime[e.id].pY;
            var Xpt = dX/(e.t_stamp - pretime[e.id].ptime);
            var Ypt = dY/(e.t_stamp - pretime[e.id].ptime);
            
            for(var k = (pretime[e.id].ptime+0.1); k < e.t_stamp; k+=0.1){
                anim.push({
                    id: e.id,
                    t_stamp: k,
                    coordX: e.coordX+=Xpt,
                    coordY: e.coordY+=Ypt
                })
            }

        }else{
            pre.push(e.id);
            pretime[e.id].push({
                ptime: e.t_stamp,
                pX: e.coordX,
                pY: e.coordY
            });
        }
    });
    sessionStorage.setItem("animate-"+e, JSON.stringify(anim));
}
*/

function startCalculate(e, time){
    var anim = JSON.parse(sessionStorage.getItem("animate-"+e));
    var preX = anim[time-1].coordX;
    var preY = anim[time-1].coordY;
    var pretime;
    for(var k = time; k>=0; k--){
        if(anim[k].coordX != preX || anim[k].coordY != preY){
            preX = anim[k].coordX;
            preY = anim[k].coordY;
            pretime = k;
            break;
        }
    }
    var dX = anim[time].coordX - preX;
    var dY = anim[time].coordY - preY;
    var Xpt = dX/((time - pretime));
    var Ypt = dY/((time - pretime));
            
    var inc = 1;
    for(var k = pretime; k < time; k++){
        anim[k].coordX += Xpt*inc;
        anim[k].coordY += Ypt*inc;
    }
    sessionStorage.setItem("animate-"+e, JSON.stringify(anim));
}

function renderFrames(time){
    for(var j=0; j<i; j++){
        if(sessionStorage.getItem("animate-"+j != null)){
            var anim = JSON.parse(sessionStorage.getItem("animate-"+j));

            scene.getChildAt(j).stageX = anim[time].coordX;
            scene.getChildAt(j).stageY = anim[time].coordY;
        }
    }
}

