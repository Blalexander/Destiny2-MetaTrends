import React, { useState } from 'react';
import {Line, Bar, Polar} from 'react-chartjs-2';


export default function GameHistory(props) {
  if(props[0] === undefined) {
    return null;
  }

  let dateMapper = props[1].map(eachDate => {
    return eachDate._id.date
  });

  const revisedDateMapper = [...new Set(dateMapper)];

  // const scoreMapper = props[1].map(eachScore => {
  //   return eachScore.gameStats.totalScore
  // });

  // const weaponMapper = props[1].map(eachScore => {
  //   return eachScore.weaponStats[0].standardKills
  // });

  // const kdMapper = props[1].map(eachScore => {
  //   return(eachScore.gameStats.totalKills/eachScore.gameStats.totalDeaths)
  // });

  // const uniqueValues = props[1].map(eachScore => {
  //   return eachScore.weaponStats[0].weapon
  // })

  const distinct = (value, index, self) => {
    return self.indexOf(value) === index
  }

  // const distinctValues = uniqueValues.filter(distinct)

  let titanIterator = 0;
  let hunterIterator = 0;
  let warlockIterator = 0;
  let titanHolder = [];
  let hunterHolder = [];
  let warlockHolder = [];


  const polarClassesMapper = props[1].forEach(eachScore => {
    if(eachScore._id.class === "Titan") {
      return titanIterator += eachScore.count;
    }
    else if(eachScore._id.class === "Hunter") {
      return hunterIterator += eachScore.count;
    }
    else if(eachScore._id.class === "Warlock") {
      return warlockIterator += eachScore.count;
    }
  });
  

  const classesOTMapper = props[1].forEach(eachScore => { //3X shorter than it should be compared to dates
    if(eachScore._id.class === "Titan") {
      titanHolder.push(eachScore.count);
      return titanHolder;
    }
    else if(eachScore._id.class === "Hunter") {
      hunterHolder.push(eachScore.count);
      return hunterHolder;
    }
    else if(eachScore._id.class === "Warlock") {
      warlockHolder.push(eachScore.count);
      return warlockHolder;
    }
  });

  // console.log("dateMapper: ", dateMapper, "scoreMapper: ", scoreMapper, "weaponMapper: ", weaponMapper)
  // console.log("dateMapper: ", dateMapper, "polarClassesMapper: ", polarClassesMapper, "classesOTMapper: ", classesOTMapper)
  console.log("revisedDateMapper: ", revisedDateMapper, "titans: ", titanIterator, "hunters: ", hunterIterator, "warlocks: ", warlockIterator)

  const [chartDates, setChartDates] = useState(revisedDateMapper);
  // const [chartScores, setChartScores] = useState(scoreMapper);
  // const [chartWeapon, setChartWeapon] = useState(weaponMapper);
  // const [chartKds, setChartKds] = useState(kdMapper);
  // const [uniqueWeapons, setUniqueWeapons] = useState(distinctValues);
  // const [polarClasses, setPolarClasses] = useState(polarClassesMapper);
  const [classesOT, setClassesOT] = useState();

  


  const [classesPolarChart, setClassesPolarChart] = useState({
    labels: ['Titan', 'Hunter', 'Warlock'],
    datasets: [
      {
        data: [titanIterator, hunterIterator, warlockIterator],
        backgroundColor: ['rgba(233, 11, 11, 0.6)', 'rgba(17, 17, 232, 0.6)', 'rgba(249, 160, 71, 0.6)'],
      },
    ]
  })

  const [classesOTChart, setclassesOTChart] = useState({
    labels: chartDates,
    datasets: [ //need to make this a variable thing that expects the { label } objects to come in
      {
        label: 'Titan',
        data: titanHolder,
        // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
        borderColor: "red"
      },
      {
        label: 'Hunter',
        data: hunterHolder,
        // backgroundColor: ['rgba(11, 22, 33, 0.6)', 'rgba(44, 55, 66, 0.6)'],
        borderColor: "blue"
      },
      {
        label: 'Warlock',
        data: warlockHolder,
        // backgroundColor: ['rgba(11, 22, 33, 0.6)', 'rgba(44, 55, 66, 0.6)'],
        borderColor: "gold"
      }
    ]
  })


  return (
    <div id="gameHistoryContainer" value={props}>
      <section className="currentClassPop polar">
        <Polar
          data={classesPolarChart}
          options={{ maintainAspectRatio: true }}
        />
        <Line
          data={classesOTChart}
          options={{ maintainAspectRatio: true }}
        />
      </section>
      <section className="classPopOT line">
      </section>
      <section className="currentWepPop bar">
      </section>
      <section className="wepPopOT line">
      </section>
      <section className="wepPopByArch bar">
      </section>
    </div>
  )
}