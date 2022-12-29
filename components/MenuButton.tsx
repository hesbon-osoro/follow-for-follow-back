//@ts-nocheck
import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'next/router';

const MenuButton = ({ router }) => {
  const [anchorEl, setAnchorEl] = useState(null); // state to toggle the menu

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHomeClick = () => {
    router.push('/');
    handleMenuClose();
  };

  const handleFollowingClick = () => {
    router.push('/following');
    handleMenuClose();
  };

  const handleFollowersClick = () => {
    router.push('/followers');
    handleMenuClose();
  };

  return (
    <div>
      <IconButton onClick={handleMenuClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {router.pathname !== '/' && (
          <MenuItem onClick={handleHomeClick}>Home</MenuItem>
        )}
        {router.pathname !== '/following' && (
          <MenuItem onClick={handleFollowingClick}>Following</MenuItem>
        )}
        {router.pathname !== '/followers' && (
          <MenuItem onClick={handleFollowersClick}>Followers</MenuItem>
        )}
        <Button onClick={handleMenuClose}>
          <CloseIcon />
          Close
        </Button>
      </Menu>
    </div>
  );
};

export default withRouter(MenuButton);
