"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  function handleMessageSubmission() {
    console.log("Here is the message that was sent", message);
    setMessage("");
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1"></div>
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
