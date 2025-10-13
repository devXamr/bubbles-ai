"use client";
import { v4 as uuidv4 } from "uuid";

import Highlighter from "react-highlight-words";
import { text } from "stream/consumers";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EllipsisVertical } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { MessageType } from "../chat/page";

type messageProps = {
  eachMessage: MessageType;
  searchWords: string;
  messageDeletionFunction: (deletionMessage: MessageType) => void;
  messageEditFunction: (
    editedMessage: string,
    previousMessage: MessageType
  ) => void;
};

export default function Message({
  eachMessage,
  searchWords,
  messageDeletionFunction,
  messageEditFunction,
}: messageProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedMessage, setEditedMessage] = useState<string>(
    eachMessage.message
  );

  console.log("This is the eachMessage that message has received");

  if (eachMessage.type === "prompt") {
    return (
      <div className="px-3 py-3 rounded-lg border-gray-200 max-w-[70%] mr-auto bg-gray-100 my-3">
        <div className="bg-gray-200 text-xs rounded-md py-2 px-3 text-gray-500">
          <div className="font-medium">Query</div>
          <Highlighter
            textToHighlight={eachMessage.message}
            searchWords={[searchWords]}
            highlightStyle={{ backgroundColor: "yellow" }}
          />
        </div>
        <div className="text-sm px-1 py-2 text-gray-800">
          {eachMessage.response}
        </div>

        <div className="flex justify-between text-xs text-gray-500 py-2 px-1">
          <div>{eachMessage.date}</div>
          <div>{eachMessage.time}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>

            <input
              type="text"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="py-3 text-sm px-2 border rounded-md my-4"
            />

            <div className="flex ml-auto w-fit gap-2">
              <button
                onClick={() => {
                  messageEditFunction(editedMessage, eachMessage);
                  setIsDialogOpen(false);
                }}
                className="text-sm bg-green-100 px-3 py-2 rounded-lg border border-green-300 hover:shadow-sm hover:bg-green-200 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-sm bg-red-100 px-3 py-2 rounded-lg border border-red-300 hover:shadow-sm hover:bg-red-200 cursor-pointer"
              >
                Cancel Changes
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <ContextMenu>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => messageDeletionFunction(eachMessage)}>
            Delete Message
          </ContextMenuItem>

          <ContextMenuItem
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            Edit Message
          </ContextMenuItem>
        </ContextMenuContent>

        <ContextMenuTrigger>
          <motion.div
            layout
            className="w-fit ml-auto my-2 rounded-md max-w-[80%]"
          >
            <div
              key={uuidv4()}
              className="border relative flex ml-auto  py-4 px-3 border-gray-200 bg-green-100 transition-colors duration-100 hover:bg-green-200 text-gray-800 text-sm rounded-md"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Highlighter
                textToHighlight={eachMessage.message}
                searchWords={[searchWords]}
                highlightStyle={{ backgroundColor: "yellow" }}
              />
            </div>

            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ y: -3, opacity: 0 }}
                  animate={{ y: 0, opacity: 100 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-2 ml-auto py-0.5 bg-green-50 text-xs text-gray-400 w-full justify-between border border-gray-100 border-0.5 px-2 rounded-b-md"
                >
                  <div>{eachMessage.date}</div>
                  <div>{eachMessage.time}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  );
}
