import React, { useEffect } from 'react';
import { BookOpenIcon, UsersIcon, LightbulbIcon, AwardIcon, CheckCircleIcon } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import useIntersectionObserver from '../hooks/useIntersectionObserver'; // Import the new hook

const AboutUs: React.FC = () => {
  // Parallax Effect Logic (Unchanged from previous version)
  useEffect(() => {
    const handleScroll = () => {
      const parallaxBg = document.querySelector<HTMLElement>('.parallax-background');
      if (parallaxBg) {
        const speed = -0.3; // Adjust this value for more/less intense parallax
        const yOffset = window.scrollY * speed;
        parallaxBg.style.transform = `translateY(${yOffset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

   // Use the intersection observer for each section, specifying the exact HTML element type
  const [heroRef, heroInView] = useIntersectionObserver<HTMLElement>({ root: null, rootMargin: '0px', threshold: 0.2 }); // It's a <section>
  const [missionRef, missionInView] = useIntersectionObserver<HTMLElement>({ root: null, rootMargin: '0px', threshold: 0.2 }); // It's a <section>
  const [featuresRef, featuresInView] = useIntersectionObserver<HTMLHeadingElement>({ root: null, rootMargin: '0px', threshold: 0.1 }); // It's an <h2>
  const [teamRef, teamInView] = useIntersectionObserver<HTMLElement>({ root: null, rootMargin: '0px', threshold: 0.1 }); // It's a <section>
  const [testimonialsRef, testimonialsInView] = useIntersectionObserver<HTMLElement>({ root: null, rootMargin: '0px', threshold: 0.1 }); // It's a <section>


  return (
    // Ultimate Page Container: Base background, smooth font
    // `animate-page-reveal` remains here as it's for the overall page load, not scroll.
    <div className="min-h-screen bg-smartmind-very-light text-gray-800 font-sans leading-relaxed animate-page-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Hero Section: Applied conditionally */}
        <section
          ref={heroRef} // No 'as React.RefObject<HTMLElement>' cast needed anymore
          className={`relative bg-smartmind-dark rounded-xl shadow-2xl overflow-hidden mb-16
                     transform transition-transform duration-500 ease-out hover:scale-[1.005]
                     ${heroInView ? 'animate-hero-enter' : 'opacity-0 scale-95'}`}
        >
          {/* New: Parallax background container */}
          <div className="absolute inset-0 overflow-hidden parallax-background" style={{ willChange: 'transform' }}>
            {/* Animated Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-smartmind-dark to-smartmind-medium opacity-90 animate-[gradientMotion_8s_ease-in-out_infinite] bg-[length:200%_200%]"></div>
          </div>

          <div className="relative z-10 px-6 py-16 md:px-12 md:py-20 text-center">
            <h1 className={`text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight
                           ${heroInView ? 'animate-text-slide-in [animation-delay:0.4s]' : 'opacity-0 -translate-x-full'}`}>
              About SmartMind
            </h1>
            <p className={`text-lg md:text-xl text-smartmind-light max-w-3xl mx-auto
                          ${heroInView ? 'animate-text-slide-in [animation-delay:0.7s]' : 'opacity-0 -translate-x-full'}`}>
              Empowering IT students with interactive learning tools to enhance
              their knowledge and skills through engaging quizzes and
              comprehensive resources.
            </p>
          </div>
        </section>

        {/* Animated Wave Divider */}
        <div className="relative -mt-16 md:-mt-24">
          <svg viewBox="0 24 1500 100" preserveAspectRatio="none" className="w-full h-auto" style={{ minHeight: '100px' }}>
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#b9e4f4', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#5987a8', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#b9e4f4', stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
            <path d="M0,100 C150,20 350,0 500,100 C650,20 850,0 1000,100 C1150,20 1350,0 1500,100 L1500,0 L0,0 Z" style={{ fill: 'url(#waveGradient)' }}>
              <animate repeatCount="indefinite" attributeName="d" dur="10s" values="M0,100 C150,180 350,120 500,100 C650,180 850,120 1000,100 C1150,180 1350,120 1500,100 L1500,0 L0,0 Z; M0,100 C150,20 350,0 500,100 C650,20 850,0 1000,100 C1150,20 1350,0 1500,100 L1500,0 L0,0 Z"></animate>
            </path>
          </svg>
        </div>

        {/* Mission Section */}
        <section
          ref={missionRef} // No 'as React.RefObject<HTMLElement>' cast needed anymore
          className={`bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16
                      flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12
                      ${missionInView ? 'animate-element-pop-up' : 'opacity-0 translate-y-8'}`}
        >
          <div className="md:w-1/3 flex justify-center items-center flex-shrink-0">
            <div className="bg-smartmind-light p-8 rounded-full inline-flex justify-center items-center shadow-lg
                            transform transition-transform duration-300 hover:scale-110 hover:animate-icon-bounce">
              <BookOpenIcon className="h-24 w-24 text-smartmind-dark stroke-1.5" />
            </div>
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-3xl font-bold text-smartmind-dark mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6">
              At SmartMind, our mission is to make learning information
              technology concepts engaging, accessible, and effective. We
              believe that interactive quizzes are one of the best ways to
              reinforce knowledge and prepare students for success in their IT
              careers.
            </p>
            <p className="text-gray-700">
              We've designed our platform specifically for campus students,
              providing a structured approach to learning that complements
              classroom instruction and helps identify areas where additional
              study may be beneficial.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2
            ref={featuresRef} // No 'as React.RefObject<HTMLElement>' cast needed anymore
            className={`text-3xl font-bold text-smartmind-dark mb-10 text-center
                       ${featuresInView ? 'animate-element-pop-up' : 'opacity-0 translate-y-8'}`}
          >
            Why Choose SmartMind?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div
              className={`bg-white rounded-xl shadow-lg p-8 text-center
                          transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                          ${featuresInView ? 'animate-element-pop-up [animation-delay:0.2s]' : 'opacity-0 translate-y-8'}`}
            >
              <div className="bg-smartmind-light p-4 rounded-full inline-flex justify-center items-center mb-6 shadow-md">
                <LightbulbIcon className="h-10 w-10 text-smartmind-dark stroke-1.5" />
              </div>
              <h3 className="text-xl font-semibold text-smartmind-medium mb-3">
                Comprehensive Coverage
              </h3>
              <p className="text-gray-600">
                Our quizzes cover all essential IT topics across multiple years
                of study, ensuring you have a complete understanding of your
                curriculum.
              </p>
            </div>
            {/* Feature 2 */}
            <div
              className={`bg-white rounded-xl shadow-lg p-8 text-center
                          transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                          ${featuresInView ? 'animate-element-pop-up [animation-delay:0.4s]' : 'opacity-0 translate-y-8'}`}
            >
              <div className="bg-smartmind-light p-4 rounded-full inline-flex justify-center items-center mb-6 shadow-md">
                <AwardIcon className="h-10 w-10 text-smartmind-dark stroke-1.5" />
              </div>
              <h3 className="text-xl font-semibold text-smartmind-medium mb-3">
                Interactive Learning
              </h3>
              <p className="text-gray-600">
                Our interactive quiz format makes learning engaging and helps
                reinforce key concepts through active recall and practice.
              </p>
            </div>
            {/* Feature 3 */}
            <div
              className={`bg-white rounded-xl shadow-lg p-8 text-center
                          transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                          ${featuresInView ? 'animate-element-pop-up [animation-delay:0.6s]' : 'opacity-0 translate-y-8'}`}
            >
              <div className="bg-smartmind-light p-4 rounded-full inline-flex justify-center items-center mb-6 shadow-md">
                <CheckCircleIcon className="h-10 w-10 text-smartmind-dark stroke-1.5" />
              </div>
              <h3 className="text-xl font-semibold text-smartmind-medium mb-3">
                Progress Tracking
              </h3>
              <p className="text-gray-600">
                Track your performance over time, identify strengths and
                weaknesses, and focus your studies where they're needed most.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          ref={teamRef} // No 'as React.RefObject<HTMLElement>' cast needed anymore
          className={`bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16
                      ${teamInView ? 'animate-element-pop-up' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl font-bold text-smartmind-dark mb-10 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Team Member cards. No individual card delays as the whole section animates together */}
            {/* You could add individual delays like [animation-delay:0.1s], [animation-delay:0.2s] etc. if desired */}
            <div className="text-center group transform transition-all duration-300 hover:scale-105">
              <div className="rounded-full bg-smartmind-light h-40 w-40 mx-auto mb-6 overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Dr. Michael Chen" className="h-full w-full object-cover group-hover:opacity-90 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Dr. Michael Chen
              </h3>
              <p className="text-smartmind-medium font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Ph.D. in Computer Science with 15+ years of experience in
                education technology.
              </p>
            </div>
            <div className="text-center group transform transition-all duration-300 hover:scale-105">
              <div className="rounded-full bg-smartmind-light h-40 w-40 mx-auto mb-6 overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Sarah Johnson" className="h-full w-full object-cover group-hover:opacity-90 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sarah Johnson
              </h3>
              <p className="text-smartmind-medium font-medium mb-3">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm">
                Former lead developer at EdTech with expertise in interactive
                learning platforms.
              </p>
            </div>
            <div className="text-center group transform transition-all duration-300 hover:scale-105">
              <div className="rounded-full bg-smartmind-light h-40 w-40 mx-auto mb-6 overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="David Wilson" className="h-full w-full object-cover group-hover:opacity-90 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                David Wilson
              </h3>
              <p className="text-smartmind-medium font-medium mb-3">Content Director</p>
              <p className="text-gray-600 text-sm">
                IT professor with 10+ years experience developing curriculum for
                computer science programs.
              </p>
            </div>
            <div className="text-center group transform transition-all duration-300 hover:scale-105">
              <div className="rounded-full bg-smartmind-light h-40 w-40 mx-auto mb-6 overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Emily Rodriguez" className="h-full w-full object-cover group-hover:opacity-90 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Emily Rodriguez
              </h3>
              <p className="text-smartmind-medium font-medium mb-3">UX Designer</p>
              <p className="text-gray-600 text-sm">
                Specialist in educational interface design with a focus on
                accessibility and engagement.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          ref={testimonialsRef} // No 'as React.RefObject<HTMLElement>' cast needed anymore
          className={`mb-12 ${testimonialsInView ? 'animate-element-pop-up' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl font-bold text-smartmind-dark mb-10 text-center">
            What Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Testimonial cards - individual delays based on `testimonialsInView` */}
            <div className={`bg-white rounded-xl shadow-lg p-8
                            transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                            ${testimonialsInView ? 'animate-element-pop-up [animation-delay:0.2s]' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center mb-5">
                <div className="h-14 w-14 rounded-full bg-smartmind-light flex items-center justify-center mr-4 shadow-sm">
                  <UsersIcon className="h-8 w-8 text-smartmind-dark stroke-1.5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Ashen Nimsara</h3>
                  <p className="text-sm text-gray-500">
                    Computer Science Student
                  </p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "SmartMind has been an invaluable resource for my studies. The
                interactive quizzes helped me identify gaps in my knowledge and
                better prepare for exams."
              </p>
            </div>
            <div className={`bg-white rounded-xl shadow-lg p-8
                            transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                            ${testimonialsInView ? 'animate-element-pop-up [animation-delay:0.4s]' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center mb-5">
                <div className="h-14 w-14 rounded-full bg-smartmind-light flex items-center justify-center mr-4 shadow-sm">
                  <UsersIcon className="h-8 w-8 text-smartmind-dark stroke-1.5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Imalshi Kavidya</h3>
                  <p className="text-sm text-gray-500">
                    Software Engineering Student
                  </p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The comprehensive module descriptions and targeted quizzes made
                a huge difference in my understanding of complex topics. Highly
                recommended!"
              </p>
            </div>
            <div className={`bg-white rounded-xl shadow-lg p-8
                            transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                            ${testimonialsInView ? 'animate-element-pop-up [animation-delay:0.6s]' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center mb-5">
                <div className="h-14 w-14 rounded-full bg-smartmind-light flex items-center justify-center mr-4 shadow-sm">
                  <UsersIcon className="h-8 w-8 text-smartmind-dark stroke-1.5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Kavinda Jayashan</h3>
                  <p className="text-sm text-gray-500">IT Security Student</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As someone who learns by doing, the quiz format is perfect for
                me. I've seen my grades improve significantly since I started
                using SmartMind."
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;