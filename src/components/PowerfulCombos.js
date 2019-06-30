import React from 'react';
import manifest from './manifest';


function PowerfulCombos(props) {
  let valToUse;
  let valToUse2;

  for(let val in props) {
    if(props[val].allHashes != null && props[val].allHashes.length === 2 && props[val].standingAvg < 0.5) {
      // console.log("=== 2", props[val])
      valToUse = props[val];
      break;
    }
  }

  for(let val in props) {
    if(props[val].allHashes != null && props[val].allHashes.length === 3 && props[val].standingAvg < 0.5) {
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
    <section className="powWeaponContainer">  
      <div className="powDuoContainer">
        <div id="twoweppow1" className="pnpBoxes">wep name: {manifest[keysToAverage[1]].weaponName}, wep kills: {duoObj[1].toFixed(2)}%
          <img src={"https://www.bungie.net" + manifest[keysToAverage[1]].weaponIcon} alt="powerfulDuoWep1"></img>
        </div>
        <div id="twoweppow2" className="pnpBoxes">wep name: {manifest[keysToAverage[0]].weaponName}, wep kills: {duoObj[0].toFixed(2)}%
          <img src={"https://www.bungie.net" + manifest[keysToAverage[0]].weaponIcon} alt="powerfulDuoWep2"></img>
        </div>
      </div>

      <div className="trioPowContainer">
        <div id="threeweppow1" className="pnpBoxes">wep name: {manifest[trioKeysToAv[0]].weaponName}, wep kills: {trioObj[0].toFixed(2)}%
          <img src={"https://www.bungie.net" + manifest[trioKeysToAv[0]].weaponIcon} alt="powerfulTrioWep1"></img>
        </div>
        <div id="threeweppow2" className="pnpBoxes">wep name: {manifest[trioKeysToAv[1]].weaponName}, wep kills: {trioObj[1].toFixed(2)}%
          <img src={"https://www.bungie.net" + manifest[trioKeysToAv[1]].weaponIcon} alt="powerfulTrioWep2"></img>
        </div>
        <div id="threeweppow3" className="pnpBoxes">wep name: {manifest[trioKeysToAv[2]].weaponName}, wep kills: {trioObj[2].toFixed(2)}%
          <img src={"https://www.bungie.net" + manifest[trioKeysToAv[2]].weaponIcon} alt="powerfulTrioWep3"></img>
        </div>
      </div>
    </section>
  )
}

export default PowerfulCombos
