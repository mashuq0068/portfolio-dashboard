
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"


 function TopBar() {
  return (
     
     
        <header className="sticky z-50 top-0 flex shrink-0 items-center bg-[#F1F8FF] gap-2 border-b  p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 bg-gray-500 h-4" />
          <div className="ml-auto text-end">
          
          </div>
        </header>
    
    
  )
}
export default TopBar