import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SearchIcon } from "lucide-react"
import { ComboboxDemo } from "./compSearch"
import { MdSearchOff } from "react-icons/md"
import { CgSearch } from "react-icons/cg"


export default function SearchDrawer(){
  return <Drawer setBackgroundColorOnScale={false} >
  <DrawerTrigger><CgSearch className="w-6 mt-1 h-6"/></DrawerTrigger>
  <DrawerContent className="h-2/3">
    <DrawerHeader>
      <DrawerTitle></DrawerTitle>
      <DrawerDescription></DrawerDescription>
    </DrawerHeader>
    <div className="w-screen flex justify-center items-center">
      <ComboboxDemo/>
    </div>
  </DrawerContent>
</Drawer>

}