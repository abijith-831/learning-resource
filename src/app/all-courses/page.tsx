"use client";
import React, { useEffect, useState } from 'react'
import courses from '../../data/courses'

const AllCourses = () => {

  const [isModalOpen , setIsModalOpen] = useState(false)
  const uniqueCategories = [...new Set(courses.map(course => course.category))];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const [sortOption, setSortOption] = useState<string>(''); 


  const handleCategorySelect = (value: string) => {
    setSelectedCategory(prev => prev === value ? null : value);
  };
  
  const handleTypeSelect = (value: string) => {
    setSelectedType(prev => prev === value ? null : value);
  };
  
  const handleDurationSelect = (value: string) => {
    setSelectedDuration(prev => prev === value ? null : value);
  };
  
  const checkDuration = (duration: string, filter: string) => {
    const num = parseInt(duration); 
    if (filter === "<5") return num < 5;
    if (filter === "5-10") return num >= 5 && num <= 10;
    if (filter === "10+") return num > 10;
    return true;
  };

  const filteredCourses = courses.filter(course => {
    const matchCategory = !selectedCategory || course.category === selectedCategory;
    const matchType = !selectedType || course.type === selectedType;
    const matchDuration = !selectedDuration || checkDuration(course.duration, selectedDuration);
    return matchCategory && matchType && matchDuration;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === 'duration') {
      const getMinutes = (str: string) => parseInt(str); 
      return getMinutes(a.duration) - getMinutes(b.duration);
    }
    return 0;
  });

  console.log('eewer',sortedCourses);
  
  


  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");
    console.log("Has Reloaded from localStorage:", hasReloaded);

    if (!hasReloaded) {
      localStorage.setItem("hasReloaded", "true");
      console.log("Setting reload flag and reloading in 1 second...");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.removeItem("hasReloaded");
    }, 2000); // delay removal to ensure reload finished
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className='bg-black min-h-[500px]' > 
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6">
          <h1 className="text-white text-4xl md:text-4xl lg:text-5xl md:pl-10 lg:pl-60 xl:pl-90 2xl:pl-140  font-bold text-center md:text-left w-full md:w-auto mb-4 md:mb-0">
            ALL COURSES
          </h1>

          <div className="flex items-center gap-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 rounded bg-white text-black border border-gray-300"
            >
              <option value="">Sort by</option>
              <option value="title">A - Z</option>
              <option value="duration">Duration (Short to Long)</option>
            </select>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300"
            >
              Filter
            </button>
          </div>
        </div>


                <div className="grid gap-8 md:grid-cols-2 px-8 pt-4 lg:grid-cols-3">
                  {sortedCourses.length > 0 ? (
                                    sortedCourses.map((course) => (
                                      <a key={course.id} href={course.url} target='_blank' rel='noopener noreferrer'>
                                        <div  key={course.id}  className="relative bg-white/20 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-white/10 text-white overflow-hidden">
                                          <div className="absolute inset-0 rounded-xl bg-cover bg-center z-0"style={{ backgroundImage: `url(${course.thumbnailUrl})` }}></div>
                                          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl z-0"></div>
                                          <div className="relative z-10 flex flex-col items-center">
                                            <img src={course.thumbnailUrl}  alt={course.title} className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md mb-4" />
                    
                                            <h2 className="font-bold text-lg text-center">{course.title}</h2>
                                            <p className="text-sm font-bold text-white">
                                              {course.category} | {course.type}
                                            </p>
                                            <p className="text-sm font-bold text-white">{course.duration}</p>
                                          </div>
                                        </div>
                    
                                      </a>
                                    ))
                  ) : (
                    <div className="col-span-full h-[500px]  text-white text-center text-xl py-12 px-20">
                    No results found for the selected filters.
                  </div>
                  )}

              </div>
             
              {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-2xl">
                    <h2 className="text-xl font-bold mb-6 text-center">Filter Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      {/*================ Category ===================*/}
                        {/* === CATEGORY FILTER === */}
                        <div>
                          <h3 className="font-semibold mb-2">Category</h3>
                          <div className="flex flex-wrap gap-2">
                            {uniqueCategories.map((item) => (
                              <button
                                key={item}
                                onClick={() => handleCategorySelect(item)}
                                className={`px-3 py-1 rounded-full border ${
                                  selectedCategory === item ? 'bg-black text-white' : 'bg-white text-black'
                                }`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* === TYPE FILTER === */}
                        <div>
                          <h3 className="font-semibold mb-2">Type</h3>
                          <div className="flex flex-wrap gap-2">
                            {["Video", "Article"].map((item) => (
                              <button
                                key={item}
                                onClick={() => handleTypeSelect(item)}
                                className={`px-3 py-1 rounded-full border ${
                                  selectedType === item ? 'bg-black text-white' : 'bg-white text-black'
                                }`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* === DURATION FILTER === */}
                        <div>
                          <h3 className="font-semibold mb-2">Duration</h3>
                          <div className="flex flex-wrap gap-2">
                            {["<5", "5-10", "10+"].map((item) => (
                              <button
                                key={item}
                                onClick={() => handleDurationSelect(item)}
                                className={`px-3 py-1 rounded-full border ${
                                  selectedDuration === item ? 'bg-black text-white' : 'bg-white text-black'
                                }`}
                              >
                                {item === "<5" ? "Less than 5 mins" : item === "5-10" ? "5 - 10 mins" : "10+ mins"}
                              </button>
                            ))}
                          </div>
                        </div>

                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                      <button
                        className="bg-gray-200 px-4 py-2 rounded"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button onClick={() => setIsModalOpen(false)} className="bg-black text-white px-4 py-2 rounded">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}

      
      
    </section>
  )
}

export default AllCourses
