import { type  FC } from "react";

interface Sender {
  _id: string;
  username?: string;
  image?: string;
}

export interface Message {
  _id?: string;
  text: string;
  timestamp: string;
  sender?: Sender;
  createdAt?: Date
}

interface Props {
  msg: Message;
  mine: boolean;
}

const MessageItem: FC<Props> = ({ msg, mine }) => (
  <div
    className={`
      px-3 py-2 rounded-2xl shadow-sm text-sm flex flex-col break-words inline-block
      ${mine ? "ml-auto bg-indigo-500 text-white" : "mr-auto bg-gray-200 text-gray-900"}
      max-w-[80%] sm:max-w-xs mb-2
    `}
  >
    {msg.sender && (
      <div className="flex items-center gap-2 mb-1">
        {msg.sender.image ? (
          <img
            src={msg.sender.image}
            alt={msg.sender.username}
            className="w-5 h-5 rounded-full object-cover"
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-gray-300 text-[10px] flex items-center justify-center">
            {msg.sender.username?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}
        <span className="text-xs font-medium">
          {msg.sender.username ?? "Unknown"}
        </span>
      </div>
    )}

    <div>{msg.text}</div>

    <div className="text-[10px] text-gray-400 text-right mt-1">
      {new Date(msg.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  </div>
);

export default MessageItem;
