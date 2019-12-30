import React, {useState} from 'react';
import PowerfulAndPopular from './PowerfulAndPopular';
import Comparisons from './Comparisons';
import MakeMyStatBars from './MakeMyStatBars';
import {Pie} from 'react-chartjs-2';




export default function WeaponCharts(props) {
  // if(props.socketDefs === undefined) {
  //   return null;
  // }
  // console.log(props)

  const manifest = props.socketDefs

  const testPath = props;

  WepList(testPath);

  let labelIncrementor = 0;

  let weaponsOrganizedByType = {};

  for(let weaponDefinition in props) {
    // console.log(weaponDefinition)
    if(weaponDefinition != "socketDefs" && weaponDefinition != "statDefs") {
      let typeToMatch = props[weaponDefinition].weaponType;
      let nameToMatch = props[weaponDefinition].weaponName;
      if(weaponsOrganizedByType[typeToMatch] != undefined) {
        weaponsOrganizedByType[typeToMatch].push({hash: weaponDefinition, name: nameToMatch})
      }
      else {
        weaponsOrganizedByType[typeToMatch] = []
      }
    }
  }


  const [currentWeaponsToDisplay, setCurrentWeaponsToDisplay] = useState('');
  const [currentWepForCombAndComp, setCurrentWepForCombAndComp] = useState('');

  // console.log(weaponsOrganizedByType)

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
      let wepId = weaponItem.value;
      // let wepIcon = "https://www.bungie.net" + manifest[wepId].weaponIcon;

      let revisedWepName = revisedWep.weaponName;
      let wepIcon = "https://www.bungie.net" + revisedWep.weaponIcon;
      let wepStatKeys = Object.keys(revisedWep.weaponValues);
      // console.log(wepStatKeys) //WORK WITH THIS
      let wepRpmMagSize = [];
      // let barStats = [];
      let type = revisedWep.weaponType;

      if(type === "Fusion Rifle") { //NEED TO BE LOOKED AT
        wepStatKeys = ["Impact", "Range", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Charge Time", "Magazine", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      else if(type === "Grenade Launcher" || type === "Rocket Launcher") {
        wepStatKeys = ["Blast Radius", "Velocity", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom",  "Rounds Per Minute", "Magazine", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      else if(type === "Combat Bow") { //NEED TO BE LOOKED AT
        wepStatKeys = ["Impact", "Accuracy", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Draw Time", "Rounds Per Minute", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      else if(type === "Sword") { //NEED TO BE LOOKED AT
        wepStatKeys = ["Impact", "Range", "Defense", "Efficiency", "Ammo Capacity", "Swing Speed", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      else {
        wepStatKeys = ["Impact", "Range", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Rounds Per Minute", "Magazine", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      // console.log(wepStatKeys)





      let wepStatVals = wepStatKeys.map(stat => {
        if(testPath.statDefs[stat]) {
          return(<MakeMyStatBars key={wepId + stat} value={revisedWep} stat={stat} mani={testPath.statDefs[stat].statHash} avs={eachPlayerStatAverages} />)
        }
        else {
          return(<MakeMyStatBars key={wepId + stat} value={revisedWep} stat={stat} mani={stat} avs={eachPlayerStatAverages} />)
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
                let socketDesc = testPath.socketDefs[sock].socketDesc;
                let socketName = testPath.socketDefs[sock].socketName;
                return (
                  <div className="weapon-socket">
                    <img src={socketIcon} className="socketIcons" alt="socketIcon"></img>
                    <div className="socket-tooltip">
                      <p className="socketName">{socketName}</p>
                      <p className="socketDesc">{socketDesc}</p>
                    </div>
                  </div>
                )
              }
            })
            return(
              <div className="multiSockets">{multipleSockets}</div>
            )
          }
          else {
            if(testPath.socketDefs[eachSocket]) {
              let socketIcon = "https://www.bungie.net" + testPath.socketDefs[eachSocket].socketIcon;
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


      const chartData = {
        labels: ["Weapon Kills", "Melee Kills", "Grenade Kills", "Ability Kills", "Super Kills"],
        datasets: [{
          level:'population',
          data:[revisedWep.playerPerformances.wepKillsAvg, revisedWep.playerPerformances.grenadeKills, revisedWep.playerPerformances.meleeKills, revisedWep.playerPerformances.abilityKills, revisedWep.playerPerformances.superKills],
          backgroundColor: ['rgba(255, 255, 255, 0.2)', 'firebrick', 'mediumblue', 'royalblue', 'orange']
        }]
      }

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
            <div className="pie-chart">
              <Pie
                data={chartData}
                width={150}
                height={100}
                options={{ maintainAspectRatio: false, legend: {display: false}, layout: {padding: {right: 50}}, responsive: true }}
              />
            </div>
            <div className="wepPerks">{wepPerks}</div>
            <div className="combAndCompButtons">
              <button className="combination-button" value={wepId} onClick={e => showCombinations(e)}>View Combinations</button>
              <button className="comparison-button" value={wepId} onClick={e => showComparisons(e)}>Compare</button>
            </div>
          </div>
        </button>
      )
    }
    else {
      return null;
    }
  }

  function showCombinations(comboHash) {
    console.log(comboHash.target.value)
    let comboContainer = document.querySelector('.combination-container');
    comboContainer.style.transform = "translate3d(0%, 0, 0)";

    document.getElementById('weaponCharts').style.filter = 'blur(5px)';
    setCurrentWepForCombAndComp(comboHash.target.value);
  }

  function showComparisons(compHash) {
    console.log(compHash.target.value)
    let compContainer = document.querySelector('.comparison-container');
    compContainer.classList.toggle('display-comps');
    // document.getElementById('weaponCharts').style.filter = 'blur(5px)';
    setCurrentWepForCombAndComp(compHash.target.value);
  }

  //work on showing most notable medals for each wep
  function displayWepStats(p) { //onClick = show hidden stats / query for best secondary weapon
    let cName = (p.currentTarget.id)
    // console.log(cName)
    
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
    // console.log(testPathReceiver2)

    const listOfWeps = testPathReceiver2.map((wepId) => 
      <WepConstructor key={testPathReceiver[wepId].hash} value={testPathReceiver[wepId].hash}/>
    );
    // listOfWeps.reverse();
    // listOfWeps.sort();

    return (
      <div id="weaponContainer" className="hiding">
        {listOfWeps}
      </div>
    )
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e.currentTarget.value)
    if(currentWeaponsToDisplay[0] && currentWeaponsToDisplay[0].hash == weaponsOrganizedByType[e.currentTarget.value][0].hash) {
      setCurrentWeaponsToDisplay('');
      // console.log("TOGGLE OFF", currentWeaponsToDisplay)
    }
    else {
      setCurrentWeaponsToDisplay(weaponsOrganizedByType[e.currentTarget.value])
      // console.log("TOGGLE ON", currentWeaponsToDisplay)
    }
  }

  function resetBlur(ev) {
    ev.preventDefault();
    if(ev.target.className.includes('combination-container')) {
      document.querySelector('.combination-container').style.transform = "translate3d(-100%, 0, 0)";
      setCurrentWepForCombAndComp('')
      document.getElementById('weaponCharts').style.filter = 'blur(0px)'; 
    }
    else if(ev.target.className.includes('comparison-container')) {
      document.querySelector('.comparison-container').classList.toggle('display-comps')
      setCurrentWepForCombAndComp('')
      document.getElementById('weaponCharts').style.filter = 'blur(0px)'; 
    }
  }

  return (
    <div className="body-content-container">
      <section className="combination-container" onClick={e => resetBlur(e)}>
        <PowerfulAndPopular value={currentWepForCombAndComp} manifest={props} averages={eachPlayerStatAverages} />
      </section>
      <section id="weaponCharts">
        <form className="wep-type-selector">
          <button className="smgs" value="Submachine Gun" type="submit" onClick={e => handleSubmit(e)}><p>SMGs</p></button>
          <button className="auto-rifles" value="Auto Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Auto Rifles</p></button>
          <button className="pulse-rifles" value="Pulse Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Pulse Rifles</p></button>
          <button className="machine-guns" value="Machine Gun" type="submit" onClick={e => handleSubmit(e)}><p>Machine Guns</p></button>
          <button className="sidearms" value="Sidearm" type="submit" onClick={e => handleSubmit(e)}><p>Sidearms</p></button>
          <button className="hand-cannons" value="Hand Cannon" type="submit" onClick={e => handleSubmit(e)}><p>Hand Cannons</p></button>
          <button className="scout-rifles" value="Scout Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Scout Rifles</p></button>
          <button className="snipers" value="Sniper" type="submit" onClick={e => handleSubmit(e)}><p>Snipers</p></button>
          <button className="bows" value="Combat Bow" type="submit" onClick={e => handleSubmit(e)}><p>Bows</p></button>
          <button className="shotguns" value="Shotgun" type="submit" onClick={e => handleSubmit(e)}><p>Shotguns</p></button>
          <button className="grenade-launchers" value="Grenade Launcher" type="submit" onClick={e => handleSubmit(e)}><p>Grenade Launchers</p></button>
          <button className="rocket-launchers" value="Rocket Launcher" type="submit" onClick={e => handleSubmit(e)}><p>Rocket Launchers</p></button>
          <button className="fusion-rifles" value="Fusion Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Fusion Rifles</p></button>
          <button className="linear-fusion-rifle" value="Linear Fusion Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Linear Fusion Rifle</p></button>
          <button className="trace-rifle" value="Trace Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Trace Rifle</p></button>
          <button className="swords" value="Sword" type="submit" onClick={e => handleSubmit(e)}><p>Swords</p></button>
        </form>
        <div className="displayed-weapons">
          <WepList {...currentWeaponsToDisplay} />
        </div>
      </section>
      <section className="comparison-container" onClick={e => resetBlur(e)}>
        <Comparisons value={currentWepForCombAndComp} manifest={props} />
      </section>
    </div>
  )
}



// return (
//   <div id="weaponCharts">
//     <section id="wepContainer">
//       <WepList {...props}/>
//     </section>
//   </div>
// )