import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

export function ChatMessages({chatMessages}){ //inputs the data to be outputted
      const chatMessagesRef = useRef(null);
      
      useEffect(()=>{
        const containerElement = chatMessagesRef.current;
        if (containerElement){
          containerElement.scrollTop = containerElement.
          scrollHeight;
        }
      },[chatMessages]);

      return (
        <div 
          className="chat-messages-container"
          ref={chatMessagesRef}
          >
          {chatMessages.map((chatMessage)=>{
            return (
              <ChatMessage 
                message={chatMessage.message}
                sender={chatMessage.sender}
                key={chatMessage.id}
              />
            );
          })}
        </div>
      )
    }