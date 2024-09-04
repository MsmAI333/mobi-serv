import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import AllJobs from "./pages/AllJobs.jsx";
import NewJob from "./pages/NewJob.jsx";
import ProductAnalysis from "./pages/ProductAnalysis.jsx";
import Customers from "./pages/Customers.jsx";
import Login from "./pages/Login.jsx";
import RevenueDetails from "./pages/RevenueDetails.jsx";
import EditJob from "./pages/EditJob.jsx";
import TotalRevenueStatistics from "./pages/TotalRevenueStatistics.jsx";
import RevenueAnalysis from "./pages/RevenueAnalysis.jsx";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/all-jobs" element={<AllJobs />} />
            <Route path="/new-job" element={<NewJob />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/product-analysis" element={<ProductAnalysis />} />
            <Route path="/login" element={<Login />} />
            <Route path="/revenue-details" element={<RevenueDetails />} />
            <Route path="/edit-job/:id" element={<EditJob />} />
            <Route path="/total-revenue-statistics" element={<TotalRevenueStatistics />} />
            <Route path="/revenue-analysis" element={<RevenueAnalysis />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;