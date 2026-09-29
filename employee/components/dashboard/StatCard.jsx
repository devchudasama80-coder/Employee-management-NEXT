
export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow flex items-center gap-4">
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>
    </div>
  );
}