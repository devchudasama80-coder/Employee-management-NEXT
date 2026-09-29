import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold">Forgot Password?</h1>
        <p className="mb-6 text-gray-500">
          Enter your email to receive a reset link
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}