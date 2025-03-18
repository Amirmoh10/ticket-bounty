"use client";

import { Placeholder } from "@/components/placeholder";

export default function Error({ error }: { error: Error }) {
  console.log("error compnent");
  return <Placeholder label={error.message ?? "Something went wrong!"} />;
}
