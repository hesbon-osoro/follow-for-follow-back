// @ts-nocheck
import { Button, Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useState } from 'react';
import { fetchAndStoreUsers, useUsername } from '../hooks';

const SetUsernameModal = ({ onUsernameSave }) => {
  const [username, setUsername] = useUsername();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSaveUsername = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();

      if (data.message === 'Not Found') {
        // Assume that the username is not available
        setUsername('hesbon-osoro');
        fetchAndStoreUsers('hesbon-osoro');
      }
      fetchAndStoreUsers(username);
      localStorage.setItem('profile', JSON.stringify(data));
      onUsernameSave(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      // Assume that the username is not available
      setUsername('hesbon-osoro');
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className="modal-username">
        <EditIcon fontSize="small" />
        Set username
      </Button>
      <Modal open={isModalOpen} className="modal">
        <div>
          <label htmlFor="username">Enter your GitHub username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <Button onClick={handleSaveUsername} className="modal-save">
            <SaveIcon fontSize="small" />
            Save
          </Button>
          <Button onClick={handleCloseModal} className="modal-close">
            <CloseIcon />
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SetUsernameModal;
