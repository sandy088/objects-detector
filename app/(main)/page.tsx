import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Page() {
  return (
    <div className=" min-h-screen max-w-screen dark:bg-[#222222] bg-slate-50 flex flex-col justify-center items-center">
      <h1 className=" font-bold md:text-5xl text-2xl max-w-[800px] text-center mb-5">
        Welcome to Live Objects Detection Website
      </h1>
      <div className=" my-10 md:w-[242px] md:h-[279px] w-[177px] h-[205px] relative">
        <Image
          src={"/face-scan.png"}
          alt="object detection"
          loading="lazy"
          fill
          className=" animate-pulse"
        />
      </div>
      <div className=" flex flex-col gap-y-2.5">
        <Link href={"/object-detection"}>
          <Button className=" dark:bg-[#D9D9D9] dark:hover:bg-slate-300 rounded-full px-8">
            Lets Start <ArrowRight className=" h-5 w-5 ml-2" />
          </Button>
        </Link>
        <Button variant={"link"} className=" text-[#A4A4A4] underline">
          Github Repo <ArrowUpRight className=" h-5 w-5 ml-0.5" />
        </Button>
      </div>
    </div>
  );
}
