import React, { useState } from 'react';

const GuidelinesPage = () => {
  const [activeTab, setActiveTab] = useState('booking');

  const sections = [
    {
      id: 'booking',
      title: 'Booking Guidelines',
      icon: '📅',
      content: {
        intro: 'Follow these guidelines to ensure a smooth booking experience with AirconTrip.',
        guidelines: [
          {
            title: 'Booking Process',
            items: [
              'Search for flights using specific dates or flexible date options',
              'Select flights based on price, duration, and airline preference',
              'Enter accurate passenger information exactly as it appears on government-issued ID',
              'Review all booking details before payment confirmation',
              'Save your booking confirmation and e-ticket'
            ]
          },
          {
            title: 'Required Information',
            items: [
              'Full legal name (must match travel document)',
              'Date of birth',
              'Contact information (email and phone number)',
              'Passport/ID details for international flights',
              'Special requirements (wheelchair assistance, dietary needs, etc.)'
            ]
          },
          {
            title: 'Payment Guidelines',
            items: [
              'Accepted payment methods: Credit/Debit cards, Net Banking, UPI, Wallet',
              'Complete payment within the specified time limit to avoid cancellation',
              'Save payment confirmation for future reference',
              'International bookings may require payment in local currency',
              'Contact customer support for payment issues immediately'
            ]
          }
        ],
        important: 'Bookings are confirmed only after successful payment and e-ticket issuance.'
      }
    },
    {
      id: 'check-in',
      title: 'Check-in Guidelines',
      icon: '🛄',
      content: {
        intro: 'Proper check-in procedures ensure a hassle-free travel experience.',
        guidelines: [
          {
            title: 'Online Check-in',
            items: [
              'Available 24-48 hours before departure (varies by airline)',
              'Access via AirconTrip app, website, or airline website',
              'Required for most airlines to avoid airport check-in fees',
              'Select preferred seats during online check-in',
              'Download boarding pass to mobile device or print'
            ]
          },
          {
            title: 'Airport Check-in',
            items: [
              'Arrive at airport 3 hours before international flights, 2 hours for domestic',
              'Bring government-issued photo ID and booking confirmation',
              'Check baggage allowance and weight restrictions',
              'Declare special items or excess baggage at check-in counter',
              'Collect boarding pass and baggage tags'
            ]
          },
          {
            title: 'Baggage Guidelines',
            items: [
              'Check airline-specific baggage allowances before packing',
              'Carry prohibited items in hand luggage',
              'Label all bags with contact information',
              'Keep valuables and essentials in carry-on',
              'Purchase additional baggage allowance in advance for better rates'
            ]
          }
        ],
        important: 'Failure to check-in on time may result in denied boarding.'
      }
    },
    {
      id: 'cancellation',
      title: 'Cancellation & Changes',
      icon: '🔄',
      content: {
        intro: 'Understand policies for modifying or canceling your travel plans.',
        guidelines: [
          {
            title: 'Cancellation Policies',
            items: [
              'Cancellation fees vary by airline, fare type, and timing',
              'Basic economy fares are typically non-refundable',
              'Refunds processed to original payment method within 7-14 business days',
              'Cancellation must be done before scheduled departure time',
              'Partial cancellations may be allowed for multi-passenger bookings'
            ]
          },
          {
            title: 'Change Policies',
            items: [
              'Date/time changes may be permitted with applicable fees',
              'Name changes are generally not allowed (minor corrections may be permitted)',
              'Route changes may require rebooking with fare difference',
              'Same-day changes available for eligible fares',
              'Change requests must be made before original flight departure'
            ]
          },
          {
            title: 'Refund Process',
            items: [
              'Refund eligibility determined by fare rules',
              'Processing time: 7-21 business days',
              'Airline taxes and fees are fully refundable if unused',
              'Service fees may be non-refundable',
              'Contact AirconTrip support for refund status'
            ]
          }
        ],
        important: 'Review fare rules before booking as they determine cancellation/change flexibility.'
      }
    },
    {
      id: 'travel-documents',
      title: 'Travel Documents',
      icon: '📄',
      content: {
        intro: 'Proper documentation is essential for domestic and international travel.',
        guidelines: [
          {
            title: 'Domestic Travel',
            items: [
              'Government-issued photo ID (Aadhar, Passport, Driving License, Voter ID)',
              'Children under 18 may require birth certificate or school ID',
              'E-ticket or boarding pass (digital or printed)',
              'COVID-related documents if required by destination',
              'Special permits for restricted areas'
            ]
          },
          {
            title: 'International Travel',
            items: [
              'Valid passport with minimum 6 months validity',
              'Required visas for destination country',
              'Return/onward ticket proof',
              'Vaccination certificates if required',
              'Proof of sufficient funds and accommodation'
            ]
          },
          {
            title: 'Document Safety',
            items: [
              'Carry original documents and photocopies separately',
              'Store digital copies in secure cloud storage',
              'Keep embassy/consulate contact information',
              'Share travel itinerary with family/friends',
              'Use RFID-blocking wallets for passport protection'
            ]
          }
        ],
        important: 'Travelers are responsible for ensuring all documents meet destination requirements.'
      }
    },
    {
      id: 'health-safety',
      title: 'Health & Safety',
      icon: '🏥',
      content: {
        intro: 'Prioritize your well-being with these health and safety guidelines.',
        guidelines: [
          {
            title: 'Health Precautions',
            items: [
              'Consult doctor before travel if you have pre-existing conditions',
              'Carry sufficient prescription medication with doctor\'s note',
              'Purchase comprehensive travel insurance with medical coverage',
              'Stay hydrated and avoid excessive alcohol consumption',
              'Know emergency medical facilities at your destination'
            ]
          },
          {
            title: 'COVID-19 Protocols',
            items: [
              'Check destination-specific COVID requirements',
              'Carry vaccination certificates if required',
              'Pack masks, sanitizers, and disinfectant wipes',
              'Follow airline and airport health protocols',
              'Monitor travel advisories regularly'
            ]
          },
          {
            title: 'Travel Insurance',
            items: [
              'Strongly recommended for all international travel',
              'Coverage for medical emergencies, trip cancellation, baggage loss',
              'Read policy terms carefully for exclusions',
              'Keep insurance contact information accessible',
              'File claims with proper documentation'
            ]
          }
        ],
        important: 'Health requirements change frequently; verify latest guidelines before travel.'
      }
    },
    {
      id: 'baggage',
      title: 'Baggage Rules',
      icon: '🧳',
      content: {
        intro: 'Understanding baggage policies helps avoid extra fees and hassles.',
        guidelines: [
          {
            title: 'Cabin Baggage',
            items: [
              'Typically 1 cabin bag + 1 personal item (purse/laptop bag)',
              'Size restrictions: Usually 55x40x23 cm (varies by airline)',
              'Weight limit: 7-10 kg for most airlines',
              'Liquids in containers up to 100ml in transparent bag',
              'Restricted items: Sharp objects, flammable materials'
            ]
          },
          {
            title: 'Checked Baggage',
            items: [
              'Allowance varies by airline, route, and fare class',
              'Standard: 15-23kg for economy, 30-32kg for business/first',
              'Excess baggage fees apply at airport (book online for discounts)',
              'Fragile/special items require special handling declaration',
              'Sports equipment may have specific rules and charges'
            ]
          },
          {
            title: 'Prohibited Items',
            items: [
              'Flammable liquids, gases, and solids',
              'Explosives, firearms, and weapons',
              'Magnetic materials and corrosive substances',
              'Lithium batteries above certain capacity',
              'Certain foods, plants, and animal products'
            ]
          }
        ],
        important: 'Baggage rules vary significantly between airlines; verify before travel.'
      }
    },
    {
      id: 'special-assistance',
      title: 'Special Assistance',
      icon: '♿',
      content: {
        intro: 'We provide support for passengers with special needs.',
        guidelines: [
          {
            title: 'Mobility Assistance',
            items: [
              'Request wheelchair assistance during booking or at least 48 hours before',
              'Assistance available from check-in to aircraft door',
              'Personal wheelchairs checked as special baggage',
              'Electric wheelchair batteries must be properly packed',
              'Airline staff trained to assist with boarding and deplaning'
            ]
          },
          {
            title: 'Medical Needs',
            items: [
              'Carry necessary medical equipment in cabin baggage',
              'Notify airline of oxygen requirements at least 72 hours in advance',
              'Travel with medical certificate for conditions requiring special consideration',
              'Carry doctor\'s letter for medications and medical supplies',
              'Request special seating for medical reasons'
            ]
          },
          {
            title: 'Other Assistance',
            items: [
              'Unaccompanied minors service available for children 5-17 years',
              'Pregnant travelers: Consult airline policies (varies by trimester)',
              'Service animals permitted with proper documentation',
              'Visual/hearing impairment assistance available',
              'Dietary requirements: Request special meals during booking'
            ]
          }
        ],
        important: 'Notify AirconTrip of special requirements at least 48 hours before departure.'
      }
    },
    {
      id: 'international-travel',
      title: 'International Travel',
      icon: '🌍',
      content: {
        intro: 'Additional considerations for crossing international borders.',
        guidelines: [
          {
            title: 'Immigration & Customs',
            items: [
              'Complete arrival/departure cards accurately',
              'Declare all items as required by customs regulations',
              'Know duty-free allowances for your destination',
              'Keep immigration documents handy during travel',
              'Answer immigration questions truthfully and clearly'
            ]
          },
          {
            title: 'Currency & Payments',
            items: [
              'Carry local currency for immediate expenses',
              'Notify bank of international travel to avoid card blocks',
              'Use credit cards for better exchange rates and security',
              'Keep receipts for expensive purchases for customs',
              'Understand foreign transaction fees'
            ]
          },
          {
            title: 'Cultural & Legal',
            items: [
              'Research local laws and customs of destination',
              'Respect dress codes and cultural norms',
              'Know emergency contact numbers for your destination',
              'Register with your embassy for extended stays',
              'Carry contact information for your country\'s embassy/consulate'
            ]
          }
        ],
        important: 'International travel requires additional planning and documentation.'
      }
    }
  ];

  const quickTips = [
    { tip: 'Always verify flight times 24 hours before departure', icon: '⏰' },
    { tip: 'Keep digital and physical copies of important documents', icon: '📋' },
    { tip: 'Arrive early at the airport, especially during peak seasons', icon: '🏃' },
    { tip: 'Purchase travel insurance for international trips', icon: '🛡️' },
    { tip: 'Download airline apps for real-time flight updates', icon: '📱' },
    { tip: 'Check visa requirements well in advance of travel', icon: '🛂' },
    { tip: 'Pack essential medications in carry-on luggage', icon: '💊' },
    { tip: 'Familiarize yourself with airline baggage policies', icon: '🧳' }
  ];

  const currentSection = sections.find(section => section.id === activeTab);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
     

      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Introduction */}
        <section className="mb-12 bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to AirconTrip <span className="text-blue-600">Travel Guidelines</span>
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              This comprehensive guide provides essential information to help you plan, book, and travel seamlessly with AirconTrip. Please read these guidelines carefully before making travel arrangements.
            </p>
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-sm">
              <span className="text-blue-600 mr-2">📘</span>
              <span className="font-medium text-gray-900">Reading Time: 15-20 minutes</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Guidelines Index</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${
                        activeTab === section.id
                          ? 'bg-blue-50 border border-blue-200 text-blue-700'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="text-xl mr-3">{section.icon}</span>
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Quick Links</h4>
                  <div className="space-y-3">
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <span className="mr-2">📞</span>
                      <span>Contact Support</span>
                    </a>
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <span className="mr-2">📄</span>
                      <span>Terms & Conditions</span>
                    </a>
                    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                      <span className="mr-2">🔒</span>
                      <span>Privacy Policy</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="mt-6 bg-linear-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💡</span> Quick Travel Tips
                </h3>
                <div className="space-y-3">
                  {quickTips.slice(0, 4).map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">{tip.icon}</span>
                      <span className="text-sm text-gray-700">{tip.tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Current Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 mb-8">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-linear-to-r from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center text-3xl mr-6">
                  {currentSection.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{currentSection.title}</h2>
                  <p className="text-gray-600 mt-2">{currentSection.content.intro}</p>
                </div>
              </div>

              <div className="space-y-8">
                {currentSection.content.guidelines.map((guideline, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-colors">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      {guideline.title}
                    </h3>
                    <ul className="space-y-3">
                      {guideline.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="text-blue-500 mr-3 mt-1">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Important Note */}
                <div className="bg-linear-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <span className="text-yellow-600 text-2xl mr-3">⚠️</span>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Important Note</h4>
                      <p className="text-gray-700">{currentSection.content.important}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-linear-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">📞</span>
                  Customer Support
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-gray-900">Phone Support</div>
                    <div className="text-gray-600">1-800-555-AIRC (2472)</div>
                    <div className="text-sm text-gray-500">24/7 availability</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email Support</div>
                    <div className="text-gray-600">support@aircontrip.com</div>
                    <div className="text-sm text-gray-500">Response within 4 hours</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Chat Support</div>
                    <div className="text-gray-600">Available on website & app</div>
                    <div className="text-sm text-gray-500">Live agent support</div>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-green-50 to-white border border-green-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">ℹ️</span>
                  Additional Resources
                </h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                    <span className="mr-2">📖</span>
                    <span>FAQs & Travel Help Center</span>
                  </a>
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                    <span className="mr-2">🎥</span>
                    <span>Video Tutorials & Guides</span>
                  </a>
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                    <span className="mr-2">📰</span>
                    <span>Travel Advisory Updates</span>
                  </a>
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                    <span className="mr-2">🔍</span>
                    <span>Airlines Policy Database</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Reference Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Reference Timeline</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-700 font-semibold">Time Before Flight</th>
                      <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-700 font-semibold">Action Required</th>
                      <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-700 font-semibold">Important Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-100 font-medium">3+ months</td>
                      <td className="py-3 px-4 border-b border-gray-100">Check passport validity & visa requirements</td>
                      <td className="py-3 px-4 border-b border-gray-100 text-gray-600">Some visas take weeks to process</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-100 font-medium">1-2 months</td>
                      <td className="py-3 px-4 border-b border-gray-100">Book flights & accommodations</td>
                      <td className="py-3 px-4 border-b border-gray-100 text-gray-600">Early booking often provides better rates</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-100 font-medium">2-4 weeks</td>
                      <td className="py-3 px-4 border-b border-gray-100">Purchase travel insurance</td>
                      <td className="py-3 px-4 border-b border-gray-100 text-gray-600">Some benefits require pre-trip purchase</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-100 font-medium">48 hours</td>
                      <td className="py-3 px-4 border-b border-gray-100">Online check-in opens</td>
                      <td className="py-3 px-4 border-b border-gray-100 text-gray-600">Secure preferred seats</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-100 font-medium">3-4 hours</td>
                      <td className="py-3 px-4 border-b border-gray-100">Arrive at airport</td>
                      <td className="py-3 px-4 border-b border-gray-100 text-gray-600">International: 3-4 hours, Domestic: 2 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-linear-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">📝</span>
                Important Disclaimer
              </h3>
              <div className="text-gray-700 space-y-3">
                <p>
                  These guidelines are provided for informational purposes only. While we strive to keep this information accurate and up-to-date, travel regulations and airline policies change frequently. Always verify the latest information with airlines, airports, and relevant authorities before traveling.
                </p>
                <p>
                  AirconTrip is not responsible for any loss or inconvenience caused by reliance on this information. Travelers are responsible for ensuring they meet all requirements for their journey.
                </p>
                <p className="font-medium">
                  Last comprehensive review: December 1, 2023. Next scheduled update: March 1, 2024.
                </p>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default GuidelinesPage;