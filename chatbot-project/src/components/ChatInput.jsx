import { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages}) { //inputs the data internally
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