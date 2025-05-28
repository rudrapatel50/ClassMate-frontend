import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HomeIcon, ListTodoIcon, UsersIcon } from 'lucide-react';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import { useAuth } from '../contexts/AuthContext';

const features = [
  {
    icon: <HomeIcon className="h-6 w-6 text-primary-600" />,
    title: 'Project Management',
    desc: 'Efficiently manage your class projects with intuitive tools for planning, organizing, and tracking progress. Stay on top of deadlines and ensure successful project completion.'
  },
  {
    icon: <ListTodoIcon className="h-6 w-6 text-primary-600" />,
    title: 'Task Tracking',
    desc: 'Keep track of your individual and team tasks with a clear and organized system. Prioritize tasks, set reminders, and monitor progress to stay productive and focused.'
  },
  {
    icon: <UsersIcon className="h-6 w-6 text-primary-600" />,
    title: 'Team Collaboration',
    desc: 'Enhance teamwork and communication with built-in collaboration features. Share project updates, discuss ideas, and work together seamlessly to achieve common goals.'
  },
];

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center mt-8">
        <div
          className="rounded-2xl shadow-lg max-w-5xl w-full flex flex-col items-center justify-center p-16"
          style={{
            background: "linear-gradient(135deg, #16222A 0%, #3A6073 100%)"
          }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-white drop-shadow">
            Welcome to ClassMate
          </h1>
          <p className="text-white/90 mb-6 text-center max-w-xl drop-shadow">
            Your all-in-one solution for managing class projects, tracking tasks, and fostering team collaboration. Simplify your academic life and achieve your goals with ease.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
              <Link to={user ? "/dashboard" : "/login"}>Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
      {/* Footer */}
      <footer className="w-full mt-16 py-8 border-t border-gray-200 bg-white/80 flex flex-col items-center gap-2">
        <nav className="flex gap-6 mb-2">
          <a href="#features" className="text-gray-600 hover:text-primary-600">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-primary-600">Pricing</a>
          <a href="#contact" className="text-gray-600 hover:text-primary-600">Contact</a>
        </nav>
        <p className="text-xs text-gray-500">© 2024 ClassMate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

//Your all-in-one platform for managing class projects and tasks