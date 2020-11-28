import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Auth from '../services/Auth'
import ProfileBox from './ProfileBox'
import Banner from './Banner'
import GameBox from './GameBox'

function Main(props) {
  const authContext = useContext(AuthContext)
  const [leaderboards, setLeaderboards] = useState([])
  const [matches, setMatches] = useState([])
  const [totalKills, setTotalKills] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [userKills, setUserKills] = useState([])
  
  useEffect(() => {
      // setLoading(true)
      Auth.getMatches().then((data) => {
          const { matches } = data
          setMatches(matches)
          getMatchStats(matches)
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
  
  const getMatchStats = (value) => {
          // alert(loaded)
      let m
      let count = 0
      let pointCount = 0
      let uk = authContext.user.matches.map((matchID) => {
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

    return (
      <React.Fragment>
        <Banner />
        <ProfileBox setLoading={setLoading}/>
        <GameBox 
        leaderboards={leaderboards} 
        user={props.user} 
        userKills={userKills} 
        totalKills={totalKills} 
        totalPoints={totalPoints}
        />
      </React.Fragment>
    );
}

export default Main;
