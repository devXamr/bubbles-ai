"use client";
import { v4 as uuidv4 } from "uuid";

import Highlighter from "react-highlight-words";
import { text } from "stream/consumers";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type messageProps = {
  eachMessage: string;
  searchWords: string;
};
export default function Message({ eachMessage, searchWords }: messageProps) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <motion.div className="w-fit ml-auto my-2 rounded-md max-w-[80%]">
      <div
        key={uuidv4()}
        className="border ml-auto  py-4 px-6 border-gray-200 bg-green-100 transition-colors duration-100 hover:bg-green-200 text-gray-800 text-sm "
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Highlighter
          textToHighlight={eachMessage}
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
            <div>12/01/25</div>
            <div>2:00pm</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
