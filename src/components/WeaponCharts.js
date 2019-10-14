import React from 'react';
// import manifest from './manifest';
import {Doughnut, Pie, HorizontalBar} from 'react-chartjs-2';


export default function WeaponCharts(props) {
  if(props.socketDefs === undefined) {
    return null;
  }

  const manifest = props.socketDefs

  const testPath = props;

  // function handleWCSubmit(event) {
    // event.preventDefault();
    // let elementsToMove = document.querySelectorAll('.navButton');
    // for(let i=0; i<elementsToMove.length; i++) {
      // elementsToMove[i].classList.add('moveToSide');
      // elementsToMove[i].classList.remove('grantPriority');
      // elementsToMove[i].classList.remove('resetFromSide');
    // }

    // document.getElementById('weaponChartsButton').classList.add('grantPriority');
    // document.getElementById('weaponChartsButton').classList.remove('moveToSide');
    // document.getElementById("backgroundTransitions").classList.remove('removeBodyShadow');
    // document.getElementById("backgroundTransitions").classList.add('bodyShadow');

    // document.getElementById('wepContainer').classList.remove('hiding');
    // document.getElementById('weaponContainer').classList.remove('hiding');
    // document.getElementById('wepContainer').style.overflowY = "scroll";

    WepList(testPath);
    // console.log(testPath);
  // }

  let labelIncrementor = 0;

  function GraphCreator(j) {
    // let tempData = {j, k, l};
    // console.log(j.allData[0], j.allData[1], j.allData[2])
    // let tempData = [meleeData, grenadeData, superData];
    let doughnutData = {
      labels: ["melee kills", "grenade kills", "super kills"],
      datasets: [
        {
          data: [j.allData[0], j.allData[1], j.allData[2]],
          // data: [50, 50, 50],
          backgroundColor: ['rgba(233, 11, 11, 0.6)', 'rgba(17, 17, 232, 0.6)', 'rgba(249, 160, 71, 0.6)'],
        },
      ]
    }

    return (
      <Pie
        data={doughnutData}
        options={{ maintainAspectRatio: false, responsive: false }}
      />
    )
  }






  // let weaponTypes = ["Sidearm", "Auto Rifle", "Pulse Rifle", "Combat Bow", "Scout Rifle", "Hand Cannon", "Sniper Rifle", "Submachine Gun", "Trace Rifle", "Linear Fusion Rifle", "Grenade Launcher", "Shotgun", "Rocket Launcher", "Sword", "Machine Gun"];
  let eachArchetypeAverages = {
    "Sidearm": {},
    "Auto Rifle": {},
    "Pulse Rifle": {},
    "Combat Bow": {},
    "Scout Rifle": {},
    "Hand Cannon": {},
    "Sniper Rifle": {},
    "Submachine Gun": {},
    "Trace Rifle": {},
    "Fusion Rifle": {},
    "Linear Fusion Rifle": {},
    "Grenade Launcher": {},
    "Shotgun": {},
    "Rocket Launcher": {},
    "Sword": {},
    "Machine Gun": {},
    "All Types": {
      count: 0
    }
  };

  let eachPlayerStatAverages = { //on hover, show real stats, not % dif
    "Sidearm": {},
    "Auto Rifle": {},
    "Pulse Rifle": {},
    "Combat Bow": {},
    "Scout Rifle": {},
    "Hand Cannon": {},
    "Sniper Rifle": {},
    "Submachine Gun": {},
    "Trace Rifle": {},
    "Fusion Rifle": {},
    "Linear Fusion Rifle": {},
    "Grenade Launcher": {},
    "Shotgun": {},
    "Rocket Launcher": {},
    "Sword": {},
    "Machine Gun": {},
    "All Types": {
      count: 0
    }
  };

  // let eachStatToAverage = ['scoreAvg', 'oppDefAvg', 'killsAvg', 'abilityKills', 'grenadeKills', 'superKills', 'standingAvg', 'assistsAvg', 'deathsAvg', 'effAvg', 'perKAvg', 'perLAvg'];

  for (let eachWeaponKey in props) {
    let wepType = props[eachWeaponKey].weaponType;

    if(wepType) {
      if(eachPlayerStatAverages[wepType].count === undefined) {
        eachPlayerStatAverages[wepType].count = 1;
      }
      else {
        eachPlayerStatAverages[wepType].count++;
        eachPlayerStatAverages["All Types"].count++;
      }

      for (let eachWepPlayerStat in props[eachWeaponKey]) {
        if(eachWepPlayerStat != "_id" && eachWepPlayerStat != "totalCount") {
          if(eachPlayerStatAverages[wepType][eachWepPlayerStat] === undefined) {
            eachPlayerStatAverages[wepType][eachWepPlayerStat] = props[eachWeaponKey][eachWepPlayerStat]
            if(eachPlayerStatAverages["All Types"][eachWepPlayerStat] === undefined) {
              eachPlayerStatAverages["All Types"][eachWepPlayerStat] = props[eachWeaponKey][eachWepPlayerStat]
            }
          }
          else {
            eachPlayerStatAverages[wepType][eachWepPlayerStat] += props[eachWeaponKey][eachWepPlayerStat]
            eachPlayerStatAverages["All Types"][eachWepPlayerStat] += props[eachWeaponKey][eachWepPlayerStat]
          }
        }
      }
    }
  }

  for(let eachWepType in eachPlayerStatAverages) {
    // if(eachWepType != "All Types") {
      for(let eachWepStat in eachPlayerStatAverages[eachWepType]) {
        if(eachWepStat != "count") {
          eachPlayerStatAverages[eachWepType][eachWepStat] /= eachPlayerStatAverages[eachWepType].count
        }
      }
      eachPlayerStatAverages[eachWepType].kdAvg = eachPlayerStatAverages[eachWepType].killsAvg / eachPlayerStatAverages[eachWepType].deathsAvg
    // }
  }

  console.log(eachPlayerStatAverages)




  for (let eachItem in manifest) {
    if(eachItem != "mapHashes" && eachItem != "statDefinitions") { //FIRST LAYER: FILTERS TO GET WEAPON DEFINITIONS
      let wepType = manifest[eachItem].weaponType;
      // console.log(wepType)

      if(eachArchetypeAverages[wepType] != undefined) {
        if(eachArchetypeAverages[wepType].count === undefined) {
          eachArchetypeAverages[wepType].count = 1;
        }
        else {
          eachArchetypeAverages[wepType].count++;
          eachArchetypeAverages["All Types"].count++;
        }
      }

      //SECOND LAYER: CYCLES THROUGH LIST AND ASSIGNS DEFINITIONS TO EACHARCHETYPEAVERAGES
      for(let eachManifestStat in manifest[eachItem].weaponValues) {
        if(eachArchetypeAverages[wepType] === undefined) {
          console.log(wepType)
        }
        else if(eachArchetypeAverages[wepType][eachManifestStat] === undefined) {
          eachArchetypeAverages[wepType][eachManifestStat] = manifest[eachItem].weaponValues[eachManifestStat].value;
          if(eachArchetypeAverages["All Types"][eachManifestStat] === undefined && manifest[eachItem].weaponValues[eachManifestStat].value != 0) {
            eachArchetypeAverages["All Types"][eachManifestStat] = manifest[eachItem].weaponValues[eachManifestStat].value
          }
        }
        else {
          eachArchetypeAverages[wepType][eachManifestStat] += manifest[eachItem].weaponValues[eachManifestStat].value;
          if(manifest[eachItem].weaponValues[eachManifestStat].value != 0) {
            eachArchetypeAverages["All Types"][eachManifestStat] += manifest[eachItem].weaponValues[eachManifestStat].value;
          } //!!!!COMBAT BOW VELOCITY === 0???
        }//velocity for all is being calculated in
      }//on weaponType or All Weapons hover, show color for each stat relative to one being hovered
    }
    
  }
  console.log(eachArchetypeAverages)




  function WepConstructor(weaponItem) { 
    // console.log(weaponItem) //weaponItem being sent here with twin values?
    if(weaponItem.value != "socketDefs" && weaponItem.value != "statDefs") {
      let revisedWep = testPath[weaponItem.value];
      let revisedWinRate = 1 - revisedWep.playerPerformances.standingAvg.toFixed(2);
      let wepId = weaponItem;
      // let wepIcon = "https://www.bungie.net" + manifest[wepId].weaponIcon;

      let revisedWepName = revisedWep.weaponName;
      let wepIcon = "https://www.bungie.net" + revisedWep.weaponIcon;
      let wepStatKeys = Object.keys(revisedWep.weaponValues);
      // console.log(wepStatKeys) //WORK WITH THIS
      let wepRpmMagSize = [];
      // let barStats = [];
      let type = revisedWep.weaponType;

      if(type === "Fusion Rifle") {
        wepStatKeys = ["Impact", "Range", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Magazine", "Charge Time"]
      }
      else if(type === "Grenade Launcher" || type === "Rocket Launcher") {
        wepStatKeys = ["Blast Radius", "Velocity", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Magazine", "Rounds Per Minute"]
      }
      else if(type === "Combat Bow") {
        wepStatKeys = ["Impact", "Accuracy", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Draw Time", "Rounds Per Minute"]
      }
      else if(type === "Sword") {
        wepStatKeys = ["Impact", "Range", "Defense", "Efficiency", "Ammo Capacity", "Swing Speed"]
      }
      else {
        wepStatKeys = ["Impact", "Range", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Magazine", "Rounds Per Minute"]
      }
      // console.log(wepStatKeys)


      let wepStatVals = wepStatKeys.map(stat => {
        let eachStatHash = testPath.statDefs[stat].statHash
        // if(stat === "1885944937" || stat === "3291498656" || stat === "3291498659" || stat === "Inventory Size") {
        //   return("")
        // }
        // else if(revisedWep.weaponValues[stat].value === 0 || stat === "Power") {
        //   return("")
        // }
        if(revisedWep.weaponValues[eachStatHash] != undefined) {
          if(stat === "Magazine" || stat === "Rounds Per Minute" || stat === "Ammo Capacity" || stat === "Draw Time") {
            // console.log(manifest[wepId])
            return( 
              <div className="eachWepStat leftHalf">
                <div className="statNames">{stat + " "}</div>
                <div className="statVals">{" " + revisedWep.weaponValues[eachStatHash].value}</div>
              </div>
            )
          }
          // else { //CREATOR FOR INNATE WEAPON STATS
            return( 
              <div className="eachWepStat leftHalf">
                <div className="statNames">{stat + " "}</div>
                <div className="statBarContainers">
                  <span className="eachWepStatBar" style={{width: (revisedWep.weaponValues[eachStatHash].value + "%")}}></span>
                  <span className="eachStatBarBg" style={{width: ((100 - revisedWep.weaponValues[eachStatHash].value) + "%")}}></span>
                </div>
                <div className="statVals">{" " + revisedWep.weaponValues[eachStatHash].value}</div>
              </div>
            )
          // }
        }
      })
      // console.log(wepStatVals)

      let vSockets = revisedWep.varSockets;
      let wepPerks = vSockets.map(eachSocket => { //item.varSockets = [ [eachSocket], [eachSocket], [eachSocket] ] 
        if(eachSocket != null) {
          if(Array.isArray(eachSocket)) { //checking if each slot has multiple socket values
            let multipleSockets = eachSocket.map(sock => {
              if(testPath.socketDefs[sock] && testPath.socketDefs[sock].socketName != "Rework Weapon" && !testPath.socketDefs[sock].socketName.includes("Tracker") && !testPath.socketDefs[sock].socketName.includes("Shader") && !testPath.socketDefs[sock].socketName.includes("Ornament") && !testPath.socketDefs[sock].socketName.includes("Masterwork")) {
                let socketIcon = "https://www.bungie.net" + testPath.socketDefs[sock].socketIcon;                
                return(
                  <div className="eachSocket">
                    <img src={socketIcon} className="socketIcons" alt="socketIcon"></img> 
                  </div>
                )
              }
              else if(testPath.socketDefs[sock].socketName === "Rework Weapon" || testPath.socketDefs[sock].socketName.includes("Tracker") || testPath.socketDefs[sock].socketName.includes("Shader") || testPath.socketDefs[sock].socketName.includes("Ornament") || testPath.socketDefs[sock].socketName.includes("Masterwork")) {
                return null
              }
            })
            return(
              <div className="eachSlot">
                {multipleSockets}
              </div>
            )
          }
          else { //if each slot does not have multiple socket values
            return(
              <div className="eachSlot">
                <p>{testPath.socketDefs[eachSocket].socketName}</p>
              </div>
            )
          }
        }
      })


      // return(
      //   <div className="socketsContainer">
      //     <p>{eachSocket}</p>
      //   </div>
      // )
      // wepStatVals yo

      // let wepSameTypeStatRatings = wepStatKeys.map(stat => {
      //   let averagedStat = eachArchetypeAverages[type][stat] / eachArchetypeAverages[type].count;
      //   //if(manifest[wepId].weaponValues[stat].value ><= eachArchetypeAverages[type][stat])

      //   if(stat === "1885944937" || stat === "3291498656" || stat === "3291498659" || stat === "Inventory Size") {
      //     return("")
      //   }
      //   else if(manifest[wepId].weaponValues[stat].value === 0 || stat === "Power") {
      //     return("")
      //   }
      //   else {
      //     return(
      //       <p className="eachAllTypesStatRating">{averagedStat.toFixed(0)}</p>
      //     )
      //   }
      // })

      // let wepAllTypesStatRatings = wepStatKeys.map(stat => {
      //   let averagedStat = eachArchetypeAverages["All Types"][stat] / eachArchetypeAverages["All Types"].count;

      //   if(stat === "1885944937" || stat === "3291498656" || stat === "3291498659" || stat === "Inventory Size") {
      //     return("")
      //   }
      //   else if(manifest[wepId].weaponValues[stat].value === 0 || stat === "Power") {
      //     return("")
      //   }
      //   else {
      //     return(
      //       <p className="eachAllTypesStatRating">{averagedStat.toFixed(0)}</p>
      //     )
      //   }
      // })


      // let tempPlayerRank = ["assistsAvg", "killsAvg", "deathsAvg", "kdAvg" , "effAvg", "scoreAvg"];
      // revisedWep["kdAvg"] = revisedWep.killsAvg / revisedWep.deathsAvg;

      // let tempPlayerRanksSame = tempPlayerRank.map(stat => {
      //   for(let eachWepType2 in eachPlayerStatAverages) {
      //     return(
      //       <p className="tempPlayerRanksSame">{eachPlayerStatAverages[type][stat].toFixed(1)}</p>
      //     )
      //   }
      // })

      // let tempPlayerRanksAll = tempPlayerRank.map(stat => { //INCLUDE THE AVG NEXT TO PERCENT COMPARISON
      //   return(
      //     <p className="tempPlayerRanksAll">{eachPlayerStatAverages["All Types"][stat].toFixed(1)}</p>
      //   )
      // })

      labelIncrementor++;
      // let graphData = [revisedWep.meleeKills.toFixed(1), revisedWep.grenadeKills.toFixed(1), revisedWep.superKills.toFixed(1)]
      return (
        <button className="wepChartsItem" id={"item" + labelIncrementor} onClick={e => displayWepStats(e)}>
          <h3 className="wepNumber">{labelIncrementor}</h3>
          <div className="popularityAndWinRate">
            <p className="timesUsed">Times Used: {revisedWep.playerPerformances.totalCount}</p>
            <p className="winRate">Win Rate: {(revisedWinRate * 100).toFixed(0)}%</p>
          </div>
          <div className={"wepNameIconType t" + revisedWep.weaponTier}>
            <p className="wepName">{revisedWepName}</p>
            <img src={wepIcon} className="wepIcons" alt="wepIcon"></img> 
            <p className="wepType">{revisedWep.weaponType}</p>
          </div>
          <div className={"wepRpmMagSize " + "wepRpmMagSize" + revisedWep.weaponTier}>{wepRpmMagSize}</div>
          <div className={"statsContainer " + "statsContainer" + revisedWep.weaponTier}>
            <div className="wepStatVals">{wepStatVals}</div>
            <div className="wepPerks">{wepPerks}</div>
          </div>
        </button>
      )
    }
    else {
      return null;
    }
  }

  //work on showing most notable medals for each wep
  function displayWepStats(p) { //onClick = show hidden stats / query for best secondary weapon
    let cName = (p.currentTarget.id)
    // console.log(document.getElementById(cName))
    // document.getElementById(cName).style.border = "5px solid red"

    
    let addClass = document.getElementById(cName).classList;
    // console.log(addClass.value)
    if(addClass.value.includes('beingFocused')) {
      addClass.remove('beingFocused')
    }
    addClass.add('beingFocused')
  }

  function WepList(testPathReceiver) {
    let testPathReceiver2 = Object.keys(testPathReceiver);
    // console.log(testPathReceiver2)
    // console.log(testPathReceiver)

    const listOfWeps = testPathReceiver2.map((wepId) => 
      <WepConstructor key={testPathReceiver[wepId].weaponName} value={wepId}/>
    );
    // listOfWeps.reverse();
    // listOfWeps.sort();

    return (
      <div id="weaponContainer" className="hiding">
        {listOfWeps}
      </div>
    )
  }




  let timer = 0;


  function labelTimer(e) {
    timer++;
    // console.log(timer)

    if(timer === 1) {
      transparentLabels(e)
    }
  }

  // let x = document.querySelectorAll('div.wepChartsItem');


  function transparentLabels(e) {
    e.preventDefault();
    // console.log("test test 1", e.target.childNodes[0]);
    let x = document.querySelectorAll('div.labelNum');
    setTimeout(() => timer = 0, 1000);


    let i;
    for (i = 0; i < x.length; i++) {
      x[i].style.borderLeft = "3px solid rgba(255, 153, 36, .5)";
      // if(i%10 === 0) {
        x[i].style.borderTop = "3px solid rgba(255, 153, 36, .5)";
      // }
      // if((i + 1)%10 === 0) {
        x[i].style.borderBottom = "3px solid rgba(255, 153, 36, .5)";
      // }
    } 

    setTimeout(() => {
      let o;
      for (o = 0; o < x.length; o++) {
        x[o].style.borderLeft = "3px solid transparent";
        // if(o%10 === 0) {
          x[o].style.borderTop = "3px solid transparent";
        // }
        // if((o + 1)%10 === 0) {
          x[o].style.borderBottom = "3px solid transparent";
        // }
      } 
    }, 1000)
  }

  return (
    <div id="weaponCharts">
      <section id="wepContainer" onScroll={event => labelTimer(event)}>
        <WepList {...props}/>
      </section>
    </div>
  )
}

        // else if(stat === "Charge Time" || stat === "Swing Speed") {
        //   wepRpmMagSize.unshift(<p className={"eachWepStat " + stat}>{stat + " " + manifest[wepId].weaponValues[stat].value}</p>);
        //   return("");
        // }
        // else if(stat === "Rounds Per Minute") {
        //   wepRpmMagSize.unshift(<p className={"eachWepStat " + stat}>{manifest[wepId].weaponValues[stat].value + " RPM"}</p>);
        //   return("");
        // }
        // else if(stat === "Magazine" || stat === "Draw Time") {
        //   wepRpmMagSize.push(<p className={"eachWepStat " + stat}>{stat + " " + manifest[wepId].weaponValues[stat].value}</p>);
        //   return("");
        // }
        // else if(stat === "Recoil Direction" || stat === "Zoom" || stat === "Blast Radius" || stat === "Impact" || stat === "Reload Speed" || stat === "Accuracy" || stat === "Charge Time" ) {
        //   return(
        //     <p className="eachWepStat rightHalf">{manifest[wepId].weaponValues[stat].value + "  " + stat}</p>
        //   )
        // }


        // let pulseCounter = 0;

        // for (let eachItem in manifest) {  //if item != mapHashes or statDefinitions
        //   if(eachItem != "mapHashes" && eachItem != "statDefinitions") { //First Layer: scans for proper defs.
        //     // console.log(manifest[eachItem].weaponType, "First Layer")
      
        //     if(manifest[eachItem].weaponType === "Pulse Rifle") {//Second Layer: 
        //       // console.log(manifest[eachItem])
        //       pulseCounter++;
        //       if(eachArchetypeAverages["Pulse Rifle"].stabilityAvg === undefined) {
        //         eachArchetypeAverages["Pulse Rifle"].stabilityAvg = 0;
        //       }
        //       else {
        //         eachArchetypeAverages["Pulse Rifle"].stabilityAvg += manifest[eachItem].weaponValues.Stability.value;
        //       }
        //     }
        //   }
          
        // }
        // let thiss = eachArchetypeAverages["Pulse Rifle"].stabilityAvg/pulseCounter;
        // console.log(thiss)