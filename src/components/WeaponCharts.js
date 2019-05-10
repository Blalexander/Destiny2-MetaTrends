import React, {useState} from 'react'

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


  function WepConstructor(props) {
    return (
      <div>{props.Key}{props.value}Hey</div>
    )
  }

  function WepList(testPathReceiver) {
    let testPathReceiver2 = Object.keys(testPathReceiver);

    const listOfWeps = testPathReceiver2.map((wepId) => 
      <WepConstructor key={testPathReceiver[wepId]._id} value={testPathReceiver[wepId].count}/>
    );

    return (
      <section id="allWeps">
        <section>
          {listOfWeps}
        </section>
      </section>
    )
  }


  // if(document.getElementById('weaponChartsButton') != null && document.getElementById('weaponChartsButton').classList.contains('grantPriority')) {
    return (
      <form id="weaponCharts" onSubmit={handleWCSubmit}>
        <button type="submit" id="weaponChartsButton" className="navButton">I'm for Weapon Charts!
          <section id="wepContainer">
            <WepList {...props}/>
          </section>
        </button>
      </form>
    )
  // }
  // else {
  //   return (
  //     <form id="weaponCharts" onSubmit={handleWCSubmit}>
  //       <button type="submit" id="weaponChartsButton" className="navButton">I'm for Weapon Charts!</button>
  //     </form>
  //   )
  // }
}




// return (
//   <form id="weaponCharts" onSubmit={handleWCSubmit}>
//     <button type="submit" id="weaponChartsButton" className="navButton"><WepList {...props}/></button>
//   </form>
// )