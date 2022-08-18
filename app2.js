
const { Console } = require("console");
const { FORMERR } = require("dns");
const fs = require("fs");
csv = fs.readFileSync("matches.csv")


var array = csv.toString().split("\r\n");


let result = [];


let headers = array[0].split(", ")


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


let json = JSON.stringify(result);
fs.writeFileSync('output.json', json);
// console.log(result);



//////////////////////////////////////////deliveries.csv file////////////////////////////////////


const fsDel = require("fs");
csvDel = fsDel.readFileSync("deliveries.csv")


var arrayDel = csvDel.toString().split("\r\n");


let resultDel = [];


let headersDel = arrayDel[0].split(", ")


for (let i = 1; i < arrayDel.length - 1; i++) {
let obj = {}


let str = arrayDel[i]
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


for (let j in headersDel) {
	if (properties[j].includes(", ")) {
	obj[headersDel[j]] = properties[j]
		.split(", ").map(item => item.trim())
	}
	else obj[headersDel[j]] = properties[j]
}


resultDel.push(obj)
}


let jsonDel = JSON.stringify(result);
fs.writeFileSync('output.json', jsonDel);
// console.log(result);

///////////////////////////////////////////////THIRD QUESTION//////////////////////////////////////////
let matches_values=[];
for(let i =0;i<result.length;i++){
    let value=result[i][headers];
    let splitValues=value.toString().split(',');
    matches_values.push(splitValues);
}
// console.log(matches_values);
//GETTING 2016 MATCH IDS
const MATCH_IDS=[];
for(let i=0;i<result.length;i++){
    let year=matches_values[i][1];
    if(year==='2016'){
        let match_ID=matches_values[i][0];
        MATCH_IDS.push(match_ID);
    }
}
// console.log(MATCH_IDS);


//GETTING BOWLING TEAMS

const BOWLING_TEAMS=[];
for(let i=0;i<MATCH_IDS.length;i++){
    for(let j=136365;j<resultDel.length;j++){
        let del_value=resultDel[j][headersDel].split(',');
        // console.log(del_value);
        let match_id_del=del_value[0];
        let bowling_team=del_value[3];
        if(MATCH_IDS[i]==match_id_del){
            BOWLING_TEAMS.push(bowling_team);
        }
    }
}
// console.log(BOWLING_TEAMS.length);
// console.log(resultDel[0][headersDel].toString().split(',')[0]);

//GETTING BOWLING TEAMS

let UNIQUE_BOWLING_TEAMS=BOWLING_TEAMS.filter(function(team,index){
return BOWLING_TEAMS.indexOf(team)===index;
});
// console.log(UNIQUE_BOWLING_TEAMS);

//GETTING EXTRA RUNS FOR THOSE UNIQUE BOWLING TEAMS
const EXTRA_RUNS=[];
for(let i=0;i<UNIQUE_BOWLING_TEAMS.length;i++){
    let sum=0;
    for(let j=136365;j<resultDel.length;j++){
        let del_value=resultDel[j][headersDel].split(',');
        let curr_bowling_team=del_value[3];
        if(UNIQUE_BOWLING_TEAMS[i]===curr_bowling_team){
            let extra_runs=del_value[16];
            sum+=Number(extra_runs);
        }
    }
    EXTRA_RUNS.push(sum);
}
// console.log(EXTRA_RUNS);
console.log('***************************************************************************');
console.log('EXTRA RUNS CONCEDED BY A TEAM');
console.log('***************************************************************************');
for(let i=0;i<UNIQUE_BOWLING_TEAMS.length;i++){
    console.log(UNIQUE_BOWLING_TEAMS[i]+' conceded '+EXTRA_RUNS[i]+' extra runs in 2016');
    console.log("-------------------------------------------------------------------------------------");
}




/////////////////////////////////////////////////FOURTH QUESTION////////////////////////////////////////

//TOP ECONOMICAL BOWLER

//GETTING THE MATCH IDS IN 2015

const MATCH_IDS_2015=[];
for(let i=0;i<result.length;i++){
    let year=result[i][headers].toString().split(',')[1];
    if(year === '2015'){
        let match_id=result[i][headers].toString().split(',')[0];
        MATCH_IDS_2015.push(match_id);
    }
}
// console.log(MATCH_IDS_2015);

//GETTING THE BOWLERS
const BOWLER_NAMES_2015=[];
for(let i=0;i<MATCH_IDS_2015.length;i++){
    let match_ID=MATCH_IDS_2015[i];
    for(let j=122714;j<136365;j++){
        let match_ID_Del=resultDel[j][headersDel].toString().split(',')[0];
        if(match_ID===match_ID_Del){
            let bowler=resultDel[j][headersDel].toString().split(',')[8];
            BOWLER_NAMES_2015.push(bowler);
        }
    }
}
// console.log(BOWLER_NAMES_2015);
//GETTING UNIQUE BOWLER NAMES IN 2015
UNIQUE_BOWLERS_2015=BOWLER_NAMES_2015.filter(function(bowler,index){
return BOWLER_NAMES_2015.indexOf(bowler)===index;
})
// console.log(UNIQUE_BOWLERS_2015);
// console.log(UNIQUE_BOWLERS_2015.length);

//GETTING FREQUENCIES OF EACH BOWLER IN 2015
const BOWLER_FREQUENCIES=[];
for(let i=0;i<UNIQUE_BOWLERS_2015.length;i++){
    let count=0;
    for(let j=0;j<BOWLER_NAMES_2015.length;j++){
        if(UNIQUE_BOWLERS_2015[i]===BOWLER_NAMES_2015[j]){
            count++;
        }
    }
    BOWLER_FREQUENCIES.push(count);
}
// console.log(BOWLER_FREQUENCIES.length);
//RUNS GIVEN BY EACH BOWLER
const RUNS_PER_BOWLER=[];
for(let i=0;i<UNIQUE_BOWLERS_2015.length;i++){
    let runs=0
    for(let j=0;j<BOWLER_NAMES_2015.length;j++){
        if(UNIQUE_BOWLERS_2015[i]===BOWLER_NAMES_2015[j]){
            let run_per_bowler=resultDel[j][headersDel].toString().split(',')[17];
            runs+=Number(run_per_bowler);
        }
    }
    RUNS_PER_BOWLER.push(runs);
}
// console.log(RUNS_PER_BOWLER);
// console.log(resultDel[122714][headersDel].toString().split(',')[17]);
// console.log(BOWLER_NAMES_2015);
// console.log(UNIQUE_BOWLERS_2015);
//EFFICIENCY PER BOWLER
const EFFICIENCY=[];
for(let i=0;i<UNIQUE_BOWLERS_2015.length;i++){
let run=RUNS_PER_BOWLER[i];
let frequency=BOWLER_FREQUENCIES[i];
let efficiency_per_bowler=run/frequency;
EFFICIENCY.push(efficiency_per_bowler);
}
// console.log(EFFICIENCY);
let min=100000;
let minIndex=10000000;
for(let i=0;i<EFFICIENCY.length;i++){
if(EFFICIENCY[i]<min){
    min=EFFICIENCY[i];
    minIndex=i;
}
}console.log('***************************************************************************');
console.log('MOST ECONOMICAL BOWLER IN 2015');
console.log('***************************************************************************');
console.log("Most economic bowler in 2015 was "+UNIQUE_BOWLERS_2015[minIndex]);
// for(let i=0;i<UNIQUE_BOWLERS_2015.length;i++){
//     console.log(UNIQUE_BOWLERS_2015[i]+' : Balls : '+BOWLER_FREQUENCIES[i]+' runs given : '+RUNS_PER_BOWLER[i]);
// }
// console.log(UNIQUE_BOWLERS_2015[21]+':: balls delivered '+BOWLER_FREQUENCIES[21]+':: runs given '+RUNS_PER_BOWLER[21]+':: Efficiency '+EFFICIENCY[21]);