// app/tractors/page.tsx
import { auth } from '@/auth';
import TractorsComponent from './tractorsListing';

export default async function ListingsPage() {
  const session = await auth();  // This will run server-side

  // If no user is authenticated, handle access denial here
  if (!session?.user) {
    // Redirect the user if they are not authenticated
    return (
      <div>
        Access Denied. Redirecting to login...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tractors</h1>
      <p>Signed in as {session?.user.email}</p>
      <TractorsComponent />
    </div>
  );
}
