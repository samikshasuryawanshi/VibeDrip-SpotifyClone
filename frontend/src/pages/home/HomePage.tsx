import Topbar from "@/components/Topbar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {

  const {fetchFeaturedSongs,fetchMadeForYouSongs,fetchTrendingSongs,isLoading,featuredSongs,madeForYouSongs,trendingSongs} = useMusicStore();


  const {initializeQueue} = usePlayerStore();


  useEffect(() => {
    fetchFeaturedSongs(); 
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs,fetchMadeForYouSongs,fetchTrendingSongs]);

  useEffect(() => {
    if(madeForYouSongs.length > 0 && trendingSongs.length > 0 && featuredSongs.length > 0){
      const allSongs = [...madeForYouSongs,...trendingSongs,...featuredSongs];
      initializeQueue(allSongs);
    }

  },[initializeQueue,madeForYouSongs,trendingSongs,featuredSongs])



  return (
    <main className="main bg-[linear-gradient(to_top,rgb(16,16,16),rgb(20,20,20),rgb(16,16,16))] h-screen overflow-auto">
      <Topbar />

      <ScrollArea>
         <div className="px-4 py-2">
           <h1 className="text-xl sm:text-2xl mt-2">Mood :)</h1>
           <FeaturedSection />
         </div>


         <div className="space-y-8 px-4">
           <SectionGrid title="Made For You" songs={madeForYouSongs}  isLoading={isLoading} />
           <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />
         </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage