import { Link, useLocation } from 'wouter';
import { Moon, Sun, Rocket, User, Save, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [location, setLocation] = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/explorer', label: 'Explorer' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/">
            <a className="flex items-center gap-2.5 hover-elevate active-elevate-2 rounded-md px-2 py-1" data-testid="link-home">
              <Rocket className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-bold tracking-tight">Galactic Gallery</span>
            </a>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.path} href={link.path}>
                <a data-testid={`link-${link.label.toLowerCase()}`}>
                  <Button
                    variant={location === link.path ? 'secondary' : 'ghost'}
                    size="sm"
                  >
                    {link.label}
                  </Button>
                </a>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-profile-menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoUrl} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.username[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium" data-testid="text-username">{user?.username}</p>
                  <p className="text-xs text-muted-foreground" data-testid="text-email">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLocation('/profile')} data-testid="button-profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/my-saves')} data-testid="button-my-saves">
                  <Save className="mr-2 h-4 w-4" />
                  My Saves
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} data-testid="button-logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <a data-testid="link-login">
                  <Button variant="ghost" size="sm">Login</Button>
                </a>
              </Link>
              <Link href="/register">
                <a data-testid="link-register">
                  <Button size="sm">Register</Button>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { Navbar };
