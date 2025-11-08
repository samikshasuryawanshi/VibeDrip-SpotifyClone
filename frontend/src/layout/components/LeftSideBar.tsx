import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignedIn } from "@clerk/clerk-react"
import {ScrollArea} from "@/components/ui/scroll-area"
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react"
import { Link } from "react-router-dom"
import PaylistSkeleton from "@/components/skeletons/PaylistSkeleton"
import { useEffect } from "react"
import { useMusicStore } from "@/stores/useMusicStore"

const leftSideBar = () => {
    //data fetching logic -> zustand 

   const {albums,fetchAlbums,isLoading} = useMusicStore();


   useEffect(() => {
    fetchAlbums();
   }, [fetchAlbums]);


   console.log({albums});


  return <div className="full flex flex-col gap-2">
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
    <div className="flex-1 rounded-lg bg-[linear-gradient(to_right,rgb(23,23,23),rgb(25,25,25),rgb(23,23,23))] p-3 shadow-lg">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-white px-2">
                <Library className="size-5 mr-2" />
                <span className="hidden md:inline">Playlists</span>
            </div>
        </div>


        <ScrollArea className="h-[calc(100vh-285px)]">
            <div className="space-y-2">
                {isLoading ? <PaylistSkeleton /> : (
                    albums.map((album) => (
                        <Link to={`/albums/${album._id}`}
                        key={album._id} 
                        className="p-2   hover:bg-[rgba(35,35,35)] rounded-md flex items-center gap-5 group cursor-pointer"
                        >
                            <img src={album.imageUrl} alt="PlayList image" className="size-10 rounded-md flex shrink-0 object-cover" />
                            <div className="flex-1 min-w-0 hidden md:block">
                                <p className="text-sm truncate">
                                    {album.title}
                                </p>
                                <p className="text-xs italic text-zinc-400 truncate">
                                    Album • {album.artist}
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </ScrollArea>
    </div>
    


  </div>
  
}

export default leftSideBar