import { z } from "zod";

export async function fetchWithSchema<T>(
  url: string,
  schema: z.ZodSchema<T>
): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network error");
  }

  const json = await response.json();

  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Validation failed");
  }

  return parsed.data;
}