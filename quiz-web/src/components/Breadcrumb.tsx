import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
interface BreadcrumbItem {
  label: string;
  path?: string;
}
interface BreadcrumbProps {
  items: BreadcrumbItem[];
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items
}) => {
  return <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 mb-6">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
            <HomeIcon className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        {items.map((item, index) => <li key={index}>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              {item.path ? <Link to={item.path} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                  {item.label}
                </Link> : <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {item.label}
                </span>}
            </div>
          </li>)}
      </ol>
    </nav>;
};
export default Breadcrumb;