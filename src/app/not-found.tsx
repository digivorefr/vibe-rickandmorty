import Link from "next/link";

export default function NotFound() {
  return (
    <div className="brutalist-container">
      <div className="text-center space-y-6">
        <h1 className="brutalist-header">404 - Page Not Found</h1>
        <p className="text-xl">
          Oops! The page you are looking for might have been removed or
          doesn&apos;t exist.
        </p>
        <Link href="/" className="brutalist-button inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
