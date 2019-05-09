import React from 'react'

export default function WeaponCharts(props) {
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
    wepList(props)
  }

  // const wepKeys = Object.keys(props);

  // function WepConstructor(props) {
  //   const guardianId = props.value;
  //   const pathShortcut = basePath[guardianId];
  //   const characterTypeValues = ["Titan", "Hunter", "Warlock"];
  //   i++;

  //   return (
  //     <form onSubmit={handleHistoryStyling}>
  //       <button className="guardianContainer" value={i} style={{backgroundImage: `url(${"https://www.bungie.net" + pathShortcut.emblemBackgroundPath})`}}>
  //       <p className="guardianLevel">{pathShortcut.baseCharacterLevel}</p>
  //       <p className="guardianLightLevel">{pathShortcut.light}</p>
  //       <p className="guardianClass">{characterTypeValues[pathShortcut.classType]}</p>
  //       </button>
  //     </form>
  //   )
  // }

  function WepList(props) {
    const listOfWeps = props.map((wepId) => 
      <WepConstructor key={wepId._id} value={wepId.count}/>
    );

    return (
      <section id="allWeps">
      <div id="wepName">{props[0][0].displayName}</div>
        <section>
          {listOfWeps}
        </section>
      </section>
    )
  }


  return (
    <form id="weaponCharts" onSubmit={handleWCSubmit}>
      <button type="submit" id="weaponChartsButton" className="navButton">I'm for Weapon Charts!</button>
    </form>
  )
}
