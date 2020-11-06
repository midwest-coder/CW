import React from 'react'
import Card from '@material-ui/core/Card'
import ProfileBox from './ProfileBox'
import GameBox from './GameBox'

function Main() {

    return (
      <React.Fragment>
        <ProfileBox />
        <GameBox />
      </React.Fragment>
    );
}

export default Main;
