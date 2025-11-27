import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import RegisterEmployee from "@/pages/RegisterEmployee";
import CaptureFace from "@/pages/CaptureFace";
import Attendance from "@/pages/Attendance";
import EmployeeList from "@/pages/EmployeeList";
import AttendanceLogs from "@/pages/AttendanceLogs";
import Analytics from "@/pages/Analytics";
import { DataProvider } from "@/lib/mockData";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/register" component={RegisterEmployee} />
      <Route path="/capture/:id" component={CaptureFace} />
      <Route path="/attendance" component={Attendance} />
      <Route path="/employees" component={EmployeeList} />
      <Route path="/logs" component={AttendanceLogs} />
      <Route path="/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider>
          <Toaster />
          <Router />
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
