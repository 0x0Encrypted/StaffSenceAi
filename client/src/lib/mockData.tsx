import React, { createContext, useContext, useState, useEffect } from "react";

export type Employee = {
  id: number;
  name: string;
  empId: string;
  department: string;
  faceSamples: number;
};

export type AttendanceRecord = {
  id: number;
  empId: string;
  name: string;
  date: string;
  time: string;
  status: "Present" | "Late" | "Absent";
};

interface DataContextType {
  employees: Employee[];
  attendanceLogs: AttendanceRecord[];
  addEmployee: (emp: Omit<Employee, "id" | "faceSamples">) => void;
  updateEmployeeFaceSamples: (id: number, count: number) => void;
  markAttendance: (empId: string) => void;
  deleteEmployee: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "John Doe", empId: "EMP001", department: "IT", faceSamples: 25 },
    { id: 2, name: "Jane Smith", empId: "EMP002", department: "HR", faceSamples: 25 },
    { id: 3, name: "Mike Johnson", empId: "EMP003", department: "Sales", faceSamples: 25 },
  ]);

  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>([
    { id: 1, empId: "EMP001", name: "John Doe", date: "2025-11-27", time: "09:00 AM", status: "Present" },
    { id: 2, empId: "EMP002", name: "Jane Smith", date: "2025-11-27", time: "09:15 AM", status: "Late" },
    { id: 3, empId: "EMP001", name: "John Doe", date: "2025-11-26", time: "08:55 AM", status: "Present" },
    { id: 4, empId: "EMP003", name: "Mike Johnson", date: "2025-11-26", time: "09:05 AM", status: "Present" },
  ]);

  const addEmployee = (emp: Omit<Employee, "id" | "faceSamples">) => {
    const newEmp = { ...emp, id: employees.length + 1, faceSamples: 0 };
    setEmployees([...employees, newEmp]);
  };

  const updateEmployeeFaceSamples = (id: number, count: number) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, faceSamples: count } : e));
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const markAttendance = (empId: string) => {
    const emp = employees.find(e => e.empId === empId);
    if (!emp) return;

    const today = new Date().toISOString().split('T')[0];
    const alreadyMarked = attendanceLogs.some(log => log.empId === empId && log.date === today);
    
    if (!alreadyMarked) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const newLog: AttendanceRecord = {
        id: attendanceLogs.length + 1,
        empId: emp.empId,
        name: emp.name,
        date: today,
        time: timeString,
        status: "Present"
      };
      setAttendanceLogs([newLog, ...attendanceLogs]);
    }
  };

  return (
    <DataContext.Provider value={{ employees, attendanceLogs, addEmployee, updateEmployeeFaceSamples, markAttendance, deleteEmployee }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
