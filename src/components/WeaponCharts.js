import React from 'react';
import manifest from './manifest';
import {Doughnut, Pie} from 'react-chartjs-2';


export default function WeaponCharts(props) {
  // if(props[0] === undefined) {
  //   return null;
  // }

  const testPath = props;

  function handleWCSubmit(event) {
    event.preventDefault();
    let elementsToMove = document.querySelectorAll('.navButton');
    for(let i=0; i<elementsToMove.length; i++) {
      elementsToMove[i].classList.add('moveToSide');
      elementsToMove[i].classList.remove('grantPriority');
      elementsToMove[i].classList.remove('resetFromSide');
    }

    document.getElementById('weaponChartsButton').classList.add('grantPriority');
    document.getElementById('weaponChartsButton').classList.remove('moveToSide');
    document.getElementById("backgroundTransitions").classList.remove('removeBodyShadow');
    document.getElementById("backgroundTransitions").classList.add('bodyShadow');

    // document.getElementById('wepContainer').classList.remove('hiding');
    document.getElementById('weaponContainer').classList.remove('hiding');
    document.getElementById('wepContainer').style.overflowY = "scroll";

    WepList(testPath);
    // console.log(testPath);
  }

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

  let eachPlayerStatAverages = {
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
    let wepType = manifest[props[eachWeaponKey]._id].weaponType;

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

      if(eachArchetypeAverages[wepType].count === undefined) {
        eachArchetypeAverages[wepType].count = 1;
      }
      else {
        eachArchetypeAverages[wepType].count++;
        eachArchetypeAverages["All Types"].count++;
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
        }
      }
    }
    
  }
  console.log(eachArchetypeAverages)




  function WepConstructor(props) {
    let revisedWep = testPath[props.value];
    // console.log(labelIncrementor)

    // let revisedWep = Object.values(currentWep);
    // revisedWep.map(item => {
    //   item.toFixed(2)
    // })
    let revisedWinRate = 1 - revisedWep.standingAvg.toFixed(2);
    let wepId = revisedWep._id;
    // let revisedWepName = manifest[wepId].weaponName;
    // console.log(revisedWepName)
    // let wepIcon = "https://www.bungie.net" + manifest[wepId].weaponIcon;

    if(manifest[wepId]) {
      let revisedWepName = manifest[wepId].weaponName;
      let wepIcon = "https://www.bungie.net" + manifest[wepId].weaponIcon;
      let wepStatKeys = Object.keys(manifest[wepId].weaponValues);
      let wepRpmMagSize = [];
      let type = manifest[wepId].weaponType;


      let wepStatVals = wepStatKeys.map(stat => {
        if(stat === "1885944937" || stat === "3291498656" || stat === "3291498659" || stat === "Inventory Size") {
          return("")
        }
        else if(manifest[wepId].weaponValues[stat].value === 0 || stat === "Power") {
          return("")
        }
        else { //CREATOR FOR INNATE WEAPON STATS
          return( 
            <p className="eachWepStat leftHalf">{stat + " " + manifest[wepId].weaponValues[stat].value + "  "}</p>
          )
        }
      })

      let wepSameTypeStatRatings = wepStatKeys.map(stat => {
        let averagedStat = eachArchetypeAverages[type][stat] / eachArchetypeAverages[type].count;
        //if(manifest[wepId].weaponValues[stat].value ><= eachArchetypeAverages[type][stat])

        if(stat === "1885944937" || stat === "3291498656" || stat === "3291498659" || stat === "Inventory Size") {
          return("")
        }
        else if(manifest[wepId].weaponValues[stat].value === 0 || stat === "Power") {
          return("")
        }
        else {
          if(manifest[wepId].weaponValues[stat].value > averagedStat) { //if thisWep > average
            let percentageGreater = (manifest[wepId].weaponValues[stat].value/averagedStat) * 100;
            return( 
              <p className="eachSameTypeStatRating" style={{color: 'green'}}>^ {(percentageGreater-100).toFixed(1)}%</p>
            )
          }
          else if(manifest[wepId].weaponValues[stat].value < averagedStat) { //if thisWep < average
            let percentageLesser = (averagedStat/manifest[wepId].weaponValues[stat].value) * 100;
            return( 
              <p className="eachSameTypeStatRating" style={{color: 'red'}}>v {(percentageLesser-100).toFixed(1)}%</p>
            )
          }
          else if(manifest[wepId].weaponValues[stat].value == averagedStat) { //if thisWep = average
            return( 
              <p className="eachSameTypeStatRating" style={{color: 'orange'}}>- 0%</p>
            )
          }
        }
      })

      let wepAllTypesStatRatings = wepStatKeys.map(stat => {
        let averagedStat = eachArchetypeAverages["All Types"][stat] / eachArchetypeAverages["All Types"].count;
        //if(manifest[wepId].weaponValues[stat].value ><= eachArchetypeAverages[type][stat])

        if(stat === "1885944937" || stat === "3291498656" || stat === "3291498659" || stat === "Inventory Size") {
          return("")
        }
        else if(manifest[wepId].weaponValues[stat].value === 0 || stat === "Power") {
          return("")
        }
        else {
          if(manifest[wepId].weaponValues[stat].value > averagedStat) { //if thisWep > average
            let percentageGreater = (manifest[wepId].weaponValues[stat].value/averagedStat) * 100;
            return( 
              <p className="eachAllTypesStatRating" style={{color: 'green'}}>^ {(percentageGreater-100).toFixed(1)}%</p>
            )
          }
          else if(manifest[wepId].weaponValues[stat].value < averagedStat) { //if thisWep < average
            let percentageLesser = (averagedStat/manifest[wepId].weaponValues[stat].value) * 100;
            return( 
              <p className="eachAllTypesStatRating" style={{color: 'red'}}>v {(percentageLesser-100).toFixed(1)}%</p>
            )
          }
          else if(manifest[wepId].weaponValues[stat].value == averagedStat) { //if thisWep = average
            return( 
              <p className="eachAllTypesStatRating" style={{color: 'orange'}}>- 0%</p>
            )
          }
        }
      })

      let playerSameTypeStatRatings = wepStatKeys.map(stat => {
        if(stat === "1885944937" || stat === "3291498656" || stat === "3291498659" || stat === "Inventory Size") {
          return("")
        }
        else if(manifest[wepId].weaponValues[stat].value === 0 || stat === "Power") {
          return("")
        }
        else {
          return( 
            <p className="playerSameTypeStatRatings">^ 10%</p>
          )
        }
      })

      let playerAllTypesStatRatings = wepStatKeys.map(stat => {
        if(stat === "1885944937" || stat === "3291498656" || stat === "3291498659" || stat === "Inventory Size") {
          return("")
        }
        else if(manifest[wepId].weaponValues[stat].value === 0 || stat === "Power") {
          return("")
        }
        else {
          return( 
            <p className="playerAllTypesStatRatings">v 10%</p>
          )
        }
      })



      let tempPlayerRank = ["assistsAvg", "killsAvg", "deathsAvg", "kdAvg" , "effAvg", "scoreAvg"];
      revisedWep["kdAvg"] = revisedWep.killsAvg / revisedWep.deathsAvg;

      let tempPlayerRanksSame = tempPlayerRank.map(stat => {
        for(let eachWepType2 in eachPlayerStatAverages) {
          if(revisedWep[stat] > eachPlayerStatAverages[eachWepType2][stat]) {
            let percentageGreater = (revisedWep[stat]/eachPlayerStatAverages[eachWepType2][stat]) * 100;
            return( 
              <p className="tempPlayerRanksAll" style={{color: 'green'}}>^ {(percentageGreater-100).toFixed(1)}%</p>
            )
          }
          else if(revisedWep[stat] < eachPlayerStatAverages[eachWepType2][stat]) {
            let percentageLesser = (revisedWep[stat]/eachPlayerStatAverages[eachWepType2][stat]) * 100;
            return( 
              <p className="tempPlayerRanksAll" style={{color: 'red'}}>v {(percentageLesser-100).toFixed(1)}%</p>
            )
          }
          else if(revisedWep[stat] == eachPlayerStatAverages[eachWepType2][stat]) {
            return( 
              <p className="tempPlayerRanksAll" style={{color: 'orange'}}>- 0%</p>
            )
          }
        }
      })

      let tempPlayerRanksAll = tempPlayerRank.map(stat => { //INCLUDE THE AVG NEXT TO PERCENT COMPARISON
        if(revisedWep[stat] > eachPlayerStatAverages["All Types"][stat]) {
          let percentageGreater = (revisedWep[stat]/eachPlayerStatAverages["All Types"][stat]) * 100;
          return( 
            <p className="tempPlayerRanksAll" style={{color: 'green'}}>^ {(percentageGreater-100).toFixed(1)}%</p>
          )
        }
        else if(revisedWep[stat] < eachPlayerStatAverages["All Types"][stat]) {
          let percentageLesser = (revisedWep[stat]/eachPlayerStatAverages["All Types"][stat]) * 100;
          return( 
            <p className="tempPlayerRanksAll" style={{color: 'red'}}>v {(percentageLesser-100).toFixed(1)}%</p>
          )
        }
        else if(revisedWep[stat] == eachPlayerStatAverages["All Types"][stat]) {
          return( 
            <p className="tempPlayerRanksAll" style={{color: 'orange'}}>- 0%</p>
          )
        }
      })


      if(labelIncrementor%10 === 0) {
        labelIncrementor++;
        let graphData = [revisedWep.meleeKills.toFixed(1), revisedWep.grenadeKills.toFixed(1), revisedWep.superKills.toFixed(1)]
        return (
          <div className="wepChartsItem">
            <h3 className="wepNumber">{labelIncrementor}</h3>
            <div className="popularityAndWinRate">
              <p className="timesUsed">Times Used: {revisedWep.totalCount}</p>
              <p className="winRate">Win Rate: {(revisedWinRate * 100).toFixed(0)}%</p>
            </div>
            <div className={"wepNameIconType t" + manifest[wepId].weaponTier}>
              <p className="wepName">{revisedWepName}</p>
              <img src={wepIcon} className="wepIcons" alt="wepIcon"></img> 
              <p className="wepType">{manifest[wepId].weaponType}</p>
            </div>
            <div className="wepRpmMagSize">{wepRpmMagSize}</div>
            <div className="statsContainer">
              <div className="wepStatVals">{wepStatVals}</div>
              <div className="wepStatValsArrows">
                <div className="sameTypeArrows">
                  <p className="arrowsLabel">{manifest[wepId].weaponType}s</p>
                  {wepSameTypeStatRatings}
                </div>
                <div className="allTypesArrows">
                  <p className="arrowsLabel">All Weapons</p>
                  {wepAllTypesStatRatings}
                </div>
              </div> 
              <div className="playerStats">
                <p className="eachPlayerStat">Assists {revisedWep.assistsAvg.toFixed(2)}</p>
                <p className="eachPlayerStat">Kills {revisedWep.killsAvg.toFixed(2)}</p>
                <p className="eachPlayerStat">Deaths {revisedWep.deathsAvg.toFixed(2)}</p>
                <p className="eachPlayerStat">K/D {(revisedWep.killsAvg / revisedWep.deathsAvg).toFixed(2)}</p>
                <p className="eachPlayerStat">Efficiency {revisedWep.effAvg.toFixed(2)}</p>
                <p className="eachPlayerStat">scoreAvg {revisedWep.scoreAvg.toFixed(2)}</p>
              </div>
              <div className="playerStatRankings">
                 <div className="sameTypeArrows">
                  <p className="arrowsLabel">{manifest[wepId].weaponType}s</p>
                  {tempPlayerRanksSame}
                </div>
                <div className="allTypesArrows">
                  <p className="arrowsLabel">All Weapons</p>
                  {tempPlayerRanksAll}
                </div>
              </div>
              <div className="abilityStats">
                <GraphCreator allData={graphData} />
              </div>
            </div>
          </div>
        )
      }

      labelIncrementor++;
      let graphData = [revisedWep.meleeKills.toFixed(1), revisedWep.grenadeKills.toFixed(1), revisedWep.superKills.toFixed(1)]
      return (
        <div className="wepChartsItem">
          <h3 className="wepNumber">{labelIncrementor}</h3>
          <div className="popularityAndWinRate">
            <p className="timesUsed">Times Used: {revisedWep.totalCount}</p>
            <p className="winRate">Win Rate: {(revisedWinRate * 100).toFixed(0)}%</p>
          </div>
          <div className={"wepNameIconType t" + manifest[wepId].weaponTier}>
            <p className="wepName">{revisedWepName}</p>
            <img src={wepIcon} className="wepIcons" alt="wepIcon"></img> 
            <p className="wepType">{manifest[wepId].weaponType}</p>
          </div>
          <div className="wepRpmMagSize">{wepRpmMagSize}</div>
          <div className="statsContainer">
            <div className="wepStatVals">{wepStatVals}</div>
            <div className="wepStatValsArrows">
              <div className="sameTypeArrows">
                <p className="arrowsLabel">{manifest[wepId].weaponType}s</p>
                {wepSameTypeStatRatings}
              </div>
              <div className="allTypesArrows">
                <p className="arrowsLabel">All Weapons</p>
                {wepAllTypesStatRatings}
              </div>
            </div>
            <div className="playerStats">
              <p className="eachPlayerStat">Assists {revisedWep.assistsAvg.toFixed(2)}</p>
              <p className="eachPlayerStat">Kills {revisedWep.killsAvg.toFixed(2)}</p>
              <p className="eachPlayerStat">Deaths {revisedWep.deathsAvg.toFixed(2)}</p>
              <p className="eachPlayerStat">K/D {(revisedWep.killsAvg / revisedWep.deathsAvg).toFixed(2)}</p>
              <p className="eachPlayerStat">Efficiency {revisedWep.effAvg.toFixed(2)}</p>
              <p className="eachPlayerStat">scoreAvg {revisedWep.scoreAvg.toFixed(2)}</p>
            </div>
            <div className="playerStatRankings">
              <div className="sameTypeArrows">
                <p className="arrowsLabel">{manifest[wepId].weaponType}s</p>
                {tempPlayerRanksSame}
              </div>
              <div className="allTypesArrows">
                <p className="arrowsLabel">All Weapons</p>
                {tempPlayerRanksAll}
              </div>
            </div>
            <div className="abilityStats">
              <GraphCreator allData={graphData} />
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="wepChartsItem">Weapon Name: {wepId}, Times Used: {revisedWep.totalCount}, Assists: {revisedWep.assistsAvg.toFixed(2)}, Kills: {revisedWep.killsAvg.toFixed(2)}, Deaths: {revisedWep.deathsAvg.toFixed(2)}, Efficiency: {revisedWep.effAvg.toFixed(2)}, scoreAvg: {revisedWep.scoreAvg.toFixed(2)}, Win Rate: {revisedWinRate.toFixed(2)}</div>
      )
    }
  }


  function WepList(testPathReceiver) {
    let testPathReceiver2 = Object.keys(testPathReceiver);

    const listOfWeps = testPathReceiver2.map((wepId) => 
      <WepConstructor key={testPathReceiver[wepId]._id} value={wepId}/>
    );

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
    <form id="weaponCharts" onSubmit={handleWCSubmit}>
      <button type="submit" id="weaponChartsButton" className="navButton">
        <section id="wepContainer" onScroll={event => labelTimer(event)}>
          <WepList {...props}/>
        </section>
      </button>
    </form>
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