// @ts-nocheck
import React, { FC, useState } from 'react';
import { Button, Icon } from '@material-ui/core';
import { FlipToFront, FlipToBack } from '@material-ui/icons';

import { Following, MenuButton, UnmutualFollowing } from '.';
import { withRouter } from 'next/router';

const FollowingCard: FC = ({ router }) => {
  const [showUnmutual, setShowUnmutual] = useState(false); // state to toggle between following and unmutual following
  const handleClick = () => setShowUnmutual(!showUnmutual);

  return (
    <div className="flip-card">
      <div className="flip-buttons">
        <Button className="flip-button" onClick={handleClick}>
          <Icon className="flip-icon">
            {showUnmutual ? <FlipToFront /> : <FlipToBack />}
          </Icon>
          Flip to {showUnmutual ? 'following' : 'unmutual following'}
        </Button>
        <MenuButton location={router.asPath} />
      </div>
      {showUnmutual ? <UnmutualFollowing /> : <Following />}
    </div>
  );
};

export default withRouter(FollowingCard);
