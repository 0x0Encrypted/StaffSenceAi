import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FaceCamera } from "@/components/FaceCamera";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function CaptureFace() {
  const { id } = useParams();
  const { employees, updateEmployeeFaceSamples } = useData();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const employee = employees.find(e => e.empId === id);
  
  const [samples, setSamples] = useState(0);
  const TOTAL_SAMPLES = 20;
  
  const handleCapture = () => {
    if (samples < TOTAL_SAMPLES) {
      setSamples(prev => prev + 1);
      toast({
        title: "Sample Captured",
        description: `Image ${samples + 1}/${TOTAL_SAMPLES} saved.`,
        duration: 1000,
      });
    }
  };

  const handleFinish = () => {
    if (employee) {
      updateEmployeeFaceSamples(employee.id, samples);
    }
    toast({
      title: "Registration Complete",
      description: "Employee face data has been trained successfully.",
      className: "bg-green-500 text-white",
    });
    setLocation("/employees");
  };

  if (!employee) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-bold">Employee Not Found</h2>
          <Button className="mt-4" onClick={() => setLocation("/register")}>Back to Registration</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Face Data Capture</h1>
          <p className="text-muted-foreground">Training model for {employee.name} ({employee.empId})</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="p-6">
              <FaceCamera 
                mode="register" 
                onCapture={handleCapture}
                className="w-full aspect-video rounded-lg"
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t p-6">
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{samples} / {TOTAL_SAMPLES} samples</span>
                </div>
                <Progress value={(samples / TOTAL_SAMPLES) * 100} className="h-3" />
              </div>
              
              <div className="flex justify-between w-full pt-4">
                <div className="text-sm text-muted-foreground">
                  Click "Capture Sample" on the camera view
                </div>
                <Button 
                  onClick={handleFinish} 
                  disabled={samples < 5}
                  className={samples >= TOTAL_SAMPLES ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {samples >= TOTAL_SAMPLES ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Finish Training
                    </>
                  ) : (
                    "Finish & Save"
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
