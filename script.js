
let bloodReqPre12 = [724,741,758,775,793,811,829,847];
let bloodOffsetLvl10 = bloodReqPre12[bloodReqPre12.length-1] + bloodReqPre12[bloodReqPre12.length-2];
let bloodOffsetLvl4 = bloodReqPre12.reduce(function(a , b){
    return a+b;
},0);
let currentClass = "Lone Survivor";
let classes = 
{
    "Milquetoast" : {baseLvl: 10,  startingEchoes: 300, vit:11,end:10,str:12,skl:10,btg: 9, arc: 8},
    "Lone Survivor" : {baseLvl: 10,startingEchoes: 420,  vit:14,end:11,str:11,skl:10,btg: 7, arc: 7},
    "Troubled Childhood" : {baseLvl: 10,startingEchoes: 360,  vit:9,end:14,str:9,skl:13,btg: 6, arc: 9},
    "Violent Past" : {baseLvl: 10,startingEchoes: 180,  vit:12,end:11,str:15,skl:9,btg: 6, arc: 7},
    "Professional" : {baseLvl: 10,startingEchoes: 240,  vit:9,end:12,str:9,skl:15,btg: 7, arc: 8},
    "Military Veteran" : {baseLvl: 10,startingEchoes: 320,  vit:10,end:10,str:14,skl:13,btg: 7, arc: 6},
    "Noble Scion" : {baseLvl: 10,startingEchoes: 240,  vit:7,end:8,str:9,skl:13,btg: 14, arc: 9},
    "Cruel Fate" : {baseLvl: 10,startingEchoes: 500,  vit:10,end:12,str:10,skl:9,btg: 5, arc: 14},
    "Waste Of Skin" : {baseLvl: 4,startingEchoes: 10,  vit:10,end:9,str:10,skl:9,btg: 7, arc: 9}
}
let currentStats = Array(6);
let goalStats = Array(6);

let goalDisplays = document.querySelectorAll(".goalStats");



function calculateBloodRequired(startLvl, goalLvl){
    let currentLevel = startLvl;
    let goalLevel = goalLvl;
    let totalBloodEchoes = 0;


    for (let i = currentLevel; i < goalLevel; i++) {
        totalBloodEchoes += levelUpOnce(i);
    }
    return totalBloodEchoes;
} 

function levelUpOnce(lvl){
    //y=0.02x^3 + 3.06x^2 + 105.6x - 895
    let echoesReq = Math.round(Math.pow(lvl+1,3)*0.02 + 3.06*(Math.pow(lvl+1,2)) + 105.6*(lvl+1) - 895);
    return echoesReq;
}
function displayCurrentStats(startClass){

    goalStats[0] = currentStats[0] = document.querySelector(`#vit`).value = classes[startClass].vit;
    goalStats[1] = currentStats[1] = document.querySelector(`#end`).value = classes[startClass].end;
    goalStats[2] = currentStats[2] = document.querySelector(`#str`).value = classes[startClass].str;
    goalStats[3] = currentStats[3] = document.querySelector(`#skl`).value = classes[startClass].skl;
    goalStats[4] = currentStats[4] = document.querySelector(`#btg`).value = classes[startClass].btg;
    goalStats[5] = currentStats[5] = document.querySelector(`#arc`).value = classes[startClass].arc;

    document.querySelector("#className").innerHTML = startClass;
}
function getGoalStats(){
    for(let i = 0; i< goalStats.length ; i++){
        goalStats[i] = goalDisplays[i].value;
    }
}

function displayGoalStats(){
    for(let i = 0; i< goalStats.length ; i++){
        goalDisplays[i].value = goalStats[i];
    }
}


function calculateLevelDifference(){
    let sum = 0;
    
    getGoalStats();
    for (let i = 0; i < currentStats.length; i++) {
        sum += (goalStats[i] - currentStats[i]);
    }
    return sum;
    // return sum + classes[currentClass].baseLvl;
}
function showLvlDif(){
    let lvlDif = calculateLevelDifference();
    document.querySelector("#lvlDif").innerHTML = `there is a level difference of ${lvlDif} level${lvlDif>1 ? "s" : ""}, starting level ${classes[currentClass].baseLvl} and starting with ${classes[currentClass].startingEchoes} blood echoes`;
}
function getResult(){
    let lvlDif = calculateLevelDifference();
    let adjustedLvlDifference;
    let bloodOffset;
    if(currentClass == "" || lvlDif <1) return;
    adjustedLvlDifference = lvlDif - 2;
    bloodOffset = bloodOffsetLvl10;
    if(currentClass == "Waste Of Skin"){
        adjustedLvlDifference = lvlDif - 8;
        bloodOffset = bloodOffsetLvl4;
    }
    let totalBlood = calculateBloodRequired(12,12+adjustedLvlDifference);
    console.log(totalBlood);
    document.querySelector('#bloodTotal').innerHTML= `You need ${totalBlood + bloodOffset} blood echoes to reach this level`;

    showLvlDif();
}
function populateGoalStats(){
    goalStats[0] = 50; 
    goalStats[1] = 50; 
    goalStats[2] = 50; 
    goalStats[3] = 50; 
    goalStats[4] = 50; 
    goalStats[5] = 50;
    displayGoalStats(); 
}
function updateCurrentClass(){
    currentClass = document.querySelector("#classesSelector").value;
    displayCurrentStats(currentClass);
    displayGoalStats();
}
