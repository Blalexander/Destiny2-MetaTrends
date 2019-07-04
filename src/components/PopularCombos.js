import React from 'react'
import manifest from './manifest';


function PopularCombos(props) {
  if(props[0] === undefined) {
    return null;
  }
  // console.log(props)
  

  let valToUse;
  let valToUse2;

  for(let val in props) {
    if(props[val]._id != null && props[val]._id.length === 2) {
      console.log("=== 2", props[val])
      valToUse = props[val];
      break;
    }
  }

  for(let val in props) {
    if(props[val]._id != null && props[val]._id.length === 3) {
      console.log("=== 3", props[val])
      valToUse2 = props[val];
      break;
    }
  }


  let duoKeyOne = valToUse.allHashes[0][0];
  let duoKeyTwo = valToUse.allHashes[0][1];
  let duoObj = {
    [duoKeyOne]: valToUse.allKills[0][0] + valToUse.allKills[1][0],
    [duoKeyTwo]: valToUse.allKills[0][1] + valToUse.allKills[1][1]
  };

  let trioKeyOne = valToUse2.allHashes[0][0];
  let trioKeyTwo = valToUse2.allHashes[0][1];
  let trioKeyThree = valToUse2.allHashes[0][2];
  let trioObj = {
    [trioKeyOne]: 0,
    [trioKeyTwo]: 0,
    [trioKeyThree]: 0
  };

  valToUse2.allKills.forEach((eachRound, index) => {
    trioObj[trioKeyOne] += valToUse2.allKills[index][0];
    trioObj[trioKeyTwo] += valToUse2.allKills[index][1];
    trioObj[trioKeyThree] += valToUse2.allKills[index][2];
  })

  let trioKeysToAv = Object.keys(trioObj);
  let trioDividerNum = valToUse2.allKills.length;

  trioKeysToAv.forEach(toBeAveraged => {
    trioObj[toBeAveraged] = trioObj[toBeAveraged] / trioDividerNum;
  })
  let u = 0;
  trioKeysToAv.forEach(toBecomePercent => {
    let percentNum = trioObj[trioKeysToAv[0]] + trioObj[trioKeysToAv[1]] + trioObj[trioKeysToAv[2]];
    trioObj[u] = (trioObj[toBecomePercent] / valToUse2.killsAvg) * 100;
    u++
  })

  console.log(trioObj)




  let keysToAverage = Object.keys(duoObj);
  let duoDividerNum = valToUse.allKills.length;

  keysToAverage.forEach(toBeAveraged => {
    duoObj[toBeAveraged] = duoObj[toBeAveraged] / duoDividerNum;
  })
  let i = 0;
  keysToAverage.forEach(toBecomePercent => {
    let percentNum = duoObj[keysToAverage[0]] + duoObj[keysToAverage[1]];
    duoObj[i] = (duoObj[toBecomePercent] / valToUse.killsAvg) * 100;
    i++
  })
  
  console.log(duoObj, keysToAverage)

  // function displayMouseOverStats(event) {
  //   event.preventDefault();
  //   console.log(event.target.className)
  // }

  function displayMouseOverStats(name1, name2, ev) {
    console.log(name1, name2)

  }

  function displayMouseOverStatsTrio(name1, name2, name3, ev) {
    console.log(name1, name2, name3)

  }


  return(
    <section className="popWeaponContainer">  
      <div id="popDuoContainer" onMouseOver={e => displayMouseOverStats(keysToAverage[1], keysToAverage[0], e)}>
        <div id="twoweppop1" className={"pnpBoxes " + keysToAverage[1]}>{manifest[keysToAverage[1]].weaponName}
          <span className="statBars" style={{width: + duoObj[1].toFixed(2)}}>{duoObj[1].toFixed(2)}%</span>
          <img src={"https://www.bungie.net" + manifest[keysToAverage[1]].weaponIcon} alt="popularDuoWep1"></img>
        </div>
        <div id="twoweppop2" className={"pnpBoxes " + keysToAverage[0]}>{manifest[keysToAverage[0]].weaponName}
          <span className="statBars" style={{width: + duoObj[0].toFixed(2)}}>{duoObj[0].toFixed(2)}%</span>
          <img src={"https://www.bungie.net" + manifest[keysToAverage[0]].weaponIcon} alt="popularDuoWep2"></img>
        </div>
        <img src="https://i.imgur.com/dczT76m.png"></img>
        <p>{(valToUse.meleeKills / valToUse.killsAvg * 100).toFixed(2)}%</p>
        <img src="https://i.imgur.com/kfWS531.png"></img>
        <p>{(valToUse.grenadeKills / valToUse.killsAvg * 100).toFixed(2)}%</p>
        <img src="https://i.imgur.com/wWewGps.png"></img>
        <p>{(valToUse.abilityKills / valToUse.killsAvg * 100).toFixed(2)}%</p>
        <img src="https://i.imgur.com/EbvqkPc.png"></img>
        <p>{(valToUse.superKills / valToUse.killsAvg * 100).toFixed(2)}%</p>

      </div>

      <div className="trioPopContainer" onMouseOver={e => displayMouseOverStatsTrio(trioKeysToAv[0], trioKeysToAv[1], trioKeysToAv[2], e)}>
        <div id="threeweppop1" className="pnpBoxes">{manifest[trioKeysToAv[0]].weaponName}
        <span className="statBars" style={{width: + trioObj[0]}}>{trioObj[1].toFixed(0)}%</span>
          <img src={"https://www.bungie.net" + manifest[trioKeysToAv[0]].weaponIcon} alt="popularTrioWep1"></img>
        </div>
        <div id="threeweppop2" className="pnpBoxes">{manifest[trioKeysToAv[1]].weaponName}
        <span className="statBars" style={{width: + trioObj[1]}}>{trioObj[1].toFixed(1)}%</span>
          <img src={"https://www.bungie.net" + manifest[trioKeysToAv[1]].weaponIcon} alt="popularTrioWep2"></img>
        </div>
        <div id="threeweppop3" className="pnpBoxes">{manifest[trioKeysToAv[2]].weaponName}
        <span className="statBars" style={{width: + trioObj[2]}}>{trioObj[1].toFixed(2)}%</span>
          <img src={"https://www.bungie.net" + manifest[trioKeysToAv[2]].weaponIcon} alt="popularTrioWep3"></img>
        </div>
        <img src="https://i.imgur.com/dczT76m.png"></img>
        <p>{(valToUse.meleeKills / valToUse2.killsAvg * 100).toFixed(2)}%</p>
        <img src="https://i.imgur.com/kfWS531.png"></img>
        <p>{(valToUse.grenadeKills / valToUse2.killsAvg * 100).toFixed(2)}%</p>
        <img src="https://i.imgur.com/wWewGps.png"></img>
        <p>{(valToUse.abilityKills / valToUse2.killsAvg * 100).toFixed(2)}%</p>
        <img src="https://i.imgur.com/EbvqkPc.png"></img>
        <p>{(valToUse.superKills / valToUse2.killsAvg * 100).toFixed(2)}%</p>
      </div>
    </section>
  )
}

export default PopularCombos
