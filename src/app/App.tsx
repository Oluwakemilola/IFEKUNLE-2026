import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Calendar, MapPin, Phone, Gift, Clock } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const [showGiftDetails, setShowGiftDetails] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/images/first.jpg"
            alt="Wedding celebration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-pink-300" />
            <h1 className="text-6xl md:text-8xl font-serif mb-4 tracking-wide">
              CROWNED IN LOVE '26
            </h1>
            <div className="text-3xl md:text-4xl font-light mb-8 tracking-widest">
              Ifeoluwa & Olakunle
            </div>
            <div className="text-xl md:text-2xl font-light tracking-wide">
              September 11-12, 2026
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Families Introduction */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-serif mb-12 text-purple-900">
              The Families Cordially Invite You
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg shadow-lg">
                <h3 className="text-2xl font-serif mb-4 text-purple-800">Bride's Family</h3>
                <p className="text-lg text-gray-700">
                  Sir Sunday & Lady Deborah Oriloye
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-lg">
                <h3 className="text-2xl font-serif mb-4 text-purple-800">Groom's Family</h3>
                <p className="text-lg text-gray-700">
                  Mr Olaiya & Late Mrs Oluremi Obasola
                </p>
              </div>
            </div>

            <div className="text-xl text-gray-600 leading-relaxed">
              To the
              <span className="block text-3xl font-serif text-purple-900 my-4">
                SOLEMNIZATION & HOLY MATRIMONY
              </span>
              of their beloved children
            </div>
          </motion.div>
        </div>
      </section>

      {/* Couple Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="relative inline-block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Wedding rings"
                className="w-64 h-64 mx-auto object-cover rounded-full shadow-2xl border-8 border-white"
              />
            </div>

            <div className="mt-12 space-y-4">
              <h3 className="text-5xl font-serif text-purple-900">
                Ifeoluwa Oluwatomiyosi
              </h3>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-purple-300" />
                <Heart className="w-8 h-8 text-pink-500" />
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-purple-300" />
              </div>
              <h3 className="text-5xl font-serif text-purple-900">
                Olakunle Oladotun
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl font-serif text-purple-900 mb-4">
              Wedding Events
            </h2>
            <p className="text-xl text-gray-600">
              Join us as we celebrate this beautiful union
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Engagement */}
            <motion.div
              {...fadeInUp}
              className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="h-80 overflow-hidden flex items-center justify-center bg-gray-100">
                <ImageWithFallback
                  src="/images/DSC_3563.jpg"
                  alt="Engagement celebration"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-serif text-purple-900 mb-6">
                  Engagement
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Date</p>
                      <p className="text-gray-600">Thursday, 11 September 2026</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Time</p>
                      <p className="text-gray-600">1:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Venue</p>
                      <p className="text-gray-600">
                        NULGE Cooperative Hall, Basiri<br />
                        Off Old Iyin Road, Ado Ekiti
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Church Wedding */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="h-80 overflow-hidden flex items-center justify-center bg-gray-100">
                <ImageWithFallback
                  src="/public/images/DSC_3644.jpg"
                  alt="Church wedding"
                  className="w-full h-full object-cover object-center"
                  
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-serif text-purple-900 mb-6">
                  Church Wedding
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Date</p>
                      <p className="text-gray-600">Saturday, 12 September 2026</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Time</p>
                      <p className="text-gray-600">10:00 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Ceremony</p>
                      <p className="text-gray-600">
                        Gospel Methodist Church (GMC), Basiri<br />
                        Adjacent Gateway Baptist Church, Ado Ekiti
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Reception</p>
                      <p className="text-gray-600">
                        Cathybee Event Centre<br />
                        Off Old Iyin Road, Ado-Ekiti<br />
                        <span className="text-sm italic">(Follows immediately after ceremony)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Color Code */}
      <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-5xl font-serif text-purple-900 mb-8">
              Dress Code
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-serif text-gray-800 mb-6">
                  Friday - Engagement
                </h3>
                <div className="flex justify-center gap-4 mb-4">
                  <div className="w-24 h-24 rounded-full bg-pink-600 shadow-lg" />
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-gray-200 shadow-lg" />
                </div>
                <p className="text-xl font-semibold text-gray-700">
                  Magenta & White
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-serif text-gray-800 mb-6">
                  Saturday - Wedding
                </h3>
                <div className="flex justify-center gap-4 mb-4">
                  <div className="w-24 h-24 rounded-full shadow-lg" style={{backgroundColor: '#D4AF96'}} title="Champagne Gold" />
                  <div className="w-24 h-24 rounded-full shadow-lg" style={{backgroundColor: '#6B1B47'}} title="Maroon" />
                </div>
                <p className="text-xl font-semibold text-gray-700">
                  Champagne Gold & Maroon
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeInUp} className="text-center">
            <Gift className="w-20 h-20 mx-auto mb-8 text-purple-600" />
            <h2 className="text-5xl font-serif text-purple-900 mb-6">
              Wedding Gift
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Your presence is the greatest gift, but if you wish to bless us with a monetary gift,
              we would be truly grateful.
            </p>

            <button
              onClick={() => setShowGiftDetails(!showGiftDetails)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {showGiftDetails ? 'Hide Account Details' : 'View Account Details'}
            </button>

            {showGiftDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-serif text-purple-900 mb-6">
                  Bride's Account Details
                </h3>
                <div className="space-y-4 text-left max-w-md mx-auto">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Account Name</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Oriloye Ifeoluwa Toyosi
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Account Number</p>
                    <p className="text-lg font-semibold text-gray-800">
                      5780005590
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-600">Bank Name</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Ecobank
                    </p>
                  </div>
                </div>
              
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center">
            <Phone className="w-20 h-20 mx-auto mb-8 text-purple-600" />
            <h2 className="text-5xl font-serif text-purple-900 mb-6">
              RSVP
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Please confirm your attendance by contacting any of our coordinators
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
                <p className="font-semibold text-gray-800 mb-2">Yinka Olaniyi</p>
                <a
                  href="tel:08137247155"
                  className="text-purple-600 hover:text-purple-800 font-semibold"
                >
                  08137247155
                </a>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
                <p className="font-semibold text-gray-800 mb-2">Mrs Mosunmade Ajibola</p>
                <a
                  href="tel:08037263956"
                  className="text-purple-600 hover:text-purple-800 font-semibold"
                >
                  08037263956
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Flowers */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <div className="mb-8">
              <ImageWithFallback
                src="/public/images/DSC_3668.jpg"
                alt="Wedding flowers"
                className="w-64 h-64 mx-auto object-cover rounded-full shadow-xl"
              />
            </div>
            <p className="text-2xl font-serif text-gray-600 mb-4">
              We look forward to celebrating with you
            </p>
            <Heart className="w-12 h-12 mx-auto text-pink-500" />
            <p className="text-gray-500 mt-8">
              © 2026 Crowned In Love
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}