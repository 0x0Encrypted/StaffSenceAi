import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaceCamera } from "@/components/FaceCamera";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Watermark } from "@/components/Watermark";
import { useData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Attendance() {
  const { employees, markAttendance } = useData();
  const [detectedEmployee, setDetectedEmployee] = useState<string | null>(null);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'info' | 'error'}>({ text: "Looking for faces...", type: "info" });
  const { toast } = useToast();

  // Simulation logic for face detection
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly pick an employee to "detect" every few seconds
      const randomEmp = employees[Math.floor(Math.random() * employees.length)];
      
      if (Math.random() > 0.7) { // 30% chance to detect someone
        setDetectedEmployee(randomEmp.name);
        setMessage({ text: `Face Detected: ${randomEmp.name}`, type: "success" });
        
        // Mark attendance
        markAttendance(randomEmp.empId);
        
        toast({
          title: "Attendance Marked",
          description: `${randomEmp.name} (${randomEmp.empId}) marked present at ${new Date().toLocaleTimeString()}`,
          variant: "default",
          className: "bg-green-500 text-white border-none"
        });

        // Reset after 3 seconds
        setTimeout(() => {
          setDetectedEmployee(null);
          setMessage({ text: "Looking for faces...", type: "info" });
        }, 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [employees, markAttendance, toast]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-slate-800">
              <ArrowLeft className="mr-2 h-4 w-4" /> Exit Kiosk
            </Button>
          </Link>
          <div className="text-white">
            <h1 className="font-bold text-lg">StaffSense AI</h1>
            <p className="text-xs text-slate-400">Live Attendance System</p>
          </div>
        </div>
        <div className="text-right text-white">
          <div className="text-2xl font-mono font-bold">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-xs text-slate-400">
            {new Date().toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
        <div className="w-full max-w-4xl relative">
          <FaceCamera 
            mode="attendance" 
            detectedName={detectedEmployee || undefined}
            className="w-full aspect-video rounded-xl border-4 border-slate-800 shadow-2xl"
          />
          
          {/* Status Banner */}
          <div className={`mt-6 p-4 rounded-lg flex items-center justify-center gap-3 text-lg font-medium transition-colors ${
            message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 
            'bg-slate-900 text-slate-400 border border-slate-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : (
              <AlertCircle className="h-6 w-6 animate-pulse" />
            )}
            {message.text}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          <Card className="bg-slate-900 border-slate-800 text-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-green-400">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Operational
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800 text-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Camera Source</CardTitle>
            </CardHeader>
            <CardContent>
              Default Webcam (USB)
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800 text-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Last Sync</CardTitle>
            </CardHeader>
            <CardContent>
              Just now
            </CardContent>
          </Card>
        </div>
      </div>

      <Watermark />
    </div>
  );
}
