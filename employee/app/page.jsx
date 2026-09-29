import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Employee Management</h1>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
}