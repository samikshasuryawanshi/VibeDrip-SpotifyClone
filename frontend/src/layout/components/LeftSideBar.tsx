import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignedIn } from "@clerk/clerk-react"
import {ScrollArea} from "@/components/ui/scroll-area"
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react"
import { Link } from "react-router-dom"
import PaylistSkeleton from "@/components/skeletons/PaylistSkeleton"

const leftSideBar = () => {

    const isLoading = false;


  return <div className="h-full flex flex-col gap-2">
    {/* Navigation menu */}

    <div className="rounded-md bg-[linear-gradient(to_right,rgb(25,25,25),rgb(30,30,30),rgb(25,25,25))] shadow-lg p-3">
        <div className="space-y-3">
            <Link to={"/"}
            className={cn(buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-700"
            }))}
            >
              <HomeIcon className="mr-2 size-5" />
              <span className="hidden md:inline">Home</span>
            </Link>


            <SignedIn>
                 <Link to={"/chat"}
                    className={cn(buttonVariants({
                        variant: "ghost",
                        className: "w-full justify-start text-white hover:bg-zinc-700"
                    }))}
                    >
                    <MessageCircleIcon className="mr-2 size-5" />
                    <span className="hidden md:inline">Message</span>
                </Link>
            </SignedIn>
        </div>
    </div>


    {/* library section */}
    <div className="flex-1 rounded-lg bg-[linear-gradient(to_right,rgb(25,25,25),rgb(30,30,30),rgb(25,25,25))] p-3 shadow-lg">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-white px-2">
                <Library className="size-5 mr-2" />
                <span className="hidden md:inline">Playlists</span>
            </div>
        </div>


        <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
                {isLoading ? <PaylistSkeleton /> : "some music"}
            </div>
        </ScrollArea>
    </div>
    


  </div>
  
}

export default leftSideBar