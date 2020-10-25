import React, { useState } from 'react'
import CoinTransfer from './CoinTransfer'
import Card from '@material-ui/core/Card'
import ProfileBox from './ProfileBox'
import { makeStyles } from '@material-ui/core/styles'

import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles({
    card: {
        background: grey[900]
    }
})

function Main(props) {
  const [user, setUser] = useState(props.user);

  const buyCoins = (amount) => {
    window.alert(amount)
    // props.buyCoins(amount)
  }

  const sellCoins = (amount) => {
    // props.sellCoins(amount)
  }
    return (
      <Card id="content" className="mt-3">
        <ProfileBox user={user} />
      </Card>
    );
}

export default Main;
