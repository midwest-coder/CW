import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AttachMoney, Help, MeetingRoom, AccountCircle } from '@material-ui/icons'
import { Divider } from '@material-ui/core';

const StyledMenu = withStyles({
  paper: {
    background: 'linear-gradient(45deg, #113C70, #3D0757)',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      }
  },
}))(MenuItem);

export default function CustomizedMenus(props) {

  const handleClose = () => {
    props.setOpen(null)
  };

  const handleTransfer = () => {
    props.onTransfer()
  }

  const handleHelp = () => {
    props.onHelp(true)
  }

  const handleProfile = () => {
    props.onProfile(true)
  }

  const handleLogout = () => {
    props.onLogout()
  }

  return (
    <div>
      <StyledMenu
        id="customized-menu"
        anchorEl={props.anchor}
        keepMounted
        open={Boolean(props.anchor)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleTransfer}>
          <ListItemIcon>
            <AttachMoney fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Transfer" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleProfile}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleHelp}>
          <ListItemIcon>
            <Help fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </StyledMenuItem>
        <Divider variant="middle" />
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <MeetingRoom fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
