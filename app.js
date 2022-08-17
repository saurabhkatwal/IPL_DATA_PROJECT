const { FORMERR } = require("dns");
const fs = require("fs");
csv = fs.readFileSync("matches.csv");
var array = csv.toString().split("\r");
const fs2=require("fs");
csv2=fs.readFileSync("deliveries.csv");
var array2=csv2.toString().split("\r");
////////////////////////////////////////deliveries.csv file conversion/////////////////////////////////////
let result2 = [];
 

let headers2 = array2[0].split(", ")
 

for (let i = 1; i < array2.length - 1; i++) {
  let obj2 = {}
 
 
  let str2 = array2[i]
  let s2 = ''
 
  
  let flag2 = 0
  for (let ch2 of str2) {
    if (ch2 === '"' && flag2 === 0) {
      flag2 = 1
    }
    else if (ch2 === '"' && flag2 == 1) flag2 = 0
    if (ch2 === ', ' && flag2 === 0) ch2 = '|'
    if (ch2 !== '"') s2 += ch2
  }
 
  
  let properties2 = s2.split("|")
 
 
  for (let j2 in headers2) {
    if (properties2[j2].includes(", ")) {
      obj2[headers2[j2]] = properties2[j2]
        .split(", ").map(item2 => item2.trim())
    }
    else obj2[headers2[j2]] = properties2[j2]
  }
 
  
  result2.push(obj2)
}
 

let json2 = JSON.stringify(result2);
fs.writeFileSync('output2.json', json2);

// console.log(result2[0][headers2]);
let values2=[];
for(let i=1;i<result2.length;i++){
    let valueString2=result2[i][headers2];
    values2.push(valueString2);
}
// console.log(values2);

//////////////////////////////////////////matches.csv file conversion //////////////////////////////////////////////
// console.log(array);
let result=[];
let headers=array[0].split(', ');
for (let i = 1; i < array.length - 1; i++) {
    let obj = {}
   
    
    let str = array[i]
    let s = ''
   
    
    let flag = 0
    for (let ch of str) {
      if (ch === '"' && flag === 0) {
        flag = 1
      }
      else if (ch === '"' && flag == 1) flag = 0
      if (ch === ', ' && flag === 0) ch = '|'
      if (ch !== '"') s += ch
    }
   
    
    let properties = s.split("|")
   
    
    for (let j in headers) {
      if (properties[j].includes(", ")) {
        obj[headers[j]] = properties[j]
          .split(", ").map(item => item.trim())
      }
      else obj[headers[j]] = properties[j]
    }
   
    
   result.push(obj)
  }
//    console.log(result);
  
  let json = JSON.stringify(result);
  let objMain=JSON.parse(json);
//   console.log(objMain[0][headers]);
// console.log(typeof headers[0]);
//   fs.writeFileSync('output.json', json);


// console.log(headers);
// console.log(headers);
// let temp="hello\nt\rhere";
// temp=temp.split('\r');
// console.log(temp);




///////////////////////////////////////////////THIRD QUESTION/////////////////////////////////////////////
//GETTING 2016 MATCH DATA
// console.log(result[0][headers]);
const MATCH_VALUES=[];
for(let i=0;i<result.length;i++){
    let values=result[i][headers];
    let splitValues=result[i][headers].toString().split(',');
    if(splitValues[1]==='2016'){
    MATCH_VALUES.push(splitValues);
    }
}
// console.log(MATCH_VALUES.length);
// console.log(MATCH_VALUES[0][0]); //2016 DATA
//GETTING MATCH_ID LIST FROM 2016
let MATCH_ID_LIST=[];
for(let i=0;i<MATCH_VALUES.length;i++){
MATCH_ID_LIST.push(MATCH_VALUES[i][0]);
}
// console.log(MATCH_ID_LIST);
//REMOVING NEWLINE CHARACTERS FROM THE STRINGS
const FILTERED_MATCH_LIST=[];
for(let i=0;i<MATCH_ID_LIST.length;i++){
    let s=MATCH_ID_LIST[i];
    s=s.replace('\n', '');
    FILTERED_MATCH_LIST.push(s);
}
// console.log(typeof FILTERED_MATCH_LIST[0]);
// console.log(result[0][headers].toString().split(',')[1]);







/////////////////////////////////////////////////////First Question///////////////////////////////////////////////////
//NUMBER OF MATCHES PLAYED PER YEAR
/*const seasons=['2008','2009','2010','2011','2012','2013','2014','2015','2016','2017'];
const matches_per_season=[];*/
// for(let i=0;i<seasons.length;i++){
//     console.log(seasons[i]);
// }
/*for(let i=0;i<seasons.length;i++){
let tempVar=seasons[i];
let count=0;
for(let i=0;i<result.length;i++){
let value=result[i][headers];
let splitValues=value.toString().split(',');
let year=splitValues[1];
if(year===tempVar){
    count++;
}
}
matches_per_season.push(count);
}
for(let i=0;i<seasons.length;i++){
    console.log('year '+seasons[i]+', count : '+matches_per_season[i]);
}*/

// console.log(result[0][headers].toString().split(',')[1]);

///////////////////////////////////////////////////SECOND QUESTION///////////////////////////////////////////////////
//NUMBER OF MATCHES WON BY TEAM OVER ALL YEARS
// console.log(result[0]);
/*const ALL_TEAM_NAMES=[];
for(let i=0;i<result.length;i++){
    let values=result[i][headers];
    let splitValues=values.toString().split(',');
    let team=splitValues[4];
    ALL_TEAM_NAMES.push(team);
}
let UNIQUE_TEAM_NAMES=[];
UNIQUE_TEAM_NAMES= ALL_TEAM_NAMES.filter(function(team,index){
return ALL_TEAM_NAMES.indexOf(team)===index;
})*/

// console.log(UNIQUE_TEAM_NAMES);
// const TEAMS=result

//counting the victories by each team

/*const TOTAL_WINS=[];
for(let i=0;i<UNIQUE_TEAM_NAMES.length;i++){
let count_team=UNIQUE_TEAM_NAMES[i];
let count=0;
for(let j=0;j<result.length;j++){
    let values=result[j][headers];
    let splitValues=values.toString().split(',');
    let listed_team=splitValues[10];
    if(count_team===listed_team){
        count++;
    }
}
TOTAL_WINS.push(count);
}
if(TOTAL_WINS.length===UNIQUE_TEAM_NAMES.length){
    console.log("yes");
}
for(let i=0;i<UNIQUE_TEAM_NAMES.length;i++){
    console.log('Wins by '+UNIQUE_TEAM_NAMES[i]+' : '+TOTAL_WINS[i]);
}
*/

///////////////////////////////////////////////THIRD QUESTION/////////////////////////////////////////////////////////




















///////////////////////////////////////////////FIFTH QUESTION///////////////////////////////////////////////////////

//PLAYER WITH MOST MAN OF THE MATCH WINS ALL TIME(2008-17)
/*const MOTM_List=[];
for(let i=0;i<result.length;i++){
    let values=result[i][headers];
    let splitValues=values.toString().split(',');
    let MOTM_W=splitValues[13];
    MOTM_List.push(MOTM_W);
}
MOTM_Winners=MOTM_List.filter(function(winner,index){
return MOTM_List.indexOf(winner)===index;
})*/
// console.log(MOTM_Winners);
/*const MOTM_Counts=[];
for(let i=0;i<MOTM_Winners.length;i++){
    let count=0;
    for(let j=0;j<MOTM_List.length;j++){
        if(MOTM_Winners[i]===MOTM_List[j]){
            count++;
        }
    }
    MOTM_Counts.push(count);
}*/
// console.log(MOTM_Counts);
/*let maxAwarded=0;
let maxIndex=-1;
for(let i=0;i<MOTM_Counts.length;i++){
if(MOTM_Counts[i]>maxAwarded){
    maxAwarded=MOTM_Counts[i];
    maxIndex=i;
}
}
console.log(MOTM_Winners[maxIndex]+' : '+MOTM_Counts[maxIndex]);*/