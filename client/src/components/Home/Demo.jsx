import React from "react";
import { Timeline } from "../ui/timeline";
import { Valintine } from "../days/Valinetine";
import { Teddy } from "../days/Teddy";
import { Kiss } from "../days/Kiss";
import { HugDay } from "../days/Hug";
import { ChocolateDay } from "../days/Chocolate";
import Promise from "../days/Promise";

export function TimelineDemo() {
  const data = [
    {
      title: " Valentine Day",
      content: (
        <div className="h-[800px] overflow-y-auto overflow-x-hidden">
          <Valintine />
        </div>
      ),
    },
    {
      title: "Teddy Data",
      content: (
        <div className="h-[800px] overflow-y-auto overflow-x-hidden">
          <Teddy isPreview={true} />
        </div>
      ),
    },
    {
      title: "Kiss Day",
      content: (
        <div>
          <Kiss isPreview={true} />
        </div>
      ),
    },
    {
      title: "Hug Day",
      content: (
        <div>
          <HugDay isPreview={true} />
        </div>
      ),
    },
    {
      title: "Chocolate Day",
      content: (
        <div>
          <ChocolateDay isPreview={true} />
        </div>
      ),
    },
    {
      title: "Promise Day",
      content: (
        <div>
          <Promise isPreview={true} />{" "}
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
