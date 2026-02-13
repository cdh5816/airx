/**
 * Root page. Redirects to /login by default.
 */
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/login');
}