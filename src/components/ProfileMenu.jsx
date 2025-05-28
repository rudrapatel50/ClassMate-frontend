import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { UserCircle, LogOut, Settings, CreditCard, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar"

const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const displayName =
    user?.firstName && user?.lastName
      ? `Welcome, ${user.firstName} ${user.lastName}`
      : user?.email
        ? user.email
        : "Account";

  // Fallback initials or ?
  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user?.username
      ? user.username[0].toUpperCase()
      : '?';

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://www.figma.com/community/resource/40eb3049-e560-4d71-a2e9-8f4085e69a5e/thumbnail" alt="@shadcn" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/dashboard')}>
            <User className="mr-2 h-4 w-4" /> Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/settings')}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/membership')}>
            <CreditCard className="mr-2 h-4 w-4" /> Membership
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileMenu; 