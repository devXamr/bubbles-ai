"use client";
import { Supabase } from "@/app/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const supabase = Supabase();
  const nav = useRouter();
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [redirectTime, setRedirectTime] = useState(3000);

  function redirectToChat() {
    nav.push("/chat");
  }
  useEffect(() => {
    if (passwordChanged) {
      redirectToChat();
    }
  }, [passwordChanged]);
  async function fetchSession() {
    const userSession = await supabase.auth.getUser();

    console.log(
      "This is the user session from the change password page, ",
      userSession.data.user
    );
  }
  useEffect(() => {
    fetchSession();
  }, []);

  async function handleFormSubmit() {
    if (password === "") {
      setError(true);
    }
    setError(false);
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.log(
        "There was an error while trying to reset the password: ",
        error
      );
    } else {
      console.log("Password changed!");
      setPasswordChanged(true);
    }
  }
  return (
    <div className="md:w-md md:mx-auto mx-4 mt-10 md:mt-10">
      {passwordChanged ? (
        <div>Your password was changed successfully, redirecting now.</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Reset password</CardTitle>
            <CardDescription>
              Enter your email below to reset your password
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
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="password"
                    placeholder="m@example.com"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <Button type="submit">Login</Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
