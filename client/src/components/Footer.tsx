import { Link } from 'wouter';
import { Rocket } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Rocket className="h-5 w-5 text-primary" />
              <span className="font-display font-bold tracking-tight">Galactic Gallery</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore the cosmos through NASA's stunning imagery with our interactive space exploration portal.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/"><a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-home">Home</a></Link></li>
              <li><Link href="/about"><a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">About</a></Link></li>
              <li><Link href="/explorer"><a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-explorer">Explorer</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login"><a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-login">Login</a></Link></li>
              <li><Link href="/register"><a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-register">Register</a></Link></li>
              <li><Link href="/profile"><a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-profile">Profile</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Data Source</h3>
            <p className="text-sm text-muted-foreground">
              All imagery powered by NASA's public API and data archives.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Galactic Gallery. Data courtesy of NASA.</p>
        </div>
      </div>
    </footer>
  );
}
