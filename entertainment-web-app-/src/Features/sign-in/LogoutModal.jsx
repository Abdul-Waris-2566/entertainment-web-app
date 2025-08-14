// LogoutModal.jsx
// A modal that asks the user to confirm logout or cancel.
// Props:
// - onLogout: function to call when user confirms logout
// - onCancel: function to call when user cancels
//
// Usage: <LogoutModal onLogout={...} onCancel={...} />

function LogoutModal({ onLogout, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Standard overlay: blocks interaction, does not close on click */}
      <div
        className="bg-opacity-60 pointer-events-auto absolute inset-0 bg-black/5 backdrop-blur-xs"
        aria-hidden="true"
      />
      {/* Modal card */}
      <div className="animate-fadeIn relative z-10 flex w-full max-w-xs flex-col items-center rounded-2xl border border-[#232946] bg-[#161D2F] p-7 shadow-2xl sm:max-w-sm">
        <span className="mb-5 text-center text-lg font-semibold text-white">
          Logout
        </span>
        <span className="mb-6 text-center text-sm text-[#cbd5e1]">
          Are you sure you want to logout?
        </span>
        <div className="flex w-full gap-3">
          <button
            className="flex-1 rounded-lg bg-[#FC4747] py-2 text-sm font-semibold text-white shadow transition hover:bg-[#ff6a6a]"
            onClick={onLogout}
          >
            Logout
          </button>
          <button
            className="flex-1 rounded-lg bg-[#232946] py-2 text-sm font-semibold text-[#5A698F] transition hover:bg-[#232946]/80"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
      {/* Optional: fade-in animation */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
        .animate-fadeIn { animation: fadeIn 0.2s cubic-bezier(.4,0,.2,1); }
      `}</style>
    </div>
  );
}

export default LogoutModal;
