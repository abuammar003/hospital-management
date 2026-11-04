
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { ObjectId } = mongoose.Types;

const seedTag = "medvion-demo-v1";

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "medvion",
    });
    console.log("MongoDB connected!");
    console.log("Connected DataBase:", mongoose.connection.name)

    const db = mongoose.connection.db;

    // Generate IDs
    const hospitalIds = Array.from({ length: 3 }, () => new ObjectId());
    const doctorIds = Array.from({ length: 6 }, () => new ObjectId());
    const patientIds = Array.from({ length: 3 }, () => new ObjectId());
    const adminIds = Array.from({ length: 3 }, () => new ObjectId());
    const superAdminId = new ObjectId();

    const userIds = [
      ...doctorIds,
      ...patientIds,
      ...adminIds,
      superAdminId,
    ];

    const passwordHash = await bcrypt.hash("Medvion@123", 10);

    // 1. USERS
    const users = [
      ...doctorIds.map((id, i) => ({
        _id: id,
        name: [
          "Dr. Rahul Sharma",
          "Dr. Priya Patel",
          "Dr. Amit Khan",
          "Dr. Neha Deshmukh",
          "Dr. Arjun Shaikh",
          "Dr. Sneha Joshi",
        ][i],
        email: `doctor${i + 1}@medvion.test`,
        password: passwordHash,
        phone: `900000000${i + 1}`,
        role: "doctor",
        isActive: true,
        isVerified: true,
        createdAt: new Date(),
        seedTag,
      })),

      ...patientIds.map((id, i) => ({
        _id: id,
        name: ["Aarav Patil", "Sara Khan", "Rehan Shaikh"][i],
        email: `patient${i + 1}@medvion.test`,
        password: passwordHash,
        phone: `910000000${i + 1}`,
        role: "patient",
        isActive: true,
        createdAt: new Date(),
        seedTag,
      })),

      ...adminIds.map((id, i) => ({
        _id: id,
        name: [
          "City Care Admin",
          "LifeLine Admin",
          "Sunrise Admin",
        ][i],
        email: `hospital${i + 1}@medvion.test`,
        password: passwordHash,
        phone: `920000000${i + 1}`,
        role: "hospital",
        isActive: true,
        isVerified: true,
        createdAt: new Date(),
        seedTag,
      })),

      {
        _id: superAdminId,
        name: "Medvion Super Admin",
        email: "admin@medvion.test",
        password: passwordHash,
        phone: "9300000001",
        role: "superadmin",
        isActive: true,
        createdAt: new Date(),
        seedTag,
      },
    ];

    // 2. HOSPITALS
    const hospitalNames = [
      "City Care Hospital",
      "LifeLine Multispeciality Hospital",
      "Sunrise Medical Center",
    ];

    const hospitals = hospitalIds.map((id, i) => ({
      _id: id,
      name: hospitalNames[i],
      slug: ["city-care", "lifeline", "sunrise"][i],
      address: {
        street: ["Camp Road", "Malegaon Road", "MSK Mill Area"][i],
        city: "Malegaon",
        state: "Maharashtra",
        country: "India",
        pincode: ["423203", "423105", "423203"][i],
      },
      phone: `02554${100000 + i}`,
      email: `hospital${i + 1}@medvion.test`,
      adminId: adminIds[i],
      facilities: ["Emergency", "Pharmacy", "Laboratory", "ICU"],
      description: "A sample multispeciality hospital in Malegaon.",
      isVerified: true,
      status: "approved",
      createdAt: new Date(),
      seedTag,
    }));

    // 3. DOCTORS
    const specializations = [
      "Cardiology",
      "Dermatology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
      "Gynecology",
    ];

    const doctorNames = [
      "Dr. Rahul Sharma",
      "Dr. Priya Patel",
      "Dr. Amit Khan",
      "Dr. Neha Deshmukh",
      "Dr. Arjun Shaikh",
      "Dr. Sneha Joshi",
    ];

    const doctors = doctorIds.map((id, i) => ({
      _id: id,
      userId: id,
      name: doctorNames[i],
      specialization: specializations[i],
      qualification: ["MBBS, MD", "MBBS, DDVL", "MBBS, DM",
        "MBBS, MS", "MBBS, DCH", "MBBS, MS"][i],
      experience: [8, 6, 12, 9, 7, 10][i],
      consultationFee: [500, 400, 700, 600, 350, 450][i],
      hospitalIds: [hospitalIds[Math.floor(i / 2)]],
      location: "Malegaon, Maharashtra",
      bio: "Experienced medical professional.",
      isVerified: true,
      status: "approved",
      createdAt: new Date(),
      seedTag,
    }));

    // 4. SPECIALIZATIONS
    const specializationDocs = specializations.map((name) => ({
      name,
      description: `${name} medical specialist.`,
      isActive: true,
      seedTag,
    }));

    // 5. DEPARTMENTS
    const departments = hospitalIds.flatMap((hospitalId) =>
      ["General Medicine", "Emergency"].map((name) => ({
        name,
        hospitalId,
        description: `${name} department.`,
        isActive: true,
        seedTag,
      }))
    );

    // 6. DOCTOR SCHEDULES
    const doctorSchedules = doctorIds.map((doctorId, i) => ({
      doctorId,
      hospitalId: hospitalIds[Math.floor(i / 2)],
      day: ["Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"][i],
      startTime: "10:00 AM",
      endTime: "02:00 PM",
      slotDuration: 30,
      isAvailable: true,
      seedTag,
    }));

    // 7. APPOINTMENTS
    const appointments = doctorIds.map((doctorId, i) => ({
      patientId: patientIds[i % 3],
      doctorId,
      hospitalId: hospitalIds[Math.floor(i / 2)],
      appointmentDate: new Date(Date.now() + (i + 1) * 86400000),
      appointmentTime: "10:30 AM",
      status: i === 0 ? "confirmed" : "pending",
      reason: "General medical consultation",
      seedTag,
    }));

    // 8. REVIEWS
    const reviews = doctorIds.slice(0, 3).map((doctorId, i) => ({
      patientId: patientIds[i],
      doctorId,
      hospitalId: hospitalIds[Math.floor(i / 2)],
      rating: 5,
      comment: "Good consultation and friendly doctor.",
      createdAt: new Date(),
      seedTag,
    }));

    // 9. NOTIFICATIONS
    const notifications = patientIds.map((userId, i) => ({
      userId,
      title: "Welcome to Medvion",
      message: "Your Medvion account is ready.",
      type: "general",
      isRead: false,
      createdAt: new Date(),
      seedTag,
    }));

    // 10. VERIFICATION REQUESTS
    const verificationRequests = [
      ...hospitalIds.map((entityId) => ({
        entityType: "hospital",
        entityId,
        status: "approved",
        submittedAt: new Date(),
        seedTag,
      })),
      ...doctorIds.slice(0, 1).map((entityId) => ({
        entityType: "doctor",
        entityId,
        status: "approved",
        submittedAt: new Date(),
        seedTag,
      })),
    ];

    const collections = {
      users,
      hospitals,
      doctors,
      appointments,
      specializations: specializationDocs,
      reviews,
      notifications,
      departments,
      doctorSchedules,
      verificationRequests,
    };

    // Remove only previous demo seed records
    for (const name of Object.keys(collections)) {
      await db.collection(name).deleteMany({ seedTag });
    }

    // Insert sample records
    for (const [name, records] of Object.entries(collections)) {
      if (records.length > 0) {
        await db.collection(name).insertMany(records);
      }
      console.log(`${name}: ${records.length} records inserted`);
    }

    console.log("Medvion sample data inserted successfully!");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
