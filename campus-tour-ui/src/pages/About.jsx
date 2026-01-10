import { MapPin, Users, Target, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function About() {
  const { darkMode } = useTheme();

  const features = [
    {
      icon: MapPin,
      title: 'Easy Navigation',
      description: 'Find any building or facility on campus with our intuitive search and filter system.',
    },
    {
      icon: Users,
      title: 'Student-Focused',
      description: 'Designed with students in mind, making campus exploration simple and efficient.',
    },
    {
      icon: Target,
      title: 'Accurate Information',
      description: 'Up-to-date details about hours, services, and amenities for every location.',
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Built with feedback from students and staff to serve the campus community better.',
    },
  ];

  const team = [
    { name: 'Campus Services', role: 'Information Provider' },
    { name: 'Student Affairs', role: 'Content Verification' },
    { name: 'IT Department', role: 'Technical Support' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className={`text-4xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              About Campus Tour Assistant
            </h1>
            <p
              className={`text-lg ${
                darkMode ? 'text-slate-400' : 'text-gray-600'
              }`}
            >
              Your comprehensive guide to navigating and exploring our beautiful
              campus. We're here to help you discover all the amazing facilities
              and services available to you.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="p-8 rounded-2xl border shadow-sm bg-transparent">
            <h2
              className={`text-3xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Our Mission
            </h2>
            <p
              className={`mb-4 font-medium leading-relaxed ${
                darkMode ? 'text-slate-200' : 'text-gray-800'
              }`}
            >
              We believe that every student, staff member, and visitor should be
              able to navigate campus with confidence. Our mission is to provide
              an accessible, user-friendly platform that makes finding any
              location on campus quick and easy.
            </p>
            <p
              className={`leading-relaxed ${
                darkMode ? 'text-slate-300' : 'text-gray-700'
              }`}
            >
              Whether you're a new student exploring campus for the first time, a
              visitor attending an event, or a long-time community member looking
              for a specific service, Campus Tour Assistant is here to guide you
              every step of the way.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=600"
              alt="Campus building"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-primary-100">Campus Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Why Use Campus Tour Assistant?
            </h2>
            <p className={darkMode ? 'text-slate-400' : 'text-gray-600'}>
              We've built features that make exploring campus a breeze
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                    darkMode ? 'bg-primary-900/30' : 'bg-primary-100'
                  }`}
                >
                  <feature.icon
                    className={`h-7 w-7 ${
                      darkMode ? 'text-primary-400' : 'text-primary-600'
                    }`}
                  />
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {feature.title}
                </h3>
                <p className={darkMode ? 'text-slate-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Our Partners
          </h2>
          <p className={darkMode ? 'text-slate-400' : 'text-gray-600'}>
            Working together to serve our campus community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="rounded-xl p-6 shadow-md text-center bg-transparent"
            >
              <div
                className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  darkMode ? 'bg-primary-900/30' : 'bg-primary-100'
                }`}
              >
                <Users
                  className={`h-8 w-8 ${
                    darkMode ? 'text-primary-400' : 'text-primary-600'
                  }`}
                />
              </div>
              <h3
                className={`font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {member.name}
              </h3>
              <p className={darkMode ? 'text-slate-400' : 'text-gray-500'}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className={darkMode ? 'bg-primary-800' : 'bg-primary-600'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Have Questions or Suggestions?
          </h2>
          <p className="text-primary-100 mb-6">
            We'd love to hear from you! Help us improve the campus experience for
            everyone.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=campustour2026.project@gmail.com&su=Campus%20Tour%20Assistant"
            className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg
              transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md
              ${
                darkMode
                  ? 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }
            `}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}