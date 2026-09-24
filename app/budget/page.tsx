import { ChartBarInteractive } from "@/components/bar-chart";
import { ChartLine } from "@/components/line-chart";
import { ChartPie } from "@/components/pie-chart";
import React from "react";



const budget = () => {
  return (
    <>
      {/* <div className="p-5">budget</div> */}

      <div className="grid grid-cols-3 gap-4 p-5 ">
        <div className="col-span-2">
          <ChartLine />
        </div>
        <div>
          <ChartPie />
        </div>
        <div className="h-10 col-span-3">
          <ChartBarInteractive />
        </div>
      </div>
    </>
  );
};

export default budget;
