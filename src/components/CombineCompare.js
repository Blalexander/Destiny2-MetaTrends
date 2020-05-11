import React, {useState} from 'react';
import PowerfulAndPopular from './PowerfulAndPopular';
import MakeMyStatBars from './MakeMyStatBars';
import Comparisons from './Comparisons';

function CombineCompare(props) {  
  if(props.statDefs === undefined) {
    return null;
  }
  console.log(props)

  const [selectedHash, setSelectedHash] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [weaponToCompare, setWeaponToCompare] = useState('');

  let weaponsOrganizedByType = {};

  for(let weaponDefinition in props) {
    // console.log(weaponDefinition)
    if(weaponDefinition !== "socketDefs" && weaponDefinition !== "statDefs") {
      let typeToMatch = props[weaponDefinition].weaponType;
      let nameToMatch = props[weaponDefinition].weaponName;
      let wepIcon = "https://www.bungie.net" + props[weaponDefinition].weaponIcon;
      if(weaponsOrganizedByType[typeToMatch] !== undefined) {
        weaponsOrganizedByType[typeToMatch].push(
        <button key={props[weaponDefinition].weaponHash} value={props[weaponDefinition].weaponHash} id={"clickable" + props[weaponDefinition].weaponHash} className={"each-clickable-weapon t" + props[weaponDefinition].weaponTier} onClick={e => weaponWasClicked(e)}>
          <img className="clickable-weapon-icon" src={wepIcon}></img>
          <p className="clickable-weapon-name">{nameToMatch}</p>
        </button>
        )
      }
      else {
        weaponsOrganizedByType[typeToMatch] = []
      }
    }
  }

  function collapseSection(ev) {
    console.log(document.getElementsByClassName(ev.target.classList[0]))
    let sectionToCollapse = document.getElementsByClassName(ev.target.classList[0])[2]
    if(sectionToCollapse.classList.contains("collapsed")) {
      sectionToCollapse.classList.remove("collapsed")
    }
    else {
      sectionToCollapse.classList.add("collapsed")
    }
  }

  function DivMyWeps(entireManifest) {

    return(
      <div className="weapon-list-parent">
        <h3 onClick={e => collapseSection(e)} className="smgs">SMGs</h3>
        <div className="smgs">{weaponsOrganizedByType["Submachine Gun"]}</div>
        <h3 onClick={e => collapseSection(e)} className="autorifles">Auto Rifles</h3>
        <div className="autorifles">{weaponsOrganizedByType["Auto Rifle"]}</div>
        <h3 onClick={e => collapseSection(e)} className="pulserifles">Pulse Rifles</h3>
        <div className="pulserifles">{weaponsOrganizedByType["Pulse Rifle"]}</div>
        <h3 onClick={e => collapseSection(e)} className="machineguns">Machine Guns</h3>
        <div className="machineguns">{weaponsOrganizedByType["Machine Gun"]}</div>
        <h3 onClick={e => collapseSection(e)} className="sidearms">Sidearms</h3>
        <div className="sidearms">{weaponsOrganizedByType["Sidearm"]}</div>
        <h3 onClick={e => collapseSection(e)} className="handcannons">Hand Cannons</h3>
        <div className="handcannons">{weaponsOrganizedByType["Hand Cannon"]}</div>
        <h3 onClick={e => collapseSection(e)} className="scoutrifles">Scout Rifles</h3>
        <div className="scoutrifles">{weaponsOrganizedByType["Scout Rifle"]}</div>
        <h3 onClick={e => collapseSection(e)} className="snipers">Snipers</h3>
        <div className="snipers">{weaponsOrganizedByType["Sniper Rifle"]}</div>
        <h3 onClick={e => collapseSection(e)} className="bows">Bows</h3>
        <div className="bows">{weaponsOrganizedByType["Combat Bow"]}</div>
        <h3 onClick={e => collapseSection(e)} className="shotguns">Shotguns</h3>
        <div className="shotguns">{weaponsOrganizedByType["Shotgun"]}</div>
        <h3 onClick={e => collapseSection(e)} className="grenadelaunchers">Grenade Launchers</h3>
        <div className="grenadelaunchers">{weaponsOrganizedByType["Grenade Launcher"]}</div>
        <h3 onClick={e => collapseSection(e)} className="rocketlaunchers">Rocket Launchers</h3>
        <div className="rocketlaunchers">{weaponsOrganizedByType["Rocket Launcher"]}</div>
        <h3 onClick={e => collapseSection(e)} className="fusionrifles">Fusion Rifles</h3>
        <div className="fusionrifles">{weaponsOrganizedByType["Fusion Rifle"]}</div>
        <h3 onClick={e => collapseSection(e)} className="linearfusionrifles">Linear Fusion Rifles</h3>
        <div className="linearfusionrifles">{weaponsOrganizedByType["Linear Fusion Rifle"]}</div>
        <h3 onClick={e => collapseSection(e)} className="tracerifles">Trace Rifle</h3>
        <div className="tracerifles">{weaponsOrganizedByType["Trace Rifle"]}</div>
        <h3 onClick={e => collapseSection(e)} className="swords">Swords</h3>
        <div className="swords">{weaponsOrganizedByType["Sword"]}</div>
      </div>
    )
  }

  function weaponWasClicked(hashToStartCC) {
    hashToStartCC.preventDefault();
    console.log(hashToStartCC.target.value)

    if(selectedMethod === "" || selectedMethod === "combine") {
      setSelectedHash(hashToStartCC.target.value)
      setSelectedMethod("")
    }
    else if(selectedMethod === "compare") {
      setWeaponToCompare(hashToStartCC.target.value)
    }

    // if(document.querySelectorAll('.selected').length > 1) {
      // console.log("greater than")
      // document.querySelector('.selected').classList.remove('selected');
    // }
    // document.getElementById(hashToStartCC.target.id).classList.add('selected');
  }

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

  function SelectedWep(getMyType) {
    if(props[getMyType.val] != undefined) {
      console.log(getMyType.val)
      let wepIcon = "https://www.bungie.net" + props[getMyType.val].weaponIcon;
      let wepName = props[getMyType.val].weaponName;
      let wepType = props[getMyType.val].weaponType;
      let wepStatKeys = makeMyKeys(props[getMyType.val].weaponType);

      let weaponStats = wepStatKeys.map(eachKey => {
        if(props.statDefs[eachKey]) {
          return(<MakeMyStatBars key={selectedHash + eachKey} value={props[selectedHash]} stat={eachKey} mani={props.statDefs[eachKey].statHash} avs={props.playerAvgs} />)
        }
        else {
          return(<MakeMyStatBars key={selectedHash + eachKey} value={props[selectedHash]} stat={eachKey} mani={eachKey} avs={props.playerAvgs} />)
        }
      })

      return(
        <div className="clicked-weapon">
          <div className="clicked-weapon-header">
            <p>{wepName}</p>
            <img src={wepIcon}></img>
            <p>{wepType}</p>
          </div>
          {weaponStats}
        </div>
      )
    }
    else {
      return null
    }
  }

  function CombineOrCompare(method) {
    console.log(method)
    if(method.val === "" && selectedHash !== "") {
      return(
        <form className="chooseAMethod">
          <button className="combineMethod" value="combine" onClick={e => submitMethod(e)}>Combine</button>
          <button className="compareMethod" value="compare" onClick={e => submitMethod(e)}>Compare</button>
        </form>
      )
    }
    else if(method.val === "combine") {
      // document.querySelector('.clicked-weapon').classList.add('hide-me')
      return(
        <PowerfulAndPopular manifest={props} averages={props.playerAvgs} value={selectedHash} />
      )
    }
    else if(method.val === "compare") {
      // document.querySelector('.clicked-weapon').classList.add('hide-me')
      return(
        <Comparisons manifest={props} averages={props.playerAvgs} value={selectedHash} comparisonTarget={weaponToCompare} />
      )
    }
    else {
      return null
    }
  }

  function submitMethod(ev) {
    ev.preventDefault();
    console.log(ev.target.value)
    setSelectedMethod(ev.target.value)
  }

  function BackButton() {
    if(selectedMethod !== "") {
      return(<button className="back-button" onClick={e => goBack(e)}>Back</button>)
    }
    else {
      return null
    }
  }

  function goBack(ev) {
    ev.preventDefault();
    setSelectedMethod("");
    setWeaponToCompare("");
  }

  return (
    <div className="CC-parent">
      <DivMyWeps {...props} />
      <SelectedWep val={selectedHash} />
      <BackButton />
      <CombineOrCompare val={selectedMethod} />
    </div>
  )
}

export default CombineCompare
