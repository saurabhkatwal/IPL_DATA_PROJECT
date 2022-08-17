const fs = require("fs");
csv = fs.readFileSync("matches.csv");
var array = csv.toString().split("\r");

// console.log(array);
let result=[];
let headers=array[0].split(', ');
for (let i = 1; i < array.length - 1; i++) {
    let obj = {}
   
    // Create an empty object to later add
    // values of the current row to it
    // Declare string str as current array
    // value to change the delimiter and
    // store the generated string in a new
    // string s
    let str = array[i]
    let s = ''
   
    // By Default, we get the comma separated
    // values of a cell in quotes " " so we
    // use flag to keep track of quotes and
    // split the string accordingly
    // If we encounter opening quote (")
    // then we keep commas as it is otherwise
    // we replace them with pipe |
    // We keep adding the characters we
    // traverse to a String s
    let flag = 0
    for (let ch of str) {
      if (ch === '"' && flag === 0) {
        flag = 1
      }
      else if (ch === '"' && flag == 1) flag = 0
      if (ch === ', ' && flag === 0) ch = '|'
      if (ch !== '"') s += ch
    }
   
    // Split the string using pipe delimiter |
    // and store the values in a properties array
    let properties = s.split("|")
   
    // For each header, if the value contains
    // multiple comma separated data, then we
    // store it in the form of array otherwise
    // directly the value is stored
    for (let j in headers) {
      if (properties[j].includes(", ")) {
        obj[headers[j]] = properties[j]
          .split(", ").map(item => item.trim())
      }
      else obj[headers[j]] = properties[j]
    }
   
    // Add the generated object to our
    // result array
    result.push(obj)
  }
//    console.log(result);
  // Convert the resultant array to json and
  // generate the JSON output file.
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
const MOTM_List=[];
for(let i=0;i<result.length;i++){
    let values=result[i][headers];
    let splitValues=values.toString().split(',');
    let MOTM_W=splitValues[13];
    MOTM_List.push(MOTM_W);
}
MOTM_Winners=MOTM_List.filter(function(winner,index){
return MOTM_List.indexOf(winner)===index;
})
// console.log(MOTM_Winners);
const MOTM_Counts=[];
for(let i=0;i<MOTM_Winners.length;i++){
    let count=0;
    for(let j=0;j<MOTM_List.length;j++){
        if(MOTM_Winners[i]===MOTM_List[j]){
            count++;
        }
    }
    MOTM_Counts.push(count);
}
// console.log(MOTM_Counts);
let maxAwarded=0;
let maxIndex=-1;
for(let i=0;i<MOTM_Counts.length;i++){
if(MOTM_Counts[i]>maxAwarded){
    maxAwarded=MOTM_Counts[i];
    maxIndex=i;
}
}
console.log(MOTM_Winners[maxIndex]+' : '+MOTM_Counts[maxIndex]);