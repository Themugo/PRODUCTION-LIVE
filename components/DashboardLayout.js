// components/DashboardLayout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-simDark text-white">
      <header className="bg-simBlue p-4 text-center font-bold text-2xl">
        SIMTRACE Dashboard
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
