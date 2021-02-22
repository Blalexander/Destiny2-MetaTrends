import React, {useState, useEffect} from 'react';
import MakeMyStatBars from './MakeMyStatBars';
import {Pie} from 'react-chartjs-2';




export default function WeaponCharts(props) {
  // if(props.socketDefs === undefined) {
  //   return null;
  // }
  console.log(props)


  const testPath = props;

  // WepList(testPath);

  let labelIncrementor = 0;

  let weaponsOrganizedByType = {};

  let eachPlayerStatAverages = props.playerAvgs

  for(let weaponDefinition in props) {
    // console.log(weaponDefinition)
    if(weaponDefinition !== "socketDefs" && weaponDefinition !== "statDefs") {
      let typeToMatch = props[weaponDefinition].weaponType;
      let nameToMatch = props[weaponDefinition].weaponName;
      if(weaponsOrganizedByType[typeToMatch] !== undefined) {
        weaponsOrganizedByType[typeToMatch].push({hash: weaponDefinition, name: nameToMatch})
      }
      else {
        weaponsOrganizedByType[typeToMatch] = []
      }
    }
  }

  // console.log(weaponsOrganizedByType)


  const [currentWeaponsToDisplay, setCurrentWeaponsToDisplay] = useState('');
  // const [currentWepForCombination, setCurrentWepForCombination] = useState('');
  // const [currentWepForComparison, setCurrentWepForComparison] = useState('');
  
  useEffect(() => {
    // setCurrentWeaponsToDisplay(weaponsOrganizedByType["Submachine Gun"])
    setTimeout(() => {
      setCurrentWeaponsToDisplay(weaponsOrganizedByType["Submachine Gun"])
      document.querySelectorAll('.temp-classholder').forEach(delayLoop(display, 400))
    }, 1000)
  }, [props])

  console.log(currentWeaponsToDisplay)

  let damageDefs = {
    "151347233": {
      damageType: "Stasis",
      damageTypeIcon: "https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_530c4c3e7981dc2aefd24fd3293482bf.png"
    },
    "1847026933": {
      damageType: "Solar",
      damageTypeIcon: "https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png"
    },
    "2303181850": {
      damageType: "Arc",
      damageTypeIcon: "https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_092d066688b879c807c3b460afdd61e6.png"
    },
    "3454344768": {
      damageType: "Void",
      damageTypeIcon: "https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_ceb2f6197dccf3958bb31cc783eb97a0.png"
    },
    "3373582085": {
      damageType: "Kinetic",
      damageTypeIcon: "https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_3385a924fd3ccb92c343ade19f19a370.png"
    }
  }



  function WepConstructor(weaponItem) { 
    // console.log(weaponItem) //weaponItem being sent here with twin values?
    if(weaponItem.value !== "socketDefs" && weaponItem.value !== "statDefs") {
      let revisedWep = testPath[weaponItem.value];
      if(revisedWep.playerPerformances.standingAvg === null) {
        console.log(revisedWep)
        revisedWep.playerPerformances.standingAvg = 0
      }
      let revisedWinRate = 1 - revisedWep.playerPerformances.standingAvg.toFixed(2);
      let wepId = weaponItem.value;
      let revisedWepName = revisedWep.weaponName;
      let wepIcon = "https://www.bungie.net" + revisedWep.weaponIcon;
      let wepStatKeys = Object.keys(revisedWep.weaponValues);
      let type = revisedWep.weaponType;
      let hashedDamageType = revisedWep.damageType[0];
      let damageIcon = damageDefs[hashedDamageType].damageTypeIcon;


      if(type === "Fusion Rifle") {
        wepStatKeys = ["Impact", "Range", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Charge Time", "Magazine", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      else if(type === "Grenade Launcher" || type === "Rocket Launcher") {
        wepStatKeys = ["Blast Radius", "Velocity", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom",  "Rounds Per Minute", "Magazine", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      else if(type === "Combat Bow") {
        wepStatKeys = ["Impact", "Accuracy", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Draw Time", "Rounds Per Minute", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
      }
      else if(type === "Sword") { 
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
      let multiSocketFixer = 0;
      let wepPerks = vSockets.map(eachSocket => {
        if(eachSocket !== null) {
          if(Array.isArray(eachSocket)) {
            let multipleSockets = eachSocket.map(sock => {
              multiSocketFixer++;
              if(testPath.socketDefs[sock] && testPath.socketDefs[sock].socketType !== "" && testPath.socketDefs[sock].socketType !== "Weapon Ornament" && !testPath.socketDefs[sock].socketType.includes('Tracker') && !testPath.socketDefs[sock].socketType.includes('Catalyst') && !testPath.socketDefs[sock].socketType.includes('Mod') && !testPath.socketDefs[sock].socketType.includes('Shader') && !testPath.socketDefs[sock].socketName.includes('Shader')) {
                let socketIcon = "https://www.bungie.net" + testPath.socketDefs[sock].socketIcon;
                let socketDesc = testPath.socketDefs[sock].socketDesc;
                let socketName = testPath.socketDefs[sock].socketName;
                return (
                  <div className="weapon-socket" key={socketIcon + multiSocketFixer}>
                    <img src={socketIcon} className="socketIcons" alt="socketIcon"></img>
                    <div className="socket-tooltip">
                      <p className="socketName">{socketName}</p>
                      <p className="socketDesc">{socketDesc}</p>
                    </div>
                  </div>
                )
              }
              else {
                return null
              }
            })
            return(
              <div key={revisedWep + "multiSocket" + multiSocketFixer} className="multiSockets">{multipleSockets}</div>
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
        else {
          return null
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
        <div className="temp-classholder" id={"item" + labelIncrementor} onClick={e => displayWepStats(e.currentTarget.id)}>
          <h3 className="wepNumber">{labelIncrementor}</h3>
          <img src={wepIcon} className="wepIcons" alt="wepIcon"></img> 
          <div className="item-body">
            <div className="weapon-header">
              <p className="wepName">{revisedWepName}</p>
              <div className="wepTypeDamType">
                <img src={damageIcon} className="damage-type-icon" alt="damage-type-icon"></img>
                <p className="wepType">{revisedWep.weaponType}</p>
              </div>
              <div className="popularityAndWinRate">
                <p className="timesUsed">Games Tracked: {revisedWep.playerPerformances.totalCount}</p>
                <p className="winRate">Win Rate: {(revisedWinRate * 100).toFixed(0)}%</p>
              </div>
            </div>
            <span className="bg-image-holder" backgroundimage={"https://www.bungie.net" + revisedWep.weaponScreenshot}></span>
            <div className={"wepAttributes wepAttributes" + revisedWep.weaponTier}>
              <div className={"statsContainer statsContainer" + revisedWep.weaponTier}>
                <div className="wepStatVals">{wepStatVals}</div>
              </div>
              <div className="pie-chart">
                <Pie
                  data={chartData}
                  width={150}
                  height={225}
                  options={{ maintainAspectRatio: false, legend: {display: false}, layout: {padding: {right: 50, top: 475}}, responsive: true }}
                />
              </div>
              <div className="wepPerks">{wepPerks}</div>
            </div>
            <div className="wepDescription">
              {revisedWep.weaponDescription}
            </div>
          </div>
        </div>
      )
    } // eslint-disable-line prefer-template
    else {
      return null;
    }
  }



  function displayWepStats(p) { 
    // let cName = (p.currentTarget.id)
    let cName = p

    let checkAgainst = document.getElementById(p).classList;
    // console.log(checkAgainst)
    
    if(checkAgainst[0] !== "combination-button" && checkAgainst[0] !== "comparison-button") {
      let addClass = document.getElementById(cName).classList;
      // addClass.toggle('beingFocused')

      // console.log(addClass.value)
      if(addClass.value.includes('beingFocused')) {
        addClass.toggle('beingFocused')
        addClass.toggle('notFocused')
        document.getElementById(cName).childNodes[2].childNodes[1].style.backgroundImage = "unset";
      }
      else {
        addClass.toggle('beingFocused')
        addClass.toggle('notFocused')
        // if(document.getElementById(cName).childNodes[3]) {
          let imgSrc = document.getElementById(cName).childNodes[2].childNodes[1].attributes[1].nodeValue
          document.getElementById(cName).childNodes[2].childNodes[1].style.backgroundImage = "url(" + imgSrc + ")";
        // }
      }
    }
  }

  function WepList(testPathReceiver) {
    let testPathReceiver2 = Object.keys(testPathReceiver);
    // let testPathReceiver3 = testPathReceiver2.slice(0, 10)
    // console.log(testPathReceiver3)

    let keyFixer = 0;
    const listOfWeps = testPathReceiver2.map((wepId) => {
      keyFixer++;
      return(<WepConstructor key={testPathReceiver[wepId].hash + keyFixer} value={testPathReceiver[wepId].hash}/>)
    });
    // listOfWeps.reverse();
    // listOfWeps.sort();

    return (
      <div id="weaponContainer">
        {listOfWeps}
      </div>
    )
  }

  const delayLoop = (fn, delay) => {
    return (x, i) => {
      setTimeout(() => {
        fn(x);
      }, i * delay);
    }
  };

  const display = s => {
    if(document.getElementById(s.id) != null) {
      // console.log(document.getElementById(s.id)); 
      // document.getElementById(s.id).style.opacity = 1
      document.getElementById(s.id).classList.add("wepChartsItem", "notFocused")
    }
    else return null
  };

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e.currentTarget.value)
    document.querySelector('html').scrollTop = 0;

    if(e.currentTarget.classList.contains('type-selection')) {
      e.currentTarget.classList.remove('type-selection')
    }
    else if(!e.currentTarget.classList.contains('type-selection')) {
      if(document.querySelector('.type-selection')) {
        document.querySelector('.type-selection').classList.remove('type-selection')
      }
      e.currentTarget.classList.add('type-selection')
    }

    let f = typeof e === 'object' && typeof e !== 'undefined' ? e.currentTarget.value : e;
    document.querySelector('.wep-type-selector').classList.toggle('display-types');



    if(currentWeaponsToDisplay[0] && currentWeaponsToDisplay[0].hash === weaponsOrganizedByType[f][0].hash) {
      setCurrentWeaponsToDisplay('');
      // console.log("TOGGLE OFF", currentWeaponsToDisplay)
    }
    else {
      setCurrentWeaponsToDisplay(weaponsOrganizedByType[f])
      // console.log("TOGGLE ON", weaponsOrganizedByType[f])

      setTimeout(() => document.querySelectorAll('.temp-classholder').forEach(delayLoop(display, 400)), 500)
      // setCurrentWeaponsToDisplay(weaponsOrganizedByType[e.currentTarget.value])
    }
  }

  function showTypes(e) {
    e.preventDefault();
    // console.log("button pressed")
    document.querySelector('.wep-type-selector').classList.toggle('display-types')
  }


  return (
    <div className="body-content-container">
      <section id="weaponCharts">
        <form className="show-wep-types-form">
          <button className="show-wep-types-button" type="submit" onClick={e => showTypes(e)}>Filter By Type</button>
        </form>
        <form className="wep-type-selector">
          <button className="smgs top-row type-selection" value="Submachine Gun" type="submit" onClick={e => handleSubmit(e)}><p>SMGs</p></button>
          <button className="autorifles top-row" value="Auto Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Auto Rifles</p></button>
          <button className="pulserifles top-row" value="Pulse Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Pulse Rifles</p></button>
          <button className="machineguns top-row" value="Machine Gun" type="submit" onClick={e => handleSubmit(e)}><p>Machine Guns</p></button>
          <button className="sidearms top-row" value="Sidearm" type="submit" onClick={e => handleSubmit(e)}><p>Sidearms</p></button>
          <button className="handcannons top-row" value="Hand Cannon" type="submit" onClick={e => handleSubmit(e)}><p>Hand Cannons</p></button>
          <button className="scoutrifles top-row" value="Scout Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Scout Rifles</p></button>
          <button className="snipers top-row" value="Sniper Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Snipers</p></button>
          <button className="bows bottom-row" value="Combat Bow" type="submit" onClick={e => handleSubmit(e)}><p>Bows</p></button>
          <button className="shotguns bottom-row" value="Shotgun" type="submit" onClick={e => handleSubmit(e)}><p>Shotguns</p></button>
          <button className="grenadelaunchers bottom-row" value="Grenade Launcher" type="submit" onClick={e => handleSubmit(e)}><p>Grenade Launchers</p></button>
          <button className="rocketlaunchers bottom-row" value="Rocket Launcher" type="submit" onClick={e => handleSubmit(e)}><p>Rocket Launchers</p></button>
          <button className="fusionrifles bottom-row" value="Fusion Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Fusion Rifles</p></button>
          <button className="linearfusionrifles bottom-row" value="Linear Fusion Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Linear Fusion Rifle</p></button>
          <button className="tracerifles bottom-row" value="Trace Rifle" type="submit" onClick={e => handleSubmit(e)}><p>Trace Rifle</p></button>
          <button className="swords bottom-row" value="Sword" type="submit" onClick={e => handleSubmit(e)}><p>Swords</p></button>
        </form>
        <div className="displayed-weapons">
          <WepList {...currentWeaponsToDisplay} />
        </div> 
      </section>
    </div>
  )
}