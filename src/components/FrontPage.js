import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'

function FrontPage(props) {
    const [toggle, setToggle] = useState(true)
    let content

    const switchPanel = () => {
        const temp = !toggle
        setToggle(temp)
    }

    const setLoading = (value) => {
        props.setLoading(value)
    }

    if(toggle)
        content = <Login setLoading={setLoading} switchPanel={switchPanel}/>
    else
        content = <Signup setLoading={setLoading} switchPanel={switchPanel}/>


    return (
      <React.Fragment>
          {content}
      </React.Fragment>
    );
}

export default FrontPage;
