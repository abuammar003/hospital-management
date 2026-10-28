import Image from "next/image";
import { ShieldCheck, CalendarCheck, Plus } from "lucide-react";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">

      <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-8 lg:px-8">

        {/* LEFT SIDE */}
        <div className="relative z-20">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            <ShieldCheck size={18} />
            Your Healthcare, Our Priority
          </div>

          {/* Heading */}
          <h1 className="text-4xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your Health,
            <br />
            <span className="text-blue-600">
              Our Priority.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
            Find the right doctors, discover hospitals, and book
            your appointments easily. Quality healthcare is just
            a few clicks away.
          </p>

          {/* Search Bar */}
          <div className="relative z-30 mt-8 w-full lg:w-[115%]">
            <SearchBar />
          </div>

          {/* Trust Information */}
          <div className="mt-8 flex flex-wrap items-center gap-6">

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-teal-100 p-3 text-teal-600">
                <ShieldCheck size={22} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Verified Doctors
                </p>
                <p className="text-xs text-slate-500">
                  Trusted & Professional
                </p>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-teal-100 p-3 text-teal-600">
                <CalendarCheck size={22} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Easy Appointments
                </p>
                <p className="text-xs text-slate-500">
                  Book in just a few clicks
                </p>
              </div>
            </div>

          </div>
        </div>


       {/* RIGHT SIDE - DOCTOR IMAGE */}
        <div className="relative mx-auto flex h-[350px] w-full max-w-[520px] items-end justify-center sm:h-[450px] lg:h-[520px]">

         {/* Teal Circle */}
         <div
           className="absolute bottom-0 h-[300px] w-[300px] rounded-full sm:h-[400px] sm:w-[400px] lg:h-[480px] lg:w-[480px]"
           style={{
             background:
               "linear-gradient(135deg, #7DDDD8 0%, #0D9488 100%)",
           }}
         />

          {/* Doctor Image */}
          <div className="absolute bottom-0 z-10 flex h-[350px] w-[300px] items-end justify-center  overflow-hidden rounded-full sm:h-[450px] sm:w-[400px] lg:h-[520px] lg:w-[480px]">
            <Image
              src="/images/banners/doctor-hero.png"
              alt="Professional healthcare doctor"
              fill 
              priority
              sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 480px"
              className="object-contain object-bottom"
            />
          </div>

          {/* Decorative Icons */}
          <Plus
            size={35}
            strokeWidth={5}
            className="absolute top-8 right-0 text-teal-200"
          />

          <Plus
            size={30}
            strokeWidth={5}
            className="absolute bottom-10 left-0 text-teal-200"
          />
        </div>


      </div>
    </section>
  );
}