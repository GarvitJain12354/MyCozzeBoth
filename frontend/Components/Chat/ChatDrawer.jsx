import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import Chat from './Chat';
const ChatDrawer = ({showDrawer,onClose,open,userId,otherUserId}) => {

  return (
    <>
      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}
      <Drawer title="Chat here" onClose={onClose} open={open}>
     <Chat userId={userId} otherUserId={otherUserId}/>
      </Drawer>
    </>
  );
};
export default ChatDrawer;