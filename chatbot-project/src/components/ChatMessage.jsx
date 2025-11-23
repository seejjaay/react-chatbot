import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'

export function ChatMessage(props){ //outputs the conversation
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