import React from 'react'
import manifest from './manifest';


function PopularCombos(props) {
  if(props[0] === undefined) {
    return null;
  }
  
  let valToUse;
  let valToUse2;

  for(let val in props) {
    if(props[val].allHashes != null && props[val].allHashes.length === 2) {
      // console.log("=== 2", props[val])
      valToUse = props[val];
      break;
    }
  }

  for(let val in props) {
    if(props[val].allHashes != null && props[val].allHashes.length === 3) {
      // console.log("=== 3", props[val])
      valToUse2 = props[val];
      break;
    }
  }


  let duoKeyOne = valToUse.allHashes[0];
  let duoKeyTwo = valToUse.allHashes[1];
  let duoObj = {
    [duoKeyOne]: valToUse.allKills[0][0] + valToUse.allKills[1][0],
    [duoKeyTwo]: valToUse.allKills[0][1] + valToUse.allKills[1][1]
  };

  let trioKeyOne = valToUse2.allHashes[0];
  let trioKeyTwo = valToUse2.allHashes[1];
  let trioKeyThree = valToUse2.allHashes[2];
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
    trioObj[u] = (trioObj[toBecomePercent] / percentNum) * 100;
    u++
  })

  // console.log(trioObj)




  let keysToAverage = Object.keys(duoObj);
  let duoDividerNum = valToUse.allKills.length;

  keysToAverage.forEach(toBeAveraged => {
    duoObj[toBeAveraged] = duoObj[toBeAveraged] / duoDividerNum;
  })
  let i = 0;
  keysToAverage.forEach(toBecomePercent => {
    let percentNum = duoObj[keysToAverage[0]] + duoObj[keysToAverage[1]];
    duoObj[i] = (duoObj[toBecomePercent] / percentNum) * 100;
    i++
  })
  
  // console.log(duoObj)



  return(
    <section className="popWeaponContainer">  
      <div className="popDuoContainer">
        <div id="twoweppop1" className="pnpBoxes">wep name: {manifest[keysToAverage[1]].weaponName}, wep kills: {duoObj[1].toFixed(2)}%
          <img src={"https://www.bungie.net" + manifest[keysToAverage[1]].weaponIcon} alt="popularDuoWep1"></img>
        </div>
        <div id="twoweppop2" className="pnpBoxes">wep name: {manifest[keysToAverage[0]].weaponName}, wep kills: {duoObj[0].toFixed(2)}%
          <img src={"https://www.bungie.net" + manifest[keysToAverage[0]].weaponIcon} alt="popularDuoWep2"></img>
        </div>
      </div>

      <div className="trioPopContainer">
        <div id="threeweppop1" className="pnpBoxes">wep name: {manifest[trioKeysToAv[0]].weaponName}, wep kills: {trioObj[0].toFixed(2)}%
          <img src={"https://www.bungie.net" + manifest[trioKeysToAv[0]].weaponIcon} alt="popularTrioWep1"></img>
        </div>
        <div id="threeweppop2" className="pnpBoxes">wep name: {manifest[trioKeysToAv[1]].weaponName}, wep kills: {trioObj[1].toFixed(2)}%
          <img src={"https://www.bungie.net" + manifest[trioKeysToAv[1]].weaponIcon} alt="popularTrioWep2"></img>
        </div>
        <div id="threeweppop3" className="pnpBoxes">wep name: {manifest[trioKeysToAv[2]].weaponName}, wep kills: {trioObj[2].toFixed(2)}%
          <img src={"https://www.bungie.net" + manifest[trioKeysToAv[2]].weaponIcon} alt="popularTrioWep3"></img>
        </div>
      </div>
    </section>
  )
}

export default PopularCombos
