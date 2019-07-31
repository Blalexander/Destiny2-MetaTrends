import React from 'react';
import manifest from './manifest';
import {Doughnut, Pie} from 'react-chartjs-2';


export default function WeaponCharts(props) {
  // if(props[0] === undefined) {
  //   return null;
  // }

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

    // document.getElementById('wepContainer').classList.remove('hiding');
    document.getElementById('weaponContainer').classList.remove('hiding');
    document.getElementById('wepContainer').style.overflowY = "scroll";

    WepList(testPath);
    // console.log(testPath);
  }

  let labelIncrementor = 0;

  function GraphCreator(j) {
    // let tempData = {j, k, l};
    // console.log(j.allData[0], j.allData[1], j.allData[2])
    // let tempData = [meleeData, grenadeData, superData];
    let doughnutData = {
      labels: ["melee kills", "grenade kills", "super kills"],
      datasets: [
        {
          data: [j.allData[0], j.allData[1], j.allData[2]],
          // data: [50, 50, 50],
          backgroundColor: ['rgba(233, 11, 11, 0.6)', 'rgba(17, 17, 232, 0.6)', 'rgba(249, 160, 71, 0.6)'],
        },
      ]
    }

    return (
      <Pie
        data={doughnutData}
        options={{ maintainAspectRatio: false, responsive: false }}
      />
    )
  }

  function WepConstructor(props) {
    let revisedWep = testPath[props.value];
    // console.log(labelIncrementor)

    // let revisedWep = Object.values(currentWep);
    // revisedWep.map(item => {
    //   item.toFixed(2)
    // })
    let revisedWinRate = 1 - revisedWep.standingAvg.toFixed(2);
    let wepId = revisedWep._id;
    // let revisedWepName = manifest[wepId].weaponName;
    // console.log(revisedWepName)
    // let wepIcon = "https://www.bungie.net" + manifest[wepId].weaponIcon;

    if(manifest[wepId]) {
      let revisedWepName = manifest[wepId].weaponName;
      let wepIcon = "https://www.bungie.net" + manifest[wepId].weaponIcon;
      let wepStatKeys = Object.keys(manifest[wepId].weaponValues);
      let wepRpmMagSize = [];
      let wepStatVals = wepStatKeys.map(stat => {
        if(stat === "1885944937" || stat === "3291498656" || stat === "3291498659" || stat === "Inventory Size") {
          return("")
        }
        else if(manifest[wepId].weaponValues[stat].value === 0 || stat === "Power") {
          return("")
        }
        else if(stat === "Rounds Per Minute" || stat === "Charge Time" || stat === "Swing Speed") {
          wepRpmMagSize.unshift(<p className={"eachWepStat " + stat}>{stat + " " + manifest[wepId].weaponValues[stat].value}</p>);
          return("");
        }
        else if(stat === "Magazine" || stat === "Draw Time") {
          wepRpmMagSize.push(<p className={"eachWepStat " + stat}>{stat + " " + manifest[wepId].weaponValues[stat].value}</p>);
          return("");
        }
        else if(stat === "Recoil Direction" || stat === "Zoom" || stat === "Blast Radius" || stat === "Impact" || stat === "Reload Speed" || stat === "Accuracy" || stat === "Charge Time" ) {
          return(
            <p className="eachWepStat rightHalf">{manifest[wepId].weaponValues[stat].value + "/100  " + stat}</p>
          )
        }
        else {
          return( 
            <p className="eachWepStat leftHalf">{stat + " " + manifest[wepId].weaponValues[stat].value + "/100  "}</p>
          )
        }
      })

      // let stat1 = wepStatKeys[6];
      // let stat2 = wepStatKeys[10];
      // wepStatVals.push(<p className="eachWepStat">{stat1 + " " + manifest[wepId].weaponValues[stat1].value + " "}</p>)
      // wepStatVals.push(<p className="eachWepStat">{stat2 + " " + manifest[wepId].weaponValues[stat2].value + " "}</p>)
      // console.log("stat1: ", stat1, "stat2: ", stat2)


      if(labelIncrementor%10 === 0) {
        labelIncrementor++;
        let graphData = [revisedWep.meleeKills.toFixed(1), revisedWep.grenadeKills.toFixed(1), revisedWep.superKills.toFixed(1)]
        return (
          <div className="wepChartsItem">
            <div className="popularityAndWinRate">
              <p className="eachPlayerStat timesUsed">Times Used: {revisedWep.totalCount}</p>
              <p className="eachPlayerStat winRate">Win Rate: {(revisedWinRate * 100).toFixed(0)}%</p>
            </div>
            <div className={"wepNameIconType t" + manifest[wepId].weaponTier}>
              <div className="labelNum">{labelIncrementor} - {labelIncrementor + 9}</div>
              <p className="wepName">{revisedWepName}</p>
              <img src={wepIcon} className="wepIcons" alt="wepIcon"></img> 
              <p className="wepType">{manifest[wepId].weaponType}</p>
            </div>
            <div className="wepRpmMagSize">{wepRpmMagSize}</div>
            <div className="statsContainer">
              <div className="wepStatVals">{wepStatVals}</div>
              <div className="playerStats">
                <p className="eachPlayerStat">Assists: {revisedWep.assistsAvg.toFixed(2)}</p>
                <p className="eachPlayerStat">Kills: {revisedWep.killsAvg.toFixed(2)}</p>
                <p className="eachPlayerStat">Deaths: {revisedWep.deathsAvg.toFixed(2)}</p>
                <p className="eachPlayerStat">K/D: {(revisedWep.killsAvg / revisedWep.deathsAvg).toFixed(2)}</p>
                <p className="eachPlayerStat">Efficiency: {revisedWep.effAvg.toFixed(2)}</p>
                <p className="eachPlayerStat">scoreAvg: {revisedWep.scoreAvg.toFixed(2)}</p>
              </div>
              <div className="abilityStats">
                <GraphCreator allData={graphData} />
              </div>
            </div>
          </div>
        )
      }

      labelIncrementor++;
      let graphData = [revisedWep.meleeKills.toFixed(1), revisedWep.grenadeKills.toFixed(1), revisedWep.superKills.toFixed(1)]
      return (
        <div className="wepChartsItem">
          <div className="popularityAndWinRate">
            <p className="eachPlayerStat timesUsed">Times Used: {revisedWep.totalCount}</p>
            <p className="eachPlayerStat winRate">Win Rate: {(revisedWinRate * 100).toFixed(0)}%</p>
          </div>
          <div className={"wepNameIconType t" + manifest[wepId].weaponTier}>
            <p className="wepName">{revisedWepName}</p>
            <img src={wepIcon} className="wepIcons" alt="wepIcon"></img> 
            <p className="wepType">{manifest[wepId].weaponType}</p>
          </div>
          <div className="wepRpmMagSize">{wepRpmMagSize}</div>
          <div className="statsContainer">
            <div className="wepStatVals">{wepStatVals}</div>
            <div className="playerStats">
              <p className="eachPlayerStat">Assists: {revisedWep.assistsAvg.toFixed(2)}</p>
              <p className="eachPlayerStat">Kills: {revisedWep.killsAvg.toFixed(2)}</p>
              <p className="eachPlayerStat">Deaths: {revisedWep.deathsAvg.toFixed(2)}</p>
              <p className="eachPlayerStat">K/D: {(revisedWep.killsAvg / revisedWep.deathsAvg).toFixed(2)}</p>
              <p className="eachPlayerStat">Efficiency: {revisedWep.effAvg.toFixed(2)}</p>
              <p className="eachPlayerStat">scoreAvg: {revisedWep.scoreAvg.toFixed(2)}</p>
            </div>
            <div className="abilityStats">
              <GraphCreator allData={graphData} />
            </div>
          </div>
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
      <div id="weaponContainer" className="hiding">
        {listOfWeps}
      </div>
    )
  }




  let timer = 0;


  function labelTimer(e) {
    timer++;
    // console.log(timer)

    if(timer === 1) {
      transparentLabels(e)
    }
  }

  // let x = document.querySelectorAll('div.wepChartsItem');


  function transparentLabels(e) {
    e.preventDefault();
    // console.log("test test 1", e.target.childNodes[0]);
    let x = document.querySelectorAll('div.labelNum');
    setTimeout(() => timer = 0, 1000);


    let i;
    for (i = 0; i < x.length; i++) {
      x[i].style.borderLeft = "3px solid rgba(255, 153, 36, .5)";
      // if(i%10 === 0) {
        x[i].style.borderTop = "3px solid rgba(255, 153, 36, .5)";
      // }
      // if((i + 1)%10 === 0) {
        x[i].style.borderBottom = "3px solid rgba(255, 153, 36, .5)";
      // }
    } 

    setTimeout(() => {
      let o;
      for (o = 0; o < x.length; o++) {
        x[o].style.borderLeft = "3px solid transparent";
        // if(o%10 === 0) {
          x[o].style.borderTop = "3px solid transparent";
        // }
        // if((o + 1)%10 === 0) {
          x[o].style.borderBottom = "3px solid transparent";
        // }
      } 
    }, 1000)
  }

  return (
    <form id="weaponCharts" onSubmit={handleWCSubmit}>
      <button type="submit" id="weaponChartsButton" className="navButton">
        <section id="wepContainer" onScroll={event => labelTimer(event)}>
          <WepList {...props}/>
        </section>
      </button>
    </form>
  )
}