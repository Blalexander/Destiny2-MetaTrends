import React from 'react';
// import ReactDOM from 'react-dom';
// import './App.css';
import './App2.css';

import Searchbar from './components/Searchbar';
// import Guardians from './components/Guardians';
// import WeaponDetails from './components/Weapon-details';
// import BackButton from './components/BackButton';
import NavigationMenu from './components/NavigationMenu';


export default function App() {
  return (
    <main>
      <div id="backgroundTransitions"></div>
      <section>
        <header>
          <h1>Destiny MetaTrends</h1>
        </header>
        <Searchbar />
      </section>
      <section className="navigationContainer">
        <NavigationMenu />
      </section>
    </main>
  );
}
