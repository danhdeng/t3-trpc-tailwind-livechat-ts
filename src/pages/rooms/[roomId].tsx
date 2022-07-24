import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Message } from '../../constants/schemas'
import { submitButtonStyles, textAreaStyles } from '../../styles/styles'
import { trpc } from "../../utils/trpc";
import MessageItem from '../components/messageItem';



function RoomPage() {
    const {query} =useRouter();
    const roomId=query.roomId as string;
    const {data: session} =useSession();
    const [message, setMessage] =useState("");
    const [messages, setMessages] =useState<Message[]>([]);
    const {mutateAsync: sendMessageMutation}=trpc.useMutation(["room.send-message",]);

    trpc.useSubscription(
        ["room.onSendMessage",
            {
                roomId,
            },
        ],
        {
            onNext:(message:Message) => {
                setMessages((m: Message[]) =>{
                    return [...m, message];
                })
            },
        },
    );
    if(!session){
        return (
            <div>
                <button onClick={() => signIn()}>Login</button>
            </div>
        ); 
    }
    return (
        <div className="flex flex-col h-screen">
             <div className="flex-1">
                <ul className="flex flex-col p-4">
                    {messages.map((m)=>{
                        return <MessageItem key={m.id} message={m} session={session} />;
                    })}
                </ul>
            </div>   
       
            <form 
            className="flex"
              onSubmit={(e)=>{
                console.log(`submit message: ${message}`);
                e.preventDefault();
                sendMessageMutation({
                    roomId,
                    message,
                });
                setMessage("");
              }}
            >
                <textarea 
                    className={textAreaStyles}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What do you want to say"
                />
                <button type="submit" className={submitButtonStyles}>Send Message</button>
            </form>
    </div>
    )
}

export default RoomPage