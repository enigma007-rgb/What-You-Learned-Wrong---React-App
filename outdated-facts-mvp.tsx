import React, { useState } from 'react';
import { Calendar, BookOpen, Lightbulb, Share2, Clock, TrendingUp } from 'lucide-react';

const OutdatedFactsMVP = () => {
  const [gradYear, setGradYear] = useState('');
  const [facts, setFacts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [schoolYears, setSchoolYears] = useState({ start: 0, end: 0 });

  const factsDatabase = [
    {
      fact: "Pluto is the 9th planet in our solar system",
      correction: "Pluto was reclassified as a 'dwarf planet' in 2006",
      subject: "Astronomy",
      taughtUntil: 2006,
      changedYear: 2006
    },
    {
      fact: "There are 4 taste categories: sweet, sour, salty, and bitter",
      correction: "Umami was recognized as the 5th basic taste in the early 2000s",
      subject: "Biology",
      taughtUntil: 2002,
      changedYear: 2002
    },
    {
      fact: "Dinosaurs were cold-blooded reptiles",
      correction: "Evidence suggests many dinosaurs were warm-blooded or mesothermic",
      subject: "Paleontology",
      taughtUntil: 1995,
      changedYear: 1995
    },
    {
      fact: "The food pyramid with 6-11 servings of bread/grains at the base",
      correction: "Updated to MyPlate in 2011, emphasizing vegetables and portion control",
      subject: "Health",
      taughtUntil: 2011,
      changedYear: 2011
    },
    {
      fact: "Humans only use 10% of their brain",
      correction: "Neuroimaging shows we use virtually all of our brain throughout the day",
      subject: "Neuroscience",
      taughtUntil: 2000,
      changedYear: 2000
    },
    {
      fact: "Stress and spicy foods cause stomach ulcers",
      correction: "Most ulcers are caused by H. pylori bacteria (discovered 1982)",
      subject: "Medicine",
      taughtUntil: 1994,
      changedYear: 1994
    },
    {
      fact: "The tongue has distinct taste zones (tongue map)",
      correction: "Taste receptors for all tastes are distributed across the entire tongue",
      subject: "Biology",
      taughtUntil: 2000,
      changedYear: 2000
    },
    {
      fact: "Glass is a slow-moving liquid",
      correction: "Glass is an amorphous solid, not a supercooled liquid",
      subject: "Chemistry",
      taughtUntil: 2008,
      changedYear: 2008
    },
    {
      fact: "There are 9 planets in the solar system",
      correction: "There are 8 planets (Pluto reclassified) but potentially a 9th undiscovered planet",
      subject: "Astronomy",
      taughtUntil: 2006,
      changedYear: 2006
    },
    {
      fact: "Brontosaurus was a distinct dinosaur species",
      correction: "Declared invalid in 1903, then reinstated as valid in 2015!",
      subject: "Paleontology",
      taughtUntil: 1903,
      changedYear: 2015
    },
    {
      fact: "Christopher Columbus discovered America in 1492",
      correction: "Indigenous peoples lived in the Americas for thousands of years; Vikings arrived ~1000 AD",
      subject: "History",
      taughtUntil: 2010,
      changedYear: 2010
    },
    {
      fact: "Humans have 5 senses",
      correction: "Humans have many more senses including proprioception, thermoception, nociception, etc.",
      subject: "Biology",
      taughtUntil: 2005,
      changedYear: 2005
    },
    {
      fact: "Mount Everest is Earth's tallest mountain",
      correction: "Mauna Kea is taller when measured from base to peak (underwater to summit)",
      subject: "Geography",
      taughtUntil: 1990,
      changedYear: 1990
    },
    {
      fact: "DNA is the only hereditary molecule",
      correction: "Epigenetic inheritance and RNA-based inheritance mechanisms also exist",
      subject: "Genetics",
      taughtUntil: 2000,
      changedYear: 2000
    },
    {
      fact: "The Great Wall of China is visible from space",
      correction: "It's not visible from low Earth orbit without aid, contrary to popular belief",
      subject: "Geography",
      taughtUntil: 2003,
      changedYear: 2003
    },
    {
      fact: "Blood is blue when it's deoxygenated",
      correction: "Blood is always red; it appears blue through skin due to light absorption",
      subject: "Biology",
      taughtUntil: 2005,
      changedYear: 2005
    },
    {
      fact: "Different parts of the brain control specific functions exclusively",
      correction: "Brain functions involve complex networks; strict localization is oversimplified",
      subject: "Neuroscience",
      taughtUntil: 2010,
      changedYear: 2010
    }
  ];

  const handleSubmit = () => {
    const year = parseInt(gradYear);
    
    if (!gradYear || year < 1950 || year > new Date().getFullYear()) {
      alert('Please enter a valid graduation year between 1950 and now');
      return;
    }

    const schoolStartYear = year - 13;
    const schoolEndYear = year;
    
    setSchoolYears({ start: schoolStartYear, end: schoolEndYear });

    // Improved filter: only show facts that were taught during school AND changed after you started
    const relevantFacts = factsDatabase.filter(fact => {
      return fact.taughtUntil >= schoolStartYear && fact.changedYear >= schoolStartYear;
    }).sort((a, b) => a.changedYear - b.changedYear); // Sort by change year

    setFacts(relevantFacts);
    setShowResults(true);
  };

  const reset = () => {
    setGradYear('');
    setShowResults(false);
    setFacts([]);
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Astronomy': 'bg-purple-100 text-purple-800',
      'Biology': 'bg-green-100 text-green-800',
      'Paleontology': 'bg-orange-100 text-orange-800',
      'Health': 'bg-red-100 text-red-800',
      'Neuroscience': 'bg-pink-100 text-pink-800',
      'Medicine': 'bg-blue-100 text-blue-800',
      'Chemistry': 'bg-teal-100 text-teal-800',
      'History': 'bg-amber-100 text-amber-800',
      'Genetics': 'bg-indigo-100 text-indigo-800',
      'Geography': 'bg-cyan-100 text-cyan-800'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const Timeline = ({ fact, schoolStart, schoolEnd }) => {
    const changedYear = fact.changedYear;
    const totalYears = schoolEnd - schoolStart;
    const changePosition = ((changedYear - schoolStart) / totalYears) * 100;
    
    // Determine when change happened relative to school
    let timing = '';
    let timingColor = '';
    
    if (changedYear < schoolStart) {
      timing = 'Before you started';
      timingColor = 'text-gray-500';
    } else if (changedYear <= schoolEnd) {
      const grade = Math.floor((changedYear - schoolStart));
      timing = `Year ${grade + 1} of school`;
      timingColor = 'text-orange-600';
    } else {
      const yearsAfter = changedYear - schoolEnd;
      timing = `${yearsAfter} year${yearsAfter > 1 ? 's' : ''} after graduation`;
      timingColor = 'text-blue-600';
    }

    return (
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className="font-medium">Your school years</span>
          <span className={`font-semibold ${timingColor}`}>{timing}</span>
        </div>
        
        <div className="relative h-12 bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 rounded-lg overflow-hidden">
          {/* School period bar */}
          <div className="absolute inset-0 flex items-center px-2">
            <div className="text-xs font-semibold text-gray-600">{schoolStart}</div>
            <div className="flex-1"></div>
            <div className="text-xs font-semibold text-gray-600">{schoolEnd}</div>
          </div>
          
          {/* Change marker */}
          {changedYear >= schoolStart && changedYear <= schoolEnd + 10 && (
            <div 
              className="absolute top-0 bottom-0 w-1 bg-red-500"
              style={{ 
                left: changedYear <= schoolEnd 
                  ? `${changePosition}%` 
                  : `${((schoolEnd - schoolStart) / totalYears) * 100}%`
              }}
            >
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap font-semibold">
                  {changedYear}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
          <Clock className="w-3 h-3" />
          <span>
            This fact was updated <strong>{changedYear <= schoolEnd ? 'while you were in school' : 'after you graduated'}</strong>
          </span>
        </div>
      </div>
    );
  };

  const OverallTimeline = () => {
    if (facts.length === 0) return null;

    const allYears = facts.map(f => f.changedYear);
    const minYear = Math.min(...allYears, schoolYears.start);
    const maxYear = Math.max(...allYears, schoolYears.end);
    const span = maxYear - minYear;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-900">Timeline of Changes</h3>
        </div>
        
        <div className="relative h-24">
          {/* Timeline bar */}
          <div className="absolute top-8 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
          
          {/* School period highlight */}
          <div 
            className="absolute top-8 h-2 bg-indigo-300 rounded-full"
            style={{
              left: `${((schoolYears.start - minYear) / span) * 100}%`,
              width: `${((schoolYears.end - schoolYears.start) / span) * 100}%`
            }}
          ></div>
          
          {/* Year markers */}
          <div 
            className="absolute top-0 text-xs font-semibold text-indigo-600"
            style={{ left: `${((schoolYears.start - minYear) / span) * 100}%` }}
          >
            {schoolYears.start}
            <div className="text-gray-500 font-normal">Started</div>
          </div>
          
          <div 
            className="absolute top-0 text-xs font-semibold text-indigo-600"
            style={{ left: `${((schoolYears.end - minYear) / span) * 100}%` }}
          >
            {schoolYears.end}
            <div className="text-gray-500 font-normal">Graduated</div>
          </div>
          
          {/* Change points */}
          {facts.map((fact, i) => {
            const position = ((fact.changedYear - minYear) / span) * 100;
            return (
              <div
                key={i}
                className="absolute top-6 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                title={`${fact.subject} - ${fact.changedYear}`}
              >
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap text-gray-600 hidden group-hover:block">
                  {fact.changedYear}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-indigo-300 rounded"></div>
            <span className="text-gray-600">Your school years</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Fact changed</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              What You Learned Wrong
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Science evolves. Knowledge changes. Enter your high school graduation year 
            to discover which "facts" you were taught that have since been updated or disproven.
          </p>
        </div>

        {!showResults ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <div>
              <label className="block mb-4">
                <span className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5" />
                  High School Graduation Year
                </span>
                <input
                  type="number"
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., 2005"
                  min="1950"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                />
              </label>
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Lightbulb className="w-5 h-5" />
                Show Me What Changed
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Class of {gradYear}
              </h2>
              <p className="text-gray-600 mb-4">
                We found {facts.length} outdated "facts" from your school years ({schoolYears.start}-{schoolYears.end})
              </p>
              <button
                onClick={reset}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ← Try another year
              </button>
            </div>

            <OverallTimeline />

            <div className="space-y-6">
              {facts.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(item.subject)}`}>
                      {item.subject}
                    </span>
                    <span className="text-sm text-gray-500">
                      Updated {item.changedYear}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>What you learned:</span>
                    </h3>
                    <p className="text-gray-700 ml-6 line-through decoration-red-300">
                      {item.fact}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>What we know now:</span>
                    </h3>
                    <p className="text-gray-700 ml-6">
                      {item.correction}
                    </p>
                  </div>

                  <Timeline 
                    fact={item} 
                    schoolStart={schoolYears.start} 
                    schoolEnd={schoolYears.end} 
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => alert('Share functionality would go here!')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              >
                <Share2 className="w-5 h-5" />
                Share Your Results
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Knowledge evolves. Stay curious. Keep learning.</p>
        </div>
      </div>
    </div>
  );
};

export default OutdatedFactsMVP;