import React from 'react'
import Card from '@material-ui/core/Card'
import ProfileBox from './ProfileBox'
import NewsContent from './NewsContent'
import GameBox from './GameBox'

function Main(props) {

  const setLoading = (value) => {
    props.setLoading(value)
  }

    return (
      <React.Fragment>
        <NewsContent />
        <ProfileBox setLoading={setLoading}/>
        <GameBox />
      </React.Fragment>
    );
}

export default Main;
