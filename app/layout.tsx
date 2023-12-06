import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProg from '@/components/ScrollProg';
import ScrollUp from '@/components/ScrollUp';
import { Poppins, Orbitron } from 'next/font/google';
import {
  PROJECT_BASE_TITLE,
  PROJECT_DESCRIPTION,
  PROJECT_NAME,
  CREATOR_NAME,
  CREATOR_TWITTER_LINK,
  CREATOR_TWITTER_HANDLE,
  PROJECT_EMAIL_ADDRESS,
  PROJECT_TWITTER_HANDLE,
} from '@/constants'
import { Viewport } from 'next'

//for vercel deployments
const baseUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:${process.env.PORT || 3000}` :
  'https://' + process.env.VERCEL_URL as string;

export function generateMetadata(
): Metadata {

  const metadata: Metadata = {
    title: {
      default: PROJECT_BASE_TITLE,
      template: `${PROJECT_BASE_TITLE} | %s`,
      absolute: `${PROJECT_BASE_TITLE} | Home`
    },
    description: PROJECT_DESCRIPTION,
    abstract: PROJECT_DESCRIPTION,
    classification: 'art generator',
    robots: { index: true, follow: true },
    keywords: [
      'Web3 Application',
      'Cryptocurrency',
      'Solana Blockchain',
      'NFT',
      'Smart Contracts',
      'Decentralized',
      'Crypto',
      'DeFi',
      'Tokenomics',
      'Web3 Integration',
      'Solana Ecosystem',
      'Solana Wallet',
      'Solana RPC',
    ],
    creator: CREATOR_NAME,
    publisher: CREATOR_NAME,
    generator: 'next-solana-starter by @iSyqozz512',
    applicationName: PROJECT_NAME,
    authors: [
      {
        name: CREATOR_NAME,
        url: CREATOR_TWITTER_LINK,
      },
    ],
    openGraph: {
      type: 'website',
      title: PROJECT_BASE_TITLE,
      description: PROJECT_DESCRIPTION,
      siteName: PROJECT_NAME,
      determiner: 'auto',
      emails: PROJECT_EMAIL_ADDRESS,
      locale: 'en_US',
    },
    twitter: {
      title: PROJECT_BASE_TITLE,
      description: PROJECT_DESCRIPTION,
      card: 'summary_large_image',
      creator: CREATOR_TWITTER_HANDLE,
      site: PROJECT_TWITTER_HANDLE,
    },
    referrer: 'origin-when-cross-origin',
    verification: {
      me: CREATOR_TWITTER_LINK
    },
    appleWebApp: {
      statusBarStyle: 'black-translucent',
      title: PROJECT_BASE_TITLE,
      capable: true,
    },
  }

  return metadata
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
  colorScheme: 'dark',
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  adjustFontFallback:true,
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='dark' lang="en">
      <head>
        <meta name="HandheldFriendly" content="True" />
        <meta name="format-detection" content="telephone=yes, date=yes, address=yes, email=yes, url=yes" />
        <link rel="shortlink" href={baseUrl} />
      </head>
      <body className={poppins.className + " !scroll-smooth !uppercase bg-black"}>


        <div className='-z-[5] fixed top-0 left-0 w-full h-full overflow-hidden'>
          <video src='/assets/space.mp4' muted autoPlay loop playsInline className='w-full h-full object-cover -z-5'></video>
        </div>




        <ScrollProg></ScrollProg>
        <ScrollUp />
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
