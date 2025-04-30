import Image from "next/image";
import CTASection from "@/app/components/sections/cta";

export const metadata = {
  title: "About Us - Mosecure",
  description: "Learn about our mission and the team behind Mosecure",
};

const team = [
  {
    name: "Michael Johnson",
    role: "Founder & CEO",
    bio: "Michael has over 15 years of experience in cybersecurity and enterprise security management.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    bio: "Sarah previously led security engineering teams at several Fortune 500 companies.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "David Rodriguez",
    role: "VP of Product",
    bio: "David brings a decade of experience in security product development and threat analysis.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Emily Taylor",
    role: "Head of Marketing",
    bio: "Emily has helped scale multiple cybersecurity companies through strategic marketing campaigns.",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate pt-14">
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                About Mosecure
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We're building the most advanced cybersecurity platform to protect businesses from evolving threats.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <div className="overflow-hidden py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-primary-600">Our Mission</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Securing the digital world
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  At Mosecure, we believe that robust security should be accessible to all organizations. Our mission is to create tools that protect businesses from cyber threats, detect vulnerabilities, and respond to incidents effectively.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Founded in 2020, we've grown from a small security team with deep expertise to a leading cybersecurity company serving thousands of businesses worldwide. Our platform continues to evolve based on the latest threat intelligence and security best practices.
                </p>
                <div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600">
                  <div className="relative pl-9">
                    <div className="font-semibold text-gray-900">
                      <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-primary-50 flex items-center justify-center">
                        <span className="text-primary-600 font-bold">1</span>
                      </span>
                      Advanced threat detection
                    </div>
                    <p className="mt-2">We employ cutting-edge technology to identify and neutralize threats.</p>
                  </div>
                  <div className="relative pl-9">
                    <div className="font-semibold text-gray-900">
                      <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-primary-50 flex items-center justify-center">
                        <span className="text-primary-600 font-bold">2</span>
                      </span>
                      Proactive security
                    </div>
                    <p className="mt-2">We continuously monitor for vulnerabilities before they can be exploited.</p>
                  </div>
                  <div className="relative pl-9">
                    <div className="font-semibold text-gray-900">
                      <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-primary-50 flex items-center justify-center">
                        <span className="text-primary-600 font-bold">3</span>
                      </span>
                      Enterprise protection
                    </div>
                    <p className="mt-2">We're committed to keeping our customers' data and systems secure.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://placehold.co/800x600/eef/ccd?text=About+Us"
                alt="Product screenshot"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={2432}
                height={1442}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet our team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're a team of cybersecurity experts dedicated to protecting organizations from digital threats.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
          >
            {team.map((person) => (
              <li key={person.name} className="flex flex-col gap-6 xl:flex-row">
                <img
                  className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
                  src={person.image}
                  alt=""
                />
                <div className="flex-auto">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-base leading-7 text-primary-600">{person.role}</p>
                  <p className="mt-2 text-base leading-7 text-gray-600">{person.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CTASection />
    </div>
  );
} 