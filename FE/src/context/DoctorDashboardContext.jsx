"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

// import {
//   doctorProfile,
//   doctorAppointments,
//   doctorSchedule,
// } from "@/data/doctorDashboard";


import {
  doctorProfile,
  doctorAppointments,
  doctorSchedule,
} from "@/data/doctorsDashboard";


const DoctorDashboardContext = createContext(null);

export function DoctorDashboardProvider({ children }) {
  const [profile, setProfile] = useState(doctorProfile);

  const [appointments, setAppointments] =
    useState(doctorAppointments);

  const [schedule, setSchedule] = useState(doctorSchedule);

  // Update appointment status
  const updateAppointmentStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment
      )
    );
  };

  // Update doctor profile
  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  // Update weekly schedule
  const updateSchedule = (updatedSchedule) => {
    setSchedule(updatedSchedule);
  };

  return (
    <DoctorDashboardContext.Provider
      value={{
        profile,
        appointments,
        schedule,
        updateAppointmentStatus,
        updateProfile,
        updateSchedule,
      }}
    >
      {children}
    </DoctorDashboardContext.Provider>
  );
}

export function useDoctorDashboard() {
  const context = useContext(DoctorDashboardContext);

  if (!context) {
    throw new Error(
      "useDoctorDashboard must be used inside DoctorDashboardProvider"
    );
  }

  return context;
}