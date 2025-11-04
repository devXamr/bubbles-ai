"use client";

import { useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleUserCreation(id, email) {
    const creation = await supabase.from("user-data").insert({
      email: email,
      userId: id,
    });

    if (creation.error) {
      console.log("There was an error during user creation", creation.error);
    } else {
      console.log(
        "This is the data that was returned while creating the user in sb: ",
        creation.data
      );
    }
  }
  async function handleFormSubmit() {
    console.log("signup request submitted.");

    const signup = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (signup.error) {
      console.log("There was an error signing you up.");
    } else {
      console.log("data after signing up", signup.data.user);

      handleUserCreation(signup.data.user?.id, signup.data.user?.email);

      console.log("after the function was called");
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
      >
        <div>
          <div>Email</div>
          <input
            type="text"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div>Password</div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
