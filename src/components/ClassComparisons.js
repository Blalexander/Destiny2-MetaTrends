import React, {useState} from 'react';
// import {Line, Bar, Pie} from 'react-chartjs-2';
import {Pie, Radar} from 'react-chartjs-2';


export default function ClassComparisons(props) {
  if(props[0] === undefined) {
    return null;
  }
  
  function handleCCSubmit(event) {
    event.preventDefault();
    let elementsToMove = document.querySelectorAll('.navButton');
    for(let i=0; i<elementsToMove.length; i++) {
      elementsToMove[i].classList.add('moveToSide');
      elementsToMove[i].classList.remove('grantPriority');
      elementsToMove[i].classList.remove('resetFromSide');
    }

    document.getElementById('classComparisonsButton').classList.add('grantPriority');
    document.getElementById('classComparisonsButton').classList.remove('moveToSide');
    document.getElementById("backgroundTransitions").classList.remove('removeBodyShadow');
    document.getElementById("backgroundTransitions").classList.add('bodyShadow');

    // document.getElementById('NavigationMenuContainer').classList.remove('hiding');
  }


  function GraphCreator(items) {
    const [classesPieChart] = useState({
      labels: [items[1]._id.class, items[0]._id.class, items[2]._id.class],
      datasets: [
        {
          data: [items[1].count, items[0].count, items[2].count],
          // data: [50, 50, 50],
          backgroundColor: ['rgba(233, 11, 11, 0.6)', 'rgba(17, 17, 232, 0.6)', 'rgba(249, 160, 71, 0.6)'],
        },
      ]
    })

    return (
      <Pie
        data={classesPieChart}
        options={{ maintainAspectRatio: false, responsive: false, rotation: 140 }}
      />
    )
  }

  function TitanDataOrganizer(titems) {
    // console.log(titems)
    const [titanRadar] = useState({
      labels: ['Assists', 'Killing Blows', 'Kills', 'Deaths', 'Efficiency', 'Average Score Per Kill', 'Average Score Per Life', 'Average Score Per Game', 'Win Rate'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: 'Titan',
          data: [titems.assistsAvg, titems.oppDefAvg, titems.killsAvg, titems.deathsAvg, titems.effAvg, titems.perKAvg, titems.perLAvg, titems.scoreAvg, titems.standingAvg],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    return(
      <Radar
        data={titanRadar}
        options={{ maintainAspectRatio: false, }}
      />
    )
  }

  function HunterDataOrganizer(hitems) {
    // console.log(hitems)
    const [hunterRadar] = useState({
      labels: ['Assists', 'Killing Blows', 'Kills', 'Deaths', 'Efficiency', 'Average Score Per Kill', 'Average Score Per Life', 'Average Score Per Game', 'Win Rate'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: 'Titan',
          data: [hitems.assistsAvg, hitems.oppDefAvg, hitems.killsAvg, hitems.deathsAvg, hitems.effAvg, hitems.perKAvg, hitems.perLAvg, hitems.scoreAvg, hitems.standingAvg],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    return(
      <Radar
        data={hunterRadar}
        options={{ maintainAspectRatio: false, }}
      />
    )
  }

  function WarlockDataOrganizer(witems) {
    // console.log(witems)
    const [warlockRadar] = useState({
      labels: ['Assists', 'Killing Blows', 'Kills', 'Deaths', 'Efficiency', 'Average Score Per Kill', 'Average Score Per Life', 'Average Score Per Game', 'Win Rate'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: 'Titan',
          data: [witems.assistsAvg, witems.oppDefAvg, witems.killsAvg, witems.deathsAvg, witems.effAvg, witems.perKAvg, witems.perLAvg, witems.scoreAvg, witems.standingAvg],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    return(
      <Radar
        data={warlockRadar}
        options={{ maintainAspectRatio: false, }}
      />
    )
  }


  return (
    <form id="classComparisons" onSubmit={handleCCSubmit}>
      <button type="submit" id="classComparisonsButton" className="navButton">
      I'm for Class Comparisons!
        <div id="NavigationMenuContainer">
          <section className="currentClassPop Pie">
            <GraphCreator {...props[5]}/>
          </section>
          <section id="titanCC" className="CCcontainer">
            <TitanDataOrganizer {...props[6][1]} />
          </section>
          <section id="hunterCC" className="CCcontainer">
            <HunterDataOrganizer {...props[6][0]} />
          </section>
          <section id="warlockCC" className="CCcontainer">
            <WarlockDataOrganizer {...props[6][2]} />
          </section>
        </div>
      </button>
    </form>
  )
}


// return (
//   <form id="classComparisons" onSubmit={handleCCSubmit}>
//     <button type="submit" id="classComparisonsButton" className="navButton">
//     I'm for Class Comparisons!
//       <div id="NavigationMenuContainer" className="hiding">
//         <section className="currentClassPop Pie">
//           <Pie
//             data={classesPieChart}
//             options={{ maintainAspectRatio: false, responsive: false }}
//           />
//         </section>
//         <section className="classPopOT line">
//           <Line
//             data={classesOTChart}
//             options={{ maintainAspectRatio: false, responsive: false }}
//           />
//         </section>
//         <section className="currentWepPop bar">
//           <Bar
//             data={currentWeaponPopularity}
//             options={{ maintainAspectRatio: false, responsive: false }}
//           />
//         </section>
//       </div>
//     </button>
//   </form>
// )