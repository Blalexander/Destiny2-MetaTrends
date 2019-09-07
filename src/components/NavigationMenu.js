import React, { useState, useEffect } from 'react';
// import {Line, Bar, Pie} from 'react-chartjs-2';
import PowerfulAndPopular from './PowerfulAndPopular';
import ClassComparisons from './ClassComparisons';
import WeaponCharts from './WeaponCharts';
import manifest from './manifest';
// import BackButton from './BackButton';
// import HistoricalGraphs from './HistoricalGraphs';


export default function NavigationMenu() {
  const [initialData, setInitialData] = useState('');
  let weaponTypes = ["Sidearm", "Auto Rifle", "Pulse Rifle", "Combat Bow", "Scout Rifle", "Hand Cannon", "Sniper Rifle", "Submachine Gun", "Trace Rifle", "Fusion Rifle", "Linear Fusion Rifle", "Grenade Launcher", "Shotgun", "Rocket Launcher", "Sword", "Machine Gun"];

  let blankErAy = [];
  let blankObj = {};

  useEffect(() => {
    const fetchInitialData = async () => {
    const result = await fetch('http://localhost:8080/bungie/hope/',).then(res => {
      // document.getElementById('landingPageNav').classList.remove('loading');
      // document.getElementsByClassName("loading").style.opacity = 0.0;
      document.getElementsByClassName("loading")[0].style.display = "none";
      // setTimeout(() => document.getElementsByClassName("bars")[0, 1, 2, 3, 4, 5, 6].style.opacity = 0.0, 2000);
      // setTimeout(() => document.getElementsByClassName("navButton")[0].style.border = "2px solid skyblue", 100);
      // setTimeout(() => document.getElementsByClassName("navButton")[1].style.border = "2px solid skyblue", 500);
      // setTimeout(() => document.getElementsByClassName("navButton")[2].style.border = "2px solid skyblue", 1000);

      return res.json()
    });

    console.log(result);
    setInitialData(result);
    };

    const fetchOtherData = async () => {
      const result2 = await fetch('http://localhost:8080/bungie/hoping/',)
      // const result2 = await fetch('http://localhost:8080/bungie/hoping/',).then(res => {
      //   return res.json()
      // });
  
      console.log(result2);
      console.log(result2.Response);
    }

    //   const result2 = await fetch('https://www.bungie.net/common/destiny2_content/json/en/aggregate-2897f1bd-269c-4b6e-a1bf-61a8577b687b.json',).then(res => {
    //     return res.json()
    //   });
    //   for(let item in result2) {
    //     if(item === "DestinyInventoryItemDefinition") {
    //       // console.log(result2[item])
    //       for(let inventoryItem in result2[item]) {
    //         let wepType = result2[item][inventoryItem].itemTypeDisplayName
    //         if(weaponTypes.includes(wepType) && result2[item][inventoryItem].sockets) {  //.sockets doesn't exist for exotics?
    //           // console.log(result2[item][inventoryItem])
    //           let basePath = result2[item][inventoryItem] //sockets for each save just hash
              // let intSocketsVals = basePath.sockets.intrinsicSockets.map(eachSocket => {
              //   return eachSocket.plugItemHash
              // })
              // let varSocketsVals = basePath.sockets.socketEntries.map(eachSocket => {
              //   if(eachSocket.reusablePlugItems.length != 100) {
              //     let hashMaker = eachSocket.reusablePlugItems.map(eachPlugItem => eachPlugItem.plugItemHash)
              //     return hashMaker
              //   }
              // })

    //           blankObj[basePath.hash] = {
    //             weaponName: basePath.displayProperties.name,
    //             weaponIcon: basePath.displayProperties.icon,
    //             weaponType: basePath.itemTypeDisplayName,
    //             weaponTier: basePath.inventory.tierType,
    //             ammoType: basePath.equippingBlock.ammoType,
    //             itemCategories: basePath.itemCategoryHashes,
    //             intSockets: intSocketsVals,
    //             varSockets: varSocketsVals,
    //             weaponValues: basePath.stats.stats,
    //           }
    //           manifest[result2[item][inventoryItem].hash] = blankObj[result2[item][inventoryItem].hash]
    //         }
    //       }
    //     }
    //   }
    //   console.log(manifest)
    //   // console.log(result2);
    // }
    // const fetchOtherData = async () => {
    //   const result2 = await fetch('https://www.bungie.net/common/destiny2_content/json/en/aggregate-2897f1bd-269c-4b6e-a1bf-61a8577b687b.json',).then(res => {
    //     return res.json()
    //   });
    //   for(let item in result2) {
    //     if(item === "DestinyInventoryItemDefinition") {
    //       // console.log(result2[item])
    //       for(let inventoryItem in result2[item]) {
    //         let itemType = result2[item][inventoryItem].itemType
    //         if(itemType === 19) {  
    //           let badWords = ["Armor", "Emote", "Shader", "Mod", "Effects", "Ghost"];
    //           let containsArmor1 = result2[item][inventoryItem].itemTypeDisplayName.includes("Armor") ? true : false
    //           let containsArmor2 = result2[item][inventoryItem].displayProperties.name.includes("Armor") ? true : false
    //           let containsEmote = result2[item][inventoryItem].itemTypeDisplayName.includes("Emote") ? true : false
    //           let containsShader = result2[item][inventoryItem].itemTypeDisplayName.includes("Shader") ? true : false
    //           let containsMod = result2[item][inventoryItem].itemTypeDisplayName.includes("Mod") ? true : false //Effects Trait Bonus
    //           let containsEffects = result2[item][inventoryItem].itemTypeDisplayName.includes("Effect") ? true : false
    //           let containsGhost = result2[item][inventoryItem].itemTypeDisplayName.includes("Ghost") ? true : false
    //           let containsTrait = result2[item][inventoryItem].itemTypeDisplayName.includes("Trait") ? true : false
    //           let containsBonus = result2[item][inventoryItem].itemTypeDisplayName.includes("Bonus") ? true : false
    //           let containsClan = result2[item][inventoryItem].itemTypeDisplayName.includes("Clan") ? true : false



    //           if(!containsArmor1 && !containsArmor2 && !containsEmote && !containsShader && !containsMod && !containsEffects && !containsGhost && !containsTrait && !containsBonus && !containsClan) {
    //             // console.log(result2[item][inventoryItem])
    //             let basePath = result2[item][inventoryItem] 

    //             blankObj[basePath.hash] = {
    //               socketName: basePath.displayProperties.name,
    //               socketDesc: basePath.displayProperties.description,
    //               socketIcon: basePath.displayProperties.icon,
    //               socketType: basePath.itemTypeDisplayName,
    //               itemType: itemType
    //             }
    //             manifest["socketDefinitions"][result2[item][inventoryItem].hash] = blankObj[result2[item][inventoryItem].hash]
    //           }
    //         }
    //       }
    //     }
    //   }
      // console.log(manifest)
      // console.log(result2);
    // }

    fetchInitialData();
    // fetchOtherData(); //COULD BE THAT YOU CAN SENT TWO REQUESTS TO SAME DOMAIN IN ONE FUNCTION
  }, [])

  // function backButton() {
    // let resetElements = document.querySelectorAll('.navButton');
    // for(let i=0; i<resetElements.length; i++) {
    //   resetElements[i].classList.add('resetFromSide');
    //   resetElements[i].classList.remove('moveToSide');
    //   resetElements[i].classList.remove('grantPriority');
    // }

    // document.getElementById("backgroundTransitions").classList.remove('bodyShadow');
    // document.getElementById("backgroundTransitions").classList.add('removeBodyShadow');
    // document.body.classList.remove('bodyShadow');


    // document.getElementById('pnpContent').classList.add('hiding');
    // document.getElementById('NavigationMenuContainer').classList.add('hiding');
    // document.getElementById('wepContainer').style.overflowY = "hidden";
    // document.getElementById('weaponContainer').classList.add('hiding');


  // }


  return (
    <section id="landingPageNav" className="landingPageNavigation">
      <div className="loading"></div>

      <PowerfulAndPopular {...initialData[4]}/>
      <WeaponCharts {...initialData[8]}/>
      <ClassComparisons {...initialData}/> 

    </section>
  )
}

{/* <PowerfulAndPopular {...initialData[4]}/>
<WeaponCharts {...initialData[3]}/>
<ClassComparisons {...initialData}/>  */}







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