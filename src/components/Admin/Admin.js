import React, { useState, useEffect } from 'react'
import AdminBox from './AdminBox'
import Auth from '../../services/Auth'
import TopStats from './TopStats'
import UserDetails from './UserDetails'
import CompanyDetails from './CompanyDetails'

function Admin(props) {
    const [users, setUsers] = useState(null)
    const [matches, setMatches] = useState(null)
    const [totalMatches, setTotalMatches] = useState(0)
    const [loadContent, setLoadContent] = useState(false)
    const [points, setPoints] = useState(0)
    const [kills, setKills] = useState(0)
   
    useEffect(() => {
      setLoading(true)
      Auth.getUsers().then((data) => {
        const { users } = data
        setUsers(users)
        Auth.getMatches().then((data) => {
          const { matches } = data
          setMatches(matches)
          getTotalMatches(users)
          totalkills(users, matches)
        })
      })
    }, [])

  const setLoading = (value) => {
    props.setLoading(value)
  }

  const getTotalMatches = (value) => {
    let matches = 0
    value.forEach((user) => {
      matches += user.matches.length
    })
    setTotalMatches(matches)
  }

  const totalkills = (_user, _matches) => {
    let k = 0
    let p = 0
    _user.forEach((user) => {
      user.matches.forEach((matchID) => {
        const match = _matches.find((e) => e._id === matchID)
        k += parseInt(match.kills)
        p += parseInt(match.points)
      })
    })
    // alert(kills)
    setPoints(p)
    setKills(k)
    setLoadContent(true)
    setLoading(false)
  }
  
  let content
  if(loadContent){
    content = <React.Fragment>
      <TopStats userLength={users.length} userMatches={totalMatches} points={points} userKills={kills} />
      <CompanyDetails users={users} matches={matches}/>
      <UserDetails users={users} matches={matches}/>
    </React.Fragment>
    }
    else
      content = ''

    return (
      <React.Fragment>
        <AdminBox setLoading={setLoading}/>
        {content}
      </React.Fragment>
    );
}

export default Admin;
