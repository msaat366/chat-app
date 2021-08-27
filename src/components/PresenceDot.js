/* eslint-disable consistent-return */
import React from 'react';
import { Badge, Tooltip, Whisper } from 'rsuite';
import { usePresence } from '../misc/custom-hooks';

const getColor = presence => {
  if (!presence) {
    return 'gray';
  }

  switch (presence.state) {
    case 'online':
      return 'green';
    case 'offline':
      return 'gray';
    default:
      return 'gray';
  }
};

const getText = presence => {
  if (!presence) {
    return 'unknown State';
  }

  return presence.state === 'online'
    ? 'Online'
    : `Last Online ${new Date(presence.last_changed).toLocaleDateString()}`;
};

const PresenceDot = ({ uid }) => {
  const presence = usePresence(uid);

  return (
    <div>
      <Whisper
        placement="top"
        trigger="hover"
        speaker={
          <Tooltip>
            <i>{getText(presence)}</i>
          </Tooltip>
        }
      >
        <Badge
          className="cursor-pointer"
          style={{
            backgroundColor: getColor(presence),
          }}
        />
      </Whisper>
    </div>
  );
};

export default PresenceDot;
