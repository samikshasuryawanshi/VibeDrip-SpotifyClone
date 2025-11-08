import  { useAuthStore } from "@/stores/useAuthStore"
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongTabsContent from "./components/SongTabsContent";
import AlbumsTabsContent from "./components/AlbumsTabsContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";


const AdminPage = () => {
    const {isAdmin,isLoading} = useAuthStore();
    const {fetchAlbums,fetchSongs,fetchStats} = useMusicStore();

    useEffect(() => {
        fetchAlbums();
        fetchSongs();
        fetchStats();

    },[fetchAlbums,fetchSongs,fetchStats]);

    if(!isAdmin && !isLoading) return <div className="text-center text-red-500 text-sm ">Unauthorized</div>



  return <div className="bg-[linear-gradient(to_top_right,rgb(14,14,14),rgb(15,15,15),rgb(19,19,19),rgb(15,15,15),rgb(14,14,14))] min-h-screen text-zinc-100 p-8">

    <Header />
    <DashboardStats />

    <Tabs defaultValue="songs" className="flex cursor-pointer mt-5">
        <TabsList className="p-1 bg-zinc-800/50">
            <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700">
                <Music className="mr-1 size-5" />
                <span className="text-lg">Songs</span>
            </TabsTrigger>
             <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700">
                <Album className="mr-1 size-5" />
                <span className="text-lg">Albums</span>
            </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
            <SongTabsContent />
        </TabsContent>
        <TabsContent value="albums">
            <AlbumsTabsContent />
        </TabsContent>

    </Tabs>


  </div>
}

export default AdminPage