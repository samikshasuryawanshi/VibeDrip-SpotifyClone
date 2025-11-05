import { useChatStore } from "@/stores/useChatStore"
import { useUser } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";

const FriendsActivity = () => {
    const {users, isLoading, error, fetchUsers} = useChatStore();
    const {user} = useUser();

    console.log("Users from store:", users);
    console.log("Current user:", user);
    
    useEffect(() => {
       if(user) {
         console.log("Fetching users...");
         fetchUsers();
       }
    }, [fetchUsers, user]);

    const isPlaying = true;

    return (
      <div className="h-full rounded-lg flex flex-col">
        <div className="p-4 flex justify-between items-center border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Users className="size-5 shrink-0" />
            <h2 className="text-sm italic text-zinc-400">What they're listening to</h2>
          </div>
        </div>

        {!user && <LoginPrompt />}

        {user && (
          <>
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <p className="text-zinc-400">Loading...</p>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {!isLoading && !error && users.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-zinc-400">No other users found</p>
              </div>
            )}

            {!isLoading && !error && users.length > 0 && (
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                  {users.map((user) => (
                    <div 
                      key={user._id} 
                      className="cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                            <img 
                              src={user.imageUrl} 
                              alt={user.fullName}
                              className="size-10 rounded-full object-cover"
                            />
                          
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 bg-zinc-500" aria-hidden="true"></div>     
                        </div>
                        <div className="flex-1 min-w-0">
                             <div className="flex items-center gap-1">
                                <span className="font-medium text-sm text-white">{user.fullName.split(" ")[0]}</span>
                                {isPlaying && <Music className="size-3.5 text-emerald-500 shrink-0" />}
                             </div>

                             {isPlaying ? (
                               <div className="mt-1">
                                 <div className=" text-xs text-zinc-300 font-medium truncate">
                                  Cardigan
                                 </div>
                                 <div className="text-xs text-zinc-400 truncate italic">by Taylor Swift</div>
                               </div>
                             ) : (
                               <div className="mt-1 text-xs text-zinc-400">Idle</div>
                             )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </>
        )}
      </div>
    );
}

export default FriendsActivity;

const LoginPrompt = () => (
  <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
    <div className='relative'>
      <div
        className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
        aria-hidden='true'
      />
      <div className='relative bg-zinc-900 rounded-full p-4'>
        <HeadphonesIcon className='size-8 text-emerald-400' />
      </div>
    </div>

    <div className='space-y-2 max-w-[250px]'>
      <h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
      <p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
    </div>
  </div>
)