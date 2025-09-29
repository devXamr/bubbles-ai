"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

async function fetchLocalMessages() {
  const allMessages = localStorage.getItem("localMessages");

  if (!allMessages) {
    return [];
  } else return JSON.parse(allMessages);
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);

  useEffect(() => {
    fetchLocalMessages().then(setMessageList);
  }, []);

  useEffect(() => {
    localStorage.setItem("localMessages", JSON.stringify(messageList));
  }, [messageList]);

  function handleMessageSubmission() {
    console.log("Here is the message that was sent", message);

    if (messageList) {
      setMessageList((prev) => [...prev, message]);
      setMessage("");
    }
  }
  return (
    <div className="flex flex-col h-screen">
      <div>This will be the top bar</div>
      <div className="flex-1 w-[650px] border border-red-500 mx-auto">
        {messageList &&
          messageList.length > 0 &&
          messageList.map((eachMessage) => (
            <div
              key={uuidv4()}
              className="border w-fit ml-auto py-4 px-6 my-2 rounded-md border-gray-200 bg-green-100 text-gray-800 text-sm max-w-[80%]"
            >
              {eachMessage}
            </div>
          ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMessageSubmission();
        }}
        className=" border w-fit border-gray-400 rounded-md inset- text-md mx-auto mb-2"
      >
        <textarea
          className="h-30 w-[550px] py-3 px-2 outline-0 text-gray-600"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit" className="px-4 border">
          Send
        </button>
      </form>
    </div>
  );
}
