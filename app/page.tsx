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
    <div className="font-primary bg-gray-50">
      <div>
        <div>
          This is the navbar
          <ThemeToggleButton initialTheme={initialTheme} />
        </div>
      </div>

      <div className="bg-green-50  overflow-hidden px-10 py-10 rounded-md min-h-[450px] border flex justify-center gap-16 relative">
        <div>
          <Image
            src="/pattern-1-redo.png"
            className="h-full absolute -left-42 top-0 opacity-50"
            width={250}
            alt=""
            height={200}
          />

          <ProgressiveBlur height="13%" position="top" />
          <ProgressiveBlur height="13%" position="bottom" />
        </div>

        <Image
          src="/pattern-2-redo.png"
          className="h-full absolute -right-42 top-0 opacity-50"
          width={250}
          alt=""
          height={200}
        />
        {/* This is the hero section. */}
        <div className="mt-10">
          <div className="text-3xl dark:text-green-900 text-green-900 font-medium mb-2">
            Stop Chatting{" "}
            <Highlighter action="underline" color="#0d542b">
              Alone
            </Highlighter>
            . Start Doing{" "}
            <Highlighter action="highlight" color="#7bf1a8">
              More.
            </Highlighter>
          </div>
          <div className="text-lg text-gray-700 w-[40ch] text-justify mb-4">
            Bubbles turns your private notes into actionable insights. Chat with
            yourself, or let our AI help you analyze, plan, and create from the
            data you already store.
          </div>{" "}
          <AvatarCircles numPeople={99} avatarUrls={avatars} />
          <button className="px-4 py-2 bg-green-800 text-gray-200 mt-5 font-medium rounded-xs outline-1 outline-green-700 outline-offset-1 hover:bg-green-700 transition-colors duration-75 cursor-pointer shadow-lg hover:shadow-sm">
            Try Now
          </button>
          <div className="text-xs mt-2 text-gray-700">No login required.</div>
        </div>

        <div className="aspect-square rounded-xl bg-white h-[410px] shadow-md px-2 py-2 overflow-clip">
          <AnimatedList className="w-full">
            <HeroHumanMessage message="Pick a book for me" />
            <HeroAIMessage message="Atomic Habits 📚" />
            <HeroHumanMessage message="Where should I travel next?" />
            <HeroAIMessage message="Italy! 🇮🇹🎉" />
            <HeroHumanMessage message="What's my most recent todo?" />
            <HeroAIMessage message="Take max for a walk. 🐱" />
          </AnimatedList>
        </div>
      </div>

      <div className="max-w-[60%] mx-auto">
        <div className="px-4 py-2 border w-fit bg-green-50 text-gray-600 text-sm mt-10">
          <div className="flex gap-0">
            <Dot size={20} className="text-green-500 animate-pulse" />
            <div>Features</div>
          </div>
        </div>

        <div className="mt-10">
          <div className="border border-green-200 px-5 py-5 flex gap-10 justify-between my-4 bg-green-50 relative shadow-sm">
            <div className="w-[50ch] sticky top-3 h-fit">
              <div className="text-xl font-medium text-green-800">
                Your Personal Chat Hub
              </div>
              <div>
                Store thoughts, ideas, and notes effortlessly. No more switching
                apps or losing context.
              </div>
            </div>
            <div className="aspect-video w-[500px] h-[300px] bg-gray-100"></div>
          </div>

          <div className="border px-5 py-5 flex gap-10 justify-between my-4 border-green-200 bg-green-50 relative shadow-sm">
            <div className="w-[50ch] sticky top-3 h-fit">
              {" "}
              <div className="text-xl font-medium text-green-800">
                AI-Powered Insights
              </div>
              <div>
                Turn your chats into actionable plans, content, and roadmaps
                with a single click.
              </div>
            </div>

            <Tilt rotationFactor={15} isRevese>
              <div className="aspect-square w-[300px] h-[300px] bg-gray-100"></div>
            </Tilt>
          </div>

          <div className="border px-5 py-5 flex gap-10 justify-between my-4 border-green-200 bg-green-50 relative shadow-sm">
            <div className="w-[50ch] sticky top-3 h-fit">
              <div className="text-xl font-medium text-green-800">
                Make Data Work for You.
              </div>

              <div>
                Everything you store becomes more than just notes—Bubbles helps
                you extract value, patterns, and opportunities.
              </div>
            </div>

            <div className="aspect-square w-[300px] h-[300px] bg-gray-100"></div>
          </div>
          <div className="border px-5 py-5 flex gap-10 justify-between my-4 border-green-200 bg-green-50 relative shadow-sm">
            <div className="w-[50ch] sticky top-3 h-fit">
              <div className="text-xl font-medium text-green-800">
                Always Private, Always Yours
              </div>

              <div>
                Your data is yours alone. Chat, plan, and brainstorm without
                worrying about privacy.
              </div>
            </div>

            <div className="aspect-square w-[300px] h-[300px] bg-gray-100"></div>
          </div>
        </div>
      </div>
      <div className="w-[60%] mx-auto border px-10 py-10 bg-green-800 text-white">
        <div className="grid grid-cols-2">
          <div className="text-xl">
            A v1 with all the fundamental features of bubbles is in development,
            register your interest to know when bubbles launches.
          </div>
          <form>
            <input className="px-4 py-2 outline-1" />
            <button className="block w-full px-4 py-2 border bg-green-900 border-green-900 rounded-sm mt-2">
              Submit
            </button>
          </form>
        </div>

        <div className="text-gray-200 font-light">
          Your email will NOT be spammed or shared with anyone. Our promise.
        </div>
      </div>
    </div>
  );
}
