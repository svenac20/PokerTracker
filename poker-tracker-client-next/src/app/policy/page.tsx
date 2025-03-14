// pages/privacy-policy.js or app/privacy-policy/page.js
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Poker Radar's privacy policy - learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Poker Radar</title>
        <meta
          name="description"
          content="Poker Radar's privacy policy - learn how we collect, use, and protect your personal information."
        />
        <link rel="canonical" href="https://poker-radar.com/privacy-policy" />
      </Head>

      <div className="flex flex-col min-h-screen">
        {/* Header for the privacy policy page */}
        <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            <p className="mt-2">Last updated: March 13, 2025</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                At Poker Radar, we respect your privacy and are committed to
                protecting your personal data. This privacy policy will inform
                you about how we look after your personal data when you visit
                our website (regardless of where you visit it from) and tell you
                about your privacy rights and how the law protects you.
              </p>
              <p>
                This privacy policy aims to give you information on how Poker
                Radar collects and processes your personal data through your use
                of this website, including any data you may provide through this
                website when you sign up for our newsletter, create an account,
                or use our services.
              </p>
              <p>
                This website is not intended for children, and we do not
                knowingly collect data relating to children.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3 className="text-lg font-medium mt-0">Personal Data</h3>
              <p>
                We may collect, use, store and transfer different kinds of
                personal data about you which we have grouped together as
                follows:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Identity Data</strong> includes first name, last name,
                  username or similar identifier.
                </li>
                <li>
                  <strong>Contact Data</strong> includes email address and
                  telephone numbers.
                </li>
                <li>
                  <strong>Technical Data</strong> includes internet protocol
                  (IP) address, your login data, browser type and version, time
                  zone setting and location, browser plug-in types and versions,
                  operating system and platform, and other technology on the
                  devices you use to access this website.
                </li>
                <li>
                  <strong>Usage Data</strong> includes information about how you
                  use our website and services.
                </li>
                <li>
                  <strong>Marketing and Communications Data</strong> includes
                  your preferences in receiving marketing from us and our third
                  parties and your communication preferences.
                </li>
              </ul>

              <h3 className="text-lg font-medium">
                Cookies and Similar Technologies
              </h3>
              <p>
                We use cookies and similar tracking technologies to track the
                activity on our website and hold certain information. Cookies
                are files with a small amount of data which may include an
                anonymous unique identifier. You can instruct your browser to
                refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We will only use your personal data when the law allows us to.
                Most commonly, we will use your personal data in the following
                circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  To provide and maintain our services, including to monitor the
                  usage of our website.
                </li>
                <li>
                  To manage your account: to manage your registration as a user
                  of the website.
                </li>
                <li>
                  To contact you: To contact you by email, telephone calls, SMS,
                  or other equivalent forms of electronic communication.
                </li>
                <li>
                  To provide you with news, special offers and general
                  information about other goods, services and events which we
                  offer.
                </li>
                <li>
                  To manage your requests: To attend and manage your requests to
                  us.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Data Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We may share your personal information in the following
                situations:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Service Providers:</strong> We may share your personal
                  data with service providers to monitor and analyze the use of
                  our website, for payment processing, to contact you.
                </li>
                <li>
                  <strong>Business Transfers:</strong> We may share or transfer
                  your personal data in connection with, or during negotiations
                  of, any merger, sale of company assets, financing, or
                  acquisition of all or a portion of our business to another
                  company.
                </li>
                <li>
                  <strong>With your Consent:</strong> We may disclose your
                  personal information for any other purpose with your consent.
                </li>
                <li>
                  <strong>With Other Users:</strong> When you share personal
                  information or otherwise interact in the public areas with
                  other users, such information may be viewed by all users and
                  may be publicly distributed outside.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                The security of your data is important to us, but remember that
                no method of transmission over the Internet, or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your personal data, we
                cannot guarantee its absolute security.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Data Protection Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Depending on your location, you may have certain rights
                regarding your personal data:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  The right to access, update or delete the information we have
                  on you.
                </li>
                <li>
                  The right of rectification - the right to have your
                  information corrected if it is inaccurate or incomplete.
                </li>
                <li>
                  The right to object to our processing of your personal data.
                </li>
                <li>
                  The right of restriction - the right to request that we
                  restrict the processing of your personal information.
                </li>
                <li>
                  The right to data portability - the right to be provided with
                  a copy of the information we have on you in a structured,
                  machine-readable and commonly used format.
                </li>
                <li>
                  The right to withdraw consent - the right to withdraw your
                  consent at any time where we relied on your consent to process
                  your personal information.
                </li>
              </ul>
              <p>
                Please note that we may ask you to verify your identity before
                responding to such requests.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date at the top of
                this page.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                If you have any questions about this Privacy Policy, you can
                contact us:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>By email: privacy@poker-radar.com</li>
                <li>
                  By visiting the contact page on our website:{" "}
                  <Link
                    href="/contact"
                    className="text-blue-600 hover:underline"
                  >
                    https://poker-radar.com/contact
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Poker Radar</h3>
                <p className="text-gray-300">
                  Your ultimate guide to poker games in Croatia
                </p>
              </div>

              <div className="mb-6 md:mb-0">
                <h4 className="text-lg font-semibold mb-2">Legal</h4>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-gray-300 hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-of-service"
                      className="text-gray-300 hover:text-white"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookie-policy"
                      className="text-gray-300 hover:text-white"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Contact</h4>
                <ul className="space-y-1">
                  <li className="text-gray-300">Email: filip@poker-radar.com</li>
                </ul>
              </div>
            </div>

            <Separator className="my-4 bg-gray-700" />

            <div className="text-center text-gray-300">
              <p>
                &copy; {new Date().getFullYear()} Poker Radar. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
