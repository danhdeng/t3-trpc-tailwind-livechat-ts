import { Session } from "next-auth";
import { Message } from "../../constants/schemas";
import { advancedStyles, baseStyles } from "../../styles/styles";

function MessageItem({
    message,
    session
}:{message:Message, session:Session}) {
    const listStyles=message.sender.name===session.user?.name ? baseStyles : advancedStyles;

  return (
    <li className={listStyles}>
        <div className="flex">
            <time>
                {message.sendAt.toLocaleTimeString("en-CA",{
                    timeStyle: "short",
                })}{"  "}
                - {message.sender.name}
            </time>
        </div>
        {message.message}
    </li>
  )
}

export default MessageItem;
