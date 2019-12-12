import React from 'react'
// import NavigationMenu from './NavigationMenu';

export default function Guardians(props) {
  if(props[0] === undefined) {
    return null;
  }

  // const [NavigationMenuStyling, setNavigationMenuStyling] = useState(0);
  const basePath = props[0].characters.data;
  const basePathCharactersData = Object.keys(basePath);
  let i = 0;


  function handleHistoryStyling(e) {
    e.preventDefault();
    let idGrabber = e.target[0].value;
    console.log("Being clicked!", idGrabber);
    // setNavigationMenuStyling([idGrabber, props[idGrabber]]);
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
      <div id="accountName">{props[0][0].displayName}</div>
        <section id="accountsGuardians">
          {listOfGuardians}
        </section>
      </section>
    )
  }

  return (
    <>
      <GuardianList />
    </>
  )
}