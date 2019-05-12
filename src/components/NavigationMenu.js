import React, { useState, useEffect } from 'react';
// import {Line, Bar, Pie} from 'react-chartjs-2';
import PowerfulAndPopular from './PowerfulAndPopular';
import ClassComparisons from './ClassComparisons';
import WeaponCharts from './WeaponCharts';
import HistoricalGraphs from './HistoricalGraphs';


export default function NavigationMenu() {
  const [initialData, setInitialData] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
    const result = await fetch('http://localhost:8080/bungie/hope/',).then(res => {
      return res.json()
    });

    console.log(result);
    setInitialData(result);
    };

    fetchInitialData();
  }, [])


  return (
    <section className="landingPageNavigation">
      <div value={initialData}></div>
      <PowerfulAndPopular />
      <ClassComparisons />
      <WeaponCharts {...initialData[4]}/>
      <HistoricalGraphs />
    </section>
  )
}







// return (
//   <div id="NavigationMenuContainer" value={props}>
//     <section className="currentClassPop Pie">
//       <h1 className="classGraphsHeader">Class Comparisons</h1>
//       <Pie
//         data={classesPieChart}
//         options={{ maintainAspectRatio: true }}
//       />
//     </section>
//     <section className="classPopOT line">
//       <Line
//         data={classesOTChart}
//         options={{ maintainAspectRatio: true }}
//       />
//     </section>
//     <section className="currentWepPop bar">
//       <Bar
//         data={currentWeaponPopularity}
//         options={{ maintainAspectRatio: true }}
//       />
//     </section>
//     <section className="wepPopOT line">
//     </section>
//     <section className="wepPopByArch bar">
//     </section>
//   </div>
// )

// let dateMapper = props[2].map(eachDate => {
//   return eachDate._id.date
// });

// const revisedDateMapper = [...new Set(dateMapper)];

// // const scoreMapper = props[1].map(eachScore => {
// //   return eachScore.gameStats.totalScore
// // });

// // const weaponMapper = props[1].map(eachScore => {
// //   return eachScore.weaponStats[0].standardKills
// // });

// // const kdMapper = props[1].map(eachScore => {
// //   return(eachScore.gameStats.totalKills/eachScore.gameStats.totalDeaths)
// // });

// // const uniqueValues = props[1].map(eachScore => {
// //   return eachScore.weaponStats[0].weapon
// // })

// const distinct = (value, index, self) => {
//   return self.indexOf(value) === index
// }

// // const distinctValues = uniqueValues.filter(distinct)

// let titanIterator = 0;
// let hunterIterator = 0;
// let warlockIterator = 0;
// let titanHolder = [];
// let hunterHolder = [];
// let warlockHolder = [];


// const PieClassesMapper = props[2].forEach(eachScore => {
//   if(eachScore._id.class === "Titan") {
//     return titanIterator += eachScore.count;
//   }
//   else if(eachScore._id.class === "Hunter") {
//     return hunterIterator += eachScore.count;
//   }
//   else if(eachScore._id.class === "Warlock") {
//     return warlockIterator += eachScore.count;
//   }
//   // return [titanIterator, hunterIterator, warlockIterator]
// });


// const classesOTMapper = props[2].forEach(eachScore => { //3X shorter than it should be compared to dates
//   if(eachScore._id.class === "Titan") {
//     titanHolder.push(eachScore.count);
//     return titanHolder;
//   }
//   else if(eachScore._id.class === "Hunter") {
//     hunterHolder.push(eachScore.count);
//     return hunterHolder;
//   }
//   else if(eachScore._id.class === "Warlock") {
//     warlockHolder.push(eachScore.count);
//     return warlockHolder;
//   }
// });


// //create a new array for each weapon that holds it's count value
// // const dataSetHolder = [];
// const wepPopMapper = props[4].map(eachItem => {
//   return {label: eachItem._id, data: eachItem.count}
// })

// const wepCountMapper = props[4].map(eachItem => {
//   return eachItem.count
// })

// console.log("wepPopMapper: ", wepPopMapper)
// // console.log("dateMapper: ", dateMapper, "scoreMapper: ", scoreMapper, "weaponMapper: ", weaponMapper)
// // console.log("dateMapper: ", dateMapper, "PieClassesMapper: ", PieClassesMapper, "classesOTMapper: ", classesOTMapper)
// console.log("revisedDateMapper: ", revisedDateMapper, "titans: ", titanIterator, "hunters: ", hunterIterator, "warlocks: ", warlockIterator)

// const [chartDates, setChartDates] = useState(revisedDateMapper);
// // const [chartScores, setChartScores] = useState(scoreMapper);
// // const [chartWeapon, setChartWeapon] = useState(weaponMapper);
// // const [chartKds, setChartKds] = useState(kdMapper);
// // const [uniqueWeapons, setUniqueWeapons] = useState(distinctValues);
// // const [PieClasses, setPieClasses] = useState(PieClassesMapper);
// // const [classesOT, setClassesOT] = useState();
// const wepNames = useState(wepPopMapper);
// const wepCount = useState(wepCountMapper);




// const [classesPieChart, setClassesPieChart] = useState({
//   labels: ['Titan', 'Hunter', 'Warlock'],
//   datasets: [
//     {
//       data: [titanIterator, hunterIterator, warlockIterator],
//       backgroundColor: ['rgba(233, 11, 11, 0.6)', 'rgba(17, 17, 232, 0.6)', 'rgba(249, 160, 71, 0.6)'],
//     },
//   ]
// })

// const [classesOTChart, setclassesOTChart] = useState({
//   labels: chartDates,
//   datasets: [ //need to make this a variable thing that expects the { label } objects to come in
//     {
//       label: 'Titan',
//       data: titanHolder,
//       // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
//       borderColor: "red"
//     },
//     {
//       label: 'Hunter',
//       data: hunterHolder,
//       // backgroundColor: ['rgba(11, 22, 33, 0.6)', 'rgba(44, 55, 66, 0.6)'],
//       borderColor: "blue"
//     },
//     {
//       label: 'Warlock',
//       data: warlockHolder,
//       // backgroundColor: ['rgba(11, 22, 33, 0.6)', 'rgba(44, 55, 66, 0.6)'],
//       borderColor: "gold"
//     }
//   ]
// })

// const [currentWeaponPopularity] = useState({
//   labels: ['Titan'], //BAR, labels = X-axis dates
//   datasets: [ 
//     {
//       label: 'Titan',
//       data: [1],
//       // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
//       borderColor: "red"
//     },
//     {
//       label: 'Hunter',
//       data: [3],
//       // backgroundColor: ['rgba(11, 22, 33, 0.6)', 'rgba(44, 55, 66, 0.6)'],
//       borderColor: "blue"
//     },
//     {
//       label: 'Warlock',
//       data: [4],
//       // backgroundColor: ['rgba(11, 22, 33, 0.6)', 'rgba(44, 55, 66, 0.6)'],
//       borderColor: "gold"
//     }
//   ]
// })