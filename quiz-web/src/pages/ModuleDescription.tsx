import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BookOpenIcon,
  ClockIcon,
  UsersIcon,
  AwardIcon,
  CheckCircleIcon,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import { fetchModuleDescription } from "../services/api";

interface Assessment {
  name: string;
  weight: string;
}

interface DescriptionData {
  id?: string;
  moduleId?: string;
  name: string;
  description: string;
  learningOutcomes: string[];
  duration: string;
  instructors: string[];
  prerequisites: string[];
  assessments: Assessment[];
  topics: string[];
}

const defaultModule: DescriptionData = {
  name: "Module Not Found",
  description: "The requested module information could not be found.",
  learningOutcomes: [],
  duration: "N/A",
  instructors: [],
  prerequisites: [],
  assessments: [],
  topics: [],
};

const ModuleDescription: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<DescriptionData>(defaultModule);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (moduleId) {
      fetchModuleDescription(moduleId).then((data) => {
        if (data) {
          setModule(data);
        } else {
          setModule(defaultModule);
        }
        setLoading(false);
      });
    }
  }, [moduleId]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading module details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[{ label: "All Modules", path: "/" }, { label: module.name }]}
        />
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-smartmind-medium px-6 py-4">
            <h1 className="text-2xl font-bold text-white">{module.name}</h1>
          </div>
          <div className="p-6">
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <ClockIcon className="h-5 w-5 mr-2 text-smartmind-dark" />
                <span>{module.duration}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <UsersIcon className="h-5 w-5 mr-2 text-smartmind-dark" />
                <span>{module.instructors.join(", ")}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpenIcon className="h-5 w-5 mr-2 text-smartmind-dark" />
                <span>Prerequisites: {module.prerequisites.join(", ")}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Description
              </h2>
              <p className="text-gray-700">{module.description}</p>
            </div>

            {/* Learning Outcomes */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Learning Outcomes
              </h2>
              <ul className="space-y-2">
                {module.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Topics + Assessments */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Topics Covered
                </h2>
                <ul className="space-y-2 text-gray-700">
                  {module.topics.map((topic, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-smartmind-medium text-white rounded-full flex items-center justify-center mr-2 text-xs font-semibold">
                        {index + 1}
                      </div>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Assessment Methods
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  {module.assessments.map((assessment, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <AwardIcon className="h-4 w-4 text-smartmind-dark mr-2" />
                        <span className="text-gray-700">{assessment.name}</span>
                      </div>
                      <span className="bg-smartmind-light text-smartmind-dark text-xs font-semibold px-2.5 py-0.5 rounded">
                        {assessment.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quizzes Link */}
            <div className="mt-8 flex justify-center">
              <Link
                to={`/module/${module.moduleId}/quizzes`}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-smartmind-dark hover:bg-smartmind-medium"
              >
                Take Quizzes for this Module
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDescription;
