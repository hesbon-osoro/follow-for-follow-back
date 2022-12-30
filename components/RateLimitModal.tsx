// @ts-nocheck
import { Modal } from '@material-ui/core';
import { useEffect, useState } from 'react';
import WarningIcon from '@material-ui/icons/Warning';
import CountdownTimer from './CountdownTimer';

if (typeof window !== 'undefined' && window.localStorage) {
  var profile = JSON.parse(window.localStorage.getItem('profile'));
}

const RateLimitModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (profile && profile.message) {
      setOpen(true);
      localStorage.setItem('countdown', 60);
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
          <a
            href={profile?.documentation_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            documentation.
          </a>
        </p>
        <p>
          <strong>
            <em>Note:</em>
          </strong>
          Examine this app with follow(ers)ing less 1000 to prevent hitting the
          rate limit on unauthorized user.
        </p>
        <CountdownTimer />
      </div>
    </Modal>
  );
};

export default RateLimitModal;
