// pages/404.js (for Pages Router)
// or app/not-found.js (for App Router)
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import logo from "../../public/poker-radar-logo.svg";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | Poker Radar</title>
        <meta
          name="description"
          content="The page you were looking for doesn't exist. Navigate back to Poker Radar's main site."
        />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex flex-col min-h-screen">
        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <Card className="w-full max-w-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-0 shadow-lg">
            <CardContent className="pt-10 pb-10 flex flex-col items-center text-center">
              {/* 404 Graphic */}
              <div className="relative h-24 w-full p-6">
                <Image src={logo} alt="logo" fill priority />
              </div>
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl font-bold text-cyan-600">4</span>
                  <span className="text-8xl font-bold text-cyan-600">0</span>
                  <span className="text-8xl font-bold text-cyan-600">4</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Page Not Found
              </h1>
              <p className="text-lg mb-8 max-w-md">
                Looks like this hand didn't play out as expected. The page
                you're looking for doesn't exist or has been moved to a
                different location.
              </p>
              <div className="grid grid-cols-1  gap-4 w-full max-w-md">
                <Button variant="outline" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Return Home
                  </Link>
                </Button>
              </div>
              {/* Suggestions Section */}
              <div className="mt-12 w-full">
                <h2 className="text-xl font-semibold mb-4">
                  Looking for something?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/live"
                    className="text-blue-600 hover:text-blue-800 hover:underline flex items-center justify-center p-3 bg-white rounded-md shadow"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Current Poker Games
                  </Link>

                  <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-800 hover:underline flex items-center justify-center p-3 bg-white rounded-md shadow"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Home 
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="text-center md:text-left md:flex md:justify-between md:items-center">
              <p>
                &copy; {new Date().getFullYear()} Poker Radar. All rights
                reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <Link
                  href="/policy"
                  className="text-gray-300 hover:text-white mx-3"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
