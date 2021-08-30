import React from 'react';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../ProfileAvatar';

const ProfileInfoBtnModal = ({ profile, children ,...btnProps }) => {
  const { isOpen, open, close } = useModalState();
  const { name, avatar, createdAt } = profile;
  const memeberSince = new Date(createdAt).toLocaleDateString();

  return (
    <div>
      <Button {...btnProps} onClick={open} >{name}</Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{name} Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            src={avatar}
            name={name}
            className="width-200 height-200 img-fullsize font-huge"
          />
          
          <h4 className="mt-2">{name}</h4>
          <p>Memeber since {memeberSince}</p>
        </Modal.Body>
        <Modal.Footer>
          {children}
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileInfoBtnModal;
