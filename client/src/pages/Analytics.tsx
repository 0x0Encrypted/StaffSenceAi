import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { useData } from "@/lib/mockData";

export default function Analytics() {
  const { attendanceLogs, employees } = useData();

  // Mock data transformation for charts
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const barChartData = last7Days.map(date => {
    const present = attendanceLogs.filter(l => l.date === date && l.status === "Present").length;
    const late = attendanceLogs.filter(l => l.date === date && l.status === "Late").length;
    const absent = employees.length - (present + late);
    
    return {
      name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      Present: present || Math.floor(Math.random() * employees.length * 0.8), // Fill mock data for past days
      Late: late || Math.floor(Math.random() * 2),
      Absent: absent || Math.floor(Math.random() * 1)
    };
  });

  const pieData = [
    { name: 'Present', value: barChartData[6].Present, color: '#3b82f6' },
    { name: 'Late', value: barChartData[6].Late, color: '#eab308' },
    { name: 'Absent', value: barChartData[6].Absent, color: '#ef4444' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Attendance trends and statistics.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    />
                    <Legend />
                    <Bar dataKey="Present" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Late" fill="#eab308" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
