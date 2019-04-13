import React, { Component } from 'react'

export class WeaponDetails extends Component {
  render() {
    return (
      <section id="weaponDetails">
        <ul id="listItemContainer">
          <li className="listItem">
            <div className="wepNameTypeImage">
              <h3 className="weaponName">Weapon Name</h3>
              <p className="weaponType">Weapon Type</p>
              <div className="weaponImage">Weapon Image</div>
            </div>
            <div className="weaponStats">
              {/* <TimesUsed /> */}
              {/* <WinRate /> */}
              {/* <Kd /> */}
              {/* <KAd /> */}
              {/* <Efficiency /> */}
              {/* <AvScorePerKill /> */}
              {/* <AvScorePerLife /> */}
              {/* <KillsVAssists /> */}
              {/* <WeaponKills /> */}
              {/* <WeaponPrecKills /> */}
              {/* <GrenadeKills /> */}
              {/* <MeleeKills /> */}
              {/* <SuperKills /> */}
            </div>
          </li>
        </ul>
      </section>
    )
  }
}

export default WeaponDetails
