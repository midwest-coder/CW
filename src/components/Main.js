import React, { useState, useEffect, useContext } from 'react'
import Auth from '../services/Auth'
import ProfileBox from './ProfileBox'
import Banner from './Banner'
import GameBox from './GameBox'
import ProfilePage from './ProfilePage'

function Main(props) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [leaderboards, setLeaderboards] = useState([])
  const [matches, setMatches] = useState([])
  const [totalKills, setTotalKills] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [userKills, setUserKills] = useState([])
 
  useEffect(() => {
    Auth.getMatches().then((data) => {
      const { matches } = data
      setMatches(matches)
      getMatchStats(props.user ,matches)
      Auth.getUsers().then((data) => {
        const { users } = data
        setBoards(users, matches)
      })
  })
  }, [])

const setBoards = (_users, _matches) => {
    let lb = _users.map((user) => {
      let kills = 0
      user.matches.map((matchID) => {
        const match = _matches.find((e) => e._id === matchID)
        kills += parseInt(match.kills)
      })
      return {user: user, score: kills}
    })
    setLeaderboards(lb)
  }
  
  const getMatchStats = (_user, value) => {
          // alert(loaded)
      let m
      let count = 0
      let pointCount = 0
      let uk = _user.matches.map((matchID) => {
              m = value.find((e) => e._id === matchID)
              count += parseInt(m.kills)
              pointCount += parseInt(m.points)
              return m.kills
          })
          setTotalPoints(pointCount)
          setTotalKills(count)
          setUserKills(uk)
    }

  const setLoading = (value) => {
    props.setLoading(value)
  }    
  const setAlert = (value) => {
    props.setAlert(value)
  }

  let content
  if(profileOpen)
    content = <ProfilePage setProfileOpen={setProfileOpen}/>
      else
        content = <GameBox 
        user={props.user}
        leaderboards={leaderboards} 
        matches={matches} 
        totalKills={totalKills} 
        totalPoints={totalPoints} 
        userKills={userKills} />

    return (
      <React.Fragment>
        <Banner />
        <ProfileBox setLoading={setLoading} setAlert={setAlert} setProfileOpen={setProfileOpen}/>
        {content}
      </React.Fragment>
    );
}

export default Main;
