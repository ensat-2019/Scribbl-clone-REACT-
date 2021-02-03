import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';
const Message = ({ message :{user, text}, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }
    return (
        isSentByCurrentUser ? (
            <div className="messageContainer justified End">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox">
                    <p className="messageText">{ReactEmoji.emojify(text)}</p>
                </div>


            </div>
        ) :
            (
                <div className="messageContainer jstify Start ">
                <div className="messageBox">
                    <p className="messageText">{ReactEmoji.emojify(text)}</p>
                <p className="sentText">{user}</p>
                </div>
            </div>
            )
   );
}
export default Message;