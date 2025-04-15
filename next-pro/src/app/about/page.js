// pages/about.js - About page for dental hospital website
import Head from "next/head";
import Link from "next/link";

export default function About() {
  // Timeline data for hospital history
  const timeline = [
    {
      year: "2005",
      title: "Foundation",
      description:
        "SmileBright Dental Hospital was founded by Dr. Robert Williams with a vision to provide high-quality dental care in a comfortable environment.",
    },
    {
      year: "2010",
      title: "Expansion",
      description:
        "Added specialized departments for orthodontics, periodontics, and pediatric dentistry to offer comprehensive care under one roof.",
    },
    {
      year: "2015",
      title: "Technology Upgrade",
      description:
        "Implemented state-of-the-art digital scanning, 3D imaging, and CAD/CAM technology for better diagnostics and treatment.",
    },
    {
      year: "2020",
      title: "New Facility",
      description:
        "Moved to our current modern facility with expanded treatment rooms and enhanced patient amenities.",
    },
    {
      year: "2023",
      title: "Community Program",
      description:
        "Launched our community outreach program providing free dental care to underserved populations.",
    },
  ];

  // Values data
  const values = [
    {
      title: "Excellence",
      description:
        "We are committed to providing the highest standard of dental care through continuous education and implementation of advanced techniques.",
      icon: "StarIcon",
    },
    {
      title: "Compassion",
      description:
        "We understand dental anxiety and strive to create a comfortable, caring environment for all patients.",
      icon: "HeartIcon",
    },
    {
      title: "Integrity",
      description:
        "We maintain the highest ethical standards and transparency in all our patient interactions and treatment recommendations.",
      icon: "ShieldIcon",
    },
    {
      title: "Innovation",
      description:
        "We embrace the latest dental technologies and techniques to provide efficient, effective treatments with optimal outcomes.",
      icon: "LightbulbIcon",
    },
  ];

  // Team statistics
  const stats = [
    { number: "15+", label: "Dental Specialists" },
    { number: "50,000+", label: "Patients Treated" },
    { number: "18", label: "Years of Excellence" },
    { number: "12", label: "Advanced Technologies" },
  ];

  return (
    <div>
      <Head>
        <title>About Us | SmileBright Dental Hospital</title>
        <meta
          name="description"
          content="Learn about SmileBright Dental Hospital's history, mission, values, and team"
        />
      </Head>

      <main>
        {/* Introduction Section */}
        <section className="py-16 lg:px-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <h2 className="text-3xl font-bold mb-6 text-[#415A80]">
                  Our Mission
                </h2>
                <p className="text-gray-700 mb-4">
                  At SmileBright Dental Hospital, our mission is to provide
                  exceptional dental care that enhances the quality of life for
                  our patients. We believe that a healthy smile is essential to
                  overall well-being and strive to make quality dental care
                  accessible to all.
                </p>
                <p className="text-gray-700 mb-4">
                  Through a patient-centered approach, we combine advanced
                  technology, evidence-based treatments, and compassionate care
                  to address all your dental needs. Our team of specialists work
                  together to create personalized treatment plans that achieve
                  optimal oral health and beautiful smiles.
                </p>
                <p className="text-gray-700">
                  We are committed to continuous education and staying at the
                  forefront of dental advancements to provide you with the best
                  possible care in a comfortable, welcoming environment.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://i.pinimg.com/474x/64/09/86/640986d6c7be1cefaaa13e10689c9d31.jpg"
                    alt="SmileBright Dental Team"
                    className="w-full h-[60vh]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-[#415A80] text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="p-4">
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#415A80]">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <div className="w-16 h-16 bg-[#D7E2E9] rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-[#415A80] text-2xl">
                      {/* Icon would be here */}★
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-800">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#415A80]">
              Our Journey
            </h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#D7E2E9]"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center ${
                      index % 2 === 0 ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="md:w-1/2 mb-4 md:mb-0 md:px-12">
                      <div
                        className={`bg-white p-6 rounded-lg shadow-md ${
                          index % 2 === 0 ? "md:text-right" : ""
                        }`}
                      >
                        <div className="text-[#415A80] font-bold text-xl mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-blue-800">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                      <div className="relative">
                        <div className="hidden md:block w-6 h-6 bg-[#A5D4DC] rounded-full border-4 border-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Facility Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#415A80]">
              Our Modern Facility
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://i.pinimg.com/474x/c4/ae/63/c4ae635e78f99e105e856494f3feeebb.jpg"
                  alt="Reception Area"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-1 text-blue-800">
                    Welcoming Reception
                  </h3>
                  <p className="text-gray-600">
                    Our comfortable reception area ensures a relaxing start to
                    your visit.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://i.pinimg.com/474x/a9/00/91/a9009112eb3ce307349326c256678f56.jpg"
                  alt="Treatment Room"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-1 text-blue-800">
                    Modern Treatment Rooms
                  </h3>
                  <p className="text-gray-600">
                    Equipped with the latest dental technology for efficient,
                    effective care.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://i.pinimg.com/474x/78/f4/ec/78f4ec0ea9523c5f824b85c2801b8ef1.jpg"
                  alt="Digital Imaging"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-1 text-blue-800">
                    Advanced Imaging Center
                  </h3>
                  <p className="text-gray-600">
                    Digital X-rays and 3D imaging for precise diagnostics and
                    treatment planning.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                Our state-of-the-art facility is designed with your comfort and
                care in mind. From the moment you walk in, you'll experience the
                perfect blend of welcoming atmosphere and clinical excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Team Overview Section */}
        <section className="py-16 lg:px-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://i.pinimg.com/474x/ee/16/bf/ee16bfb5ea90406092b06f4ceb7697d8.jpg"
                      alt="Team Member 1"
                      className="w-full"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://i.pinimg.com/474x/db/1e/5f/db1e5fbd09e40b13f298f194cbf082c0.jpg"
                      alt="Team Member 2"
                      className="w-full"
                    />
                  </div>
                  <div className="rounded-lg lg:mt-[-70px] md:mt-[-40px] overflow-hidden">
                    <img
                      src="https://i.pinimg.com/474x/f6/9c/23/f69c233d11d85d1b88d947aa06387864.jpg"
                      alt="Team Member 3"
                      className="w-full"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://i.pinimg.com/474x/64/09/86/640986d6c7be1cefaaa13e10689c9d31.jpg"
                      alt="Team Member 4"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl font-bold mb-6 text-[#415A80]">
                  Our Expert Team
                </h2>
                <p className="text-gray-700 mb-4">
                  The backbone of SmileBright Dental Hospital is our team of
                  highly qualified dental professionals. Each member brings
                  specialized expertise and a commitment to excellence in
                  patient care.
                </p>
                <p className="text-gray-700 mb-6">
                  Our dentists maintain the highest standards of education and
                  training, regularly attending continuing education courses and
                  dental conferences to stay updated with the latest
                  advancements in dental care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Preview */}
        <section className="py-16 bg-[#D7E2E9]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 text-[#415A80]">
              What Our Patients Say
            </h2>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <div className="text-5xl text-blue-300 mb-4">"</div>
              <p className="text-xl text-gray-700 mb-6">
                I've been a patient at SmileBright for over 5 years, and the
                quality of care is consistently excellent. The entire team is
                professional, knowledgeable, and genuinely concerned about
                patient comfort. I wouldn't trust my smile to anyone else!
              </p>
              <div className="font-semibold text-[#415A80]">
                - Jennifer Anderson
              </div>
              <div className="text-[#415A80]">Patient since 2018</div>
            </div>
          </div>
        </section>

        {/* Community Involvement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#415A80]">
              Our Community Commitment
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://i.pinimg.com/474x/73/48/a0/7348a0d09033572dfc1375d3c990df09.jpg"
                    alt="Community Outreach Program"
                    className="w-full h-[60vh]"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                  Giving Back to Our Community
                </h3>
                <p className="text-gray-700 mb-4">
                  At SmileBright Dental Hospital, we believe in the importance
                  of giving back to the community that has supported us. Through
                  various outreach programs and initiatives, we strive to make
                  quality dental care accessible to all.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="text-[#415A80] mr-2">✓</div>
                    <p className="text-gray-700">
                      Free dental check-ups for children from underprivileged
                      backgrounds
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#415A80] mr-2">✓</div>
                    <p className="text-gray-700">
                      Educational programs in schools about oral hygiene
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#415A80] mr-2">✓</div>
                    <p className="text-gray-700">
                      Partnerships with local non-profits to provide care to
                      those in need
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[#415A80] mr-2">✓</div>
                    <p className="text-gray-700">
                      Annual dental health awareness campaigns
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#415A80] mb-10 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Experience the SmileBright Difference
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We're committed to providing the highest quality dental care in a
              comfortable, friendly environment. Schedule your appointment today
              and see why our patients choose us for their dental needs.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                className="inline-block bg-white text-[#415A80] px-6 py-3 rounded-md hover:bg-gray-100 transition font-medium"
                href="/appointments"
              >
                Book Appointment
              </Link>
              <Link
                href="/contact"
                className="inline-block border-2 border-white text-white px-6 py-3 rounded-md hover:bg-[#334663] transition font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
