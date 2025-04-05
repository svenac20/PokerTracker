// pages/index.js or app/page.js (depending on your NextJS setup)
import HomePageCasinoCard from "@/components/custom/homePageCasinoCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCasinosGroupedByTown } from "@/lib/services";
import { ArrowRight, Clock, Dot, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const casinos = await getCasinosGroupedByTown();

  return (
    <>
      <div className="flex flex-col min-h-screen p-0">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Find Live Poker in Croatia
                </h1>
                <p className="text-xl mb-6">
                  Real-time information on cash games and poker venues across
                  Croatia
                </p>
                <div className="flex space-x-4">
                  <Link href="live" prefetch={false} className="w-full">
                    <Button
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100 w-full h-14"
                    >
                      <span className="flex items-center font-bold">
                        View Live Games <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <Image
                    src="/poker-radar-logo.svg"
                    alt="Poker Radar Logo"
                    fill
                    className="object-contain"
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
            <h2 className="text-3xl font-bold mb-6 text-center">
              Your Ultimate Poker Guide in Croatia
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-blue-500 mb-2" />
                  <CardTitle>Real-Time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Get instant information about active cash games and waiting
                    lists at all poker venues in Zagreb and throughout Croatia.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MapPin className="h-10 w-10 text-blue-500 mb-2" />
                  <CardTitle>Location Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Find exact locations, contact information, and directions to
                    all poker clubs and casinos in Zagreb and other Croatian
                    cities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Star className="h-10 w-10 text-blue-500 mb-2" />
                  <CardTitle>Game Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Compare rake rates, game types, and player counts to find
                    the perfect poker game for your preferences and bankroll.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* City Tabs Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Where to Play Poker in Croatia
            </h2>

            <Tabs defaultValue="zagreb" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="zagreb" className="font-bold">
                  Zagreb
                </TabsTrigger>
                <TabsTrigger value="split" className="font-bold">
                  Split
                </TabsTrigger>
                <TabsTrigger value="poreč" className="font-bold">
                  Poreč
                </TabsTrigger>
                <TabsTrigger value="opatija" className="font-bold">
                  Opatija
                </TabsTrigger>
              </TabsList>

              <TabsContent value="zagreb" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {casinos["zagreb"] &&
                    casinos["zagreb"].map((casino) => {
                      return (
                        <HomePageCasinoCard key={casino.id} casino={casino} />
                      );
                    })}
                </div>
              </TabsContent>

              <TabsContent value="split" className="mt-6">
                {casinos["split"] ? (
                  casinos["split"].map((casino) => {
                    return (
                      <HomePageCasinoCard key={casino.id} casino={casino} />
                    );
                  })
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500">
                        Information about poker games in Split coming soon!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="poreč" className="mt-6">
                {casinos["poreč"] ? (
                  casinos["poreč"].map((casino) => {
                    return (
                      <HomePageCasinoCard key={casino.id} casino={casino} />
                    );
                  })
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-500">
                        Information about poker games in Split coming soon!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="opatija" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-500">
                      Information about poker games in Opatija coming soon!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* FAQ Section for SEO */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Where can I play poker in Zagreb?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Zagreb offers an excellent poker venue:</p>
                  <ul className="font-bold">
                    <li>
                      <Dot className="inline" />
                      Casino Cezar Zagreb
                    </li>
                    <p>If you want to play poker in Poreč head to:</p>
                    <li>
                      <Dot className="inline" />
                      Casino Cezar Poreč
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    What types of poker games are available in Zagreb and Poreč?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Zagreb poker venues primarily offer No-Limit Hold&apos;em
                    (NLH) and Pot-Limit Omaha (PLO) cash games. Stakes vary from
                    venue to venue, with common limits being 1/2, 1/1, and
                    occasional higher-stakes games. Many venues also run daily
                    and weekly tournaments.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    What is the rake structure for poker cash games in Zagreb
                    and Poreč?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Rake structures in Zagreb generally range 5% while CAP
                    varies from 5€ to 10€ depending on the venue. Detailed
                    information about rake and promotions is available on our
                    venue detail pages.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Are there poker tournaments in Zagreb and Croatia?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Yes, multiple venues in Zagreb run daily poker tournaments.
                    You can check tournament schedules on every casino&apos;s
                    official site or contact them directly. Additionally,
                    Croatia hosts several major poker festivals throughout the
                    year, bringing players from across Europe.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg p-8 text-center ">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Poker Game?
            </h2>
            <p className="text-xl mb-6">
              Get real-time information on all poker games currently running in
              Zagreb and throughout Croatia
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/live" prefetch={false}>
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
                <p className="text-gray-300">
                  Your ultimate guide to poker games in Croatia
                </p>
              </div>

              <div className="mb-6 md:mb-0">
                <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="live"
                      className="text-gray-300 hover:text-white"
                    >
                      Current Games
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="live/casinos"
                      className="text-gray-300 hover:text-white"
                    >
                      Venues
                    </Link>
                  </li>
                  <li>
                    <Link href="" className="text-gray-300 hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/policy"
                      className="text-gray-300 hover:text-white"
                    >
                      Privacy policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Contact</h4>
                <ul className="space-y-2">
                  <Link href={"https://www.instagram.com/poker.radar/"}>
                    <li className="text-gray-300">Instagram</li>
                  </Link>
                  <li className="text-gray-300">
                    Email: filip@poker-radar.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; 2025 Poker Radar. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
