import React, { useState, useEffect } from "react";
import {Polar} from 'react-chartjs-2';
import MakeMyStatBars from './MakeMyStatBars';




function Comparisons(props) {
  if(props.value === "") {
    return null;
  }

  console.log(props)

  let manifestDefs = props.manifest;
  let selectedHash = props.value;
  let averages = props.averages;

  function makeMyKeys(typeToKey) {
    let wepStatKeys;

    if(typeToKey === "Fusion Rifle") { //NEED TO BE LOOKED AT
      wepStatKeys = ["Impact", "Range", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Charge Time", "Magazine", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
    }
    else if(typeToKey === "Grenade Launcher" || typeToKey === "Rocket Launcher") {
      wepStatKeys = ["Blast Radius", "Velocity", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom",  "Rounds Per Minute", "Magazine", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
    }
    else if(typeToKey === "Combat Bow") { //NEED TO BE LOOKED AT
      wepStatKeys = ["Impact", "Accuracy", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Draw Time", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
    }
    else if(typeToKey === "Sword") { //NEED TO BE LOOKED AT
      wepStatKeys = ["Impact", "Range", "Defense", "Efficiency", "Ammo Capacity", "Swing Speed", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
    }
    else {
      wepStatKeys = ["Impact", "Range", "Stability", "Handling", "Reload Speed", "Aim Assistance", "Zoom", "Rounds Per Minute", "Magazine", "wepPrecKillsAvg", "killsAvg", "deathsAvg", "assistsAvg", "KaD", "effAvg", "perKAvg", "perLAvg", "scoreAvg"]
    }

    return wepStatKeys
  }


  const [compareMe, setCompareMe] = useState('');
  // setSelectedHash(props.value)

  // if(props.comparisonTarget !== "") {
  //   setCompareMe(props.comparisonTarget)
  // }

  useEffect(() => {
    setCompareMe(props.comparisonTarget)
  }, [])

  let weaponsOrganizedByType = {};

  for(let weaponDefinition in manifestDefs) {
    // console.log(weaponDefinition)
    if(weaponDefinition !== "socketDefs" && weaponDefinition !== "statDefs") {
      let typeToMatch = manifestDefs[weaponDefinition].weaponType;
      let nameToMatch = manifestDefs[weaponDefinition].weaponName;
      if(weaponsOrganizedByType[typeToMatch] !== undefined) {
        weaponsOrganizedByType[typeToMatch].push({hash: weaponDefinition, name: nameToMatch})
      }
      else {
        weaponsOrganizedByType[typeToMatch] = []
      }
    }
  }

  console.log(weaponsOrganizedByType)

  function CreateMyFirstCompare(things) {
    console.log(things.hashToUse)
    let revisedWep = manifestDefs[selectedHash];
    let wepIcon = "https://www.bungie.net" + revisedWep.weaponIcon;
    const chartData = {
      labels: ["Weapon Kills", "Melee Kills", "Grenade Kills", "Super Kills"],
      datasets: [{
        level:'population',
        data:[manifestDefs[selectedHash].playerPerformances.wepKillsAvg, manifestDefs[selectedHash].playerPerformances.grenadeKills, manifestDefs[selectedHash].playerPerformances.meleeKills, manifestDefs[selectedHash].playerPerformances.superKills],
        backgroundColor: ['rgba(255, 255, 255, 0.2)', 'firebrick', 'mediumblue', 'orange']
      }]
    }


    let type = revisedWep.weaponType;

    let wepStatKeys = makeMyKeys(type);
   
    // let keysToMap = Object.keys(wepStatKeys)
    console.log(wepStatKeys)

    let weaponStats = wepStatKeys.map(eachKey => {
      if(manifestDefs.statDefs[eachKey]) {
        return(<MakeMyStatBars key={selectedHash + eachKey} value={manifestDefs[selectedHash]} stat={eachKey} mani={manifestDefs.statDefs[eachKey].statHash} avs={averages} />)
      }
      else {
        return(<MakeMyStatBars key={selectedHash + eachKey} value={manifestDefs[selectedHash]} stat={eachKey} mani={eachKey} avs={averages} />)
      }
    })

    return(
      <div className="first-weapon">
        <div className={"wepNameIconType t" + revisedWep.weaponTier}>
          <p className="wepName">{revisedWep.weaponName}</p>
          <img src={wepIcon} className="wepIcons" alt="wepIcon"></img> 
          <p className="wepType">{revisedWep.weaponType}</p>
        </div>
        <div className="Polar-chart">
          <Polar
            data={chartData}
            width={200}
            height={150}
            options={{ maintainAspectRatio: false, legend: {display: false}, layout: {padding: {left: 25, right: 25}}, responsive: true }}
          />
        </div>
        <div className="comparison-stats">
          {weaponStats}
        </div>
      </div>
    );
  }

  function CreateMySecondCompare(wepToCompare) {
    console.log(wepToCompare)
    if(wepToCompare.hashToUse === "") {
      return(
        <div className="second-weapon">
          <div className="wepNameIcon-placeholder"></div>
          <h4 className="waiting-for-second-weapon">Select a second weapon to compare</h4>
        </div>
      )
    }
    else {
      let revisedWep = manifestDefs[compareMe];
      let wepIcon = "https://www.bungie.net" + revisedWep.weaponIcon;
      const chartData = {
        labels: ["Weapon Kills", "Melee Kills", "Grenade Kills", "Super Kills"],
        datasets: [{
          level:'population',
          data:[manifestDefs[compareMe].playerPerformances.wepKillsAvg, manifestDefs[compareMe].playerPerformances.grenadeKills, manifestDefs[compareMe].playerPerformances.meleeKills, manifestDefs[compareMe].playerPerformances.superKills],
          backgroundColor: ['rgba(255, 255, 255, 0.2)', 'firebrick', 'mediumblue', 'orange']
        }]
      }

      let type = revisedWep.weaponType;
  
      let wepStatKeys = makeMyKeys(type);
  
      // let keysToMap = Object.keys(wepStatKeys)
      console.log(wepStatKeys)
  
      let weaponStats = wepStatKeys.map(eachKey => {
        if(manifestDefs.statDefs[eachKey]) {
          return(<MakeMyStatBars key={compareMe + eachKey} value={manifestDefs[compareMe]} stat={eachKey} mani={manifestDefs.statDefs[eachKey].statHash} avs={averages} />)
        }
        else {
          return(<MakeMyStatBars key={compareMe + eachKey} value={manifestDefs[compareMe]} stat={eachKey} mani={eachKey} avs={averages} />)
        }
      })

      return(
        <div className="second-weapon">
          <div className={"wepNameIconType t" + revisedWep.weaponTier}>
            <p className="wepName">{revisedWep.weaponName}</p>
            <img src={wepIcon} className="wepIcons" alt="wepIcon"></img> 
            <p className="wepType">{revisedWep.weaponType}</p>
          </div>
          <div className="Polar-chart">
            <Polar
              data={chartData}
              width={200}
              height={150}
              options={{ maintainAspectRatio: false, legend: {display: false}, layout: {padding: {left: 25, right: 25}}, responsive: true }}
            />
          </div>
          <div className="comparison-stats">
            {weaponStats}
          </div>
        </div>
      )
    }
  }

  function CreateMyCenter() {
    let dropdownKeys = Object.keys(manifestDefs)
    let dropdownOptions = dropdownKeys.map(wepId => {
      if(wepId !== "socketDefs" && wepId !== "statDefs") {
        return(<ListItemConstructor key={wepId} value={manifestDefs[wepId]} />)
      }
      else {
        return null
      }
    })
    // console.log(dropdownOptions)

    let wepStatKeys = makeMyKeys(manifestDefs[selectedHash].weaponType)
    let statDifferences = wepStatKeys.map(eachKey => {
      if(manifestDefs.statDefs[eachKey]) {
        return(<StatDifsConstructor key={"compareMy" + eachKey} value={eachKey} />)
      }
      else {
        return(<StatDifsConstructor2 key={"compareMy" + eachKey} value={eachKey} />)
      }
    })


    return(
      <div className="comparison-differences">
        {statDifferences}
      </div>
    )
  }

  function ListItemConstructor(listItem) {
    if(listItem.value === undefined) {
      return (
        <option className="eachListItem" value="Change Weapon">
          Change Weapon
        </option>
      );
    }
    else {
      return (
        <option className="eachListItem" value={listItem.value.weaponHash}>
          {listItem.value.weaponName}
        </option>
      );
    } 
  }

  function StatDifsConstructor2(eachKeyToCompare) {
    console.log("2", eachKeyToCompare)
    eachKeyToCompare = eachKeyToCompare.value
    if(manifestDefs[compareMe] !== undefined && manifestDefs[selectedHash].playerPerformances[eachKeyToCompare] !== undefined) {
      // console.log(eachKeyToCompare)
      // let eachKeysHash = manifestDefs.statDefs[eachKeyToCompare].statHash;
      if(manifestDefs[selectedHash].playerPerformances[eachKeyToCompare] > manifestDefs[compareMe].playerPerformances[eachKeyToCompare]) {
        // console.log("LEFT", manifestDefs[selectedHash].weaponValues[eachKeysHash], manifestDefs[compareMe].weaponValues[eachKeysHash])
        return(
          <div className={"compared-stat-" + eachKeyToCompare + " superior-first"}>
          </div>
        )
      }
      else if(manifestDefs[selectedHash].playerPerformances[eachKeyToCompare] < manifestDefs[compareMe].playerPerformances[eachKeyToCompare]) {
        // console.log("RIGHT", manifestDefs[selectedHash].weaponValues[eachKeysHash], manifestDefs[compareMe].weaponValues[eachKeysHash])
        return(
          <div className={"compared-stat-" + eachKeyToCompare + " superior-second"}>
          </div>
        )
      }
      else {
        // console.log("NEITHER", manifestDefs[selectedHash].weaponValues[eachKeysHash], manifestDefs[compareMe].weaponValues[eachKeysHash])
        return(
          <div className={"compared-stat-" + eachKeyToCompare + " first-equal-second"}> ~
          </div>
        )
      }
    }
    else {
      // console.log("It equal to UNderFINED :(....", eachKeyToCompare)
      return(
        <div className={"compared-stat-" + eachKeyToCompare + " cannot-compare"}>
        </div>
      )
    }
  }

  function StatDifsConstructor(eachKeyToCompare) {
    console.log(eachKeyToCompare)
    eachKeyToCompare = eachKeyToCompare.value
    if(manifestDefs[compareMe] !== undefined && manifestDefs[selectedHash].weaponValues[manifestDefs.statDefs[eachKeyToCompare].statHash] !== undefined && manifestDefs[compareMe].weaponValues[manifestDefs.statDefs[eachKeyToCompare].statHash] !== undefined) {
      // console.log(eachKeyToCompare)
      let eachKeysHash = manifestDefs.statDefs[eachKeyToCompare].statHash;
      if(manifestDefs[selectedHash].weaponValues[eachKeysHash].value > manifestDefs[compareMe].weaponValues[eachKeysHash].value) {
        // console.log("LEFT", manifestDefs[selectedHash].weaponValues[eachKeysHash], manifestDefs[compareMe].weaponValues[eachKeysHash])
        return(
          <div className={"compared-stat-" + eachKeyToCompare + " superior-first"}>
          </div>
        )
      }
      else if(manifestDefs[selectedHash].weaponValues[eachKeysHash].value < manifestDefs[compareMe].weaponValues[eachKeysHash].value) {
        // console.log("RIGHT", manifestDefs[selectedHash].weaponValues[eachKeysHash], manifestDefs[compareMe].weaponValues[eachKeysHash])
        return(
          <div className={"compared-stat-" + eachKeyToCompare + " superior-second"}>
          </div>
        )
      }
      else {
        // console.log("NEITHER", manifestDefs[selectedHash].weaponValues[eachKeysHash], manifestDefs[compareMe].weaponValues[eachKeysHash])
        return(
          <div className={"compared-stat-" + eachKeyToCompare + " first-equal-second"}> ~
          </div>
        )
      }
    }
    else {
      // console.log("It equal to UNderFINED :(....", eachKeyToCompare)
      return(
        <div className={"compared-stat-" + eachKeyToCompare + " cannot-compare"}>
        </div>
      )
    }
  }

  function setUpComparison(newComparisonTarget) {
    console.log(newComparisonTarget)
    setCompareMe(newComparisonTarget)
  }

  return (
    <div className="child-comparison-container">
      <CreateMyFirstCompare hashToUse={selectedHash} />
      <CreateMyCenter />
      <CreateMySecondCompare hashToUse={compareMe} />
    </div>
  )
}

export default Comparisons
