// @ts-nocheck
import { Button, Modal } from '@material-ui/core';
import { useEffect, useState } from 'react';
import WarningIcon from '@material-ui/icons/Warning';
import RefreshIcon from '@material-ui/icons/Refresh';
import CountdownTimer from './CountdownTimer';

if (typeof window !== 'undefined' && window.localStorage) {
  var profile = JSON.parse(window.localStorage.getItem('profile'));
}

const RateLimitModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (profile && profile.message) {
      setOpen(true);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('countdown', 60);
        // Clear the data from local storage
        window.localStorage.removeItem('following');
        window.localStorage.removeItem('followers');
        window.localStorage.removeItem('username');
      }
    }
  }, [profile]);

  return (
    <Modal
      open={open}
      aria-labelledby="rate-limit-modal"
      aria-describedby="rate-limit-modal-description"
      className="rate-limit-modal"
      BackdropProps={{
        className: 'rate-limit-modal-backdrop',
        style: { backdropFilter: 'blur(10px)' },
      }}
    >
      <div className="rate-limit-modal-content">
        <div className="rate-limit-modal-icon">
          <WarningIcon color="secondary" fontSize="large" />
        </div>
        <div className="rate-limit-modal-message">{profile?.message}</div>
        <p>
          Read{' '}
          <strong>
            <a
              href={profile?.documentation_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation.
            </a>
          </strong>
        </p>
        <p>
          <strong>Note: </strong>
          Examine this app with follow(ers)ing less 1000 to prevent hitting the
          rate limit on unauthorized user.
        </p>
        <CountdownTimer />
        <RefreshButton />
      </div>
    </Modal>
  );
};

const RefreshButton = () => {
  const handleRefresh = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Clear the data from local storage
      window.localStorage.removeItem('profile');
      window.localStorage.removeItem('following');
      window.localStorage.removeItem('followers');
      window.localStorage.removeItem('username');

      // Reload the browser
      window.location.reload();
    }
  };

  return (
    <Button className="refresh-button" onClick={handleRefresh}>
      <RefreshIcon /> Refresh Anyhow
    </Button>
  );
};
export default RateLimitModal;
