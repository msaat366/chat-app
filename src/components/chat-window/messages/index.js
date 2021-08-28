/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { database } from '../../../misc/firebase';
import { transformtoArrwithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messageRef = database.ref('/messages');

    messageRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformtoArrwithId(snap.val());
        setMessages(data);
      });

    return () => {
      messageRef.off('value');
    };
  }, [ chatId ]);
    
    let alertMsg;

    const handleAdmin = useCallback( async (uid) => {
        const adminRef = database.ref(`rooms/${chatId}/admins`);

        await adminRef.transaction(admins => {
            if (admins) {
                if (admins[uid]) {
                    admins = null;
                    alertMsg = 'Admin Permission removed'
                }
                else {
                    admins[ uid ] = true;
                    alertMsg = 'Admin Permission granted'
                }
            }
            return admins;
        })

        Alert.info(alertMsg ,4000)
  }, [chatId]);

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages &&
        messages.map(msg => <MessageItem key={msg.id} message={msg} handleAdmin={handleAdmin} />)}
    </ul>
  );
};

export default Messages;
