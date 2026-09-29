export default function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}