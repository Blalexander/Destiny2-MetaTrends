import React from 'react';
import manifest from './manifest';


export default function WeaponCharts(props) {
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

    // document.getElementById('weaponChartsButton').append(props[0]._id)
    WepList(testPath);
    console.log(testPath);
  }

  function WeaponStats(wepIterator) {
    // let wepIterator2 = Object.keys(wepIterator.weaponValues);
    return(
      <p>{wepIterator}</p>
    )

    // const listOfStats = wepIterator2.map((statIterator) => 
    //   <p>{wepIterator[wepIterator2].value}</p>
    // );

    // return (
    //     <section>
    //       {listOfStats}
    //     </section>
    // )
    }

  function WepConstructor(props) {
    let revisedWep = testPath[props.value];
    // let revisedWep = Object.values(currentWep);
    // revisedWep.map(item => {
    //   item.toFixed(2)
    // })
    let revisedWinRate = 1 - revisedWep.standingAvg;
    let wepId = revisedWep._id;
    // let revisedWepName = manifest[wepId].weaponName;
    // console.log(revisedWepName)
    // let wepIcon = "https://www.bungie.net" + manifest[wepId].weaponIcon;

    if(manifest[wepId]) {
      let revisedWepName = manifest[wepId].weaponName;
      let wepIcon = "https://www.bungie.net" + manifest[wepId].weaponIcon;
      let wepStatKeys = Object.keys(manifest[wepId].weaponValues);
      let wepStatVals = wepStatKeys.map(stat => {
        if(stat === "1885944937" || stat === "3291498656") {
          return("")
        }
        else {
          return( 
            stat + " " + manifest[wepId].weaponValues[stat].value + " "
          )
        }
      })

      return (
        <div className="wepChartsItem"><img src={wepIcon} className="wepIcons" alt="wepIcon"></img> <p className="wepName">Weapon Name: {revisedWepName}</p>
        <div className="playerStats">Times Used: {revisedWep.totalCount}, Assists: {revisedWep.assistsAvg.toFixed(2)}, Kills: {revisedWep.killsAvg.toFixed(2)}, Deaths: {revisedWep.deathsAvg.toFixed(2)}, Efficiency: {revisedWep.effAvg.toFixed(2)}, scoreAvg: {revisedWep.scoreAvg.toFixed(2)}, Win Rate: {revisedWinRate.toFixed(2)}</div>
        <div>{wepStatVals}</div>
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
      <section id="allWeps">
        <section>
          {listOfWeps}
        </section>
      </section>
    )
    }

  return (
    <form id="weaponCharts" onSubmit={handleWCSubmit}>
      <button type="submit" id="weaponChartsButton" className="navButton">I'm for Weapon Charts!
        <section id="wepContainer">
          <WepList {...props}/>
        </section>
      </button>
    </form>
  )
}