import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Personal Website</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 