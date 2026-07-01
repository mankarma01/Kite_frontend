export default function EmployeeStats({ setActiveTab }) {
  // ... existing states (clock etc.)

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex justify-between items-center shadow-xl">
        <div>
          <h3 className="text-xl font-bold italic">Register your face!</h3>
          <p className="opacity-80">You need to register your face before marking attendance.</p>
        </div>
        <button 
          onClick={() => setActiveTab("camera")} // <--- Ye ab dashboard ko switch kar dega
          className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold hover:bg-slate-100 transition-all"
        >
          Register Now
        </button>
      </div>
      
      {/* ... Rest of stats code */}
    </div>
  );
}