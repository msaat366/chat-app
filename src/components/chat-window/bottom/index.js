import React, { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import firebase from 'firebase/app';
import { useParams } from 'react-router';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      created: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
}

const ChatBottom = () => {
  const [input, setInput] = useState('');
  const [isloading, setisLoading] = useState(false);

  const { chatId } = useParams();
  const { profile } = useProfile();

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input.trim === '') {
      return;
    }

    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = database.ref('messages').push().key;

    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };

    setisLoading(true);
    try {
      await database.ref().update(updates);

      setInput('');
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      Alert.error(err.message, 4000);
    }
  };

    const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onSendClick();
    }
  };

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write a new Message here"
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendClick}
          disabled={isloading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default ChatBottom;
