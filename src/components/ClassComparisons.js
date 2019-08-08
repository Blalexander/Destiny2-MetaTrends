import React, {useState} from 'react';
// import {Line, Bar, Pie} from 'react-chartjs-2';
import {Pie, HorizontalBar, Bar} from 'react-chartjs-2';
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
      <Bar
        data={classesPieChart}
        options={{ maintainAspectRatio: false, responsive: false, rotation: 140 }}
      />
    )
  }


  function MapDataPopulator(item) {
    // console.log(item.value)
    let mapHash = item.value._id;
    let mapIcon = "https://www.bungie.net" + manifest.mapHashes[mapHash].locationImage;
    // let revisedWinRate = (1 - item.value.standing) * 100;
    let highestWinningClassPerMap = () => {
      if(item.value.classWins[0].winRate > item.value.classWins[1].winRate && item.value.classWins[0].winRate > item.value.classWins[2].winRate) {
        return assignColor(item.value.classWins[0].class)
      }
      else if(item.value.classWins[1].winRate > item.value.classWins[0].winRate && item.value.classWins[1].winRate > item.value.classWins[2].winRate) {
        return assignColor(item.value.classWins[1].class)
      }
      else if(item.value.classWins[2].winRate > item.value.classWins[1].winRate && item.value.classWins[2].winRate > item.value.classWins[0].winRate) {
        return assignColor(item.value.classWins[2].class)
      }
    }
    let assignColor = (MVCperMap) => {
      if(MVCperMap === "Titan") {
        return 'rgba(231, 13, 13, 0.6)';
      }
      else if(MVCperMap === "Hunter") {
        return 'rgba(13, 122, 231, 0.6)';
      }
      else if(MVCperMap === "Warlock") {
        return 'rgba(218, 165, 32, 0.6)';
      }
    }


    return(
      <div className="eachMapHolder" style={{backgroundColor: highestWinningClassPerMap()}}>
        <img src={mapIcon} className="mapIcons" alt="mapIcon"></img> 
        <p>{manifest.mapHashes[mapHash].locationName}</p>
        <p>{item.value.classWins[0].class} {(item.value.classWins[0].winRate * 100).toFixed(0)}%</p>
        <p>{item.value.classWins[1].class} {(item.value.classWins[1].winRate * 100).toFixed(0)}%</p>
        <p>{item.value.classWins[2].class} {(item.value.classWins[2].winRate * 100).toFixed(0)}%</p>
        <br></br>
      </div>
    )
  }


  // const titanMaps = props[7].filter(gameMap => {
  //   return gameMap._id.class === "Titan"
  // })
  // const hunterMaps = props[7].filter(gameMap => {
  //   return gameMap._id.class === "Hunter"
  // })    
  // const warlockMaps = props[7].filter(gameMap => {
  //   return gameMap._id.class === "Warlock"
  // })


  function MapConstructor(mapItem) {
    // console.log(mapItem)
    // const titanMaps = props[7].filter(gameMap => {
    //   return gameMap._id.class === "Titan"
    // })

    let testItem = [];
    for(let thingy in mapItem) {
      testItem.push(mapItem[thingy])
    }



    const MapsData = testItem.map((gameMap) => 
      <MapDataPopulator key={gameMap._id} value={gameMap} />
    );

    return(
      <div className="mapsContainer">
        {MapsData}
      </div>
    )
  }


///////////////////////////////////////////////////////////////////////////////////////////////////
  let titanKda = props[6][1].oppDefAvg / props[6][1].deathsAvg;
  let hunterKda = props[6][0].oppDefAvg / props[6][0].deathsAvg;
  let warlockKda = props[6][2].oppDefAvg / props[6][2].deathsAvg;
  props[6][1].kdaAvg = titanKda;
  props[6][0].kdaAvg = hunterKda;
  props[6][2].kdaAvg = warlockKda;
  // console.log(props[6])

  let classCounts = props[5][0].count + props[5][1].count + props[5][2].count;
  let titanClassPopularity = (props[5][1].count / classCounts * 100).toFixed(1);
  let hunterClassPopularity = (props[5][0].count / classCounts * 100).toFixed(1);
  let warlockClassPopularity = (props[5][2].count / classCounts * 100).toFixed(1);
  // console.log(titanClassPopularity, hunterClassPopularity, warlockClassPopularity)
//////////////////////////////////////////////////////////////////////////////////////////////////


  function TitanDataOrganizer(titems) {
    // console.log(titems)
    // let kda = titems.oppDefAvg / titems.deathsAvg;
    // let statComparisons = 
    // let oppDefBarColor = (props[6][1].oppDefAvg > props[6][2].oppDefAvg && props[6][1].oppDefAvg > props[6][0].oppDefAvg) ? 'rgba(231, 13, 13, 0.6)' : 'rgba(0, 0, 0, .6';

    // let killsAvgBarColor = (props[6][1].killsAvg > props[6][2].killsAvg && props[6][1].killsAvg > props[6][0].killsAvg) ? 'rgba(231, 13, 13, 0.6)' : 'rgba(0, 0, 0, .6';

    // let assistsAvgBarColor = (props[6][1].assistsAvg > props[6][2].assistsAvg && props[6][1].assistsAvg > props[6][0].assistsAvg) ? 'rgba(231, 13, 13, 0.6)' : 'rgba(0, 0, 0, .6';

    // let deathsAvgBarColor = (props[6][1].deathsAvg > props[6][2].deathsAvg && props[6][1].deathsAvg > props[6][0].deathsAvg) ? 'rgba(231, 13, 13, 0.6)' : 'rgba(0, 0, 0, .6';


    let labels = ['oppDefAvg', 'killsAvg', 'assistsAvg', 'deathsAvg'];
    let barColors = labels.map(item => {
      if(props[6][1][item] > props[6][2][item] && props[6][1][item] > props[6][0][item]) {
        return 'rgba(231, 13, 13, 0.6)';
      }
      else {
        return 'rgba(0, 0, 0, .6';
      }
    })

    let labels2 = ['kdaAvg', 'effAvg', 'perKAvg', 'perLAvg'];
    let barColors2 = labels2.map(item => {
      if(props[6][1][item] > props[6][2][item] && props[6][1][item] > props[6][0][item]) {
        return 'rgba(231, 13, 13, 0.6)';
      }
      else {
        return 'rgba(0, 0, 0, .6';
      }
    })


    const [titanHorizontalBar1] = useState({
      labels: ['Opponents Defeated', 'Kills', 'Assists', 'Deaths'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: ,
          // legend: { display: false },
          data: [titems.oppDefAvg, titems.killsAvg, titems.assistsAvg, titems.deathsAvg],
          backgroundColor: barColors
          // borderColor: "red"
        },
      ]
    })

    const [titanHorizontalBar2] = useState({
      labels: ['K/DA', 'Efficiency', 'Average Score Per Kill', 'Average Score Per Life'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [titanKda, titems.effAvg, titems.perKAvg, titems.perLAvg],
          backgroundColor: barColors2,
          // borderColor: "red"
        },
      ]
    })

    return(
      <div className="HorizontalBarHolder">
        <HorizontalBar
          data={titanHorizontalBar1}
          options={{ maintainAspectRatio: true, legend: {display: false}, scales: {xAxes:[{display: true,ticks:{suggestedMax:25}}]} }}
        />
        <HorizontalBar
          data={titanHorizontalBar2}
          options={{ maintainAspectRatio: true, legend: {display: false}, scales: {xAxes:[{display: true,ticks:{suggestedMax:3, suggestedMin:0}}]} }}
        />
        <p className="winRate">Win Rate: {(titems.standingAvg * 100).toFixed(1)}%</p>
      </div>
    )
  }

  function HunterDataOrganizer(hitems) {
    // console.log(hitems)
    // let kda = hitems.oppDefAvg / hitems.deathsAvg;
    let labels = ['oppDefAvg', 'killsAvg', 'assistsAvg', 'deathsAvg'];
    let barColors = labels.map(item => {
      if(props[6][0][item] > props[6][2][item] && props[6][0][item] > props[6][1][item]) {
        return 'rgba(13, 122, 231, 0.6)';
      }
      else {
        return 'rgba(0, 0, 0, .6';
      }
    })

    let labels2 = ['kdaAvg', 'effAvg', 'perKAvg', 'perLAvg'];
    let barColors2 = labels2.map(item => {
      if(props[6][0][item] > props[6][2][item] && props[6][0][item] > props[6][1][item]) {
        return 'rgba(13, 122, 231, 0.6)';
      }
      else {
        return 'rgba(0, 0, 0, .6';
      }
    })

    const [hunterHorizontalBar1] = useState({
      labels: ['Opponents Defeated', 'Kills', 'Assists', 'Deaths'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [hitems.oppDefAvg, hitems.killsAvg, hitems.assistsAvg, hitems.deathsAvg],
          backgroundColor: barColors,
          // borderColor: "red"
        },
      ]
    })

    const [hunterHorizontalBar2] = useState({
      labels: ['K/DA', 'Efficiency', 'Average Score Per Kill', 'Average Score Per Life'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [hunterKda, hitems.effAvg, hitems.perKAvg, hitems.perLAvg],
          backgroundColor: barColors2,
          // borderColor: "red"
        },
      ]
    })

    return(
      <div className="HorizontalBarHolder">
        <HorizontalBar
          data={hunterHorizontalBar1}
          options={{ maintainAspectRatio: true, legend: {display: false}, scales: {xAxes:[{display: true,ticks:{suggestedMax:25}}]} }}
        />
        <HorizontalBar
          data={hunterHorizontalBar2}
          options={{ maintainAspectRatio: true, legend: {display: false}, scales: {xAxes:[{display: true,ticks:{suggestedMax:3, suggestedMin:0}}]} }}
        />
        <p className="winRate">Win Rate: {(hitems.standingAvg * 100).toFixed(1)}%</p>
      </div>
    )
  }

  function WarlockDataOrganizer(witems) {
    // console.log(witems)
    // let kda = witems.oppDefAvg / witems.deathsAvg;
    let labels = ['oppDefAvg', 'killsAvg', 'assistsAvg', 'deathsAvg'];
    let barColors = labels.map(item => {
      if(props[6][2][item] > props[6][1][item] && props[6][2][item] > props[6][0][item]) {
        return 'rgba(218, 165, 32, 0.6)';
      }
      else {
        return 'rgba(0, 0, 0, .6';
      }
    })

    let labels2 = ['kdaAvg', 'effAvg', 'perKAvg', 'perLAvg'];
    let barColors2 = labels2.map(item => {
      if(props[6][2][item] > props[6][1][item] && props[6][2][item] > props[6][0][item]) {
        return 'rgba(218, 165, 32, 0.6)';
      }
      else {
        return 'rgba(0, 0, 0, .6';
      }
    })

    const [warlockHorizontalBar1] = useState({
      labels: ['Opponents Defeated', 'Kills', 'Assists', 'Deaths'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [witems.oppDefAvg, witems.killsAvg, witems.assistsAvg, witems.deathsAvg],
          backgroundColor: barColors,
          // borderColor: "red"
        },
      ]
    })

    const [warlockHorizontalBar2] = useState({
      labels: ['K/DA', 'Efficiency', 'Average Score Per Kill', 'Average Score Per Life'], //BAR, labels = X-axis dates
      datasets: [ 
        {
          // label: [10, 20, 30, 40, 50],
          data: [warlockKda, witems.effAvg, witems.perKAvg, witems.perLAvg],
          backgroundColor: barColors2,
          // borderColor: "red"
        },
      ]
    })

    return(
      <div className="HorizontalBarHolder">
        <HorizontalBar
          data={warlockHorizontalBar1}
          options={{ maintainAspectRatio: true, legend: {display: false}, scales: {xAxes:[{display: true,ticks:{suggestedMax:25}}]} }}
        />
        <HorizontalBar
          data={warlockHorizontalBar2}
          options={{ maintainAspectRatio: true, legend: {display: false}, scales: {xAxes:[{display: true,ticks:{suggestedMax:3, suggestedMin:0}}]} }}
        />
        <p className="winRate">Win Rate: {(witems.standingAvg * 100).toFixed(1)}%</p>
      </div>
    )
  }


  return (
    <form id="classComparisons" onSubmit={handleCCSubmit}>
      <button type="submit" id="classComparisonsButton" className="navButton">
        <div id="NavigationMenuContainer" className="hiding">
          <div className="titanPopulationBar">
            <div className="populationBar" style={{height: props[5][1].count}}>
            </div>
          </div>
          <h3 className="classPopNumbers titanPop">{titanClassPopularity}%</h3>
          <section id="titanCC" className="CCcontainer">
            <TitanDataOrganizer {...props[6][1]} />
          </section>
          <div className="hunterPopulationBar">
            <div className="populationBar" style={{height: props[5][0].count}}>
            </div>
          </div>
          <h3 className="classPopNumbers hunterPop">{hunterClassPopularity}%</h3>
          <section id="hunterCC" className="CCcontainer">
            <HunterDataOrganizer {...props[6][0]} />
          </section>
          <div className="warlockPopulationBar">
            <div className="populationBar" style={{height: props[5][2].count}}>
            </div>
          </div>
          <h3 className="classPopNumbers warlockPop">{warlockClassPopularity}%</h3>
          <section id="warlockCC" className="CCcontainer">
            <WarlockDataOrganizer {...props[6][2]} />
          </section>
          <section className="classMaps">
            <MapConstructor {...props[7]} />
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