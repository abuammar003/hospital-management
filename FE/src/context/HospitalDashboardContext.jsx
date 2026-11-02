"use client";

import { createContext, useContext, useState } from "react";

import {
  hospitalProfile,
  hospitalDoctors,
  hospitalAppointments,
  hospitalSchedules,
} from "@/data/hospitalDashboard";

const HospitalDashboardContext = createContext(null);

export function HospitalDashboardProvider({ children }) {
  const [hospital, setHospital] = useState(hospitalProfile);
  const [doctors, setDoctors] = useState(hospitalDoctors);
  const [appointments, setAppointments] = useState(hospitalAppointments);
  const [schedules, setSchedules] = useState(hospitalSchedules);

  // Add doctor
  const addDoctor = (doctor) => {
    setDoctors((prev) => [
      ...prev,
      {
        ...doctor,
        id: Date.now(),
        status: "Active",
      },
    ]);
  };

  // Update doctor
  const updateDoctor = (updatedDoctor) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === updatedDoctor.id ? updatedDoctor : doctor
      )
    );
  };

  // Remove doctor only if no appointments reference them
  const removeDoctor = (id) => {
    const hasAppointments = appointments.some(
      (appointment) => appointment.doctorId === id
    );

    if (hasAppointments) {
      return false;
    }

    setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
    setSchedules((prev) =>
      prev.filter((schedule) => schedule.doctorId !== id)
    );

    return true;
  };

  // Update appointment
  const updateAppointmentStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment
      )
    );
  };

  // Update hospital profile
  const updateHospital = (updatedHospital) => {
    setHospital(updatedHospital);
  };

  // Update schedule
  const updateSchedule = (updatedSchedule) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.doctorId === updatedSchedule.doctorId &&
        schedule.day === updatedSchedule.day
          ? updatedSchedule
          : schedule
      )
    );
  };

  return (
    <HospitalDashboardContext.Provider
      value={{
        hospital,
        doctors,
        appointments,
        schedules,
        addDoctor,
        updateDoctor,
        removeDoctor,
        updateAppointmentStatus,
        updateHospital,
        updateSchedule,
      }}
    >
      {children}
    </HospitalDashboardContext.Provider>
  );
}

export function useHospitalDashboard() {
  const context = useContext(HospitalDashboardContext);

  if (!context) {
    throw new Error(
      "useHospitalDashboard must be used inside HospitalDashboardProvider"
    );
  }

  return context;
}