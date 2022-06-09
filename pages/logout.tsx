import { useLogout } from '../lib/auth/logout';

export default function LogoutPage() {
  useLogout();

  return <div>Logging out...</div>;
}
