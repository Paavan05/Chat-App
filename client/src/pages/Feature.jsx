import React from 'react';
import Navbar from '../components/Navbar';
import { Clock3, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon = ({ title, subtitle }) => (
  <div className="min-h-screen bg-[#f7f8fc] dark:bg-[#080809] text-slate-900 dark:text-slate-100 transition-colors flex flex-col pt-10">
    <Navbar />

    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white/85 dark:bg-slate-900/85 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-8 sm:p-10 backdrop-blur">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 text-sm font-medium">
          <Sparkles size={16} />
          Coming soon
        </div>

        <div className="mt-6 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-200">
            <Clock3 size={28} />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{title}</h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We're polishing the experience—real-time demos, advanced chat controls, and deeper integrations are on the way.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#1681E3] hover:bg-[#0f66b8] text-white px-4 py-2 text-sm font-semibold shadow transition"
              >
                Back to Home
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

const Feature = () => {
  return (
    <ComingSoon
      title="Features are being crafted"
      subtitle="We’re finalizing the feature set to deliver the smoothest chat experience. Hang tight—a richer, smarter dashboard is coming soon."
    />
  );
};

export default Feature;