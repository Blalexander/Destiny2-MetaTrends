import React, {  useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import Guardians from './Guardians';
import PowerfulAndPopular from './PowerfulAndPopular';
import ClassComparisons from './ClassComparisons';
import WeaponCharts from './WeaponCharts';


//Coppertop#1657


const Searchbar = () => {
  const [searchedName, setSearchedName] = useState('Dattowatto');
  const [membershipType, setMembershipType] = useState('2');
  const [characterData, setCharacterData] = useState('');


  // const [initialData, setInitialData] = useState('');

  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //   const result = await fetch('http://localhost:8080/bungie/hope/',).then(res => {
  //     return res.json()
  //   });

  //   console.log(result);
  //   setInitialData(result);
  //   };


  //   fetchInitialData();
  // }, [])
  


  function handleSubmit(e) {
    e.preventDefault();
    let PGCRs;
    let nameToSearch = searchedName;
    nameToSearch = nameToSearch.replace("#", "%23");

    fetch(`${API_BASE_URL}bungie/first?mtype=${membershipType}&mname=${nameToSearch}`, 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => {
      return res.json();
    })
    .then(payload => {
      PGCRs = payload;
      console.log(PGCRs);
      setCharacterData(PGCRs);
    })
    .catch(err => {
      if(err === 'TypeError: Failed to fetch'){
        return Promise.reject(err)
      }
      console.log(err)
    });
  }

  // <label>Type in your Xbox, Playstation, or Battlenet ID here</label>

  function navButtonSubmit(ev) {
    console.log(ev.target.innerText)
    ev.preventDefault();
    let identifyByText = ev.target.innerText;
    if(identifyByText === "Weapon Combinations") {
      document.getElementById('pnp-container').style.opacity = 1.0;
      document.getElementById('pnp-container').style.zIndex = 1;
      document.getElementById('wepContainer').style.opacity = 0.0;
      document.getElementById('wepContainer').style.zIndex = 0;
      document.getElementById('NavigationMenuContainer').style.opacity = 0.0;
      document.getElementById('NavigationMenuContainer').style.zIndex = 0;
    }
    else if(identifyByText === "Weapon Charts") {
      document.getElementById('pnp-container').style.opacity = 0.0;
      document.getElementById('pnp-container').style.zIndex = 0;
      document.getElementById('wepContainer').style.opacity = 1.0;
      document.getElementById('wepContainer').style.zIndex = 1;
      document.getElementById('NavigationMenuContainer').style.opacity = 0.0;
      document.getElementById('NavigationMenuContainer').style.zIndex = 0;
    }
    else if(identifyByText === "Stats & Graphs") {
      document.getElementById('pnp-container').style.opacity = 0.0;
      document.getElementById('pnp-container').style.zIndex = 0;
      document.getElementById('wepContainer').style.opacity = 0.0;
      document.getElementById('wepContainer').style.zIndex = 0;
      document.getElementById('NavigationMenuContainer').style.opacity = 1.0;
      document.getElementById('NavigationMenuContainer').style.zIndex = 1;
    }
  }

  return (
    <div>
      <form id="playerSearchForm" onSubmit={handleSubmit}>
        <div className="playerSearchInputContainer">
          <input id="formTextInput" name="searchedName" type="text" value={searchedName} onChange={e => setSearchedName(e.target.value)} />
          <select id="membershipTypeSelector" name="membershipType" value={membershipType} onChange={e => setMembershipType(e.target.value)}>
            <option value="4">PC</option>
            <option value="2">PSN</option>
            <option value="1">Xbox</option>
          </select>
          <button id="playerSearchButton" type="submit" value="Submit">Search</button>
        </div>
      </form>

      <form className="navButtonContainer">
        <button type="submit" id="powerfulAndPopularNavButton" className="topNavButton" onClick={e => navButtonSubmit(e)}>
          Weapon Combinations
        </button>
        <button type="submit" id="weaponChartsNavButton" className="topNavButton" onClick={e => navButtonSubmit(e)}>
          Weapon Charts
        </button>
        <button type="submit" id="classComparisonsNavButton" className="topNavButton" onClick={e => navButtonSubmit(e)}>
          Stats & Graphs
        </button>
      </form>

      <Guardians {...characterData}/>
    </div>
  )
}


export default Searchbar;