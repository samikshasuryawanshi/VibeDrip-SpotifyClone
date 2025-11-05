import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Play } from "lucide-react";

const formatDuration = (seconds:number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!currentAlbum) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-white">Album not found</p>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <ScrollArea className="h-full">
        <div className="relative min-h-[100vh] bg-gradient-to-b  from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 text-white">
          {/* Background gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-b  from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 px-4">
            <div className="flex p-6 gap-6 pb-8">
              <img 
                src={currentAlbum.imageUrl} 
                alt={currentAlbum.title} 
                className="w-[240px] h-[240px] shadow-xl rounded" 
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-5xl font-serif my-4">{currentAlbum.title}</h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white italic">{currentAlbum.artist}</span>
                  <span>• {currentAlbum.songs?.length || 0} songs</span>
                  <span>• {currentAlbum.releaseYear}</span>
                </div>
              </div>
            </div>


          </div>

          {/* play button */}
          <div className="px-6 relative pb-4 flex items-center gap-6">
            <Button size='icon'
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
            >
              <Play className="h-7 w-7 text-black"></Play>

            </Button>
          </div>

          {/* Table section */}

          <div className="backdrop-blur-sm">
            {/* table header */}

             <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
               <div>#</div>
               <div>Title</div>
               <div>Released Date</div>
               <div>
                <Clock className="h-5 w-5"></Clock>
               </div>
             </div>

             {/* songs */}

             <div className="px-6 ">
              <div className="space-y-2 py-4">
                {/* {currentAlbum?.songs.map((song, index) => ( */}
                  <div 
                  className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-2 py-2 text-sm text-zinc-400 border-b border-white/2  rounded-md group cursor-pointer hover:bg-zinc-800" 
                  > 
                    <div className="flex items-center justify-center">
                        <span className="group-hover:hidden transition-all">1</span>
                         <Play className="h-5 w-5 hidden group-hover:block transition-all"></Play>
                    </div>

                    <div className="flex items-center gap-3">
                      <img src="" alt="" 
                      className="size-10"
                      />

                      <div>
                        <div className="font-medium text-white">song title</div>
                        <div className="italic">song artist</div>
                      </div>

                    </div>
                    <div className="flex items-center">song.createdAt.split("T")[0]</div>
                    <div className="flex items-center">formatDuration(song.duration)</div>

                  </div>
                {/* ))} */}
              </div>

             </div>
             

          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;