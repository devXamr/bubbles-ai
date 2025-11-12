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
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const supabase = Supabase();
  async function handleFormSubmit() {
    if (email === "") {
      setError(true);
    }
    setError(false);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/change-password",
    });

    if (error) {
      console.log(
        "There was an error while trying to reset the password: ",
        error
      );
    } else {
      console.log("Mail sent!");
      setMailSent(true);
    }
  }

  return (
    <div className="md:w-md md:mx-auto mx-4 mt-10 md:mt-10">
      {mailSent ? (
        <Card>
          <CardTitle>Mail Sent</CardTitle>
          <CardDescription>
            A mail has been sent to you for confirmation.
          </CardDescription>
        </Card>
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
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {error && <FieldError>The email cannot be empty.</FieldError>}
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
