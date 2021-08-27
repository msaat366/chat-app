import React, { memo } from 'react';
import { Button, Drawer } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room-context';
import { useModalState } from '../../../misc/custom-hooks';
import EditableInput from '../../dashboard/EditableInput';

const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();

    const name = useCurrentRoom(v => v.name);
    const description = useCurrentRoom(v => v.description);
    
  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>

      <Drawer show={isOpen} onHide={close}>
              <Drawer.Header>
                  <Drawer.Title>
                      Edit Room
                  </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body><EditableInput/></Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
