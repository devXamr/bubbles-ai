import { cookies } from "next/headers";
import ThemeToggleButton from "./components/theme-toggle-button";

export default async function Home() {
  const savedTheme = (await cookies()).get("color-theme");

  const initialTheme = savedTheme?.value || "light";
  return (
    <div className="font-primary">
      <div>
        <div>
          This is the navbar
          <ThemeToggleButton initialTheme={initialTheme} />
        </div>
      </div>

      <div className="bg-green-50 px-10 py-10 mx-3 my-3 rounded-md min-h-[250px] flex justify-center gap-16">
        {/* This is the hero section. */}
        <div className="mt-10">
          <div className="text-3xl dark:text-green-900 text-green-900 font-medium mb-2">
            Stop Chatting Alone. Start Doing{" "}
            <span className="py-1 px-2 bg-green-700/20 text-green-700">
              More.
            </span>
          </div>
          <div className="text-lg text-gray-800 w-[40ch] text-justify">
            Bubbles turns your private notes into actionable insights. Chat with
            yourself, or let our AI help you analyze, plan, and create from the
            data you already store.
          </div>{" "}
        </div>

        <div className="aspect-square rounded-md bg-gray-100 h-[300px]"></div>
      </div>

      <div>
        <div>Features / Sections</div>
        <div>
          <div>
            Your Personal Chat Hub Store thoughts, ideas, and notes
            effortlessly. No more switching apps or losing context.
          </div>
          <div>
            AI-Powered Insights Turn your chats into actionable plans, content,
            and roadmaps with a single click.
          </div>
          <div>
            Make Data Work for You Everything you store becomes more than just
            notes—Bubbles helps you extract value, patterns, and opportunities.
          </div>
          <div>
            Always Private, Always Yours Your data is yours alone. Chat, plan,
            and brainstorm without worrying about privacy.
          </div>
        </div>
      </div>
      <div>
        <div>
          A v1 with all the fundamental features of bubbles is in development,
          register your interest to know when bubbles launches.
        </div>
        <form>
          <input />
          <button>Send</button>
        </form>

        <div>
          Your email will NOT be spammed or shared with anyone. Our promise.
        </div>
      </div>
    </div>
  );
}
