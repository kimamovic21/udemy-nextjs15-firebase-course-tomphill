import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Home } from 'lucide-react';
import { AuthProvider } from '@/context/auth';
import './globals.css';
import Link from 'next/link';
import AuthButtons from '@/components/auth-buttons';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Fire Homes',
  description: 'Real estate app',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <AuthProvider>
        <body className={`${poppins.className} antialiased`}>
          <nav className='bg-sky-950 text-white p-5 h-24 flex items-center justify-between'>
            <Link
              href='/'
              className='text-3xl tracking-widest flex gap-2 items-center uppercase'
            >
              <Home size={30} />
              <span>Fire Homes</span>
            </Link>
            <ul className='flex gap-6 items-center'>
              <li>
                <Link 
                  href='/property-search'
                  className='uppercase tracking-widest hover:underline'
                >
                  Property search
                </Link>
              </li>
              <li>
                <AuthButtons />
              </li>
            </ul>
          </nav>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;