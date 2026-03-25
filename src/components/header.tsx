import { Button } from './button';
import BookipiLogo from '../assets/bookipi-logo.png';
import './header.css';

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <header>
    <div className="storybook-header">
      <div>
        <img src={BookipiLogo} width="120" height="30" />
        <h1>Quiz Builder</h1>
      </div>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <Button size="sm" onClick={onLogout} > Log Out </Button>
          </>
        ) : (
          <>
            <Button size="sm" onClick={onLogin} > Log In </Button>
            <Button variant="default" size="sm" onClick={onCreateAccount} > Sign Up </Button>
          </>
        )}
      </div>
    </div>
  </header>
);
