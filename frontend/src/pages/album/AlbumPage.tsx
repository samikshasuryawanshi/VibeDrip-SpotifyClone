import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const {currentSong,isPlaying,playAlbum,togglePlay} = usePlayerStore();

  useEffect(() => {
    if (albumId) {
      console.log("Fetching album with ID:", albumId);
      fetchAlbumById(albumId);
    }
  }, [fetchAlbumById, albumId]);

  // Debug: Log the current album data
  useEffect(() => {
    if (currentAlbum) {
      console.log("Current Album:", currentAlbum);
      console.log("Songs:", currentAlbum.songs);
    }
  }, [currentAlbum]);

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

  const songs = currentAlbum.songs || [];
  const hasSongs = songs.length > 0;

  const handlePlayAlbum = () =>{
    if(!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(song => song._id === currentSong?._id);

    if(isCurrentAlbumPlaying) togglePlay();
    else{
      //start playing the album from the start
      playAlbum(currentAlbum?.songs,0);
    }
  }


  const handlePlaySong = (index:number) => {
    if(!currentAlbum) return;
    playAlbum(currentAlbum?.songs,index)
  }

  return (
    <div className="h-screen">
      <ScrollArea className="h-full">
        <div className="relative min-h-[100vh] text-white">
          {/* Background gradient */}
          <div 
            className="absolute inset-0 h-[100vh] bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 ">
            <div className="flex p-6 gap-6 pb-8">
              <img 
                src={currentAlbum.imageUrl} 
                alt={currentAlbum.title} 
                className="w-[240px] h-[240px] shadow-xl rounded" 
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-5xl font-bold my-4">{currentAlbum.title}</h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">{currentAlbum.artist}</span>
                  <span>• {songs.length} songs</span>
                  <span>• {currentAlbum.releaseYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Play button */}
          <div className="px-6 relative pb-4 flex items-center gap-6">
            <Button 
             onClick={handlePlayAlbum}
              size="icon"
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              disabled={!hasSongs}
            >
              {isPlaying && currentAlbum?.songs.some(song => song._id === currentSong?._id) ? (
                <Pause className="h-7 w-7 text-black fill-black" />
              ):(
                <Play className="h-7 w-7 text-black fill-black" />
              )}
            </Button>
          </div>

          {/* Table section */}
          <div className="backdrop-blur-sm bg-[linear-gradient(to_right,rgb(17,17,17),rgb(22,22,22),rgb(17,17,17))] ">
            {/* Table header */}
            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
              <div>#</div>
              <div>Title</div>
              <div>Released Date</div>
              <div>
                <Clock className="h-5 w-5" />
              </div>
            </div>

            {/* Songs */}
            <div className="px-6">
              <div className="space-y-2 py-4">
                {hasSongs ? (
                  songs.map((song, index) => {
                    // Handle case where song might be just an ID string
                    if (typeof song === 'string') {
                      return (
                        <div key={song} className="px-4 py-2 text-zinc-500">
                          Song ID: {song} (not populated)
                        </div>
                      );
                    }

                    const isCurrentSong = currentSong?._id === song._id;


                    return (
                      
                      <div 
                        key={song._id}
                        onClick={() => handlePlaySong(index)}
                        className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 rounded-md group cursor-pointer hover:bg-white/5 transition-colors"
                      > 
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <div className="flex items-end justify-center gap-[3px] h-5 w-6">
                              <span className="w-[2px] bg-green-400 animate-[equalize_0.6s_ease-in-out_infinite]"></span>
                              <span className="w-[2px] bg-green-400 animate-[equalize_0.6s_ease-in-out_infinite_0.2s]"></span>
                              <span className="w-[2px] bg-green-400 animate-[equalize_0.6s_ease-in-out_infinite_0.4s]"></span>
                            </div>
                          ):(
                            <span className="group-hover:hidden">{index+1}</span>
                          )}
                          {!isCurrentSong && (
                            <Play className="h-4 w-4 hidden group-hover:block fill-white" />
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <img 
                            src={song.imageUrl || currentAlbum.imageUrl} 
                            alt={song.title || 'Song'}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div>
                            <div className="font-medium text-white">
                              {song.title || 'Unknown Title'}
                            </div>
                            <div className="text-zinc-400">
                              {song.artist || 'Unknown Artist'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          {song.createdAt 
                            ? new Date(song.createdAt.toString()).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })
                            : 'N/A'
                          }
                        </div>

                        <div className="flex items-center">
                          {song.duration ? formatDuration(song.duration) : '0:00'}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-zinc-400 py-8">
                    <p className="text-lg">No songs in this album</p>
                    <p className="text-sm mt-2">This album hasn't been populated with songs yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;