import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  GraduationCapIcon,
  AwardIcon,
  TrendingUpIcon,
  UsersIcon,
  PlayCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  CircleArrowLeftIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchAllModules } from "../services/api";

// Define the yearsData outside the component to avoid re-creation on every render
const yearsData = [
  {
    id: 1,
    name: "First Year",
    description: "Foundation courses for IT fundamentals",
    icon: <GraduationCapIcon className="h-8 w-8 text-smartmind-dark" />,
    modules: 10,
    color: "bg-smartmind-light",
    hoverColor: "text-smartmind-light",
  },
  {
    id: 2,
    name: "Second Year",
    description: "Intermediate programming and systems",
    icon: <AwardIcon className="h-8 w-8 text-smartmind-dark" />,
    modules: 10,
    color: "bg-green-500",
    hoverColor: "text-green-500",
  },
  {
    id: 3,
    name: "Third Year",
    description: "Advanced concepts and specializations",
    icon: <TrendingUpIcon className="h-8 w-8 text-smartmind-dark" />,
    modules: 10,
    color: "bg-purple-500",
    hoverColor: "text-purple-500",
  },
  {
    id: 4,
    name: "Fourth Year",
    description: "Professional preparation and projects",
    icon: <UsersIcon className="h-8 w-8 text-smartmind-dark" />,
    modules: 10,
    color: "bg-orange-500",
    hoverColor: "text-orange-500",
  },
];

// Student testimonials data
const testimonialsData = [
  {
    id: 1,
    name: "Ashen Nimsara",
    role: "Computer Science Student",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote:
      "SmartMind has been an invaluable resource for my studies. The interactive quizzes helped me identify gaps in my knowledge and better prepare for exams.",
  },
  {
    id: 2,
    name: "Imalshi Kavidya",
    role: "Software Engineering Student",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote:
      "The comprehensive module descriptions and targeted quizzes made a huge in my understanding of complex topics. Highly recommended!",
  },
  {
    id: 3,
    name: "Kavinda Jayashan",
    role: "IT Security Student",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote:
      "As someone who learns by doing, the quiz format is perfect for me. I've seen grades improve significantly since I started using SmartMind.",
  },
  {
    id: 4,
    name: "Hiruni Vilochana",
    role: "Data Science Student",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote:
      "The progress tracking feature helped me identify my weak areas and focus studies more effectively. My exam scores improved by 25%!",
  },
  {
    id: 5,
    name: "Dilshan Fernando",
    role: "Network Engineering Student",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote:
      "The year-wise organization makes it easy to find relevant content. I love how the platform adapts to my academic level.",
  },
  {
    id: 6,
    name: "Naduni Silva",
    role: "AI & Machine Learning Student",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    quote:
      "The visual design and user experience are exceptional. Studying feels less like a chore and more like an engaging activity.",
  },
];

const Home: React.FC = () => {
  const { user } = useAuth();
  const [totalModules, setTotalModules] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const getModuleCount = async () => {
      try {
        setTotalModules(yearsData.reduce((acc, year) => acc + year.modules, 0));
      } catch (error) {
        console.error("Failed to fetch modules:", error);
        setTotalModules(yearsData.reduce((acc, year) => acc + year.modules, 0));
      }
    };
    getModuleCount();
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentTestimonial((prev) =>
          prev === testimonialsData.length - 1 ? 0 : prev + 1
        );
      }, 5000); // Change testimonial every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, testimonialsData.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="min-h-screen bg-smartmind-very-light/50 font-sans">
      {/* Hero Section */}
      <div className="bg-smartmind-dark text-white shadow-xl py-20 md:py-32 overflow-hidden relative">
        {/* Animated Wave Background Layers */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 sm:h-64 lg:h-80 z-0 opacity-40 animate-wave-slide-1"
          style={{
            background: `linear-gradient(to top, rgba(75, 100, 141, 0.9), rgba(75, 100, 141, 0.5))`,
            clipPath:
              "polygon(0 40%, 8% 50%, 15% 45%, 25% 55%, 35% 48%, 45% 58%, 55% 50%, 65% 60%, 75% 55%, 85% 65%, 95% 58%, 100% 68%, 100% 100%, 0% 100%)",
            width: "200%",
          }}
        ></div>
        <div
          className="absolute inset-x-0 bottom-0 h-48 sm:h-64 lg:h-80 z-[1] opacity-50 animate-wave-slide-2"
          style={{
            background: `linear-gradient(to top, rgba(89, 135, 168, 0.9), rgba(89, 135, 168, 0.6))`,
            clipPath:
              "polygon(0 50%, 10% 40%, 20% 55%, 30% 45%, 40% 60%, 50% 50%, 60% 65%, 70% 55%, 80% 70%, 90% 60%, 100% 75%, 100% 100%, 0% 100%)",
            width: "200%",
          }}
        ></div>
        <div
          className="absolute inset-x-0 bottom-0 h-48 sm:h-64 lg:h-80 z-[2] opacity-60 animate-wave-slide-1"
          style={{
            background: `linear-gradient(to top, rgba(185, 228, 244, 0.9), rgba(185, 228, 244, 0.7))`,
            clipPath:
              "polygon(0 60%, 12% 50%, 22% 65%, 34% 55%, 48% 70%, 60% 60%, 75% 75%, 88% 65%, 100% 80%, 100% 100%, 0% 100%)",
            width: "200%",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-tight text-smartmind-light animate-slide-in-top-smooth">
            Welcome to{" "}
            <span className="text-white drop-shadow-lg">SmartMind</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-smartmind-light opacity-90 animate-fade-in-slow delay-500">
            Test your knowledge, track your progress, and excel in your IT
            studies with intelligent quizzes.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-1000">
            <div className="inline-flex rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              <Link
                to="/year/1"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-full text-smartmind-dark bg-smartmind-light hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smartmind-light"
              >
                <PlayCircleIcon className="h-5 w-5 mr-2" /> Start Quizzing
              </Link>
            </div>
            <div className="inline-flex rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              <a
                href="#years"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-smartmind-light text-base font-semibold rounded-full text-smartmind-light bg-transparent hover:bg-smartmind-light hover:text-smartmind-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smartmind-light"
              >
                Explore Years
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Years Section */}
      <div id="years" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center animate-fade-in-up">
          Choose Your <span className="text-smartmind-dark">Academic Year</span>
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {yearsData.map((year, index) => (
            <Link
              key={year.id}
              to={`/year/${year.id}`}
              className="bg-white rounded-2xl shadow-xl overflow-hidden
                         hover:shadow-2xl transition-all duration-300 transform
                         hover:-translate-y-2 hover:scale-[1.01]
                         border border-smartmind-light/20
                         group animate-slide-in-up"
              style={{ animationDelay: `${index * 0.15 + 0.3}s` }}
            >
              {/* Color accent bar */}
              <div
                className={`h-3 ${year.color} w-full transition-colors duration-300`}
              ></div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-smartmind-very-light rounded-full p-4 shadow-inner">
                    {year.icon}
                  </div>
                  <span className="bg-smartmind-dark/10 text-smartmind-dark text-sm font-bold px-4 py-1 rounded-full">
                    {year.modules} Modules
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                  {year.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {year.description}
                </p>
                <div className="mt-6 flex justify-end">
                  <span
                    className={`inline-flex items-center text-smartmind-dark hover:${year.hoverColor} text-base font-semibold transition-colors duration-300`}
                  >
                    View Modules
                    <svg
                      className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Testimonials Section with Auto-Scroll Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-smartmind-very-light">
        <h2 className="text-3xl font-bold text-smartmind-dark mb-10 text-center">
          What Students Say
        </h2>

        <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl p-8 md:p-12">
          {/* Carousel Container */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonialsData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4 flex flex-col md:flex-row items-center"
              >
                <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-smartmind-light shadow-lg">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-smartmind-light text-smartmind-dark p-2 rounded-full shadow-md">
                      <UsersIcon className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3 md:pl-12 text-center md:text-left">
                  <div className="mb-6">
                    <div className="text-smartmind-dark text-4xl font-bold mb-2">
                      "
                    </div>
                    <p className="text-lg text-gray-700 italic leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-smartmind-medium font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-smartmind-light transition-colors duration-200 z-10"
          >
            <ChevronLeftIcon className="h-6 w-6 text-smartmind-dark" />
          </button>

          <button
            onClick={nextTestimonial}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-smartmind-light transition-colors duration-200 z-10"
          >
            <ChevronRightIcon className="h-6 w-6 text-smartmind-dark" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-smartmind-dark scale-125"
                    : "bg-gray-300 hover:bg-smartmind-medium"
                }`}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-gray-500 hover:text-smartmind-dark transition-colors duration-200 flex items-center"
            >
              <span className="mr-2">{isAutoPlaying ? "Pause" : "Play"}</span>
              <div
                className={`w-4 h-4 border-2 border-gray-500 rounded-sm flex items-center justify-center ${
                  isAutoPlaying ? "bg-smartmind-light" : ""
                }`}
              >
                {isAutoPlaying ? (
                  <div className="w-1 h-1 bg-smartmind-dark rounded-sm"></div>
                ) : (
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-gray-500 ml-0.5"></div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* New Promotional Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-smartmind-very-light to-smartmind-light text-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Left content */}
            <div className="md:w-2/3 space-y-6">
              <h2 className="text-4xl md:text-4xl font-extrabold leading-tight text-gray-900">
                Ready to Boost Your Learning?
              </h2>
              <p className="text-lg md:text text-gray-700">
                Join thousands of students who have improved their grades with
                SmartMind's interactive quizzes and progress tracking.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <StarIcon className="h-6 w-6 text-smartmind-dark" />
                  <span className="font-medium text-gray-800">
                    Personalized learning paths
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-6 w-6 text-smartmind-dark" />
                  <span className="font-medium text-gray-800">
                    Track your progress over time
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-6 w-6 text-smartmind-dark" />
                  <span className="font-medium text-gray-800">
                    Identify knowledge gaps
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleArrowLeftIcon className="h-6 w-6 text-smartmind-dark" />
                  <span className="font-medium text-gray-800">
                    Achieve mastery goals
                  </span>
                </div>
              </div>
            </div>

            {/* Right card */}
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-5 text-center text-gray-900">
                  Start Learning Today
                </h3>
                <div className="text-center">
                  <Link
                    to="/year/1"
                    className="inline-flex items-center justify-center px-6 py-3 bg-smartmind-dark text-white rounded-full font-semibold shadow-md hover:bg-smartmind-medium transition-colors duration-300"
                  >
                    <PlayCircleIcon className="h-5 w-5 mr-2" />
                    Get Started
                  </Link>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  No credit card required. Free to start.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section (Conditional based on user login) */}
      {user && (
        <div className="bg-smartmind-very-light py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 animate-fade-in-up">
                Your <span className="text-smartmind-dark">Learning Stats</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 animate-fade-in-up delay-200">
                Insights into your quiz performance
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Stat Cards */}
              {[
                {
                  icon: (
                    <BookOpenIcon className="h-7 w-7 text-smartmind-dark" />
                  ),
                  label: "Total Quizzes Taken",
                  value: "24",
                  bg: "bg-smartmind-light/20",
                },
                {
                  icon: <AwardIcon className="h-7 w-7 text-green-600" />,
                  label: "Average Score",
                  value: "86%",
                  bg: "bg-green-100",
                },
                {
                  icon: <TrendingUpIcon className="h-7 w-7 text-purple-600" />,
                  label: "Modules Explored",
                  value: totalModules.toString(),
                  bg: "bg-purple-100",
                },
                {
                  icon: <UsersIcon className="h-7 w-7 text-orange-600" />,
                  label: "Rank Among Peers",
                  value: "Top 15%",
                  bg: "bg-orange-100",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white overflow-hidden shadow-xl rounded-xl
                             transform hover:scale-[1.03] transition-all duration-300
                             border border-smartmind-light/20
                             group animate-pop-in"
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <div className="px-6 py-6 sm:p-7">
                    <div className="flex items-start">
                      <div
                        className={`flex-shrink-0 ${stat.bg} rounded-full p-3 shadow-inner`}
                      >
                        {stat.icon}
                      </div>
                      <div className="ml-5">
                        <div className="text-sm font-medium text-gray-500">
                          {stat.label}
                        </div>
                        <div className="mt-1 text-4xl font-extrabold text-gray-900">
                          {stat.value}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
