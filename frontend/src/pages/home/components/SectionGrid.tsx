import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import type {Song} from "@/types"
import PlayButton from "./PlayButton";

type SectionGridProps = {
    title:String;
    songs:Song[];
    isLoading:boolean;
}
const SectionGrid = ({songs,title,isLoading}:SectionGridProps) => {
    // console.log(title,songs);

    if(isLoading) return <SectionGridSkeleton />
    
  return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
            <Button variant='link' className="text-sm text-zinc-400 cursor-pointer hover:text-white">
                Show All
            </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {songs.map((song) => (
                <div key={song._id} className="bg-zinc-800/50 rounded-md hover:bg-zinc-700/30 transition-all group cursor-pointer px-3 py-2">
                    <div className="relative mb-5">
                        <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                            <img src={song.imageUrl} alt={song.title} className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-95" />
                            {/* add play button */}
                        </div>
                        <PlayButton song={song} />
                    </div>

                    <p className="text-sm mb-2 truncate">{song.title}</p>
                    <p className="text-xs truncate text-zinc-400 italic">{song.artist}</p>
                </div>
            ))}

        </div>
            
      </div>
    )
}

export default SectionGrid