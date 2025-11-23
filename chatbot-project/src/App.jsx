import { useState } from 'react'
import { ChatInput } from './components/ChatInput'
import { ChatMessages } from './components/ChatMessages';
import './App.css'

    
    
    

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
