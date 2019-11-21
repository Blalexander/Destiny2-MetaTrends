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
  // let eachArchetypeAverages = {
  //   "Sidearm": {},
  //   "Auto Rifle": {},
  //   "Pulse Rifle": {},
  //   "Combat Bow": {},
  //   "Scout Rifle": {},
  //   "Hand Cannon": {},
  //   "Sniper Rifle": {},
  //   "Submachine Gun": {},
  //   "Trace Rifle": {},
  //   "Fusion Rifle": {},
  //   "Linear Fusion Rifle": {},
  //   "Grenade Launcher": {},
  //   "Shotgun": {},
  //   "Rocket Launcher": {},
  //   "Sword": {},
  //   "Machine Gun": {},
  //   "All Types": {
  //     count: 0
  //   }
  // };

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

      for (let eachWepPlayerStat in props[eachWeaponKey].playerPerformances) {
        if(eachWepPlayerStat != "_id" && eachWepPlayerStat != "totalCount") {
          if(eachPlayerStatAverages[wepType][eachWepPlayerStat] === undefined) {
            eachPlayerStatAverages[wepType][eachWepPlayerStat] = props[eachWeaponKey].playerPerformances[eachWepPlayerStat]
            if(eachPlayerStatAverages["All Types"][eachWepPlayerStat] === undefined) {
              eachPlayerStatAverages["All Types"][eachWepPlayerStat] = props[eachWeaponKey].playerPerformances[eachWepPlayerStat]
            }
          }
          else {
            eachPlayerStatAverages[wepType][eachWepPlayerStat] += props[eachWeaponKey].playerPerformances[eachWepPlayerStat]
            eachPlayerStatAverages["All Types"][eachWepPlayerStat] += props[eachWeaponKey].playerPerformances[eachWepPlayerStat]
          }
        }
      }

      for (let eachWepPlayerStat in props[eachWeaponKey].weaponValues) {
        if(eachWepPlayerStat != "_id" && eachWepPlayerStat != "totalCount") {
          if(eachPlayerStatAverages[wepType][eachWepPlayerStat] === undefined) {
            eachPlayerStatAverages[wepType][eachWepPlayerStat] = props[eachWeaponKey].weaponValues[eachWepPlayerStat].value
            if(eachPlayerStatAverages["All Types"][eachWepPlayerStat] === undefined) {
              eachPlayerStatAverages["All Types"][eachWepPlayerStat] = props[eachWeaponKey].weaponValues[eachWepPlayerStat].value
            }
          }
          else {
            eachPlayerStatAverages[wepType][eachWepPlayerStat] += props[eachWeaponKey].weaponValues[eachWepPlayerStat].value
            eachPlayerStatAverages["All Types"][eachWepPlayerStat] += props[eachWeaponKey].weaponValues[eachWepPlayerStat].value
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
      eachPlayerStatAverages[eachWepType].kdAvg = (eachPlayerStatAverages[eachWepType].killsAvg + eachPlayerStatAverages[eachWepType].assistsAvg) / eachPlayerStatAverages[eachWepType].deathsAvg
    // }
  }

  console.log(eachPlayerStatAverages)




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

      if(type === "Fusion Rifle") { //NEED TO BE LOOKED AT
        wepStatKeys = ["Impact", "Range", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Magazine", "Charge Time", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      else if(type === "Grenade Launcher" || type === "Rocket Launcher") {
        wepStatKeys = ["Blast Radius", "Velocity", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Magazine", "Rounds Per Minute", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      else if(type === "Combat Bow") { //NEED TO BE LOOKED AT
        wepStatKeys = ["Impact", "Accuracy", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Draw Time", "Rounds Per Minute", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      else if(type === "Sword") { //NEED TO BE LOOKED AT
        wepStatKeys = ["Impact", "Range", "Defense", "Efficiency", "Ammo Capacity", "Swing Speed", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      else {
        wepStatKeys = ["Impact", "Range", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Magazine", "Rounds Per Minute", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      // console.log(wepStatKeys)


      let wepStatVals = wepStatKeys.map(stat => {
        // console.log("everything ", stat)
        let eachStatHash;
        if(testPath.statDefs[stat]) {
          eachStatHash = testPath.statDefs[stat].statHash
        }
        if(revisedWep.weaponValues[eachStatHash] != undefined || revisedWep.playerPerformances[stat] || stat === "KaD") {
          if(stat === "Magazine" || stat === "Rounds Per Minute" || stat === "Ammo Capacity" || stat === "Draw Time") {
            // console.log(manifest[wepId])
            return( 
              <div className="eachWepStat leftHalf">
                <div className="statNames">{stat + " "}</div>
                <div className="statVals">{" " + revisedWep.weaponValues[eachStatHash].value}</div>
              </div>
            )
          }
          else if(stat === "KaD") {
            return( 
              <div className="eachWepStat playerPerformances">
                <div className="statNames">{stat + " "}</div>
                <div className="playerStatBarContainers">
                  <span className="eachPlayerStatBar" style={{width: ((((revisedWep.playerPerformances.killsAvg + revisedWep.playerPerformances.assistsAvg) / revisedWep.playerPerformances.deathsAvg) / eachPlayerStatAverages[type]["kdAvg"]) * 50 + "%")}}></span>
                  <span className="eachPlayerStatBarLeft" style={{width: (50 + "%")}}></span>
                  <span className="eachPlayerStatBarRight" style={{width: (50 + "%")}}></span>
                </div>
                <div className="statVals">{" " + ((revisedWep.playerPerformances.killsAvg + revisedWep.playerPerformances.assistsAvg) / revisedWep.playerPerformances.deathsAvg).toFixed(1)}</div>
              </div>
            )
          }
          else if(revisedWep.playerPerformances[stat]) {
            // console.log(stat)
            if(eachPlayerStatAverages[type][stat]) {
              return(
                <div className="eachWepStat playerPerformances">
                  <div className="statNames">{stat + " "}</div>
                  <div className="playerStatBarContainers">
                    <span className="eachPlayerStatBar" style={{width: ((revisedWep.playerPerformances[stat] / eachPlayerStatAverages[type][stat]) * 50 + "%")}}></span>
                    <span className="eachPlayerStatBarLeft" style={{width: (50 + "%")}}></span>
                    <span className="eachPlayerStatBarRight" style={{width: (50 + "%")}}></span>
                  </div>
                  <div className="statVals">{" " + revisedWep.playerPerformances[stat].toFixed(1)}</div>
                  {/* <div className="avStatVals">{" " + eachPlayerStatAverages[type][stat].toFixed(1)}</div> */}
                </div>
              )
            }
            return(
              <div className="eachWepStat leftHalf">
                <div className="statNames">{stat + " "}</div>
                <div className="statVals">{" " + revisedWep.playerPerformances[stat].toFixed(1)}</div>
              </div>
            )
          }
          else { //CREATOR FOR INNATE WEAPON STATS
            return( 
              <div className="eachWepStat instrinsicStats">
                <div className="statNames">{stat + " "}</div>
                <div className="statBarContainers">
                  <span className="eachWepStatBar" style={{width: (revisedWep.weaponValues[eachStatHash].value + "%")}}></span>
                  <span className="eachStatBarBg" style={{width: ((100 - revisedWep.weaponValues[eachStatHash].value) + "%")}}></span>
                  <span className="eachAvStatBar" style={{width: ((eachPlayerStatAverages[type][eachStatHash]) + "%")}}></span>
                </div>
                <div className="statVals">{" " + revisedWep.weaponValues[eachStatHash].value}</div>
              </div>
            )
          }
        }
      })
      // console.log(wepStatVals)

      let vSockets = revisedWep.varSockets;
      // let socketItems = [];
      let notAllowed = ["tracker"]
      let wepPerks = vSockets.map(eachSocket => {
        if(eachSocket != null) {
          if(Array.isArray(eachSocket)) {
            let multipleSockets = eachSocket.map(sock => {
              if(testPath.socketDefs[sock] && testPath.socketDefs[sock].socketType != "" && testPath.socketDefs[sock].socketType != "Weapon Ornament" && !testPath.socketDefs[sock].socketType.includes('Tracker') && !testPath.socketDefs[sock].socketType.includes('Catalyst') && !testPath.socketDefs[sock].socketType.includes('Mod') && !testPath.socketDefs[sock].socketType.includes('Shader') && !testPath.socketDefs[sock].socketName.includes('Shader')) {
                let socketIcon = "https://www.bungie.net" + testPath.socketDefs[sock].socketIcon;
                // return(
                //   <p>{testPath.socketDefs[sock].socketName}</p>
                // )
                return (
                  <img src={socketIcon} className="socketIcons" alt="socketIcon"></img>
                )
              }
              // else {
              //   return(
              //     <p>{sock + "Error"}</p>
              //   )
              // }
            })
            return(
              <p className="multiSockets">{multipleSockets}</p>
            )
          }
          else {
            if(testPath.socketDefs[eachSocket]) {
              let socketIcon = "https://www.bungie.net" + testPath.socketDefs[eachSocket].socketIcon;
              // return(
              //   <p>{testPath.socketDefs[sock].socketName}</p>
              // )
              return (
                <img src={socketIcon} className="socketIcons" alt="socketIcon"></img>
              )
            }
            return(
              <p class="singleSockets">{eachSocket}</p>
            )
          }
        }
      })


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
          <div className={"wepAttributes " + "wepAttributes" + revisedWep.weaponTier}>
            <div className={"statsContainer " + "statsContainer" + revisedWep.weaponTier}>
              <div className="wepStatVals">{wepStatVals}</div>
            </div>
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
    console.log(cName)
    
    let addClass = document.getElementById(cName).classList;
    // console.log(addClass.value)
    if(addClass.value.includes('beingFocused')) {
      addClass.remove('beingFocused')
    }
    else {
      addClass.add('beingFocused')
    }
  }

  function WepList(testPathReceiver) {
    let testPathReceiver2 = Object.keys(testPathReceiver);
    console.log(testPathReceiver2)

    const listOfWeps = testPathReceiver2.map((wepId) => 
      <WepConstructor key={testPathReceiver[wepId]._id} value={wepId}/>
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