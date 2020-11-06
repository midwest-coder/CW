import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'

function FrontPage() {
    const [toggle, setToggle] = useState(true)
    let content

    const switchPanel = () => {
        const temp = !toggle
        setToggle(temp)
    }

    if(toggle)
        content = <Login switchPanel={switchPanel}/>
    else
        content = <Signup switchPanel={switchPanel}/>


    return (
      <React.Fragment>
          {content}
      </React.Fragment>
    );
}

export default FrontPage;
