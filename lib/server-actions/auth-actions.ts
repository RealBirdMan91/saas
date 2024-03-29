"use server";

import { z } from "zod";
import { FormSchema } from "../types";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

const cookieStore = cookies();

const supabase = createClient(cookieStore);

export async function actionLoginUser(data: z.infer<typeof FormSchema>) {
  const { email, password } = data;
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (data?.length) return { error: { message: "User already exists", data } };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });
  return response;
}
