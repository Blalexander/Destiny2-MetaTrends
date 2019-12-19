import React, { useState, useEffect } from 'react';
// import {Line, Bar, Pie} from 'react-chartjs-2';
import PowerfulAndPopular from './PowerfulAndPopular';
import ClassComparisons from './ClassComparisons';
import WeaponCharts from './WeaponCharts';


export default function NavigationMenu() {
  const [initialData, setInitialData] = useState('');
  const [wepPartnerData, setPartnerData] = useState(''); //transfer the call to app.js so that only when it's answered does this render?


  let weaponTypes = ["Sidearm", "Auto Rifle", "Pulse Rifle", "Combat Bow", "Scout Rifle", "Hand Cannon", "Sniper Rifle", "Submachine Gun", "Trace Rifle", "Fusion Rifle", "Linear Fusion Rifle", "Grenade Launcher", "Shotgun", "Rocket Launcher", "Sword", "Machine Gun"];


  useEffect(() => {
    const fetchInitialData = async () => {
    const result = await fetch('http://localhost:8080/bungie/hope/',).then(res => {
      // document.getElementById('landingPageNav').classList.remove('loading');
      // document.getElementsByClassName("loading").style.opacity = 0.0;
      document.getElementsByClassName("loading")[0].style.display = "none";

      return res.json()
    });

    console.log(result);
    setInitialData(result);
    setPartnerData(result);
    };

    const fetchOtherData = async () => {
      const result2 = await fetch('http://localhost:8080/bungie/hoping/',)
      // const result2 = await fetch('http://localhost:8080/bungie/hoping/',).then(res => {
      //   return res.json()
      // });
  
      console.log(result2);
      console.log(result2.Response);
    }

    fetchInitialData();
  }, [])


  if(initialData != '') {
    return (
      <section id="landingPageNav" className="landingPageNavigation">
        <div className="loading"></div>

        <PowerfulAndPopular {...wepPartnerData}/>
        <WeaponCharts {...initialData[8]}/>
        <ClassComparisons {...initialData}/> 

      </section>
    )
  }
  else {
    return (
      <section id="landingPageNav" className="landingPageNavigation">
        <div className="loading"></div>
      </section>
    )
  }
}