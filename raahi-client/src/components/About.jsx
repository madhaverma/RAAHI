import React from 'react';
import { LightBulbIcon, UsersIcon, ShieldCheckIcon, HeartIcon } from '@heroicons/react/24/outline';

// --- DATA ---
const values = [
  {
    name: 'Innovation',
    description: 'We embrace new technologies and ideas to continuously improve our services and city infrastructure.',
    icon: LightBulbIcon,
  },
  {
    name: 'Community-Centric',
    description: 'Our decisions are driven by the needs and well-being of the people we serve.',
    icon: UsersIcon,
  },
  {
    name: 'Transparency',
    description: 'We are committed to open communication and accountability in all of our operations.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Integrity',
    description: 'We operate with the highest ethical standards to earn and maintain public trust.',
    icon: HeartIcon,
  },
];

export default function AboutUsPage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* --- Main Header Section --- */}
      <div className="relative isolate overflow-hidden px-6 py-24 text-center sm:py-32 lg:px-8">
        <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Building a Better Tomorrow, Together.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          We are the Greater Noida Authority, an organization dedicated to the planned development and sustainable growth of our city. Our work touches every aspect of urban life, from infrastructure to green spaces.
        </p>
        {/* Abstract background gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75"
          />
        </div>
      </div>

      {/* --- Our Mission & Vision Section --- */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Mission</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              To provide a high quality of life for all residents through the development of world-class infrastructure, efficient public services, and the promotion of a clean, green, and safe environment.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Vision</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              To establish Greater Noida as a leading global city, renowned for its innovative urban planning, economic vibrancy, and commitment to sustainability and inclusivity for generations to come.
            </p>
          </div>
        </div>
      </div>
      
      {/* --- Values Section --- */}
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8 pb-32"> {/* Added bottom padding */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Values</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            The principles that guide every decision we make.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.name}>
              <dt className="flex items-center gap-x-3 font-semibold text-white">
                <value.icon className="h-6 w-6 flex-none text-indigo-400" aria-hidden="true" />
                {value.name}
              </dt>
              <dd className="mt-2 text-gray-400">{value.description}</dd>
            </div>
          ))}
        </dl>
      </div>

    </div>
  )
}