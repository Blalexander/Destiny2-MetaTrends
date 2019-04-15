import React, {  useState } from 'react'
import GameHistory from './GameHistory';

export default function Guardians(props) {
  if(props[0] === undefined) {
    return null;
  }

  const [gameHistoryStyling, setGameHistoryStyling] = useState(0);
  const basePath = props[0].characters.data;
  const basePathCharactersData = Object.keys(basePath);
  let i = 0;


  function handleHistoryStyling(e) {
    e.preventDefault();
    let idGrabber = e.target[0].value;
    console.log("Being hovered!", idGrabber);
    setGameHistoryStyling([idGrabber, props[idGrabber]]);
  }

  function Guardian(props) {
    const guardianId = props.value;
    const pathShortcut = basePath[guardianId];
    const characterTypeValues = ["Titan", "Hunter", "Warlock"];
    i++;

    return (
      <form onSubmit={handleHistoryStyling}>
        <button className="guardianContainer" value={i} style={{backgroundImage: `url(${"https://www.bungie.net" + pathShortcut.emblemBackgroundPath})`}}>
        <p className="guardianLevel">{pathShortcut.baseCharacterLevel}</p>
        <p className="guardianLightLevel">{pathShortcut.light}</p>
        <p className="guardianClass">{characterTypeValues[pathShortcut.classType]}</p>
        </button>
      </form>
    )
  }

  function GuardianList() {
    const listOfGuardians = basePathCharactersData.map((guardianMapId) => 
      <Guardian key={guardianMapId} value={guardianMapId}/>
    );

    return (
      <section id="accountContainer">
        <section id="accountsGuardians">
          {listOfGuardians}
        </section>
      </section>
    )
  }

  return (
    <>
      <GuardianList />
      <GameHistory {...gameHistoryStyling} />
    </>
  )
}



// export default Guardians
// const titanBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-titan-4k.jpg";
// const hunterBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-Hunter-4k.jpg";
// const warlockBackground = "https://geek-prime.com/wp-content/uploads/2014/02/Destiny-2-4k-hd-wallpaper-warlock-4k.jpg";

// if(props[0] == undefined) {
//   return null;
// }

// const basePath = props[0].characters.data;
// const basePathCharactersData = Object.keys(basePath);
// const character1BackgroundPath = "https://www.bungie.net" + basePath[basePathCharactersData[0]].emblemBackgroundPath;
// const character2BackgroundPath = "https://www.bungie.net" + basePath[basePathCharactersData[1]].emblemBackgroundPath;
// const character3BackgroundPath = "https://www.bungie.net" + basePath[basePathCharactersData[2]].emblemBackgroundPath;



// return (
//   <section id="accountContainer">
//     <div id="accountName">{props[0].displayName}</div>
//     <section id="accountsGuardians">
      // <div className="guardian1 guardianContainer" style={{backgroundImage: `url(${character1BackgroundPath})`}}>
      //   <div id="guardianLevel">Guardian Level</div>
      //   <div id="guardianLightLevel">Guardian Level</div>
      //   <div id="guardianClass">Guardian Class</div>
      // </div>
//       <div className="guardian2 guardianContainer" style={{backgroundImage: `url(${character2BackgroundPath})`}}>
//         <div id="guardianLevel">Guardian Level</div>
//         <div id="guardianLightLevel">Guardian Level</div>
//         <div id="guardianClass">Guardian Class</div>
//       </div>
//       <div className="guardian3 guardianContainer" style={{backgroundImage: `url(${character3BackgroundPath})`}}>
//         <div id="guardianLevel">Guardian Level</div>
//         <div id="guardianLightLevel">Guardian Level</div>
//         <div id="guardianClass">Guardian Class</div>
//       </div>
//     </section>
//   </section>
// )