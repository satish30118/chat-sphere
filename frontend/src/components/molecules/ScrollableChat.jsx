import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "@/app/services/chats";
import { useAuth } from "@/app/context/authContext";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {
  const { auth } = useAuth();

  return (
    <ScrollableFeed>
      {messages &&
        messages?.map((msg, index) => (
          <div className="flex" key={msg?._id}>
            {(isSameSender(messages, msg, index, auth?._id) ||
              isLastMessage(messages, index, auth?._id)) && (
              <Tooltip
                label={msg.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={msg.sender.name}
                  src={msg.sender.pic}
                />
              </Tooltip>
            )}
            <span
              className={`bg-blue-100`}
              style={{
                marginLeft: isSameSenderMargin(messages, msg, index, auth._id),
                marginTop: isSameUser(messages, msg, index, auth._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                color: "black",
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
