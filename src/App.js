import React, { useState, useEffect } from 'react';
import './App2.css';

// import Searchbar from './components/Searchbar';
import WeaponCharts from './components/WeaponCharts';


export default function App() {
  const [initialData, setInitialData] = useState('');
  // const [wepPartnerData, setPartnerData] = useState(''); 

  useEffect(() => {
    const fetchInitialData = async () => {
      const result = await fetch('http://localhost:8080/bungie/hope/',).then(res => {
        // document.getElementsByClassName("loading")[0].style.display = "none";

        return res.json()
      });

      console.log(result);
      setInitialData(result);
      // setPartnerData(result);
      document.querySelector('.wep-type-selector').style.opacity = "1";
      document.querySelector('.wep-type-selector').classList.add('finished-loading')
    };

    fetchInitialData();
  }, [])



  return (
    <main>
      <section>
        <header>
          <h1>Destiny MetaTrends</h1>
        </header>
      </section>
      <section className="dynamic-charts-display">
        <WeaponCharts  {...initialData[0]} />
      </section>
    </main>
  );
}