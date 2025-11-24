"use client";
import { v4 as uuidv4 } from "uuid";

import Highlighter from "react-highlight-words";
import { text } from "stream/consumers";
import { Dispatch, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EllipsisVertical } from "lucide-react";

import Markdown from "react-markdown";

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
import { RowComponentProps } from "react-window";
import { CheckBox } from "docx";
import { Checkbox } from "@/components/ui/checkbox";

type messageProps = {
  messages: MessageType[];
  searchWords: string;
  messageDeletionFunction: (deletionMessage: MessageType) => void;
  messageEditFunction: (
    editedMessage: string,
    previousMessage: MessageType
  ) => void;
};

export default function Message({
  messages,
  searchWords,
  messageDeletionFunction,
  messageEditFunction,
  isSelectActive,
  selectionTogglerFunction,
  allMessagesSelected,
  index,
  style,
}: RowComponentProps<{
  messages: MessageType[];
  searchWords: string;
  messageDeletionFunction: (deletionMessage: MessageType) => void;
  messageEditFunction: (
    editedMessage: string,
    previousMessage: MessageType
  ) => void;
  isSelectActive: boolean;
  selectionTogglerFunction: (id: string) => void;
  allMessagesSelected: boolean;
}>) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedMessage, setEditedMessage] = useState<string>(
    messages[index].message
  );

  const [isBoxChecked, setIsBoxChecked] = useState(false);

  useEffect(() => {
    if (allMessagesSelected === true) {
      setIsBoxChecked(true);
    } else {
      setIsBoxChecked(false);
    }
  }, [allMessagesSelected]);

  if (messages[index].type === "prompt") {
    return (
      <div style={style}>
        <div className="px-3 dark:bg-[#2A2A2A] py-3 rounded-lg border-gray-200 lg:max-w-[70%] max-w-[85%] mx-2 lg:mx-0 mr-auto bg-gray-100 my-3">
          <div className="bg-gray-200 text-xs rounded-md py-2 px-3 text-gray-500 dark:bg-[#252525]">
            <div className="font-medium dark:text-[#9CA3AF]">Query</div>
            <Highlighter
              textToHighlight={messages[index].message}
              searchWords={[searchWords]}
              highlightStyle={{ backgroundColor: "yellow" }}
            />
          </div>
          <div className="text-sm px-1 py-2 text-gray-800 dark:text-gray-100">
            <Markdown>{messages[index].response}</Markdown>
          </div>

          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 py-2 px-1">
            <div>{messages[index].date}</div>
            <div>{messages[index].time}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={style} className="flex w-fit ml-auto max-w-[100%] gap-2">
      <div className="w-[100%] ml-auto">
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
                    messageEditFunction(editedMessage, messages[index]);
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
            <ContextMenuItem
              onClick={() => messageDeletionFunction(messages[index])}
            >
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
              className="min-w-[20%] w-fit ml-auto my-2 rounded-md max-w-[80%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              transition={{ ease: "easeIn", duration: 0.3 }}
            >
              <div
                key={uuidv4()}
                className="border relative flex w-full ml-auto overflow-hidden  py-4 px-3 border-gray-200 dark:border-gray-800 bg-green-100 dark:bg-[#1E3D29] transition-colors duration-100 hover:bg-green-200 dark:hover:bg-green-900 text-gray-800 dark:text-white text-sm rounded-md rounded-b-none"
              >
                <Highlighter
                  textToHighlight={messages[index].message}
                  searchWords={[searchWords]}
                  highlightStyle={{ backgroundColor: "yellow" }}
                />
              </div>

              <AnimatePresence>
                <motion.div
                  initial={{ y: -3, opacity: 0 }}
                  animate={{ y: 0, opacity: 100 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-2 ml-auto py-0.5 w-full bg-green-50 dark:bg-green-950 text-xs text-gray-400 bg:text-gray-100 justify-between border border-gray-100 dark:border-green-950 border-0.5 px-2 rounded-b-md"
                >
                  <div>{messages[index].date}</div>
                  <div>{messages[index].time}</div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </ContextMenuTrigger>
        </ContextMenu>
      </div>
      {isSelectActive && (
        <Checkbox
          className="bg-white mt-3 size-4 mr-1"
          checked={isBoxChecked}
          onCheckedChange={(e) => {
            setIsBoxChecked((prev) => !prev);
            selectionTogglerFunction(messages[index].id);
          }}
        />
      )}
    </div>
  );
}
