import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  title?: string;
  children: React.ReactNode; // To pass Select, Checkbox, Slider components
}

const Sidebar: React.FC<SidebarProps> = ({ title = "Filters", children }) => {
  console.log("Rendering Sidebar with title:", title);

  // The actual filter components (Select, Checkbox, Slider) will be passed as children
  // from the parent page (e.g., RestaurantListingPage).
  return (
    <aside className="w-full md:w-72 lg:w-80 border-r border-gray-200 p-4 space-y-4 h-full">
      {title && (
        <>
          <h3 className="text-lg font-semibold">{title}</h3>
          <Separator className="my-2" />
        </>
      )}
      <ScrollArea className="h-[calc(100vh-12rem)] pr-3"> {/* Adjust height as needed */}
        <div className="space-y-6">
          {children ? children : <p className="text-sm text-gray-500">Filter controls will appear here.</p>}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;