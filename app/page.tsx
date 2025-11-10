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
    <div className="font-primary bg-[#0D0D0D]">
      <div>
        <div className="md:mx-10 mx-2 flex justify-between py-4 bg-[#0D0D0D]">
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

      <div className="bg-green-50 justify-between  overflow-hidden flex rounded-md min-h-[450px] md:flex  relative">
        <div className="w-full h-[450px]">
          <Dither
            waveColor={[0.1, 0.4, 0.9]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
          />
        </div>
        <div className="w-[50%] absolute text-white bg-black">
          <div className="w-fit mx-auto mt-[10%] font-semibold text-3xl text-left">
            Personal Knowledge Management <br />
            For Those That want to do more.
          </div>
          <div className="text-gray-200 w-[62%] mx-auto mt-1">
            Bubbles was built to capture your thoughts and notes in a way that
            would make them useful for your future self combined with state of
            the art tools to maximize productivity.
          </div>
          <div className="w-[62%] mx-auto pb-40">
            <AvatarCircles
              avatarUrls={avatars}
              className="mt-5"
              numPeople={99}
            />
            <div className="text-xs mt-1 text-gray-200">
              Many people have already tried Bubbles. Join them today!
            </div>
            <button className="text-sm font-medium block mt-4 bg-gray-800 px-5 py-2">
              Sign Up
            </button>
          </div>
        </div>
        <div className="h-full w-[50%] absolute right-0">
          <AnimatedList className="w-[50%] mx-auto bg-black shadow-2xl h-[410px] mt-5 rounded-md px-3 py-4 overflow-clip ">
            <HeroHumanMessage message="Pick a book for me" />
            <HeroAIMessage message="Atomic Habits 📚" />
            <HeroHumanMessage message="Where should I travel next?" />
            <HeroAIMessage message="Italy! 🇮🇹🎉" />
            <HeroHumanMessage message="What's my most recent todo?" />
            <HeroAIMessage message="Take max for a walk. 🐱" />
          </AnimatedList>
        </div>

        {/* This is the hero section. */}
      </div>
    </div>
  );
}
