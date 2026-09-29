import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default async function ResetPasswordPage({ params }) {
  const { token } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold">Reset Password</h1>
        <p className="mb-6 text-gray-500">Enter your new password below</p>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}