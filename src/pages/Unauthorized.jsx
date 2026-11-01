import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">
      <div className="max-w-md w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-600">
          <ShieldAlert size={28} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Access denied</h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          You do not have permission to view this page.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
