import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore"

const FeaturedSection = () => {

    const {isLoading,featuredSongs,error} = useMusicStore();

    if(isLoading) return <FeaturedGridSkeleton />

    if(error) return <p className="text-red-500 mb-4 text-lg">{error}</p>


    return <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">

       {featuredSongs.map((song) => (

        <div key={song._id} className="flex items-center bg-[linear-gradient(to_right,rgb(22,22,22),rgb(30,30,30),rgb(22,22,22))] shadow-md rounded-md overflow-hidden hover:bg-zinc-700 transition-colors group cursor-pointer relative">

           <div className="overflow-hidden  w-14 sm:w-16 h-14 sm:h-16">
              <img src={song.imageUrl} alt={song.title} className="h-full w-full group-hover:scale-110 transition-transform duration-300 bg-zinc-700 object-cover flex shrink-0" />
           </div>

           <div className="flex-1 p-4">
              <p className="text-sm font-medium truncate">{song.title.split(" ").slice(0, 2).join(" ")}</p>
              <p className="text-xs text-zinc-500 truncate">{song.artist}</p>
           </div>
        </div>
        //to do play button

       ))}
    </div>
  
}

export default FeaturedSection