// pages/index.js or app/page.js (depending on your NextJS setup)
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen p-0">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Live Poker in Zagreb</h1>
                <p className="text-xl mb-6">Real-time information on cash games, tournaments, and poker venues across Croatia</p>
                <div className="flex space-x-4">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    <Link href="/live">
                      <span className="flex items-center">
                        View Live Games <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <Image
                    src="/poker-radar-logo.svg"
                    alt="Poker Radar Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-12">
          {/* Overview Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Ultimate Poker Guide in Croatia</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-blue-500 mb-2" />
                  <CardTitle>Real-Time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get instant information about active cash games, tournaments, and waiting lists at all poker venues in Zagreb and throughout Croatia.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <MapPin className="h-10 w-10 text-blue-500 mb-2" />
                  <CardTitle>Location Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Find exact locations, contact information, and directions to all poker clubs and casinos in Zagreb and other Croatian cities.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Star className="h-10 w-10 text-blue-500 mb-2" />
                  <CardTitle>Game Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Compare rake rates, game types, blind levels, and player counts to find the perfect poker game for your preferences and bankroll.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* City Tabs Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Where to Play Poker in Croatia</h2>
            
            <Tabs defaultValue="zagreb" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="zagreb">Zagreb</TabsTrigger>
                <TabsTrigger value="split">Split</TabsTrigger>
                <TabsTrigger value="rijeka">Poreč</TabsTrigger>
                <TabsTrigger value="dubrovnik">Opatija</TabsTrigger>
              </TabsList>
              
              <TabsContent value="zagreb" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Cezar Venue */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Cezar</CardTitle>
                      <CardDescription>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>Ul. Isidora Kršnjavoga 1, 10000, Zagreb</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2"><strong>Rake:</strong> 5% + Cap</p>
                      <p className="mb-4"><strong>Games:</strong> PLO, NLH</p>
                      <p>Games start at 20h</p>
                      <p>+385 91 520 5605</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Link href="/venue/cezar">
                          <span className="flex items-center justify-center w-full">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Luckia Venue */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Luckia</CardTitle>
                      <CardDescription>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>Zagrebačka avenija 100a, 10090, Zagreb</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2"><strong>Rake:</strong> 3% + 5</p>
                      <p className="mb-4"><strong>Games:</strong> NLH</p>
                      <p>Daily tournaments!</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Link href="/venue/luckia">
                          <span className="flex items-center justify-center w-full">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="split" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-500">Information about poker games in Split coming soon!</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rijeka" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-500">Information about poker games in Rijeka coming soon!</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="dubrovnik" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-500">Information about poker games in Dubrovnik coming soon!</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
          
          {/* FAQ Section for SEO */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Where can I play poker in Zagreb?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Zagreb offers several excellent poker venues including Cezar (Ul. Isidora Kršnjavoga 1), Luckia (Zagrebačka avenija 100a), and Admiral (various locations). Each venue offers different cash games and tournaments with varying rake structures.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>What types of poker games are available in Zagreb?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Zagreb poker venues primarily offer No-Limit Hold'em (NLH) and Pot-Limit Omaha (PLO) cash games. Stakes vary from venue to venue, with common limits being 1/2, 1/1, and occasional higher-stakes games. Many venues also run daily and weekly tournaments.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>What is the rake structure for poker cash games in Zagreb?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Rake structures in Zagreb generally range from 3-5% with various caps depending on the venue. Cezar typically charges 5% with a cap, while Luckia offers a 3% + 5 structure. Detailed information about rake and promotions is available on our venue detail pages.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Are there poker tournaments in Zagreb and Croatia?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Yes, multiple venues in Zagreb run daily poker tournaments. Luckia is known for its regular tournament schedule. Additionally, Croatia hosts several major poker festivals throughout the year, bringing players from across Europe to venues in Zagreb, Split, and other Croatian cities.</p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg p-8 text-center ">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Poker Game?</h2>
            <p className="text-xl mb-6">Get real-time information on all poker games currently running in Zagreb and throughout Croatia</p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/current-games">
                <span className="flex items-center">
                  View Live Poker Games <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </Button>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-4">Poker Radar</h3>
                <p className="text-gray-300">Your ultimate guide to poker games in Croatia</p>
              </div>
              
              <div className="mb-6 md:mb-0">
                <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href="/current-games" className="text-gray-300 hover:text-white">Current Games</Link></li>
                  <li><Link href="/venues" className="text-gray-300 hover:text-white">Venues</Link></li>
                  <li><Link href="/tournaments" className="text-gray-300 hover:text-white">Tournaments</Link></li>
                  <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-gray-300">Email: info@poker-radar.com</li>
                  <li className="text-gray-300">Follow us on social media</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-300">
              <p>&copy; {new Date().getFullYear()} Poker Radar. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}