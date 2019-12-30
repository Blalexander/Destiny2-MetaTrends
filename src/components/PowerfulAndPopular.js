import React, { useState, useEffect } from "react";
// import PowerfulCombos from './PowerfulCombos';
// import PopularCombos from './PopularCombos';
import MakeMyStatBars from './MakeMyStatBars';

function PowerfulAndPopular(props) {
  if(props.value === "") {
    return null;
  }

  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedHash, setSelectedHash] = useState('');
  const [unrefinedPartnerData, setUnrefinedPartnerData] = useState('');
  const [partnerStats, setPartnerStats] = useState('');
  let sortedPopCombos = [];
  let sortedPowCombos = [];

  let manifestDefs = props.manifest;
  let averages = props.averages;


  useEffect(() => {
    const fetchWeaponPartners = async findMyPartners => {
      setSelectedWeapon(manifestDefs[findMyPartners]);
      setSelectedHash(findMyPartners);
  
      const result = await fetch(
        `http://localhost:8080/bungie/combinations?hash=${findMyPartners}`
      ).then(res => {
        return res.json();
      })
  
      // console.log("RESSUUULLLTTTT: ", result);
      setUnrefinedPartnerData(result);
    };

    fetchWeaponPartners(props.value);
  }, [props])


  function PowerfulCombos(createEachPartner) {
    // let sortedPowCombos = [];
    let hashesUsed = [];
    for(let i = 0; i < unrefinedPartnerData.length; i++) {
      if(unrefinedPartnerData[i].allHashes[0].length === 2) {
        let uniqueHash = unrefinedPartnerData[i].allHashes[0][0] == selectedHash ? unrefinedPartnerData[i].allHashes[0][1] : unrefinedPartnerData[i].allHashes[0][0];

        if(hashesUsed.includes(uniqueHash)) {
          let preexistingIndex = hashesUsed.findIndex(currentIndex => {
            return currentIndex === uniqueHash
          })

          if(sortedPowCombos[preexistingIndex].duplicateCounter === undefined && unrefinedPartnerData[i].accountedFor != "true") {
            sortedPowCombos[preexistingIndex].duplicateCounter = 0;
            // console.log(unrefinedPartnerData[i], i)
          }
          else if(sortedPowCombos[preexistingIndex].duplicateCounter && unrefinedPartnerData[i].accountedFor != "true") {
            sortedPowCombos[preexistingIndex].duplicateCounter++;
            // console.log(unrefinedPartnerData[i], i)
          }

          for(let eachStat in sortedPowCombos[preexistingIndex]) {
            if(eachStat != "_id" && eachStat != "allHashes" && eachStat != "allKills" && eachStat != "duplicateCounter" && unrefinedPartnerData[i].accountedFor != "true") {
              sortedPowCombos[preexistingIndex][eachStat] += unrefinedPartnerData[i][eachStat];
            }
          }

          if(unrefinedPartnerData[i].accountedFor === undefined) {
            unrefinedPartnerData[i].accountedFor = "true"
          }
        }
        else if(!hashesUsed.includes(uniqueHash)) {
          sortedPowCombos.push(unrefinedPartnerData[i])
          hashesUsed.push(uniqueHash)
        }
      }
    }

    let highest = sortedPowCombos.sort((a, b) => 
      b.effAvg - a.effAvg
    )


    // console.log("Highest: ", highest)

    if(createEachPartner != undefined) {
      let powPartStep1 = highest.map((eachPart) => {
        let keyVal = eachPart.allHashes[0][0] == selectedHash ? eachPart.allHashes[0][1] : eachPart.allHashes[0][0];
        return(<PartConstructor1 key={keyVal} value={manifestDefs[keyVal]} />)
      })

      return (
        <div className="all-powerful-partners">{powPartStep1}</div>
      )
    }
  }

  function displayCombinationStats(clickableWeaponHash) {
    // console.log(clickableWeaponHash.target.value)
    sortedPowCombos.forEach((eachPowPartner) => {
      if(eachPowPartner._id[0] == clickableWeaponHash.target.value || eachPowPartner._id[1] == clickableWeaponHash.target.value) {
        setPartnerStats(eachPowPartner)
      }
    })
  }

  function PartConstructor1(powPartsStep2) {
    // console.log(powPartsStep2)
    return (
      <button className="pow-weapon" value={powPartsStep2.value.weaponHash} onClick={e => displayCombinationStats(e)}>
        <h3 className="pow-wep-name">{powPartsStep2.value.weaponName}</h3>
        <img src={"https://www.bungie.net" + powPartsStep2.value.weaponIcon} className="pow-wep-icon" alt="pow-wep-icon"></img>
        <h4 className="pow-wep-type">{powPartsStep2.value.weaponType}</h4>
      </button>
    )
  }

  function PopularCombos(createEachPartner) {
    let hashesUsed = [];
    for(let i = 0; i < unrefinedPartnerData.length; i++)  {  
      if(unrefinedPartnerData[i].allHashes[0].length === 2) { 
        let uniqueHash = unrefinedPartnerData[i].allHashes[0][0] == selectedHash ? unrefinedPartnerData[i].allHashes[0][1] : unrefinedPartnerData[i].allHashes[0][0];

        if(hashesUsed.includes(uniqueHash)) {
          let preexistingIndex = hashesUsed.findIndex(currentIndex => {
            return currentIndex === uniqueHash
          })
          // console.log("FOUND ONE!", "i = ", i, uniqueHash, preexistingIndex)

          if(sortedPopCombos[preexistingIndex].duplicateCounter === undefined && unrefinedPartnerData[i].accountedFor != "true") {
            sortedPopCombos[preexistingIndex].duplicateCounter = 0;
            console.log(unrefinedPartnerData[i], i)
          }
          else if(sortedPopCombos[preexistingIndex].duplicateCounter && unrefinedPartnerData[i].accountedFor != "true") {
            sortedPopCombos[preexistingIndex].duplicateCounter++;
            console.log(unrefinedPartnerData[i], i)
          }

          for(let eachStat in sortedPopCombos[preexistingIndex]) {
            if(eachStat != "_id" && eachStat != "allHashes" && eachStat != "allKills" && eachStat != "duplicateCounter" && unrefinedPartnerData[i].accountedFor != "true") {
              // console.log(eachStat, sortedPopCombos[preexistingIndex][eachStat], unrefinedPartnerData[i][eachStat])
              sortedPopCombos[preexistingIndex][eachStat] += unrefinedPartnerData[i][eachStat];
            }
          }

          if(unrefinedPartnerData[i].accountedFor === undefined) {
            unrefinedPartnerData[i].accountedFor = "true"
          }
        }
        else if(!hashesUsed.includes(uniqueHash)) {
          sortedPopCombos.push(unrefinedPartnerData[i])
          hashesUsed.push(uniqueHash)
        }
      }
    }

    let namesUsed = hashesUsed.map(eachHash => {
      return manifestDefs[eachHash].weaponName
    })
    // console.log(sortedPopCombos, unrefinedPartnerData, hashesUsed, namesUsed)

    if(createEachPartner != undefined) {
      let popPartStep1 = sortedPopCombos.map((eachPart) => {
        let keyVal = eachPart.allHashes[0][0] == selectedHash ? eachPart.allHashes[0][1] : eachPart.allHashes[0][0];
        return(<PartConstructor2 key={keyVal} value={manifestDefs[keyVal]} />)
      })

      return (
        <div className="all-popular-partners">{popPartStep1}</div>
      )
    }
  }

  function PartConstructor2(popPartsStep2) {
    // console.log(popPartsStep2)
    return (
      <button className="pop-weapon" value={popPartsStep2.value.weaponHash} onClick={e => displayCombinationStats(e)}>
        <h3 className="pop-wep-name">{popPartsStep2.value.weaponName}</h3>
        <img src={"https://www.bungie.net" + popPartsStep2.value.weaponIcon} className="pop-wep-icon" alt="pop-wep-icon"></img>
        <h4 className="pop-wep-type">{popPartsStep2.value.weaponType}</h4>
        <p className="pop-wep-count">{popPartsStep2.value.totalCount}</p>
      </button>
    )
  }



  function AllCurrentStats(statContainer) {
    console.log(statContainer)

    if(manifestDefs[selectedHash]) {
      let keysToMap = Object.keys(statContainer)

      let currentSingleOrDuoStats = keysToMap.map(eachKey => {
        // console.log(eachKey)
        if(eachKey != "_id" && eachKey != "totalCount" && eachKey != "allHashes" && eachKey != "allKills") {
          return(<MakeMyStatBars key={manifestDefs[selectedHash].weaponHash + eachKey} value={statContainer} stat={eachKey} mani={eachKey} avs={averages} type={manifestDefs[selectedHash].weaponType} />)
        }
        else {
          return(null)
        }
      })
      // if(manifestDefs[selectedHash] && Object.keys(statContainer).length > 0) {
      //   let newStatContainer = Object.keys(statContainer).length === 0 ? manifestDefs[selectedHash].playerPerformances : statContainer
      // }

      return(<div>{currentSingleOrDuoStats}</div>)
    }
    else {
      console.log("NULL")
      return(null)
    }
  }


  if(selectedWeapon != undefined) {
    return (
      <section
        id="pnp-container"
        className="pnp-container"
      >
        <div className="powerful-combinations">
          <PowerfulCombos {...unrefinedPartnerData} />
        </div>

        <div className="current-combination">
          <div className="current-weapon">
            <h3 className="selected-name">{selectedWeapon.weaponName}</h3>
            <img src={"https://www.bungie.net" + selectedWeapon.weaponIcon} className="selected-icon" alt="selected-icon"></img>
            <h4 className="selected-type">{selectedWeapon.weaponType}</h4>
          </div>
          <AllCurrentStats {...partnerStats} />
        </div>

        <div className="popular-combinations">
          <PopularCombos {...unrefinedPartnerData} />
        </div>
      </section>
    );
  }
  else {
    return (
      <section>Hello!</section>
    );
  }
}

export default PowerfulAndPopular;




// function AllCurrentStats(statContainer) {
//   console.log(Object.keys(statContainer), manifestDefs[selectedHash])

//   if(manifestDefs[selectedHash] && Object.keys(statContainer).length > 0) {
//     let newStatContainer = Object.keys(statContainer).length === 0 ? manifestDefs[selectedHash].playerPerformances : statContainer
    
//     return (
//       <div className="current-stats">
//         <h3 className="current-stats-label">{manifestDefs[selectedHash].weaponName + " "} stats: </h3>
//         <p className="current-oppDef">Opponents Defeated: {newStatContainer.oppDefAvg.toFixed(1)}</p>
//         <p className="current-kills">Kills: {newStatContainer.killsAvg.toFixed(1)}</p>
//         <p className="current-assists">Assists: {newStatContainer.assistsAvg.toFixed(1)}</p>
//         <p className="current-deaths">Deaths: {newStatContainer.deathsAvg.toFixed(1)}</p>
//         <p className="current-kda">KDA: {((newStatContainer.killsAvg + newStatContainer.assistsAvg) / newStatContainer.deathsAvg).toFixed(1)}</p>
//         <p className="current-eff">Efficiency: {newStatContainer.effAvg.toFixed(1)}</p>
//         <p className="current-avpkill">Points per Kill: {newStatContainer.perKAvg.toFixed(1)}</p>
//         <p className="current-avplife">Points per Life: {newStatContainer.perLAvg.toFixed(1)}</p>
//         <p className="current-score">Score: {newStatContainer.scoreAvg.toFixed(1)}</p>
//       </div>
//     )
//   }
//   else {
//     return null
//   }
// }