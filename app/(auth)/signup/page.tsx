"use client";

import { useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { SignupForm } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [name, setName] = useState("");

  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const nav = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleUserCreation(
    id: string | undefined,
    email: string | undefined,
    name: string | undefined
  ) {
    const creation = await supabase.from("user-data").insert({
      email: email,
      userId: id,
      name: name,
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
    console.log("signup request submitted. here is the data", {
      password: password,
      name: name,
      email: email,
    });

    if (password !== confirmedPassword) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);
    const signup = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (signup.error) {
      console.log("There was an error signing you up.");
    } else {
      setFormSubmitted(true);
      console.log("data after signing up", signup.data.user);

      handleUserCreation(
        signup.data.user?.id,
        signup.data.user?.email,
        signup.data.user?.user_metadata.name
      );

      console.log("after the function was called");
    }
  }

  return (
    <div>
      {formSubmitted ? (
        <Card className="px-5 mx-5 mt-10 md:w-[30%] md:mx-auto">
          <CardTitle className="text-center">Link Sent!</CardTitle>
          <CardDescription>
            Please check your email for a confirmation link.
          </CardDescription>
        </Card>
      ) : (
        <Card className="md:w-[30%] md:mx-auto md:mt-10">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit();
              }}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your
                    email with anyone else.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                  />
                  {passwordMismatch && (
                    <FieldError>
                      Please ensure that both passwords match and try again.
                    </FieldError>
                  )}
                  <FieldDescription>
                    Please confirm your password.
                  </FieldDescription>
                </Field>
                <FieldGroup>
                  <Field>
                    <Button type="submit">Create Account</Button>
                    <Button variant="outline" type="button">
                      Sign up with Google
                    </Button>
                    <FieldDescription className="px-6 text-center">
                      Already have an account? <a href="#">Sign in</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
