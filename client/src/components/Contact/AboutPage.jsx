// src/pages/AboutPage.js
import React, { useState } from 'react';

const AboutPage = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const developers = [
    {
      name: 'Minaketan Nayak',
      title: 'Full Stack Developer',
      image: '/media/images/mk.jpg',
      description: 'Minaketan is an expert in React, CSS, and building responsive UIs.',
      details: 'Minaketan has 4 years of experience in frontend development and has worked on numerous high-profile projects.',
      website: 'https://www.linkedin.com/in/minaketan-nayak/',
    },
    {
      name: 'Ankit Mishra',
      title: 'Full Stack Developer',
      image: '/media/images/ak.jpeg',
      description: 'Ankit specializes in Node.js, Express, and MongoDB.',
      details: 'Ankit has 4 years of experience in backend development, focusing on scalable and secure server-side applications.',
      website: 'https://www.linkedin.com/in/devankitmishra/',
    },
    {
      name: 'Brahmananda Swain',
      title: 'Full Stack Developer',
      image: '/media/images/kro.jpeg',
      description: 'Brahma excels in both frontend and backend technologies.',
      details: 'With 5 years of experience, Brahma has a deep understanding of the full software development lifecycle.',
      website: 'https://www.linkedin.com/in/brahmananda-swain/',
    },
  ];

  return (
    <div className="p-8 bg-gray-900">
      <h1 className="text-4xl font-extrabold text-center text-white mb-12">
        Meet the Team
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white rounded-lg shadow-lg max-w-xs p-6 transition transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative w-full h-40 mb-4">
              <img
                src={dev.image}
                alt={dev.name}
                className="absolute inset-0 w-full h-full object-contain rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{dev.name}</h2>
            <h4 className="text-xl text-gray-400 mb-4">{dev.title}</h4>
            <p className="mb-4">{dev.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => toggleExpand(index)}
                className="bg-[var(--primary-color)] text-[var(--light-text)] hover:bg-[var(--hover-color)] text-sm py-1 px-3 rounded-lg transition"
              >
                {expanded[index] ? 'Show Less' : 'Show More'}
              </button>
              <a
                href={dev.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--primary-color)] text-[var(--light-text)] hover:bg-[var(--hover-color)] text-sm py-1 px-3 rounded-lg transition"
              >
                Visit Profile
              </a>
            </div>
            {expanded[index] && (
              <p className="mt-4 text-gray-300 text-sm">{dev.details}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
