sap.ui.define(["exports"],function(e){"use strict";const t=(e,t=1)=>{const r=[];for(let o=0;o<e;o++){if(o%t===0){let e=o.toString();if(e.length===1){e=`0${e}`}r.push(e)}}return r};const r=(e,r)=>{let o=[];if(e.isTwelveHoursFormat){o=t(r||12,1)}else{o=t(r||24,1)}if(e.minHour===1){for(let e=0;e<o.length;e++){const t=o[e]*1+1;if(t.toString().length===1){o[e]=`0${t.toString()}`}else{o[e]=t.toString()}}}return o};const o=(e,r)=>t(e||60,r);const s=(e,r)=>t(e||60,r);const u=e=>{const t={};if(e==="hour0_23"){t.minHour=0;t.maxHour=23;t.isTwelveHoursFormat=false}else if(e==="hour1_24"){t.minHour=1;t.maxHour=24;t.isTwelveHoursFormat=false}else if(e==="hour0_11"){t.minHour=0;t.maxHour=11;t.isTwelveHoursFormat=true}else if(e==="hour1_12"){t.minHour=1;t.maxHour=12;t.isTwelveHoursFormat=true}return t};const i=(e,t)=>{const r=[false,false,false,false];for(let o=0;o<e.length;o++){if(t.maxHour!==0){r[0]=true}if(t.maxHour!==0&&t.isTwelveHoursFormat){r[0]=true}if(e[o].type==="minute"){r[1]=true}if(e[o].type==="second"){r[2]=true}if(e[o].type==="amPmMarker"){r[3]=true}}return r};e.getHours=r;e.getHoursConfigByFormat=u;e.getMinutes=o;e.getSeconds=s;e.getTimeControlsByFormat=i;Object.defineProperty(e,"__esModule",{value:true})});