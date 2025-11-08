import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar";
import FriendsActivity from "./components/FriendsActivity";
import { ErrorBoundaryWrapper } from "@/components/ErrorBoundaryWrapper";
import AudioPlayer from "./components/AudioPlayer";
import PlaybackControls from "./components/PlaybackControls";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    }
  })

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >

         <AudioPlayer />
        {/* Left Sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
          className="bg-[linear-gradient(to_right,rgb(17,17,17),rgb(22,22,22),rgb(17,17,17))] rounded-md p-2"
        >
          <LeftSideBar />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Main Content */}
        <ResizablePanel
          defaultSize={isMobile ? 80 : 60}
          className="rounded-md overflow-hidden"
        >
          <Outlet />
        </ResizablePanel>

        
        {!isMobile && (
          <>
            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

            {/* Right Sidebar (Friends Activity) */}
            <ResizablePanel
              defaultSize={20}
              minSize={0}
              maxSize={25}
              collapsedSize={0}
              className="bg-[linear-gradient(to_right,rgb(17,17,17),rgb(22,22,22),rgb(17,17,17))] rounded-md p-2"
            >
              <ErrorBoundaryWrapper>
                <FriendsActivity />
              </ErrorBoundaryWrapper>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>



      <PlaybackControls />
    </div>
  );
};

export default MainLayout;
