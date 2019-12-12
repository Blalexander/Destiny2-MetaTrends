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
  const [popularPartners, setPopularPartners] = useState('');
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


  function PowerfulCombos(createEachPartner) {
    let emptyArrg = [];
    for(let i = 0; i < powerfulPartners.length; i++) {
      if(powerfulPartners[i].allHashes[0].length === 2) {
        emptyArrg.push(powerfulPartners[i])
      }
    }

    let highest = emptyArrg.sort((a, b) => 
      b.effAvg - a.effAvg
    ).slice(0,3)

    console.log("Highest: ", highest)

    if(createEachPartner != undefined) {
      let powPartStep1 = emptyArrg.map((eachPart) => {
        let keyVal = eachPart.allHashes[0][0] == selectedHash ? eachPart.allHashes[0][1] : eachPart.allHashes[0][0];
        return(<PartConstructor1 key={keyVal} value={props[keyVal]} />)
      })

      return (
        <div className="all-powerful-partners">{powPartStep1}</div>
      )
    }
  }

  function PartConstructor1(powPartsStep2) {
    // console.log(popPartsStep2)
    return (
      <div className="pow-weapon">
        <h3 className="pow-wep-name">{powPartsStep2.value.weaponName}</h3>
        <img src={"https://www.bungie.net" + powPartsStep2.value.weaponIcon} className="pow-wep-icon" alt="pow-wep-icon"></img>
        <h4 className="pow-wep-type">{powPartsStep2.value.weaponType}</h4>
      </div>
    )
  }

  function PopularCombos(createEachPartner) {
    let emptyArr = [];
    for(let i = 0; i < popularPartners.length; i++)  {  
      if(emptyArr.length === 3) {
        i = popularPartners.length
      }
      else if(popularPartners[i].allHashes[0].length === 2) {   
        emptyArr.push(popularPartners[i])
      }
    }
    console.log(emptyArr)

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


  return (
    <section
      id="pnp-container"
      className="pnp-container"
    >
      <div className="powerful-combinations">
        <PowerfulCombos {...powerfulPartners} />
      </div>

      <div className="current-weapon">
        <h3 className="selected-name">{selectedWeapon.weaponName}</h3>
        <img src={"https://www.bungie.net" + selectedWeapon.weaponIcon} className="selected-icon" alt="selected-icon"></img>
        <h4 className="selected-type">{selectedWeapon.weaponType}</h4>
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