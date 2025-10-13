"use client";

import { TextShimmer } from "@/components/motion-primitives/text-shimmer";

import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Message from "../components/message";
import axios from "axios";
import {
  downloadDOCX,
  downloadPDF,
  downloadTXT,
  getCurrentDate,
  getCurrentTime,
} from "../utils";
import FileSaveButton from "../components/file-save-button";
import { LoaderCircle, SendHorizontal, WandSparkles } from "lucide-react";
import { motion } from "motion/react";
import { UUID } from "crypto";

async function fetchLocalMessages() {
  const allMessages = localStorage.getItem("localMessages");

  if (!allMessages) {
    return [];
  } else return JSON.parse(allMessages);
}

export type MessageType = {
  id: string;
  message: string;
  date: string;
  time: string;
  type: "prompt" | "message";
  response?: string;
};

export default function Chat() {
  const [message, setMessage] = useState<string>("");

  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchModeActive, setSearchModeActive] = useState(false);
  const [aiResponseLoading, setAiResponseLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLocalMessages().then(setMessageList);
  }, []);

  useEffect(() => {
    localStorage.setItem("localMessages", JSON.stringify(messageList));
  }, [messageList]);

  function handleMessageDeletion(deletionMessage: MessageType) {
    console.log("This is the message sent for deletion ", deletionMessage);

    const filteredMessages = messageList.filter(
      (eachMessage) => eachMessage.id != deletionMessage.id
    );

    // add another state value for recentlyDeletedMessage to undo easily.

    setMessageList(filteredMessages);
  }

  function handleMessageEdit(
    editedMessage: string,
    previousMessage: MessageType
  ) {
    const index = messageList.findIndex(
      (message) => message.id === previousMessage.id
    );

    let editedMessageList = [...messageList];

    console.log("This is the copied messageList", editedMessageList);

    editedMessageList[index] = {
      id: messageList[index].id,
      message: editedMessage,
      date: messageList[index].date,
      time: messageList[index].time,
      type: messageList[index].type,
    };

    console.log(
      "Here's the array after the edit was made, ",
      editedMessageList
    );

    setMessageList(editedMessageList);
  }

  async function handleAiMessageSubmission() {
    setMessage("");
    setAiResponseLoading(true);
    console.log("The message was passed onto the ai message handler");

    const date = getCurrentDate();
    const time = getCurrentTime();

    // Dummy response. TODO: get the actual one by calling the /ai-interact endpoint.
    const response = await axios.post(
      "http://192.168.29.240:3000/api/ai-interact",
      // todo: filter the data so that only user messages are send and ai responses are avoided to avoid data bloat.
      { question: message, messageList: JSON.stringify(messageList) }
    );

    console.log("here's the response from the ai", response.data.answer);

    if (messageList) {
      setMessageList((prev) => [
        ...prev,
        {
          id: uuidv4(),
          message: message,
          date: date,
          time: time,
          type: "prompt",
          response: response.data.answer,
        },
      ]);
    }

    setAiResponseLoading(false);
  }

  function handleMessageSubmission() {
    console.log("Here is the message that was sent", message);

    if (searchModeActive) {
      handleAiMessageSubmission();
    } else {
      const date = getCurrentDate();
      const time = getCurrentTime();
      if (messageList) {
        setMessageList((prev) => [
          ...prev,
          {
            id: uuidv4(),
            message: message,
            date: date,
            time: time,
            type: "message",
          },
        ]);
        setMessage("");
      }
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
      <div className="border-b border-gray-200 flex justify-between py-2">
        This will be the top bar
        <div>
          <input
            type="text"
            className="py-2 border outline-0 border-gray-200 rounded-md mx-3 px-3 text-sm"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Search here..."
            value={searchTerm}
          />
        </div>
      </div>

      <div className="ml-auto relative">
        <button
          className="px-3 py-2 rounded-md border border-gray-200 mt-3 mr-3 shadow-md hover:shadow-sm cursor-pointer text-sm"
          onClick={() => setShowModal((prev) => !prev)}
        >
          Export
        </button>

        <div className="relative">
          {showModal && (
            <div className="flex flex-col w-40 absolute top-4 right-2 border px-1 py-1 border-gray-200 rounded-md">
              <button
                onClick={() => {
                  downloadTXT(messageList);
                }}
                className="border px-3 py-2 rounded-md border-gray-200 hover:shadow-sm cursor-pointer text-sm text-gray-900 hover:bg-gray-50"
              >
                Download .txt
              </button>
              <button
                onClick={() => {
                  downloadPDF(messageList);
                }}
                className="border px-3 py-2 rounded-md border-gray-200 hover:shadow-sm cursor-pointer text-sm text-gray-900 hover:bg-gray-50 mt-1"
              >
                Download PDF
              </button>

              <button
                onClick={() => downloadDOCX(messageList)}
                className="border px-3 py-2 rounded-md border-gray-200 hover:shadow-sm cursor-pointer text-sm text-gray-900 hover:bg-gray-50 mt-1"
              >
                Download .docx
              </button>
            </div>
          )}
        </div>
      </div>
      <motion.div
        layout
        className="flex-1 lg:w-[650px] w-full border border-gray-200 my-3 rounded-xl bg-gray-50 px-4 py-4 mx-auto max-h-[640px] -mt-10 overflow-y-scroll scrollbar-hidden"
      >
        <motion.div layout>
          {messageList && messageList.length > 0 && searchTerm === ""
            ? messageList.map((eachMessage) => (
                <Message
                  eachMessage={eachMessage}
                  searchWords={searchTerm}
                  messageDeletionFunction={handleMessageDeletion}
                  messageEditFunction={handleMessageEdit}
                />
              ))
            : messageList
                .filter((eachMessage) =>
                  eachMessage.message.includes(searchTerm)
                )
                .map((eachMessage) => (
                  <Message
                    eachMessage={eachMessage}
                    searchWords={searchTerm}
                    messageDeletionFunction={handleMessageDeletion}
                    messageEditFunction={handleMessageEdit}
                  />
                ))}

          {aiResponseLoading && (
            <TextShimmer className="text-sm px-3 py-1">
              Loading Response..
            </TextShimmer>
          )}
        </motion.div>
      </motion.div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMessageSubmission();
        }}
        className=" border lg:w-[650px] w-full border-gray-300 rounded-md text-md mx-auto mb-2"
      >
        <textarea
          className="h-28 w-full  py-3 px-2 outline-0 text-gray-600 placeholder-gray-300"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Add a new message here..."
        />

        <div className="ml-auto w-fit">
          <button
            disabled={aiResponseLoading}
            className={`text-gray-400  text-sm border rounded-md px-2 py-2 my-1 mx-2 cursor-pointer transition-colors  ${
              searchModeActive &&
              !aiResponseLoading &&
              "bg-green-100 border-green-500 text-green-800 "
            }`}
            onClick={() => {
              setSearchModeActive((prev) => !prev);
            }}
            type="button"
            title="AI Assistant"
          >
            {aiResponseLoading ? (
              <LoaderCircle size="20px" className="animate-spin" />
            ) : (
              <WandSparkles size="20px" />
            )}
          </button>
          <button
            type="submit"
            className="text-gray-400 border border-gray-200 rounded-md px-2 py-2 my-1 mr-2 hover:bg-gray-100 cursor-pointer text-sm hover:border-gray-300"
            title="Send"
          >
            <SendHorizontal size="20px" />
          </button>
        </div>
      </form>
    </div>
  );
}
