import { MapPin, Users, Target, Heart } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: MapPin,
      title: 'Easy Navigation',
      description: 'Find any building or facility on campus with our intuitive search and filter system.'
    },
    {
      icon: Users,
      title: 'Student-Focused',
      description: 'Designed with students in mind, making campus exploration simple and efficient.'
    },
    {
      icon: Target,
      title: 'Accurate Information',
      description: 'Up-to-date details about hours, services, and amenities for every location.'
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Built with feedback from students and staff to serve the campus community better.'
    }
  ];

  const team = [
    { name: 'Campus Services', role: 'Information Provider' },
    { name: 'Student Affairs', role: 'Content Verification' },
    { name: 'IT Department', role: 'Technical Support' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About Campus Tour Assistant
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Your comprehensive guide to navigating and exploring our beautiful campus. 
              We're here to help you discover all the amazing facilities and services available to you.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-gray-800 dark:text-gray-200 mb-4 font-medium leading-relaxed">
              We believe that every student, staff member, and visitor should be able to navigate 
              campus with confidence. Our mission is to provide an accessible, user-friendly platform 
              that makes finding any location on campus quick and easy.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Whether you're a new student exploring campus for the first time, a visitor attending 
              an event, or a long-time community member looking for a specific service, Campus Tour 
              Assistant is here to guide you every step of the way.
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
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Use Campus Tour Assistant?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We've built features that make exploring campus a breeze
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl mb-4">
                  <feature.icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Partners
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Working together to serve our campus community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary-600 dark:bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Have Questions or Suggestions?
          </h2>
          <p className="text-primary-100 mb-6">
            We'd love to hear from you! Help us improve the campus experience for everyone.
          </p>
          <a
            href="mailto:info@campustour.edu"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
