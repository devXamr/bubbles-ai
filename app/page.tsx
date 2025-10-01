"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Message from "./components/message";
import { browser } from "process";
import { downloadTXT } from "./utils";

async function fetchLocalMessages() {
  const allMessages = localStorage.getItem("localMessages");

  if (!allMessages) {
    return [];
  } else return JSON.parse(allMessages);
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

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

  function handleMessageListExport() {
    if (messageList.length < 1) {
      console.log("You have no messages to export");
      return;
    }

    const downloadContent = JSON.stringify(messageList);
    console.log("here's the content that will be downloaded ", downloadContent);
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="border-b border-gray-200 shadow-sm flex justify-between py-2">
        This will be the top bar
        <div>
          <input
            type="text"
            className="py-2 border outline-0 border-gray-200 rounded-md mx-3 px-3"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
          />
        </div>
      </div>

      <div className="ml-auto">
        <button
          className="px-3 py-2 rounded-md border border-gray-200 mt-3 mr-3 shadow-md hover:shadow-sm cursor-pointer text-sm"
          onClick={() => setShowModal((prev) => !prev)}
        >
          Export
        </button>

        {showModal && (
          <div>
            <button
              onClick={() => {
                downloadTXT(messageList);
              }}
            >
              Download TXT
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 w-[650px] border border-red-500 mx-auto">
        {messageList && messageList.length > 0 && searchTerm === ""
          ? messageList.map((eachMessage) => (
              <Message eachMessage={eachMessage} searchWords={searchTerm} />
            ))
          : messageList
              .filter((eachMessage) => eachMessage.includes(searchTerm))
              .map((eachMessage) => (
                <Message eachMessage={eachMessage} searchWords={searchTerm} />
              ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMessageSubmission();
        }}
        className=" border w-fit border-gray-400 rounded-md text-md mx-auto mb-2"
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
