import React, { useState, useEffect } from "react";
// import PowerfulCombos from './PowerfulCombos';
// import PopularCombos from './PopularCombos';
import MakeMyStatBars from './MakeMyStatBars';
import {Pie} from 'react-chartjs-2';


function PowerfulAndPopular(props) {
  if(props.value === "") {
    return null;
  }

  // console.log(props)

  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedHash, setSelectedHash] = useState('');
  const [partnerHash, setPartnerHash] = useState('');
  const [unrefinedPartnerData, setUnrefinedPartnerData] = useState('');
  const [partnerStats, setPartnerStats] = useState('');
  let sortedPopCombos = [];
  let sortedPowCombos = [];

  let manifestDefs = props.manifest;
  let averages = props.averages;



  useEffect(() => {
    const fetchWeaponPartners = async findMyPartners => {
      console.log(findMyPartners)
      setSelectedWeapon(manifestDefs[findMyPartners]);
      setSelectedHash(findMyPartners);
  
      const result = await fetch(
        // `http://localhost:8080/bungie/combinations?hash=${findMyPartners}`
        `https://metatrendsserver.azurewebsites.net/bungie/combinations?hash=${findMyPartners}`
      ).then(res => {
        return res.json();
      })
  
      console.log("RESSUUULLLTTTT: ", result);
      setUnrefinedPartnerData(result);
      setPartnerStats(manifestDefs[props.value].playerPerformances)
    };

    fetchWeaponPartners(props.value);
  }, [])


  function PowerfulCombos(createEachPartner) {
    console.log(createEachPartner)
    // let sortedPowCombos = [];
    let hashesUsed = [];
    for(let i = 0; i < unrefinedPartnerData.length; i++) {
      if(unrefinedPartnerData[i].allHashes[0].length === 2) {
        let uniqueHash = unrefinedPartnerData[i].allHashes[0][0] === selectedHash ? unrefinedPartnerData[i].allHashes[0][1] : unrefinedPartnerData[i].allHashes[0][0];

        if(hashesUsed.includes(uniqueHash)) {
          let preexistingIndex = hashesUsed.findIndex(currentIndex => {
            return currentIndex === uniqueHash
          })

          if(sortedPowCombos[preexistingIndex].duplicateCounter === undefined && unrefinedPartnerData[i].accountedFor !== "true") {
            sortedPowCombos[preexistingIndex].duplicateCounter = 0;
            // console.log(unrefinedPartnerData[i], i)
          }
          else if(sortedPowCombos[preexistingIndex].duplicateCounter && unrefinedPartnerData[i].accountedFor !== "true") {
            sortedPowCombos[preexistingIndex].duplicateCounter++;
            // console.log(unrefinedPartnerData[i], i)
          }

          for(let eachStat in sortedPowCombos[preexistingIndex]) {
            if(eachStat !== "_id" && eachStat !== "allHashes" && eachStat !== "allKills" && eachStat !== "duplicateCounter" && unrefinedPartnerData[i].accountedFor !== "true") {
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

    if(createEachPartner !== undefined) {
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
    clickableWeaponHash.preventDefault();
    console.log(clickableWeaponHash.target.value, sortedPowCombos)
    if(partnerHash !== clickableWeaponHash.target.value) {
      setPartnerHash(clickableWeaponHash.target.value)
      sortedPowCombos.forEach((eachPowPartner) => {
        if(eachPowPartner._id[0] == clickableWeaponHash.target.value || eachPowPartner._id[1] == clickableWeaponHash.target.value) {
          console.log("worked", eachPowPartner)
          setPartnerStats(eachPowPartner)
        }
      })
    }
    else {
      console.log("closing display")
      setPartnerHash('')
      setPartnerStats(manifestDefs[selectedHash].playerPerformances)
    }
  }

  function PartConstructor1(powPartsStep2) {
    // console.log(powPartsStep2)
    return (
      <button className={"pow-weapon wepNameIconType t" + powPartsStep2.value.weaponTier} value={powPartsStep2.value.weaponHash} onClick={e => displayCombinationStats(e)}>
        <h3 className="pow-wep-name">{powPartsStep2.value.weaponName}</h3>
        <img src={"https://www.bungie.net" + powPartsStep2.value.weaponIcon} className="pow-wep-icon" alt="pow-wep-icon"></img>
        <h4 className="pow-wep-type">{powPartsStep2.value.weaponType}</h4>
      </button>
    )
  }

  function PopularCombos(createEachPartner) {
    console.log(createEachPartner)
    let hashesUsed = [];
    for(let i = 0; i < unrefinedPartnerData.length; i++)  {  
      if(unrefinedPartnerData[i].allHashes[0].length === 2) { 
        let uniqueHash = unrefinedPartnerData[i].allHashes[0][0] === selectedHash ? unrefinedPartnerData[i].allHashes[0][1] : unrefinedPartnerData[i].allHashes[0][0];

        if(hashesUsed.includes(uniqueHash)) {
          let preexistingIndex = hashesUsed.findIndex(currentIndex => {
            return currentIndex === uniqueHash
          })
          // console.log("FOUND ONE!", "i = ", i, uniqueHash, preexistingIndex)

          if(sortedPopCombos[preexistingIndex].duplicateCounter === undefined && unrefinedPartnerData[i].accountedFor !== "true") {
            sortedPopCombos[preexistingIndex].duplicateCounter = 0;
            console.log(unrefinedPartnerData[i], i)
          }
          else if(sortedPopCombos[preexistingIndex].duplicateCounter && unrefinedPartnerData[i].accountedFor !== "true") {
            sortedPopCombos[preexistingIndex].duplicateCounter++;
            console.log(unrefinedPartnerData[i], i)
          }

          for(let eachStat in sortedPopCombos[preexistingIndex]) {
            if(eachStat !== "_id" && eachStat !== "allHashes" && eachStat !== "allKills" && eachStat !== "duplicateCounter" && unrefinedPartnerData[i].accountedFor !== "true") {
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

    // let namesUsed = hashesUsed.map(eachHash => {
    //   return manifestDefs[eachHash].weaponName
    // })
    // console.log(sortedPopCombos, unrefinedPartnerData, hashesUsed, namesUsed)

    if(createEachPartner !== undefined) {
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
      <button className={"pop-weapon wepNameIconType t" + popPartsStep2.value.weaponTier} value={popPartsStep2.value.weaponHash} onClick={e => displayCombinationStats(e)}>
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
        if(eachKey !== "_id" && eachKey !== "totalCount" && eachKey !== "allHashes" && eachKey !== "allKills" && eachKey !== "oppDefAvg" && eachKey !== "grenadeKills" && eachKey !== "meleeKills" && eachKey !== "abilityKills" && eachKey !== "superKills" && eachKey !== "standingAvg" && eachKey !== "wepKillsAvg") {
          return(<MakeMyStatBars key={manifestDefs[selectedHash].weaponHash + eachKey} value={statContainer} stat={eachKey} mani={eachKey} avs={averages} type={manifestDefs[selectedHash].weaponType} />)
        }
        else {
          return(null)
        }
      })

      const chartData = {
        labels: ["Weapon Kills", "Melee Kills", "Grenade Kills", "Ability Kills", "Super Kills"],
        datasets: [{
          level:'population',
          data:[statContainer.wepKillsAvg, statContainer.grenadeKills, statContainer.meleeKills, statContainer.abilityKills, statContainer.superKills],
          backgroundColor: ['rgba(255, 255, 255, 0.2)', 'firebrick', 'mediumblue', 'royalblue', 'orange']
        }]
      }

      console.log("making the stats..")
      return(
        <div className="combo-and-pie-container">
          <div className="combo-stat-container">
            {currentSingleOrDuoStats}
          </div>
          <div className="pie-chart">
              <Pie
                data={chartData}
                width={150}
                height={100}
                options={{ maintainAspectRatio: false, legend: {display: false}, layout: {padding: {right: 50}}, responsive: true }}
              />
            </div>
        </div>)
    }
    else {
      console.log("messed up the stats")
      return(null)
    }
  }

  function PartnerToDisplay(displayMe) {
    console.log(displayMe.value)
    if(displayMe.value !== '') {
      return (
        <div className={"partner-to-display wepNameIconType t" + manifestDefs[displayMe.value].weaponTier}>
          <h3 className="selected-name">{manifestDefs[displayMe.value].weaponName}</h3>
          <img src={"https://www.bungie.net" + manifestDefs[displayMe.value].weaponIcon} className="selected-icon" alt="selected-icon"></img>
          <h4 className="selected-type">{manifestDefs[displayMe.value].weaponType}</h4>
        </div>
      )
    }
    else {
      return null
    }
  }


  if(selectedWeapon !== undefined) {
    return (
      <section
        id="pnp-container"
        className="pnp-container"
      >
        <div className="powerful-combinations">
          <h2 className="pow-combo-header">Powerful</h2>
          <PowerfulCombos {...unrefinedPartnerData} />
        </div>

        <div className="current-combination">
          <div className={"current-weapon wepNameIconType t" + selectedWeapon.weaponTier}>
            <h3 className="selected-name">{selectedWeapon.weaponName}</h3>
            <img src={"https://www.bungie.net" + selectedWeapon.weaponIcon} className="selected-icon" alt="selected-icon"></img>
            <h4 className="selected-type">{selectedWeapon.weaponType}</h4>
          </div>
          <PartnerToDisplay value={partnerHash} />
          <AllCurrentStats {...partnerStats} />
        </div>

        <div className="popular-combinations">
          <h2 className="pop-combo-header">Popular</h2>
          <PopularCombos {...unrefinedPartnerData} />
        </div>
      </section>
    );
  }
  else {
    return (
      <section>ERROR ERROR</section>
    );
  }
}

export default PowerfulAndPopular;