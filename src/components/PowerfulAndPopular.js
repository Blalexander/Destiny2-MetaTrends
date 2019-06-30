import React from 'react';
// import manifest from './manifest';
import PowerfulCombos from './PowerfulCombos';
import PopularCombos from './PopularCombos';


function PowerfulAndPopular(props) {
  // if(props[0] === undefined) {
  //   return null;
  // }

  // function CalculatePopularDuo() {
    // let valToUse;

    // for(let val in props) {
    //   if(props[val].allHashes != null && props[val].allHashes.length > 1) {
    //     console.log(props[val])
    //     valToUse = props[val];
    //     break;
    //   }
    // }
  
    // let duoObj = {};
  
    // let dividerNumber = valToUse.allHashes.length;
  
    // valToUse.allHashes.forEach((eachHash,index) => {
    //   if(duoObj[eachHash] > 0) {
    //     // console.log("if", duoObj[eachHash])
    //     let counterObj = duoObj[eachHash];
    //     counterObj += valToUse.allKills[index].reduce((total, num) => {
    //       return total + num;
    //     });
    //     duoObj[eachHash] = counterObj;
    //   }
    //   else{
    //     console.log("else")
    //     duoObj[eachHash] = valToUse.allKills[index].reduce((total, num) => {
    //       return total + num;
    //     });
    //   }
    // })
  
    // let keysToAverage = Object.keys(duoObj);
    // keysToAverage.forEach(toBeAveraged => {
    //   duoObj[toBeAveraged] = duoObj[toBeAveraged] / dividerNumber;
    // })
    // let i = 0;
    // keysToAverage.forEach(toBecomePercent => {
    //   let percentNum = duoObj[keysToAverage[0]] + duoObj[keysToAverage[1]];
    //   duoObj[i] = (duoObj[toBecomePercent] / percentNum) * 100;
    //   i++
    // })
    
    // console.log(duoObj)



    // return(
    //   <div id="twoweppop1" className="pnpBoxes">wep name: {manifest[keysToAverage[1]].weaponName}, wep kills: {duoObj[1].toFixed(2)}%
    //   <img src={"https://www.bungie.net" + manifest[keysToAverage[1]].weaponIcon}></img>
    //     <div id="twoweppop2" className="pnpBoxes">wep name: {manifest[keysToAverage[0]].weaponName}, wep kills: {duoObj[0].toFixed(2)}%</div>
    //     <img src={"https://www.bungie.net" + manifest[keysToAverage[0]].weaponIcon}></img>
    //   </div>
    // )
  // }



  function handlePnPSubmit(event) {
    event.preventDefault();
    let elementsToMove = document.querySelectorAll('.navButton');
    for(let i=0; i<elementsToMove.length; i++) {
      elementsToMove[i].classList.add('moveToSide');
      elementsToMove[i].classList.remove('grantPriority');
      elementsToMove[i].classList.remove('resetFromSide');
    }

    document.getElementById('powerfulAndPopularButton').classList.add('grantPriority');
    document.getElementById('powerfulAndPopularButton').classList.remove('moveToSide');
    document.getElementById("backgroundTransitions").classList.remove('removeBodyShadow');
    document.getElementById("backgroundTransitions").classList.add('bodyShadow');

    document.getElementById('pnpContent').classList.remove('hiding');
  }



  return (
    <form id="powerfulAndPopular" onSubmit={handlePnPSubmit}>
      <button type="submit" id="powerfulAndPopularButton" className="navButton">
        I'm for Powerful and Popular!
        <section id="pnpContent" className="hiding">
          <PopularCombos {...props} />
          <PowerfulCombos {...props} />
        </section>
      </button>
    </form>
  )
}

export default PowerfulAndPopular