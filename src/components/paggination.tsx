import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { TrackPreviousIcon } from "@radix-ui/react-icons"
import { StepBackIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

export default function PaginationCustom({page,setPage}:{page:number,setPage:Dispatch<SetStateAction<number>>}){
  return <Pagination>
  <PaginationContent>
    <PaginationItem>
       <button onClick={()=>{
        setPage(prev => {
          if(prev === 1){
            return prev
          }
          prev--
          return prev
        })
      }}> &#60; </button>
    </PaginationItem>
    <PaginationItem>
        <h1>
          1
        </h1>
       
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <button onClick={()=>{
        alert(page)
        setPage(prev => {
          prev++
          return prev
        })
      }}>&#62;</button>
    </PaginationItem>
  </PaginationContent>
</Pagination>

}
