export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
      />
    </div>
  );
}