import React from "react";

export const Watermark = () => {
  return (
    <div className="w-full py-4 text-center text-xs text-muted-foreground border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <p className="font-medium">StaffSense AI — AI Face Detection for Employee Attendance</p>
      <p className="mt-1">Developed by Team StaffSense — Ayush Pandey (220BTCCSE135) & Suparshva Jain (220BTCCSE154)</p>
    </div>
  );
};
