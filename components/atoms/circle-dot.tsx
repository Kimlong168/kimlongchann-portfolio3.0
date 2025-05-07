import { cn } from "@/lib/utils";
import React from "react";

export const CircleDot = ({ bgColor }: { bgColor: string }) => {
  return <div className={cn("w-3 h-3 rounded-full", bgColor)} />;
};
