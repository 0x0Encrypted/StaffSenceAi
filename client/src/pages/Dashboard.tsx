import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, UserCheck, ArrowRight, Camera } from "lucide-react";
import { Link } from "wouter";
import { useData } from "@/lib/mockData";
import { FaceCamera } from "@/components/FaceCamera";

export default function Dashboard() {
  const { employees, attendanceLogs } = useData();
  const [showCameraTest, setShowCameraTest] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendanceLogs.filter(log => log.date === today).length;

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to StaffSense AI Admin Panel</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
              <p className="text-xs text-muted-foreground">+1 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAttendance}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((todayAttendance / employees.length) * 100)}% Present
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attendanceLogs.filter(l => l.date === today && l.status === "Present").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Live Camera Test Section */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Live Camera Test</CardTitle>
            </CardHeader>
            <CardContent>
              {showCameraTest ? (
                <div className="space-y-4">
                  <FaceCamera className="w-full h-[300px]" />
                  <Button variant="outline" onClick={() => setShowCameraTest(false)}>
                    Stop Camera
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25">
                  <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Check webcam functionality</p>
                  <Button onClick={() => setShowCameraTest(true)}>Start Camera Test</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Logs Preview */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {attendanceLogs.slice(0, 5).map((log) => (
                  <div className="flex items-center" key={log.id}>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{log.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.empId} • {log.time}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-sm text-green-600">
                      {log.status}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/logs">
                  <a className="flex items-center text-sm font-medium text-primary hover:underline">
                    View all logs <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/register">
            <a className="block">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Add Employee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Register new staff members and capture face data.</p>
                </CardContent>
              </Card>
            </a>
          </Link>
          <Link href="/attendance">
            <a className="block">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Live Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Launch the kiosk mode for employee check-ins.</p>
                </CardContent>
              </Card>
            </a>
          </Link>
          <Link href="/analytics">
            <a className="block">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">View attendance trends and reports.</p>
                </CardContent>
              </Card>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
