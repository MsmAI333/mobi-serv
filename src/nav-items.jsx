import { HomeIcon, PlusCircleIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import NewJob from "./pages/NewJob.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "New Job",
    to: "/new-job",
    icon: <PlusCircleIcon className="h-4 w-4" />,
    page: <NewJob />,
  },
];