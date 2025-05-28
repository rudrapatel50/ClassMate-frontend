import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';
import ProfileMenu from '@/components/ProfileMenu';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm rounded-b-xl px-4 py-2 flex items-center justify-between max-w-6xl mx-auto mt-4">
      <div className="flex items-center gap-2">
        <Link to="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
          <GraduationCap strokeWidth={2.5} />
          ClassMate
        </Link>
      </div>
      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className="text-gray-700 font-medium hover:text-primary-600">Home</Link>
        <a href="#features" className="text-gray-700 font-medium hover:text-primary-600">Features</a>
        <a href="#pricing" className="text-gray-700 font-medium hover:text-primary-600">Pricing</a>
        <a href="#contact" className="text-gray-700 font-medium hover:text-primary-600">Contact</a>
      </div>
      <div className="flex gap-2 items-center">
        {user ? (
          <ProfileMenu />
        ) : (
          <>
            <Button asChild size="sm" variant="default" className="font-semibold">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="font-semibold">
              <Link to="/register">Create Account</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 