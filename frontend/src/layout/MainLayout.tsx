import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar";

const MainLayout = () =>{
    const isMobile = false;
    return <div className="h-screen bg-black text-white flex flex-col">
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
            {/* left SideBar */}
            <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30} className="bg-[linear-gradient(to_right,rgb(17,17,17),rgb(22,22,22),rgb(17,17,17))] rounded-md p-2">
                <LeftSideBar />
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

            {/* Main Content */}
            <ResizablePanel defaultSize={isMobile ? 80 : 60} className=" rounded-md">
                <Outlet />
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />


            {/* Right SideBar */}
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0} className="bg-[linear-gradient(to_right,rgb(17,17,17),rgb(22,22,22),rgb(17,17,17))]  rounded-md p-2">
                friends activity 
            </ResizablePanel>


        </ResizablePanelGroup>
    </div>
}
export default MainLayout;