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
        <div className="md:mx-10 mx-2 flex justify-between py-4">
          <div className="text-2xl font-semibold text-green-900">
            Bubbles
            <div className="text-xs font-light md:ml-7 ml-1 ">
              do more with your data.
            </div>
          </div>
          {/*<ThemeToggleButton initialTheme={initialTheme} />*/}
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 bg-gray-100 block border rounded-md h-fit text-sm"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 block bg-green-800 text-white h-fit text-sm rounded-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-green-50  overflow-hidden md:px-10 px-3 md:py-10 py-4 rounded-md min-h-[450px] border md:flex justify-center gap-16 relative">
        <div>
          <Image
            src="/pattern-1-redo.png"
            className="h-full absolute -left-42 top-0 opacity-50 md:block hidden"
            width={250}
            alt=""
            height={200}
          />

          <ProgressiveBlur
            height="13%"
            position="top"
            className="md:block hidden"
          />
          <ProgressiveBlur
            height="13%"
            position="bottom"
            className="md:block hidden"
          />
        </div>

        <Image
          src="/pattern-2-redo.png"
          className="h-full absolute -right-42 top-0 opacity-50 md:block hidden"
          width={250}
          alt=""
          height={200}
        />
        {/* This is the hero section. */}
        <div className="mt-10">
          <div className="text-3xl dark:text-green-900 text-green-900 font-medium mb-2 ">
            Stop Chatting{" "}
            <Highlighter action="underline" color="#0d542b">
              Alone
            </Highlighter>
            . Start Doing{" "}
            <Highlighter action="highlight" color="#7bf1a8">
              More.
            </Highlighter>
          </div>
          <div className="text-lg text-gray-700 md:w-[40ch] md:text-justify mb-4">
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

        <div className="aspect-square rounded-xl bg-white md:h-[410px] shadow-md px-2 py-2 mt-10 md:mt-0 overflow-clip">
          <AnimatedList className="w-full ">
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
        <div className="px-2 pr-4 rounded-sm py-2 border border-green-200 w-fit bg-green-50 text-gray-600 text-sm mt-10"></div>
      </div>
    </div>
  );
}
