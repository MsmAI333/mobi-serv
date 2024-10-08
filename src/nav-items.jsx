import { HomeIcon, ListIcon, UsersIcon, BarChart2Icon, PlusCircleIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import AllJobs from "./pages/AllJobs.jsx";
import NewJob from "./pages/NewJob.jsx";
import ProductAnalysis from "./pages/ProductAnalysis.jsx";
import Customers from "./pages/Customers.jsx";
import Login from "./pages/Login.jsx";
import RevenueDetails from "./pages/RevenueDetails.jsx";
import EditJob from "./pages/EditJob.jsx";
import RevenueAnalysis from "./pages/RevenueAnalysis.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "All Jobs",
    to: "/all-jobs",
    icon: <ListIcon className="h-4 w-4" />,
    page: <AllJobs />,
  },
  {
    title: "New Job",
    to: "/new-job",
    icon: <PlusCircleIcon className="h-4 w-4" />,
    page: <NewJob />,
  },
  {
    title: "Customers",
    to: "/customers",
    icon: <UsersIcon className="h-4 w-4" />,
    page: <Customers />,
  },
  {
    title: "Product Analysis",
    to: "/product-analysis",
    icon: <BarChart2Icon className="h-4 w-4" />,
    page: <ProductAnalysis />,
  },
  {
    title: "Login",
    to: "/login",
    icon: <UsersIcon className="h-4 w-4" />,
    page: <Login />,
  },
  {
    title: "Revenue Details",
    to: "/revenue-details",
    icon: <BarChart2Icon className="h-4 w-4" />,
    page: <RevenueDetails />,
  },
  {
    title: "Edit Job",
    to: "/edit-job/:id",
    icon: <ListIcon className="h-4 w-4" />,
    page: <EditJob />,
  },
  {
    title: "Revenue Analysis",
    to: "/revenue-analysis",
    icon: <BarChart2Icon className="h-4 w-4" />,
    page: <RevenueAnalysis />,
  },
];