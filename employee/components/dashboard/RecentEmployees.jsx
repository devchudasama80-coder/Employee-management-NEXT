export default function RecentEmployees({ employees }) {
  if (!employees || employees.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
        No recent employees
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Employees</h3>

      <div className="space-y-3">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                {emp.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{emp.name}</p>
                <p className="text-xs text-gray-500">{emp.position || "-"}</p>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              {emp.department || "Unassigned"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}