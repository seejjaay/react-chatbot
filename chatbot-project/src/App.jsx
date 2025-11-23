import { useState, useRef, useEffect } from 'react'
import {Chatbot} from 'supersimpledev'
import RobotProfileImage from './assets/robot.png'
import UserProfileImage from './assets/user.png'
import './App.css'

    function ChatInput({chatMessages, setChatMessages}) { //inputs the data internally
      const [inputText, setInputText] = useState('');
      const [isLoading, setIsLoading] = useState(false)

      function eventKey(event){
        if (event.key==='Enter'){
          sendMessage();
          setInputText('');
        }
        else if (event.key==='Escape'){
          setInputText('')
        }
      }

      function saveInputText(event){
        setInputText(event.target.value);
      }

      async function sendMessage(){

        if (isLoading || inputText===''){
          return;
        }

        setIsLoading(true);

        const newChatMessages = [
          ...chatMessages,
          {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
          }
        ]
        
        setChatMessages(newChatMessages);
        setInputText('')

          let response = null;

          while (response===null){
            setChatMessages([
            ...newChatMessages,
              {
                message: 'Loading...',
                sender: 'robot',
                id: crypto.randomUUID()
              }
            ]);
            response = await Chatbot.getResponseAsync(inputText);
          }
          setChatMessages([
          ...newChatMessages,
          {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID()
          }
        ]);
          
        setIsLoading(false);
         
      }

        return (
            <div
              className="chat-input-container">
              <input 
                placeholder="Send a message to Chatbot" 
                size="30" 
                onChange={saveInputText}
                value={inputText}
                className="class-input"
                onKeyDown={eventKey}
              />
              <button
                onClick={sendMessage}
                className="send-button"
              >Send</button>  
            </div>
        );
    }

    function ChatMessage(props){ //outputs the conversation
      const {message,sender} = props;
      
      return (
        <div className={
          sender==='user' 
          ? 'chat-message-user' 
          : 'chat-message-robot'
        }>
          {sender==='robot' && (
            <img src={RobotProfileImage} className="chat-message-profile"></img>
          )}
          <div className="chat-message-text">
            {message}
          </div>
          {sender==='user' && (
            <img src={UserProfileImage} className="chat-message-profile"></img>
          )}
          
        </div>
      )
    }
    
    function ChatMessages({chatMessages}){ //inputs the data to be outputted
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

    //this is a component(piece of a website)
    //a component can be inside a component
    function App(){
            const [chatMessages, setChatMessages] = useState([{
        message: 'hello chatbot',
        sender: 'user',
        id: 'id1'
      },{
        message: 'Hello! How can I help you?',
        sender: 'robot',
        id: 'id2'
      },{
        message: 'Can you give me todays date?',
        sender: 'user',
        id: 'id3'
      },{
        message: 'Today is 11/16/2025',
        sender: 'robot',
        id: 'id4'
      }]);
      //const chatMessages = array[0];  //initial data
      //const setChatMessages = array[1]; //updater function
      return (
        <div className="app-container"> 
          <ChatMessages
            chatMessages={chatMessages}
          />
          <ChatInput 
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
          />
        </div>
      );
    }

export default App
