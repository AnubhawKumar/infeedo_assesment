import React from "react";

function MessageBubble({ event, time, message }) {
	return (
		<div className={event}>
			<div>
				<div className="message">{message}</div>
			</div>
			<span className="message_time">{time}</span>
		</div>
	);
}

export default MessageBubble;
