import Image from "next/image";
import CTASection from "@/app/components/sections/cta";

export const metadata = {
  title: "About Us - SaaSify",
  description: "Learn about our mission and the team behind SaaSify",
};

const team = [
  {
    name: "Michael Johnson",
    role: "Founder & CEO",
    bio: "Michael has over 15 years of experience in SaaS development and product management.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    bio: "Sarah previously led engineering teams at several successful tech startups.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "David Rodriguez",
    role: "VP of Product",
    bio: "David brings a decade of experience in UX/UI design and product development.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Emily Taylor",
    role: "Head of Marketing",
    bio: "Emily has helped scale multiple SaaS companies through creative marketing strategies.",
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
                About SaaSify
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We're building the ultimate productivity platform to help businesses work smarter, not harder.
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
                  Empowering teams to achieve more
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  At SaaSify, we believe that great software should make complex tasks simple. Our mission is to create tools that empower teams to work efficiently, collaborate seamlessly, and achieve their goals.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Founded in 2020, we've grown from a small team with a big idea to a thriving company serving thousands of businesses worldwide. Our platform continues to evolve based on customer feedback and changing market needs.
                </p>
                <div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600">
                  <div className="relative pl-9">
                    <div className="font-semibold text-gray-900">
                      <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-primary-50 flex items-center justify-center">
                        <span className="text-primary-600 font-bold">1</span>
                      </span>
                      User-focused design
                    </div>
                    <p className="mt-2">We prioritize intuitive interfaces and seamless experiences.</p>
                  </div>
                  <div className="relative pl-9">
                    <div className="font-semibold text-gray-900">
                      <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-primary-50 flex items-center justify-center">
                        <span className="text-primary-600 font-bold">2</span>
                      </span>
                      Continuous innovation
                    </div>
                    <p className="mt-2">We're constantly improving our platform with new features.</p>
                  </div>
                  <div className="relative pl-9">
                    <div className="font-semibold text-gray-900">
                      <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-primary-50 flex items-center justify-center">
                        <span className="text-primary-600 font-bold">3</span>
                      </span>
                      Customer success
                    </div>
                    <p className="mt-2">We're committed to helping our customers achieve their goals.</p>
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
              We're a diverse group of passionate individuals working together to build amazing products.
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