export const hospitalProfile = {
  id: 1,
  name: "City Care Hospital",
  email: "citycare@example.com",
  phone: "9876543210",
  address: "Main Road, Malegaon, Maharashtra",
  city: "Malegaon",
  description:
    "A fictional multispecialty hospital providing healthcare services.",
  facilities: [
    "Emergency",
    "ICU",
    "Pharmacy",
    "Laboratory",
    "Ambulance",
    "Parking",
  ],
  verified: false,
};

export const hospitalDoctors = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    specialization: "Cardiology",
    qualification: "MBBS, MD",
    experience: 12,
    consultationFee: 800,
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Priya Patil",
    specialization: "Dermatology",
    qualification: "MBBS, MD",
    experience: 8,
    consultationFee: 500,
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Sameer Khan",
    specialization: "Orthopedics",
    qualification: "MBBS, MS",
    experience: 10,
    consultationFee: 600,
    status: "Active",
  },
  {
    id: 4,
    name: "Dr. Neha Deshmukh",
    specialization: "General Medicine",
    qualification: "MBBS",
    experience: 6,
    consultationFee: 400,
    status: "Inactive",
  },
];

export const hospitalAppointments = [
  {
    id: "HAPT101",
    doctorId: 1,
    patientName: "Aman Khan",
    date: "2026-11-05",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    id: "HAPT102",
    doctorId: 2,
    patientName: "Sara Shaikh",
    date: "2026-11-06",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    id: "HAPT103",
    doctorId: 3,
    patientName: "Ahmed Khan",
    date: "2026-11-07",
    time: "05:30 PM",
    status: "Pending",
  },
  {
    id: "HAPT104",
    doctorId: 1,
    patientName: "Priya Patil",
    date: "2026-10-20",
    time: "12:00 PM",
    status: "Completed",
  },
];

export const hospitalSchedules = [
  {
    doctorId: 1,
    day: "Monday",
    start: "10:00",
    end: "18:00",
    enabled: true,
  },
  {
    doctorId: 2,
    day: "Tuesday",
    start: "09:00",
    end: "17:00",
    enabled: true,
  },
  {
    doctorId: 3,
    day: "Wednesday",
    start: "10:00",
    end: "16:00",
    enabled: true,
  },
  {
    doctorId: 4,
    day: "Thursday",
    start: "11:00",
    end: "15:00",
    enabled: false,
  },
];