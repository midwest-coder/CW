import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core'
import { Typography, Tab, Tabs, Box, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { grey, lightBlue, purple } from '@material-ui/core/colors'
import TermsOfUse from './TermsOfUse'
import PrivacyPolicy from './PrivacyPolicy'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    card: {
        background: 'black',
        marginTop: 5,
        marginBottom: 5,
        padding: 15
    },
    userBox: {
    },
    username: {
        color: grey[100],
        padding: 15
    },
    userText: {
        color: lightBlue[600],
        marginRight: 10,
    },
    coins: {
        color: purple[500]
    },
    transferButton: {
        background: 'linear-gradient(45deg, #32a883, #3290a8)',
        color: grey[100],
        marginRight: 15,
        marginLeft: 20

    },
    button: {
        marginTop: 20,
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100]
    },
    green: {
        background: 'linear-gradient(45deg, #32a883, #3290a8)',
        color: grey[100]
    },
    purple: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100]
    },
    logout: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100],
        marginRight: 15,
    },
    textField: {
      marginTop: 20,
    },
    daiLogo: {
      width: 20,
      height: 20,
    },
    a: {
        textDecoration: 'none'
    }
})

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
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
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }


function Terms(props) {
    const classes = useStyles()
    const [tabValue, setTabValue] = useState(0);


    const handleChange = (event, newValue) => {
      setTabValue(newValue)
    };
  
      const handleChangeIndex = (index) => {
        setTabValue(index)
      }
  

    const handleDialogClose = () => {
        props.setOpen(false)
    }
    return(
          <Dialog
          open={props.open}
          onClose={handleDialogClose}
          aria-labelledby="transfer-dialog-title"
          aria-describedby="transfer-dialog-description"
          >
          <DialogTitle id="transfer-dialog-title">
            <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            centered
            >
            <Tab label="Terms of Use" {...a11yProps(0)} />
            <Tab label="Privacy Policy" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <TermsOfUse />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <PrivacyPolicy />
            </TabPanel>
          </DialogTitle>
            <DialogActions>
              <Button onClick={handleDialogClose} className={classes.green}>
                Close
              </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Terms