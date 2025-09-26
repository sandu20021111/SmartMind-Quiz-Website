// src/pages/ModuleList.tsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpenIcon, CodeIcon, DatabaseIcon, ServerIcon, GlobeIcon, ShieldIcon, MonitorIcon, FileTextIcon } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { fetchModulesByYear } from '../services/api';

// Mapping for icons based on module name
const getModuleIcon = (moduleName: string) => {
  if (moduleName.includes('Programming')) return <CodeIcon className="h-6 w-6" />;
  if (moduleName.includes('Database')) return <DatabaseIcon className="h-6 w-6" />;
  if (moduleName.includes('Network') || moduleName.includes('Web')) return <GlobeIcon className="h-6 w-6" />;
  if (moduleName.includes('Security')) return <ShieldIcon className="h-6 w-6" />;
  if (moduleName.includes('System') || moduleName.includes('Cloud')) return <ServerIcon className="h-6 w-6" />;
  if (moduleName.includes('AI') || moduleName.includes('Artificial')) return <MonitorIcon className="h-6 w-6" />;
  return <BookOpenIcon className="h-6 w-6" />;
};

// Mapping for year names
const yearNames: Record<string, string> = {
  '1': 'First Year',
  '2': 'Second Year',
  '3': 'Third Year',
  '4': 'Fourth Year'
};

// Difficulty badge colors
const difficultyColors: Record<string, string> = {
  'Beginner': 'bg-green-100 text-green-800',
  'Intermediate': 'bg-blue-100 text-blue-800',
  'Advanced': 'bg-purple-100 text-purple-800',
  'Expert': 'bg-red-100 text-red-800'
};

interface Module {
  id: string;
  name: string;
  description: string;
  quizzes: number;
  difficulty: string;
  yearId: number;
}

const ModuleList: React.FC = () => {
  const { yearId } = useParams<{ yearId: string }>();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModules = async () => {
      if (yearId) {
        const data = await fetchModulesByYear(yearId);
        setModules(data);
        setLoading(false);
      }
    };
    
    loadModules();
  }, [yearId]);

  const yearName = yearId ? yearNames[yearId] || `Year ${yearId}` : '';

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl font-semibold">Loading modules...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: yearName }]} />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {yearName} Modules
          </h1>
          <p className="mt-2 text-gray-600">
            Select a module to view its description or take quizzes
          </p>
        </div>
        
        {modules.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No modules found for this year.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map(module => (
              <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-smartmind-light text-smartmind-dark rounded-full p-3">
                      {getModuleIcon(module.name)}
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      difficultyColors[module.difficulty] || 'bg-gray-100 text-gray-800'
                    }`}>
                      {module.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {module.name}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm">
                    {module.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <BookOpenIcon className="h-4 w-4 mr-1" />
                    <span>{module.quizzes} Quizzes</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Link 
                      to={`/module/${module.id}/description`}
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-smartmind-light"
                    >
                      Description
                    </Link>
                    <Link 
                      to={`/module/${module.id}/quizzes`}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-smartmind-dark hover:bg-smartmind-medium"
                    >
                      Quizzes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleList;