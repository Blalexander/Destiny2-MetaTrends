import React from 'react'

export default function Guardians(props) {
  if(props[0] == undefined) {
    return null;
  }

  const basePath = props[0].characters.data;
  const basePathCharactersData = Object.keys(basePath);

  function Guardian(props) {
    const guardianId = props.value;
    const pathShortcut = basePath[guardianId];
    const characterTypeValues = ["Titan", "Hunter", "Warlock"];

    return (
      <div className="guardian1 guardianContainer" style={{backgroundImage: `url(${"https://www.bungie.net" + pathShortcut.emblemBackgroundPath})`}}>
        <div id="guardianLevel">{pathShortcut.baseCharacterLevel}</div>
        <div id="guardianLightLevel">{pathShortcut.light}</div>
        <div id="guardianRace"></div>
        <div id="guardianClass">{characterTypeValues[pathShortcut.classType]}</div>
      </div>
    )
  }

  function GuardianList() {
    const listOfGuardians = basePathCharactersData.map((guardianMapId) => 
      <Guardian value={guardianMapId}/>
    );

    return (
      <section id="accountContainer">
        <div id="accountName">{props[0][0].displayName}</div>
        <section id="accountsGuardians">
          {listOfGuardians}
        </section>
      </section>
    )
  }

  return (
    <GuardianList />
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