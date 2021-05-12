import { Card, Grid, Typography, TextField } from '@material-ui/core';
import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { grey } from '@material-ui/core/colors'
import { Edit, ArrowBackIosTwoTone, LockOpen, Done, Cancel } from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Auth from '../services/Auth'
import TransactionHistory from './TransactionHistory';
import PasswordDialog from './PasswordDialog';

const useStyles = makeStyles((theme) => ({
    tabsPanel: {
        flexGrow: 1,
        backgroundColor: 'black',
        color: grey[100],
        minHeight: 420
    },
    tabs: {
        flexGrow: 1,
        backgroundColor: 'black',
        color: grey[100],
    },
    card: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
    },
    statsBox: {
        background:'black',
        margin: 10,
        padding: 10,
    },
    gamePreview: {
        width: 250,
        height: 250,
        padding: 10
    },
    gameCover: {
        width: 260,
        height: 260,
        padding: 10
    },
    profileBox: {
        background: 'linear-gradient(45deg, #32a883, #3290a8)',
        padding: 10,
        marginTop: 15
    },
    changePass: {
        background: 'linear-gradient(45deg, #f51818, #8c0023)',
        color: grey[100],
        padding: 10,
        marginTop: 5
    },
    updateInfo: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100],
        padding: 10,
        marginTop: 5
    },
    gamePreviewText: {
        color: grey[300],
        padding: 10,
        paddingTop: 0
    },
    title: {
        color: grey[100],
        padding: 10
    },
    text: {
        color: grey[400],
        fontSize: 14,
        padding: 10
    },
    button: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100],
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    a: {
        textDecoration: 'none'
    }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }
  
  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

function ProfilePage(props) {
    const classes = useStyles()
    const { user, setUser } = useContext(AuthContext)
    const [passValue, setpassValue] = useState(0);
    const [verified, setVerified] = useState(false);
    const [value, setValue] = useState(0);
    const [email,setEmail] = useState(user.email)
    const [tempEmail,setTempEmail] = useState(user.email)
    const [username,setUsername] = useState(user.username)
    const [tempUsername,setTempUsername] = useState(user.username)
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  
    const handleChange = (event, newValue) => {
      setValue(newValue)
    }
    const setLoading = (value) => {
      props.setLoading(value)
    }    
    const setAlert = (value) => {
      props.setAlert(value)
    }

    const keyPress = (e) =>{
       if(e.keyCode == 13){
           updateInfo()
       }
    }

    const closeProfilePage = () => {
        props.setProfileOpen(false)
    }

    const checkPassword = () => {
        setPasswordDialogOpen(true)
    }

    const updateInfo = () => {
        setLoading(true)
        const checkUser = {username: username, email: email}
        Auth.checkUser(checkUser).then((data) => {
            const { msgBody, isTaken } = data
            if(isTaken) {
                setLoading(false)
                setAlert({
                    open:true,
                    duration:6000,
                    anchor:{
                        vertical: 'top',
                        horizontal: 'center',
                    },
                    message:msgBody,
                    action:false
                })
            }
            else {
                const info = {oldUser: user, newUsername: username, newEmail: email }
                Auth.updateUser(info).then((data) => {
                    const { msgError, msgBody } = data
                    // alert(msgBody.user.username)
                    if(!msgError) {
                        const tempUser = user
                        tempUser.username = username
                        tempUser.email = email
                        setUser(tempUser)
                        setTempEmail(email)
                        setTempUsername(username)
                        setVerified(false)
                        setLoading(false)
                    }
                })
            }

            })
    }

    const cancelUpdate = () => {
        setEmail(tempEmail)
        setUsername(tempUsername)
        setVerified(false)
    }

    let updateButtonContent
    if(!verified)
        updateButtonContent = <Button
            className={classes.updateInfo}
            startIcon={<Edit />}
            onClick={checkPassword} 
            size="large"
            variant="contained"
            fullWidth>    
                Update Info
        </Button>
    else
        updateButtonContent = <React.Fragment>
                <Button
                    className={classes.updateInfo}
                    startIcon={<Done />}
                    onClick={updateInfo}
                    size="large"
                    variant="contained"
                    fullWidth>    
                        Submit
                </Button>
                <Button
                    className={classes.updateInfo}
                    startIcon={<Cancel />}
                    onClick={cancelUpdate} 
                    size="large"
                    variant="contained"
                    fullWidth>    
                        Cancel
                </Button>
        </React.Fragment>


    return(
    <React.Fragment>
        <PasswordDialog 
            open={passwordDialogOpen} 
            setPasswordDialogOpen={setPasswordDialogOpen} 
            setVerified={setVerified} 
            setLoading={setLoading}
            setAlert={setAlert}/>
        <Card className={classes.card}>
            <Card className={classes.statsBox}>
                <Button
                    className={classes.button}
                    startIcon={<ArrowBackIosTwoTone />}
                    onClick={closeProfilePage} 
                    size="large"
                    variant="contained">    
                        Back
                </Button>
            <div className={classes.tabsPanel}>
                <AppBar position="static">
                    <Tabs
                    variant="fullWidth"
                    className={classes.tabs}
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                    >
                    <LinkTab label="Profile" href="/profile" {...a11yProps(0)} />
                    <LinkTab label="Transactions" href="/trans" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                    <TabPanel value={value} index={0}>
                            <Grid>
                                <Grid item md={7}>
                                    <Card className={classes.profileBox}>
                                        <TextField
                                            disabled={!verified}
                                            id="filled-disabled"
                                            label="Username"
                                            value={username}
                                            onInput={(e) => {setUsername(e.target.value)}}
                                            onKeyUp={(e) => {keyPress(e)}}
                                            variant="filled"
                                            fullWidth
                                        />
                                    </Card>
                                    <Card className={classes.profileBox}>
                                        <TextField
                                            disabled={!verified}
                                            id="filled-disabled"
                                            label="Email"
                                            value={email}
                                            onInput={(e) => {setEmail(e.target.value)}}
                                            onKeyUp={(e) => {keyPress(e)}}
                                            variant="filled"
                                            fullWidth
                                        />
                                    </Card>
                                    {updateButtonContent}
                                    <Button
                                        className={classes.changePass}
                                        startIcon={<LockOpen />}
                                        onClick={closeProfilePage} 
                                        size="large"
                                        variant="contained"
                                        fullWidth>    
                                            Change Password
                                    </Button>
                                </Grid>
                            </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TransactionHistory />
                    </TabPanel>
                </div>
            </Card>
        </Card>
    </React.Fragment>
    )
}

export default ProfilePage