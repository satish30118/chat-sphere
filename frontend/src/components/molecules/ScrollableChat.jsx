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
import { Text } from "@chakra-ui/react";

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
              style={{
                marginLeft: isSameSenderMargin(messages, msg, index, auth._id),
                marginTop: isSameUser(messages, msg, index, auth._id) ? 5 : 10,
                borderRadius: "8px",
                padding: "12px 22px",
                maxWidth: "75%",
                color: "black",
                background: "#dee6f2",
              }}
            >
              {msg?.content}
              <Text textAlign={"right"} fontSize={"xs"}>
                {new Date(msg?.updatedAt)?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </span>
          </div>
        ))}
    </ScrollableFeed> 
  );
};

export default ScrollableChat;
