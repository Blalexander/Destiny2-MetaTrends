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


  let valAllHashes = valToUse.allHashes;
  let valAllKills = valToUse.allKills;

  let duoObj = {
    [valAllHashes[0][0]]: valAllKills[0][0] + valAllKills[1][0],
    [valAllHashes[0][1]]: valAllKills[0][1] + valAllKills[1][1]
  };

  let keysToAverage = Object.keys(duoObj)
  let keysToIdentify = keysToAverage.map(randomKey => {
    return manifest[randomKey].itemCategories[0]
  })

  let duoDividerNum = valAllKills.length;

  keysToAverage.forEach(toBeAveraged => {
    duoObj[toBeAveraged] = duoObj[toBeAveraged] / duoDividerNum;
  })
  let i = 0;
  keysToAverage.forEach(toBecomePercent => {
    let percentNum = duoObj[keysToAverage[0]] + duoObj[keysToAverage[1]];
    duoObj[i] = (duoObj[toBecomePercent] / valToUse.killsAvg) * 100;
    i++
  })
  
  let newArr = [0, 0, 0, 0, 0, 0];
  let barArr = [0, 0, 0, 0, 0, 0];

  keysToAverage.forEach((eachKey, index) => {
    if(keysToIdentify[index] === 2) {
      barArr.splice(0, 1, duoObj[index])
      return newArr.splice(0, 1, eachKey)
    }
    else if(keysToIdentify[index] === 3) {
      barArr.splice(1, 1, duoObj[index])
      return newArr.splice(1, 1, eachKey)
    }
    else if(keysToIdentify[index] === 4) {
      barArr.splice(2, 1, duoObj[index])
      return newArr.splice(2, 1, eachKey)
    }
  })

  console.log(duoObj, keysToAverage, keysToIdentify, newArr, barArr)



  let valAllHashes2 = valToUse2.allHashes;
  let valAllKills2 = valToUse2.allKills;

  let trioObj = {
    [valAllHashes2[0][0]]: 0,
    [valAllHashes2[0][1]]: 0,
    [valAllHashes2[0][2]]: 0
  };

  valAllKills2.forEach((eachRound, index) => {
    trioObj[valAllHashes2[0][0]] += valAllKills2[index][0];
    trioObj[valAllHashes2[0][1]] += valAllKills2[index][1];
    trioObj[valAllHashes2[0][2]] += valAllKills2[index][2];
  })

  let trioKeysToAv = Object.keys(trioObj);
  let trioDividerNum = valAllKills2.length;

  trioKeysToAv.forEach(toBeAveraged => {
    trioObj[toBeAveraged] = trioObj[toBeAveraged] / trioDividerNum;
  })
  let keysToIdentify2 = trioKeysToAv.map(randomKey => {
    return manifest[randomKey].itemCategories[0]
  })
  let u = 0;
  trioKeysToAv.forEach(toBecomePercent => {
    let percentNum = trioObj[trioKeysToAv[0]] + trioObj[trioKeysToAv[1]] + trioObj[trioKeysToAv[2]];
    trioObj[u] = (trioObj[toBecomePercent] / valToUse2.killsAvg) * 100;
    u++
  })

  let newArr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let barArr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  trioKeysToAv.forEach((eachKey, index) => {
    if(keysToIdentify2[index] === 2) {
      barArr2.splice(0, 1, trioObj[index])
      return newArr2.splice(0, 1, eachKey)
    }
    else if(keysToIdentify2[index] === 3) {
      barArr2.splice(1, 1, trioObj[index])
      return newArr2.splice(1, 1, eachKey)
    }
    else if(keysToIdentify2[index] === 4) {
      barArr2.splice(2, 1, trioObj[index])
      return newArr2.splice(2, 1, eachKey)
    }
  })

  console.log(trioObj, "trioKeysToAv: ", trioKeysToAv, "keysToIdentify2: ", keysToIdentify2, newArr2, barArr2)



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

  function WeaponSorter(o) {
    let keyToUse = o.o;
    let indexToUse = o.k;
    console.log(keyToUse, indexToUse)

    if(keyToUse === 0) {
      return (<div className="blankWepBox"><div className="blankWepIcon"></div><div className="blankWepName"></div></div>)
    }

    else if(indexToUse === 0) { 
      return (<div id="twoweppop1" className={"pnpBoxes " + keyToUse}>
        <img src={"https://www.bungie.net" + manifest[keyToUse].weaponIcon} alt="popularDuoWep1"></img>
        <h3 className="weaponName">{manifest[keyToUse].weaponName}</h3>   
        <div className="statBarContainer">
          <p className="statBars" style={{width: barArr[0] + "%"}}>{barArr[0].toFixed(0)}%</p>
          <p className="negStatBars" style={{width: (100 - barArr[0] + "%")}}></p>
        </div>    
        </div>
      );
    }

    else if(indexToUse === 1) {
      return ("afterend", <div id="twoweppop2" className={"pnpBoxes " + keyToUse}>
        <img src={"https://www.bungie.net" + manifest[keyToUse].weaponIcon} alt="popularDuoWep2"></img>
        <h3 className="weaponName">{manifest[keyToUse].weaponName}</h3>  
        <div className="statBarContainer">
          <p className="statBars" style={{width: barArr[1] + "%"}}>{barArr[1].toFixed(0)}%</p>
          <p className="negStatBars" style={{width: (100 - barArr[1] + "%")}}></p>
        </div>        
        </div>
      )
    }

    else if(indexToUse === 2) {
      return (<div id="twoweppop3" className={"pnpBoxes " + keyToUse}>
        <img src={"https://www.bungie.net" + manifest[keyToUse].weaponIcon} alt="popularDuoWep2"></img>
        <h3 className="weaponName">{manifest[keyToUse].weaponName}</h3>
        <div className="statBarContainer">
          <p className="statBars" style={{width: barArr[2] + "%"}}>{barArr[2].toFixed(0)}%</p>
          <p className="negStatBars" style={{width: (100 - barArr[2] + "%")}}></p>
        </div>         
        </div>
      )
    }
  }

  function WeaponSorter2(o) {
    let keyToUse = o.o;
    let indexToUse = o.k;
    console.log(keyToUse, indexToUse)

    if(keyToUse === 0) {
      return (<div className="blankWepBox"><div className="blankWepIcon"></div><div className="blankWepName"></div></div>)
    }

    else if(indexToUse === 0) { 
    return (<div id="threeweppop1" className={"pnpBoxes " + keyToUse}>
      <img src={"https://www.bungie.net" + manifest[keyToUse].weaponIcon} alt="popularTrioWep1"></img>
      <h3 className="weaponName">{manifest[keyToUse].weaponName}</h3>
      <div className="statBarContainer">
        <p className="statBars" style={{width: barArr2[0] + "%"}}>{barArr2[0].toFixed(0)}%</p>
        <p className="negStatBars" style={{width: (100 - barArr2[0]) + "%"}}></p>
      </div>   
      </div>
      );
    }

    else if(indexToUse === 1) {
      return (<div id="threeweppop2" className="pnpBoxes">
      <img src={"https://www.bungie.net" + manifest[keyToUse].weaponIcon} alt="popularTrioWep2"></img>
      <h3 className="weaponName">{manifest[keyToUse].weaponName}</h3>
      <div className="statBarContainer">
        <p className="statBars" style={{width: barArr2[1] + "%"}}>{barArr2[1].toFixed(0)}%</p>
        <p className="negStatBars" style={{width: (100 - barArr2[1]) + "%"}}></p>
      </div> 
      </div>
      )
    }

    else if(indexToUse === 2) {
      return (<div id="threeweppop3" className="pnpBoxes">
      <img src={"https://www.bungie.net" + manifest[keyToUse].weaponIcon} alt="popularTrioWep3"></img>
      <h3 className="weaponName">{manifest[keyToUse].weaponName}</h3>
      <div className="statBarContainer">
        <p className="statBars" style={{width: barArr2[2] + "%"}}>{barArr2[2].toFixed(0)}%</p>
        <p className="negStatBars" style={{width: (100 - barArr2[2] + "%")}}></p>
      </div> 
      </div>
      )
    }
  }

  // function StatBarCreator(iconToUse, numToUse, numAv) {
  //   console.log(iconToUse, numToUse, numAv)

  //   return(
  //   <div className="statBarContainer">
  //     <img className="statIcons" src={iconToUse} alt="statIcons"></img>
  //     <p className="statsToDisplay">{(numToUse / numAv * 100).toFixed(2)}%</p>
  //   </div>
  //   )
  // }



  return(
    <section className="popWeaponContainer">  
      <div id="popDuoContainer" onMouseOver={e => displayMouseOverStats(keysToAverage[1], keysToAverage[0], e)}>
        <WeaponSorter o={newArr[0]} k={0} />
        <WeaponSorter o={newArr[1]} k={1} />
        <WeaponSorter o={newArr[2]} k={2} />

        <img className="pnpWepIcon melees" src="https://i.imgur.com/dczT76m.png"></img>
        <div className="statBarContainer">
          <p className="statBars" style={{width: (valToUse.meleeKills / valToUse.killsAvg) * 100 + "%"}}>{(valToUse.meleeKills / valToUse.killsAvg * 100).toFixed(0)}%</p>
          <p className="negStatBars" style={{width: (1 - (valToUse.meleeKills / valToUse.killsAvg)) * 100 + "%"}}></p>
        </div>
        <img className="pnpWepIcon grenades" src="https://i.imgur.com/kfWS531.png"></img>
        <div className="statBarContainer">
          <p className="statBars" style={{width: (valToUse.grenadeKills / valToUse.killsAvg) * 100 + "%"}}>{(valToUse.grenadeKills / valToUse.killsAvg * 100).toFixed(0)}%</p>
          <p className="negStatBars" style={{width: (1 - (valToUse.grenadeKills / valToUse.killsAvg)) * 100 + "%"}}></p>
        </div>
        <img className="pnpWepIcon supers" src="https://i.imgur.com/EbvqkPc.png"></img>
        <div className="statBarContainer">
          <p className="statBars" style={{width: (valToUse.superKills / valToUse.killsAvg) * 100 + "%"}}>{(valToUse.superKills / valToUse.killsAvg * 100).toFixed(0)}%</p>
          <p className="negStatBars" style={{width: (1 - (valToUse.superKills / valToUse.killsAvg)) * 100 + "%"}}></p>
        </div>

      </div>

      <div className="trioPopContainer" onMouseOver={e => displayMouseOverStatsTrio(trioKeysToAv[0], trioKeysToAv[1], trioKeysToAv[2], e)}>
        <WeaponSorter2 o={newArr2[0]} k={0} />
        <WeaponSorter2 o={newArr2[1]} k={1} />
        <WeaponSorter2 o={newArr2[2]} k={2} />

        <img className="pnpWepIcon melees" src="https://i.imgur.com/dczT76m.png"></img>
        <div className="statBarContainer">
          <p className="statBars" style={{width: (valToUse2.meleeKills / valToUse2.killsAvg) * 100 + "%"}}>{(valToUse2.meleeKills / valToUse2.killsAvg * 100).toFixed(0)}%</p>
          <p className="negStatBars" style={{width: (1 - (valToUse2.meleeKills / valToUse2.killsAvg)) * 100 + "%"}}></p>
        </div>
        <img className="pnpWepIcon grenades" src="https://i.imgur.com/kfWS531.png"></img>
        <div className="statBarContainer">
          <p className="statBars" style={{width: (valToUse2.grenadeKills / valToUse2.killsAvg) * 100 + "%"}}>{(valToUse2.grenadeKills / valToUse2.killsAvg * 100).toFixed(0)}%</p>
          <p className="negStatBars" style={{width: (1 - (valToUse2.grenadeKills / valToUse2.killsAvg)) * 100 + "%"}}></p>
        </div>
        <img className="pnpWepIcon supers" src="https://i.imgur.com/EbvqkPc.png"></img>
        <div className="statBarContainer">
          <p className="statBars supers" style={{width: (valToUse2.superKills / valToUse2.killsAvg) * 100 + "%"}}>{(valToUse2.superKills / valToUse2.killsAvg * 100).toFixed(0)}%</p>
          <p className="negStatBars" style={{width: (1 - (valToUse2.superKills / valToUse2.killsAvg)) * 100 + "%"}}></p>
        </div>
      </div>
    </section>
  )
}

export default PopularCombos
