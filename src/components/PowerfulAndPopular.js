import React, { useState, useEffect } from "react";
// import PowerfulCombos from './PowerfulCombos';
// import PopularCombos from './PopularCombos';

function PowerfulAndPopular(props) {
  if (props[0] === undefined) {
    return null;
  }

  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedHash, setSelectedHash] = useState('');
  const [powerfulPartners, setPowerfulPartners] = useState('');
  const [revisedPowerfulPartners, setRevisedPowerfulPartners] = useState('');
  const [popularPartners, setPopularPartners] = useState('');
  const [partnerStats, setPartnerStats] = useState('');
  // let emptyArr = [];


  props = props[8];
  // console.log(props)

  let nameIconTypeContainer = {};
  for (let eachWep in props) {
    if (eachWep != "socketDefs" && eachWep != "statDefs") {
      nameIconTypeContainer[eachWep] = {
        name: props[eachWep].weaponName,
        icon: props[eachWep].weaponIcon,
        type: props[eachWep].weaponType,
        hash: eachWep
      };
    }
  }
  // console.log(nameIconTypeContainer);

  function ListItemConstructor(listItem) {
    if(listItem.value === undefined) {
      return (
        <option className="eachListItem" value="Change Weapon">
          Change Weapon
        </option>
      );
    }
    else {
      return (
        <option className="eachListItem" value={listItem.value.hash}>
          {listItem.value.name}
        </option>
      );
    } 
  }

  function SelectedWep(wepShortcuts) {
    let listItemArray = Object.keys(wepShortcuts);
    listItemArray.unshift("Change Weapon")
    let weaponList = listItemArray.map(wepId => (
      <ListItemConstructor key={wepId} value={wepShortcuts[wepId]} />
    ));

    return (
      <select
        className="dropdownSelector"
        onChange={e => fetchWeaponPartners(e.target.value)}
      >
        {weaponList}
      </select>
    );
  }


  const fetchWeaponPartners = async findMyPartners => {
    setSelectedWeapon(props[findMyPartners]);
    setSelectedHash(findMyPartners);

    const result = await fetch(
      `http://localhost:8080/bungie/combinations?hash=${findMyPartners}`
    ).then(res => {
      return res.json();
    })

    console.log("RESSUUULLLTTTT: ", result);
    setPopularPartners(result);
    setPowerfulPartners(result);
  };

  let emptyArrg = [];

  function PowerfulCombos(createEachPartner) {
    // let emptyArrg = [];
    let hashesUsed = [];
    for(let i = 0; i < powerfulPartners.length; i++) {
      if(powerfulPartners[i].allHashes[0].length === 2) {
        let uniqueHash = powerfulPartners[i].allHashes[0][0] == selectedHash ? powerfulPartners[i].allHashes[0][1] : powerfulPartners[i].allHashes[0][0];

        if(hashesUsed.includes(uniqueHash)) {
          let preexistingIndex = hashesUsed.findIndex(currentIndex => {
            return currentIndex === uniqueHash
          })

          if(emptyArrg[preexistingIndex].duplicateCounter === undefined && powerfulPartners[i].accountedFor != "true") {
            emptyArrg[preexistingIndex].duplicateCounter = 0;
            console.log(powerfulPartners[i], i)
          }
          else if(emptyArrg[preexistingIndex].duplicateCounter && powerfulPartners[i].accountedFor != "true") {
            emptyArrg[preexistingIndex].duplicateCounter++;
            console.log(powerfulPartners[i], i)
          }

          for(let eachStat in emptyArrg[preexistingIndex]) {
            if(eachStat != "_id" && eachStat != "allHashes" && eachStat != "allKills" && eachStat != "duplicateCounter" && powerfulPartners[i].accountedFor != "true") {
              emptyArrg[preexistingIndex][eachStat] += powerfulPartners[i][eachStat];
            }
          }

          if(powerfulPartners[i].accountedFor === undefined) {
            powerfulPartners[i].accountedFor = "true"
          }
        }
        else if(!hashesUsed.includes(uniqueHash)) {
          emptyArrg.push(powerfulPartners[i])
          hashesUsed.push(uniqueHash)
        }
      }
    }

    let highest = emptyArrg.sort((a, b) => 
      b.effAvg - a.effAvg
    )


    console.log("Highest: ", highest)

    if(createEachPartner != undefined) {
      let powPartStep1 = highest.map((eachPart) => {
        let keyVal = eachPart.allHashes[0][0] == selectedHash ? eachPart.allHashes[0][1] : eachPart.allHashes[0][0];
        return(<PartConstructor1 key={keyVal} value={props[keyVal]} />)
      })

      return (
        <div className="all-powerful-partners">{powPartStep1}</div>
      )
    }
  }

  function testThisn(testE) {
    console.log(testE.target.value)
    emptyArrg.forEach((eachPowPartner) => {
      // console.log(eachPowPartner._id, testE.target.value)
      if(eachPowPartner._id[0] == testE.target.value || eachPowPartner._id[1] == testE.target.value) {
        // console.log(eachPowPartner)
        setPartnerStats(eachPowPartner)
        // console.log(partnerStats)
      }
    })
  }

  function PartConstructor1(powPartsStep2) {
    // console.log(powPartsStep2)
    return (
      <button className="pow-weapon" value={powPartsStep2.value.weaponHash} onClick={e => testThisn(e)}>
        <h3 className="pow-wep-name">{powPartsStep2.value.weaponName}</h3>
        <img src={"https://www.bungie.net" + powPartsStep2.value.weaponIcon} className="pow-wep-icon" alt="pow-wep-icon"></img>
        <h4 className="pow-wep-type">{powPartsStep2.value.weaponType}</h4>
      </button>
    )
  }

  function PopularCombos(createEachPartner) {
    let emptyArr = [];
    let hashesUsed = [];
    for(let i = 0; i < popularPartners.length; i++)  {  
      if(popularPartners[i].allHashes[0].length === 2) { 
        let uniqueHash = popularPartners[i].allHashes[0][0] == selectedHash ? popularPartners[i].allHashes[0][1] : popularPartners[i].allHashes[0][0];

        if(hashesUsed.includes(uniqueHash)) {
          let preexistingIndex = hashesUsed.findIndex(currentIndex => {
            return currentIndex === uniqueHash
          })
          // console.log("FOUND ONE!", "i = ", i, uniqueHash, preexistingIndex)

          if(emptyArr[preexistingIndex].duplicateCounter === undefined && popularPartners[i].accountedFor != "true") {
            emptyArr[preexistingIndex].duplicateCounter = 0;
            console.log(popularPartners[i], i)
          }
          else if(emptyArr[preexistingIndex].duplicateCounter && popularPartners[i].accountedFor != "true") {
            emptyArr[preexistingIndex].duplicateCounter++;
            console.log(popularPartners[i], i)
          }

          for(let eachStat in emptyArr[preexistingIndex]) {
            if(eachStat != "_id" && eachStat != "allHashes" && eachStat != "allKills" && eachStat != "duplicateCounter" && popularPartners[i].accountedFor != "true") {
              // console.log(eachStat, emptyArr[preexistingIndex][eachStat], popularPartners[i][eachStat])
              emptyArr[preexistingIndex][eachStat] += popularPartners[i][eachStat];
            }
          }

          if(popularPartners[i].accountedFor === undefined) {
            popularPartners[i].accountedFor = "true"
          }
        }
        else if(!hashesUsed.includes(uniqueHash)) {
          emptyArr.push(popularPartners[i])
          hashesUsed.push(uniqueHash)
        }
      }
    }

    let namesUsed = hashesUsed.map(eachHash => {
      return props[eachHash].weaponName
    })
    console.log(emptyArr, popularPartners, hashesUsed, namesUsed)

    if(createEachPartner != undefined) {
      let popPartStep1 = emptyArr.map((eachPart) => {
        let keyVal = eachPart.allHashes[0][0] == selectedHash ? eachPart.allHashes[0][1] : eachPart.allHashes[0][0];
        return(<PartConstructor2 key={keyVal} value={props[keyVal]} />)
      })

      return (
        <div className="all-popular-partners">{popPartStep1}</div>
      )
    }
  }

  function PartConstructor2(popPartsStep2) {
    // console.log(popPartsStep2)
    return (
      <div className="pop-weapon">
        <h3 className="pop-wep-name">{popPartsStep2.value.weaponName}</h3>
        <img src={"https://www.bungie.net" + popPartsStep2.value.weaponIcon} className="pop-wep-icon" alt="pop-wep-icon"></img>
        <h4 className="pop-wep-type">{popPartsStep2.value.weaponType}</h4>
      </div>
    )
  }

  


  //NEXT STEP is to visually display stats for both weps when other wep is clicked
  return (
    <section
      id="pnp-container"
      className="pnp-container"
    >
      <div className="powerful-combinations">
        <PowerfulCombos {...powerfulPartners} />
      </div>

      <div className="current-combination">
        <div className="current-weapon">
          <h3 className="selected-name">{selectedWeapon.weaponName}</h3>
          <img src={"https://www.bungie.net" + selectedWeapon.weaponIcon} className="selected-icon" alt="selected-icon"></img>
          <h4 className="selected-type">{selectedWeapon.weaponType}</h4>
        </div>
        <div className="current-stats">
          <h3 className="current-stats-label">Combined stats: </h3>
          <p className="current-oppDef">Opponents Defeated: {partnerStats.oppDefAvg}</p>
          <p className="current-kills">Kills: {partnerStats.killsAvg}</p>
          <p className="current-assists">Assists: {partnerStats.assistsAvg}</p>
          <p className="current-deaths">Deaths: {partnerStats.deathsAvg}</p>
          <p className="current-kda">KDA: {(partnerStats.killsAvg + partnerStats.assistsAvg) / partnerStats.deathsAvg}</p>
          <p className="current-eff">Efficiency: {partnerStats.effAvg}</p>
          <p className="current-avpkill">Points per Kill: {partnerStats.perKAvg}</p>
          <p className="current-avplife">Points per Life: {partnerStats.perLAvg}</p>
          <p className="current-score">Score: {partnerStats.scoreAvg}</p>

        </div>
      </div>

      <div className="weapon-searcher">
        <form className="click-to-search">
          <SelectedWep {...nameIconTypeContainer} />
        </form>
      </div>

      <div className="popular-combinations">
        <PopularCombos {...popularPartners} />
      </div>
    </section>
  );
}

export default PowerfulAndPopular;