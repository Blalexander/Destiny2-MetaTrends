import React, {useState} from 'react';
// import {Line, Bar, Pie} from 'react-chartjs-2';
import {Pie, HorizontalBar} from 'react-chartjs-2';
import manifest from './manifest';


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

  function MapDataPopulator(item) {
    // console.log(item.value)
    let mapHash = item.value._id.map;
    let mapIcon = "https://www.bungie.net" + manifest.mapHashes[mapHash].locationImage;
    let revisedWinRate = (1 - item.value.standing) * 100;


    return(
      <div className="eachMapHolder">
        <img src={mapIcon} className="mapIcons" alt="mapIcon"></img> 
        <p>{manifest.mapHashes[mapHash].locationName}</p>
        <p>Win Rate: {revisedWinRate.toFixed(0)}%</p>
        <p>Games Played: {item.value.count}</p>
        <br></br>
      </div>
    )
  }


  const titanMaps = props[7].filter(gameMap => {
    return gameMap._id.class === "Titan"
  })
  const hunterMaps = props[7].filter(gameMap => {
    return gameMap._id.class === "Hunter"
  })    
  const warlockMaps = props[7].filter(gameMap => {
    return gameMap._id.class === "Warlock"
  })


  function MapConstructor(mapItem) {
    console.log(mapItem)
    // const titanMaps = props[7].filter(gameMap => {
    //   return gameMap._id.class === "Titan"
    // })

    const MapsData = mapItem[0].map((gameMap) => 
      <MapDataPopulator key={gameMap._id.map} value={gameMap} />
    );

    return(
      <div>
        <div className="mapsContainer">
          {MapsData}
        </div>
      </div>
    )
    
  }

  function TitanDataOrganizer(titems) {
    // console.log(titems)
    let kda = titems.oppDefAvg / titems.deathsAvg;

    const [titanHorizontalBar1] = useState({
      labels: ['Opponents Defeated', 'Kills', 'Assists', 'Deaths'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [titems.oppDefAvg, titems.killsAvg, titems.assistsAvg, titems.deathsAvg],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    const [titanHorizontalBar2] = useState({
      labels: ['Efficiency', 'Average Score Per Kill', 'Average Score Per Life', 'K/DA'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [titems.effAvg, titems.perKAvg, titems.perLAvg, kda],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    return(
      <div id="HorizontalBarHolder">
        <HorizontalBar
          data={titanHorizontalBar1}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    )
  }

  function HunterDataOrganizer(hitems) {
    // console.log(hitems)
    const [hunterHorizontalBar] = useState({
      labels: ['Opponents Defeated', 'Kills', 'Assists', 'Deaths', 'Efficiency', 'Average Score Per Kill', 'Average Score Per Life', 'Average Score Per Game', 'Win Rate'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: 'Titan',
          data: [hitems.oppDefAvg, hitems.killsAvg, hitems.assistsAvg, hitems.deathsAvg, hitems.effAvg, hitems.perKAvg, hitems.perLAvg, hitems.scoreAvg, hitems.standingAvg],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    return(
      <HorizontalBar
        data={hunterHorizontalBar}
        options={{ maintainAspectRatio: false, }}
      />
    )
  }

  function WarlockDataOrganizer(witems) {
    // console.log(witems)
    const [warlockHorizontalBar] = useState({
      labels: ['Opponents Defeated', 'Kills', 'Assists', 'Deaths', 'Efficiency', 'Average Score Per Kill', 'Average Score Per Life', 'Average Score Per Game', 'Win Rate'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: 'Titan',
          data: [witems.oppDefAvg, witems.killsAvg, witems.assistsAvg, witems.deathsAvg, witems.effAvg, witems.perKAvg, witems.perLAvg, witems.scoreAvg, witems.standingAvg],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    return(
      <HorizontalBar
        data={warlockHorizontalBar}
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
          <section className="titanMaps">
            <MapConstructor {...[titanMaps]} />
          </section>
          <section className="hunterMaps">
            <MapConstructor {...[hunterMaps]} />
          </section>
          <section className="warlockMaps">
            <MapConstructor {...[warlockMaps]} />
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