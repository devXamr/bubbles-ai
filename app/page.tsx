import { cookies } from "next/headers";
import ThemeToggleButton from "./components/theme-toggle-button";
import Image from "next/image";
import { Tilt } from "@/components/motion-primitives/tilt";
import { Dot } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { AnimatedList } from "@/components/ui/animated-list";
import HeroHumanMessage from "./components/hero-human-message";
import HeroAIMessage from "./components/hero-ai-message";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import SingleClientReview from "./components/single-client-review";
import Link from "next/link";
import Dither from "@/components/Dither";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import MagicBento from "@/components/MagicBento";

export default async function Home() {
  const savedTheme = (await cookies()).get("color-theme");

  const initialTheme = savedTheme?.value || "light";

  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
  ];

  {
    /* dark mode later for this page. */
  }
  return (
    <div className="font-primary">
      <section className="px-3 py-3 font-primary mx-3 my-3">
        <div className="text-xs border w-fit px-1 bg-green-50 border-green-100  py-0.5">
          Your second brain, powered by AI
        </div>
        <div className="text-5xl mt-2">
          Capture Ideas.
          <br />
          <span className="text-green-600">Ask AI Anything.</span>
          <br /> Take Action.
        </div>
        <div className="text-lg mt-4 text-gray-600 ">
          The only knowledge management tool that feels as natural as texting a
          friend. Capture your thoughts instantly, and let AI transform them
          into actionable insights.
        </div>

        <button className="bg-gradient-to-br text-white font-semibold from-green-300 via-green-500 to-green-600 block w-full py-2 mt-5 rounded-sm ">
          Start Free Trial
        </button>

        <button className="block w-full py-2 rounded-sm border border-green-300 text-green-900 bg-green-100 mt-2">
          Watch Demo
        </button>

        <div>
          <div className="bg-gray-50 rounded-md border mt-5 px-3 py-2 shadow-md">
            <div className="max-w-[80%] ml-auto mt-3 bg-green-500 rounded-md px-3 text-white font-medium py-2">
              This is an human message here
            </div>
            <div className="max-w-[80%] text-gray-800 mr-auto px-4 py-2 bg-gray-200 mt-3 rounded-md ">
              This is an AI response for the message sent by the human.
            </div>
            <div className="max-w-[80%] ml-auto mt-3 bg-green-500 rounded-md px-3 text-white font-medium py-2">
              This is an human message here
            </div>
            <div className="max-w-[80%] text-gray-800 mr-auto px-4 py-2 bg-gray-200 mt-3 rounded-md ">
              This is an AI response for the message sent by the human.
            </div>

            <div className="w-full bg-white py-2 mt-4 px-1 rounded-md border flex justify-between">
              <div>This will be a dummy input</div>
              <div>send</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="text-3xl text-gray-900 text-left mt-10">
          Everything you need in{" "}
          <span className="text-green-600">one place.</span>
        </div>
        <div className="text-lg mt-2 text-gray-700  text-left mb-10">
          A complete knowledge management system designed for the way you
          actually think and work.
        </div>

        <div>
          <div className="border rounded-sm shadow-sm">
            <video width={1000} height={1000} muted autoPlay loop>
              <source src={"/send-animation.mp4"} type="video/mp4"></source>
            </video>

            <div className="px-3 pb-10">
              <div className="text-lg mt-4 font-medium ">
                WhatsApp-Style Interface
              </div>
              <div className="text-gray-600 mt-2">
                Capture ideas as naturally as chatting with a friend. No
                learning curve, just start typing and let your thoughts flow.
              </div>
            </div>
          </div>
          <div className="border rounded-sm shadow-sm mt-5">
            <video width={1000} height={1000} muted autoPlay loop>
              <source src={"/send-animation.mp4"} type="video/mp4"></source>
            </video>

            <div className="px-3 pb-10">
              <div className="text-lg mt-4 font-medium ">
                AI-Powered Insights{" "}
              </div>
              <div className="text-gray-600 mt-2">
                Ask questions, find patterns, and get actionable insights from
                your knowledge base. Your personal AI analyst, always ready.
              </div>
            </div>
          </div>
          <div className="border rounded-sm shadow-sm mt-5">
            <video width={1000} height={1000} muted autoPlay loop>
              <source src={"/send-animation.mp4"} type="video/mp4"></source>
            </video>

            <div className="px-3 pb-10">
              <div className="text-lg mt-4 font-medium ">
                One-Click Import/Export{" "}
              </div>
              <div className="text-gray-600 mt-2">
                Instantly import WhatsApp chats or export to PDF, DOCX, or TXT.
                Your data, your control, always portable.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div>Simple. Powerful, Intelligent.</div>
        <div>Three steps to transform how you manage knowledge</div>

        <div>
          <div>
            <div className="text-2xl px-6 py-3 rounded-full bg-green-200 w-fit">
              1
            </div>
            <div className="text-lg">Capture</div>
            <div>
              Type, paste, or import. Capture thoughts as naturally as sending a
              message. No formatting, no fuss.
            </div>
          </div>
          <div>
            <div className="text-2xl px-5 py-3 rounded-full bg-green-200 w-fit">
              2
            </div>
            <div>Capture</div>
            <div>
              Type, paste, or import. Capture thoughts as naturally as sending a
              message. No formatting, no fuss.
            </div>
          </div>
          <div>
            <div className="text-2xl px-5 py-3 rounded-full bg-green-200 w-fit">
              3
            </div>
            <div>Capture</div>
            <div>
              Type, paste, or import. Capture thoughts as naturally as sending a
              message. No formatting, no fuss.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
