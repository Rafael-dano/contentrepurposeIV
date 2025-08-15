// textGeneration.js
import OpenAI from "openai";
import { supabase } from "./supabaseClient";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Make sure this is in your .env
});

// Free tier users can do 50 requests/month
const FREE_TIER_LIMIT = 50;

export async function generateContent(userId, prompt) {
  // 1. Get usage count for this user
  const { data, error } = await supabase
    .from("user_usage")
    .select("count")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // If it's not "no rows" error, throw it
    console.error("Error fetching usage:", error);
    throw new Error("Unable to check usage at this time.");
  }

  // If user has no row yet, default to 0
  const usageCount = data?.count || 0;

  // 2. Block if over limit
  if (usageCount >= FREE_TIER_LIMIT) {
    throw new Error("⚠️ Usage limit reached. Please upgrade your plan.");
  }

  // 3. Call OpenAI
  let outputText = "";
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    outputText = response.choices[0].message.content;
  } catch (err) {
    console.error("OpenAI API error:", err);
    throw new Error("There was a problem generating your content. Please try again.");
  }

  // 4. Increment usage count in Supabase
  const { error: upsertError } = await supabase
    .from("user_usage")
    .upsert(
      { user_id: userId, count: usageCount + 1 },
      { onConflict: "user_id" } // ensures same row is updated
    );

  if (upsertError) {
    console.error("Error updating usage:", upsertError);
  }

  return outputText;
}
