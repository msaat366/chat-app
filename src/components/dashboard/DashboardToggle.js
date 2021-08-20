import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';

const DashboardToggle = () => {
    const { isOpen, close, open } = useModalState();
    const ismobile = useMediaQuery('(max-width: 992px)')
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> DashBoard
      </Button>
      <Drawer full={ismobile} show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
