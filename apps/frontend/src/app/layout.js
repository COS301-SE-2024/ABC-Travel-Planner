// src/app/layout.js
import Layout from '../components/Layout';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'ABC Travel Planner',
  description: 'Next-generation travel planning and booking website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
