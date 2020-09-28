import React, { useState, useEffect } from 'react';
import './App2.css';

// import Searchbar from './components/Searchbar';
import WeaponCharts from './components/WeaponCharts';
import CombineCompare from './components/CombineCompare';


export default function App() {
  const [initialData, setInitialData] = useState('');
  const [partnerData, setPartnerData] = useState(''); 
  let CCScrollJump = 0;
  let WCScrollJump = 0;

  useEffect(() => {
    const fetchInitialData = async () => {
      // const result = await fetch('http://localhost:8080/bungie/hope/',).then(res => {
      const result = await fetch('https://metatrendsserver.azurewebsites.net/bungie/hope/',).then(res => {
        // document.getElementsByClassName("loading")[0].style.display = "none";

        return res.json()
      });

      // console.log(result);
      setInitialData(result);
      setPartnerData(result);
      // document.querySelector('.wep-type-selector').style.opacity = "1";
      document.querySelector('.wep-type-selector').classList.add('finished-loading')
    };

    fetchInitialData();
  }, [])

  function showCC(ev) {
    ev.preventDefault();
    WCScrollJump = document.querySelector('html').scrollTop;
    document.querySelector('.show-charts-button').classList.remove('page-selection')
    document.querySelector('.combine-and-compare-button').classList.add('page-selection')
    document.querySelector('html').scrollTop = CCScrollJump
    document.querySelector('.combine-and-compare-display').style.opacity = "1";
    document.querySelector('.combine-and-compare-display').style.zIndex = "1";
    document.querySelector('.combine-and-compare-display').style.pointerEvents = "auto";
    document.querySelector('.dynamic-charts-display').style.opacity = "0";
    document.querySelector('.dynamic-charts-display').style.zIndex = "-1";
    document.querySelector('.dynamic-charts-display').style.pointerEvents = "none";
  }

  function showWC(ev) {
    ev.preventDefault();
    CCScrollJump = document.querySelector('html').scrollTop;
    document.querySelector('.show-charts-button').classList.add('page-selection')
    document.querySelector('.combine-and-compare-button').classList.remove('page-selection')
    document.querySelector('html').scrollTop = WCScrollJump
    document.querySelector('.combine-and-compare-display').style.opacity = "0";
    document.querySelector('.combine-and-compare-display').style.zIndex = "-1";
    document.querySelector('.combine-and-compare-display').style.pointerEvents = "none";
    document.querySelector('.dynamic-charts-display').style.opacity = "1";
    document.querySelector('.dynamic-charts-display').style.zIndex = "1";
    document.querySelector('.dynamic-charts-display').style.pointerEvents = "auto";
  }


  return (
    <main>
      <section>
        <header>
          <h1>Destiny MetaTrends</h1>
          <button className="combine-and-compare-button" onClick={e => showCC(e)}>Combine and Compare</button>
          <button className="show-charts-button page-selection" onClick={e => showWC(e)}>Weapon Charts</button>
        </header>
      </section>
      <section className="dynamic-charts-display">
        <WeaponCharts  {...initialData[0]} />
      </section>
      <section className="combine-and-compare-display">
        <CombineCompare {...partnerData[0]} />
      </section>
    </main>
  );
}