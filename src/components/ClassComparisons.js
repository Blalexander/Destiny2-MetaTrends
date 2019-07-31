import React, {useState} from 'react';
// import {Line, Bar, Pie} from 'react-chartjs-2';
import {Pie, HorizontalBar} from 'react-chartjs-2';
import manifest from './manifest';
import MapConstructor from './MapConstructor';


export default function ClassComparisons(props) {
  if(props[0] === undefined) {
    return(    
    <form id="classComparisons" onSubmit={handleCCSubmit}>
      <button type="submit" id="classComparisonsButton" className="navButton">
        <div id="NavigationMenuContainer" className="hiding">
        </div>
      </button>
    </form>
    )
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

    document.getElementById('NavigationMenuContainer').classList.remove('hiding');
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
    // console.log(mapItem)
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
      labels: ['K/DA', 'Efficiency', 'Average Score Per Kill', 'Average Score Per Life'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [kda, titems.effAvg, titems.perKAvg, titems.perLAvg],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    return(
      <div className="HorizontalBarHolder">
        <HorizontalBar
          data={titanHorizontalBar1}
          options={{ maintainAspectRatio: true }}
        />
        <HorizontalBar
          data={titanHorizontalBar2}
          options={{ maintainAspectRatio: true }}
        />
        <p className="winRate">Win Rate: {(titems.standingAvg * 100).toFixed(1)}%</p>
      </div>
    )
  }

  function HunterDataOrganizer(hitems) {
    // console.log(hitems)
    let kda = hitems.oppDefAvg / hitems.deathsAvg;

    const [hunterHorizontalBar1] = useState({
      labels: ['Opponents Defeated', 'Kills', 'Assists', 'Deaths'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [hitems.oppDefAvg, hitems.killsAvg, hitems.assistsAvg, hitems.deathsAvg],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    const [hunterHorizontalBar2] = useState({
      labels: ['K/DA', 'Efficiency', 'Average Score Per Kill', 'Average Score Per Life'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [kda, hitems.effAvg, hitems.perKAvg, hitems.perLAvg],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    return(
      <div className="HorizontalBarHolder">
        <HorizontalBar
          data={hunterHorizontalBar1}
          options={{ maintainAspectRatio: true }}
        />
        <HorizontalBar
          data={hunterHorizontalBar2}
          options={{ maintainAspectRatio: true }}
        />
        <p className="winRate">Win Rate: {(hitems.standingAvg * 100).toFixed(1)}%</p>
      </div>
    )
  }

  function WarlockDataOrganizer(witems) {
    // console.log(witems)
    let kda = witems.oppDefAvg / witems.deathsAvg;

    const [warlockHorizontalBar1] = useState({
      labels: ['Opponents Defeated', 'Kills', 'Assists', 'Deaths'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [witems.oppDefAvg, witems.killsAvg, witems.assistsAvg, witems.deathsAvg],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    const [warlockHorizontalBar2] = useState({
      labels: ['K/DA', 'Efficiency', 'Average Score Per Kill', 'Average Score Per Life'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [kda, witems.effAvg, witems.perKAvg, witems.perLAvg],
          // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
          // borderColor: "red"
        },
      ]
    })

    return(
      <div className="HorizontalBarHolder">
        <HorizontalBar
          data={warlockHorizontalBar1}
          options={{ maintainAspectRatio: true }}
        />
        <HorizontalBar
          data={warlockHorizontalBar2}
          options={{ maintainAspectRatio: true }}
        />
        <p className="winRate">Win Rate: {(witems.standingAvg * 100).toFixed(1)}%</p>
      </div>
    )
  }


  return (
    <form id="classComparisons" onSubmit={handleCCSubmit}>
      <button type="submit" id="classComparisonsButton" className="navButton">
        <div id="NavigationMenuContainer" className="hiding">
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

// <section className="titanMaps">
//<MapConstructor {...props[7]} />
//</section>
//<section className="hunterMaps">
//<MapConstructor {...[hunterMaps]} />
//</section>
//<section className="warlockMaps">
//<MapConstructor {...[warlockMaps]} />
//</section> 

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