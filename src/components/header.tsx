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
            <Button size="sm" onClick={onLogout} label="Log Out"/>
          </>
        ) : (
          <>
            <Button size="sm" onClick={onLogin} label="Log In" />
            <Button variant="default" size="sm" onClick={onCreateAccount} label="Sign Up" />
          </>
        )}
      </div>
    </div>
  </header>
);
