import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-6 text-center">
      
      <h1 className="text-7xl font-extrabold text-blue-500">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-slate-400 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md text-sm font-semibold"
      >
        Go Back Home
      </Link>
    </div>
  );
}
