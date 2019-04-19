import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './App.css';
import './App2.css';

import Searchbar from './components/Searchbar';
// import Guardians from './components/Guardians';
// import WeaponDetails from './components/Weapon-details';
// import Chart from './components/Chart';

class App extends Component {

  // state = {

  // }

  render() {
    return (
      <main>
        <header>
          <h1>Destiny MetaTrends</h1>
        </header>
        <section>
          <Searchbar />
        </section>
      </main>
    );
  }

}

export default App;
