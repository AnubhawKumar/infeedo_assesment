import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./messageBubble";

function ChatBot() {
    const [inputMessage, setInputMessage] = useState("");
	const [isChatBotTyping, setIsChatBotTyping] = useState(false);
	const [conversation, setConversation] = useState([]);
	const messageContainerRef = useRef();

	useEffect(() => {
		const firstMessage = {
			message: "Hey, I am chat bot. I will mimic whatever you will type, like a copy cat but I am not a cat.",
			event: "received",
			time: new Date().toLocaleTimeString(),
		};
		const conversation = JSON.parse(localStorage.getItem("chat-bot-message"));
		setConversation(conversation?.length ? conversation : [firstMessage]);
	}, []);

	useEffect(() => {
		scrollToBottom();
		localStorage.setItem("chat-bot-message", JSON.stringify(conversation));
	}, [conversation[conversation.length - 1]]);

	const handleInputMessage = (e) => {
		setInputMessage(e.target.value);
	};

	const handleSendMessage = (evt) => {
		evt.preventDefault();
		if (inputMessage.trim()) {
			setConversation((prev) => [
				...prev,
				{ message: inputMessage, time: new Date().toLocaleTimeString(), event: "sent" },
			]);
			setInputMessage("");
			chatBotReplying();
		}
	};

	const chatBotReplying = () => {
		setIsChatBotTyping(true);
		setTimeout(() => {
			setConversation((prev) => [
				...prev,
				{ message: prev[prev.length - 1].message, time: new Date().toLocaleTimeString(), event: "received" },
			]);
			setIsChatBotTyping(false);
		}, 1000);
	};

	const scrollToBottom = () => {
		// console.log(messageContainerRef.current.scrollHeight,messageContainerRef.current.clientHeight);
		messageContainerRef.current.scrollTop =
			messageContainerRef.current.scrollHeight - messageContainerRef.current.clientHeight;
	};

	return (
		
			<div className="chat_bot_container">
				<div className="header_chat">
					<h3>Chat Bot</h3>
					<span>
						<span className="online_dot"></span>
						{isChatBotTyping ? "Typing..." : "Online"}
					</span>
				</div>
				<div className="divider"></div>
				<div ref={messageContainerRef} className="message_container">
					{conversation.map((item) => (
						<MessageBubble key={item.time} {...item} />
					))}
				</div>
				<div className="divider"></div>
				<div className="footer_chat">
					<form onSubmit={handleSendMessage}>
						<input className="input_box" value={inputMessage} onChange={handleInputMessage} />
						<button type="submit" className="send_button">
							Send
						</button>
					</form>
				</div>
			</div>
	);
}

export default ChatBot;
