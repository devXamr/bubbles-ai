"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MessageType } from "../chat/page";
import { toast } from "sonner";

/*  This is the type of message that has to be added.

id: string;
  message: string;
  date: string;
  time: string;
  type: "prompt" | "message";
  response?: string;*/

type FileImportHandlerTypes = {
  importerFunc: (messages: MessageType[]) => void;
};

export default function FileImportHandler({
  importerFunc,
}: FileImportHandlerTypes) {
  const [file, setFile] = useState<File | null | string>(null);
  const [importedMessages, setImportedMessages] = useState<MessageType[]>([]);

  function handleImportClicked() {
    if (importedMessages.length < 1) {
      return;
    }

    importerFunc(importedMessages);
    setFile(null);
    setImportedMessages([]);
  }

  function parseWhatsapp(text: string) {
    const lines = text.split("\n");
    const messages = [];

    // Example pattern:
    // 22/05/2025, 5:26 pm - Ammar: message text
    const regex =
      /^(\d{1,2}\/\d{1,2}\/\d{4}), (\d{1,2}:\d{2}\s?[ap]m) - ([^:]+): (.*)$/i;

    for (const line of lines) {
      const match = line.match(regex);

      if (match) {
        const [, date, time, sender, message] = match;

        messages.push({
          id: uuidv4(),
          message: message,
          date: date,
          time: time.replace(" ", " "), // replace weird unicode space
          type: "message" as const,
        });
      } else {
        // Continuation of previous message
        if (messages.length > 0) {
          messages[messages.length - 1].message += "\n" + line;
        }
      }
    }

    return messages;
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;

      const splitMessages = parseWhatsapp(text);

      console.log("These are the split up messages", splitMessages);
      setFile(text);
      setImportedMessages(splitMessages);
    };

    reader.readAsText(selectedFile);
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleImportClicked}>Done</button>
    </div>
  );
}
