import React, {  useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import Guardians from './Guardians';
import PowerfulAndPopular from './PowerfulAndPopular';
import ClassComparisons from './ClassComparisons';
import WeaponCharts from './WeaponCharts';


const Searchbar = (props) => {
  // if(props[0] === undefined) {
  //   return null;
  // }

  console.log(props)

  return (
    <div>
      <form id="playerSearchForm">
        <div className="playerSearchInputContainer">
          <input id="formTextInput" name="searchedName" type="text" />
          <select id="membershipTypeSelector" name="membershipType">
            <option value="4">PC</option>
            <option value="2">PSN</option>
            <option value="1">Xbox</option>
          </select>
          <button id="playerSearchButton" type="submit" value="Submit">Search</button>
        </div>
      </form>
    </div>
  )
}


export default Searchbar;