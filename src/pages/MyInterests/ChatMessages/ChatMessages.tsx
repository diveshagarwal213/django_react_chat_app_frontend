import { useNavigate, useParams } from "react-router-dom";
import { useRetrieveMyInterestApiHook } from "../../../hooks/ApiHooks/InterestApiHooks/InterestApiHooks";
import { BackArrowIconButton } from "../../../UI/Buttons/IconButtons";
import { useEffect, useRef, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { PrimarySendMessageIcon } from "../../../UI/Icons/Icons";
import {
  useCreateChatMessageApiHook,
  useListChatMessagesApiHook,
} from "../../../hooks/ApiHooks/ChatMessageApiHooks/ChatMessageApiHooks";
import { ChatMessageT } from "../../../interfaces/chat_messages.interface";
import useUserStateHook from "../../../hooks/StateHooks/useUserStateHook";

function Message({
  chat_message,
  current_user_id,
}: {
  chat_message: ChatMessageT;
  current_user_id: number;
}) {
  const is_me = current_user_id === chat_message.user;
  if (is_me)
    return (
      <div className="flex justify-between px-2">
        <div></div>
        <div className="relative  max-w-[40%] px-3 py-1 rounded-md bg-primary text-white">
          {chat_message.message}
          <div
            className="bg-primary"
            style={{
              position: "absolute",
              height: "5px",
              width: "30px",
              top: "0",
              right: "-3px",
              borderRadius: "8px",
            }}
          ></div>
        </div>
      </div>
    );
  return (
    <div className="flex justify-between px-2">
      <div className="relative  max-w-[40%] px-3 py-1 rounded-md bg-gray-100 text-black">
        <div
          className="bg-gray-100"
          style={{
            position: "absolute",
            height: "5px",
            width: "30px",
            top: "0",
            left: "-3px",
            borderRadius: "8px",
          }}
        ></div>

        {chat_message.message}
      </div>
      <div></div>
    </div>
  );
}

function ChatMessages() {
  //sys
  const params = useParams();
  const navigate = useNavigate();

  //global_states
  const user = useUserStateHook((state) => state.user);

  //states
  const [input, set_input] = useState("");

  //refs
  const bottom = useRef<HTMLDivElement | null>(null);

  //Api hooks
  const { data: my_interests } = useRetrieveMyInterestApiHook(
    params["interest_id"],
    !!params["interest_id"]
  );
  const { data: my_chats } = useListChatMessagesApiHook(
    { interest_id: params["interest_id"], ordering: "-id" },
    { enabled: !!params["interest_id"] }
  );
  const { mutateAsync: create_chat } = useCreateChatMessageApiHook();

  //handlers
  function handleSend() {
    if (!input) return;
    create_chat({
      interest_id: my_interests?.data.id,
      data: {
        message: input,
      },
    });
    console.log(input);
    set_input("");
  }
  function handle_input_field_key_up(e: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["Enter", "NumpadEnter"];
    if (keys.includes(e.code)) {
      handleSend();
    }
  }

  //effects
  useEffect(() => {
    if (bottom.current) {
      bottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [my_chats]);

  return (
    <div>
      <div className="flex shadow-sm justify-between items-center p-2">
        <BackArrowIconButton size="small" onClick={() => navigate(-1)} />
        <div>
          {my_interests?.data.user.first_name ? (
            <span className="w-full text-left">
              {my_interests?.data.user.first_name} &nbsp;
              {my_interests?.data.user.last_name}
            </span>
          ) : (
            my_interests?.data.user.phone_number
          )}
        </div>
        <div></div>
      </div>
      <div
        style={{
          height: "calc(100dvh - 100px)",
        }}
        className="primary-padding flex justify-center items-center flex-col"
      >
        <div className="flex-grow flex flex-col gap-2 overflow-y-auto  w-full max-w-2xl p-1">
          {user?.id &&
            my_chats?.data
              .reverse()
              .map((item) => (
                <Message chat_message={item} current_user_id={user.id} />
              ))}
          {!my_chats?.data.length && (
            <p className="text-sm w-full text-center text-gray-400">No chats</p>
          )}
          <div ref={bottom} />
        </div>
        <div className="w-full max-w-md">
          <TextField
            onKeyUp={handle_input_field_key_up}
            onChange={(e) => set_input(e.target.value)}
            value={input}
            fullWidth
            color="primary"
            placeholder="type here..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* <Uploader file={image} setFile={setImage} upload={upload} /> */}
                  <IconButton
                    color="primary"
                    // disabled={query_loading}
                    size="medium"
                    onClick={handleSend}
                  >
                    <PrimarySendMessageIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatMessages;
