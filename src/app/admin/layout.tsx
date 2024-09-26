import { DashboardIcon, SizeIcon } from "@radix-ui/react-icons";
import { LayoutIcon, ScaleIcon, Settings } from "lucide-react";
import React from "react";
import { CgSize } from "react-icons/cg";
import { IoScale } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import LayoutClientAdmin from "./components/layoutClient";

export default function AdminLayout({children}:{children:Readonly<React.ReactNode>}){
  return <div className="flex h-screen ">
    <LayoutClientAdmin/>
    <div className=" border-t border-l h-full w-full p-3 ">
      {children}
    </div>
  </div>
}