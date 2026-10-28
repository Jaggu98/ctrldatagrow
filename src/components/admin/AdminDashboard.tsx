import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Search,
  Download,
  RefreshCw,
  LogOut,
  ShieldCheck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Mail,
  Phone,
  Building,
  User,
  GraduationCap,
  Lock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Speaker, CampusAmbassador, ApplicationStatus } from '../../types/database';
import {
  fetchSpeakers,
  updateSpeakerStatus,
  exportSpeakersToCsv
} from '../../services/speakerService';
import {
  fetchCampusAmbassadors,
  updateAmbassadorStatus,
  exportAmbassadorsToCsv
} from '../../services/ambassadorService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'speakers' | 'ambassadors'>('speakers');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Data states
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [ambassadors, setAmbassadors] = useState<CampusAmbassador[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected item modal
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [selectedAmbassador, setSelectedAmbassador] = useState<CampusAmbassador | null>(null);

  // Check auth session on load
  useEffect(() => {
    if (!isOpen) return;

    if (!isSupabaseConfigured()) {
      // In dev mode when Supabase is not configured yet, allow demo inspection
      setIsAuthenticated(true);
      setAdminEmail('admin@ctrldatagrow.com (Local Preview Mode)');
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setAdminEmail(session.user.email || 'Admin');
      } else {
        setIsAuthenticated(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setAdminEmail(session.user.email || 'Admin');
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [isOpen]);

  // Load records
  const loadData = useCallback(async () => {
    if (!isOpen || !isAuthenticated) return;
    setLoading(true);

    if (activeTab === 'speakers') {
      const res = await fetchSpeakers({
        status: statusFilter,
        searchQuery: searchQuery,
      });
      setSpeakers(res.speakers);
    } else {
      const res = await fetchCampusAmbassadors({
        status: statusFilter,
        searchQuery: searchQuery,
      });
      setAmbassadors(res.ambassadors);
    }

    setLoading(false);
  }, [isOpen, isAuthenticated, activeTab, statusFilter, searchQuery]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      if (!isSupabaseConfigured()) {
        // Fallback demo mode
        setIsAuthenticated(true);
        setAdminEmail(loginEmail || 'admin@ctrldatagrow.com');
        setLoginLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });

      if (error) throw error;

      if (data.user) {
        setIsAuthenticated(true);
        setAdminEmail(data.user.email || '');
      }
    } catch (err: any) {
      setLoginError(err?.message || 'Invalid administrator credentials. Please check your email and password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setAdminEmail('');
    setSpeakers([]);
    setAmbassadors([]);
  };

  // Status changers
  const handleUpdateSpeakerStatus = async (id: string, newStatus: ApplicationStatus) => {
    const res = await updateSpeakerStatus(id, newStatus);
    if (res.success) {
      setSpeakers(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
      if (selectedSpeaker && selectedSpeaker.id === id) {
        setSelectedSpeaker(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } else {
      alert(`Error updating status: ${res.error}`);
    }
  };

  const handleUpdateAmbassadorStatus = async (id: string, newStatus: ApplicationStatus) => {
    const res = await updateAmbassadorStatus(id, newStatus);
    if (res.success) {
      setAmbassadors(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      if (selectedAmbassador && selectedAmbassador.id === id) {
        setSelectedAmbassador(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } else {
      alert(`Error updating status: ${res.error}`);
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    let csvContent = '';
    let filename = '';

    if (activeTab === 'speakers') {
      csvContent = exportSpeakersToCsv(speakers);
      filename = `cdg-speakers-${new Date().toISOString().slice(0, 10)}.csv`;
    } else {
      csvContent = exportAmbassadorsToCsv(ambassadors);
      filename = `cdg-ambassadors-${new Date().toISOString().slice(0, 10)}.csv`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle className="w-3 h-3 text-emerald-600" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3 h-3 text-rose-600" /> Rejected
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
            <Clock className="w-3 h-3 text-sky-600" /> Under Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B1F33] text-white rounded-2xl w-full max-w-6xl max-h-[94vh] shadow-2xl border border-[#1769AA]/40 flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-5 py-4 bg-[#071524] border-b border-[#1769AA]/30 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#138A9E]/20 text-[#138A9E] flex items-center justify-center border border-[#138A9E]/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Ctrl + Data + Grow</span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1769AA]/30 text-[#8ED0EA] border border-[#1769AA]/40">
                  Admin Portal
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Persistent Supabase PostgreSQL Management Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-[11px]">{adminEmail}</span>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="ml-2 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Close admin dashboard"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Auth Barrier if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex-1 flex items-center justify-center overflow-y-auto">
            <div className="max-w-md w-full bg-[#102A45] rounded-2xl p-6 sm:p-8 border border-[#1769AA]/30 shadow-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#138A9E]/20 text-[#138A9E] flex items-center justify-center mx-auto mb-4 border border-[#138A9E]/30">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-center text-white">Administrator Access</h3>
              <p className="text-xs text-center text-slate-300 mt-1 mb-6">
                Please sign in with your authorized CDG Supabase administrative credentials to inspect registrations.
              </p>

              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Admin Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@ctrldatagrow.com"
                    className="w-full bg-[#071524] border border-[#1769AA]/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#138A9E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#071524] border border-[#1769AA]/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#138A9E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-[#138A9E] hover:bg-[#0E6D82] text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <span>Sign In to Admin Portal</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard Body */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Control Strip: Tabs, Search, Filters, CSV Export */}
            <div className="p-4 bg-[#0B1F33] border-b border-[#1769AA]/20 space-y-3 shrink-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Navigation Tabs */}
                <div className="flex items-center gap-2 bg-[#071524] p-1 rounded-xl border border-[#1769AA]/30">
                  <button
                    onClick={() => setActiveTab('speakers')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                      activeTab === 'speakers'
                        ? 'bg-[#138A9E] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Corporate Speakers</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                      {speakers.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('ambassadors')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                      activeTab === 'ambassadors'
                        ? 'bg-[#138A9E] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Campus Ambassadors</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                      {ambassadors.length}
                    </span>
                  </button>
                </div>

                {/* Actions: Refresh & CSV Export */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={loadData}
                    disabled={loading}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                    title="Refresh Data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#138A9E]' : ''}`} />
                  </button>

                  <button
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1769AA]/30 hover:bg-[#1769AA]/50 border border-[#1769AA]/40 text-xs font-bold text-[#8ED0EA] transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      activeTab === 'speakers'
                        ? 'Search speakers by name, email, company, topics, or ID...'
                        : 'Search ambassadors by name, email, college, branch, or ID...'
                    }
                    className="w-full bg-[#071524] border border-[#1769AA]/30 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#138A9E]"
                  />
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <span className="text-slate-400 text-[11px] mr-1">Status:</span>
                  {(['all', 'pending', 'under_review', 'approved', 'rejected'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        statusFilter === st
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Records Table / List */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-2">
                  <Loader2 className="w-7 h-7 animate-spin text-[#138A9E]" />
                  <span className="text-xs">Querying Supabase PostgreSQL...</span>
                </div>
              ) : activeTab === 'speakers' ? (
                speakers.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 space-y-2">
                    <p className="text-sm font-semibold">No speaker applications found.</p>
                    <p className="text-xs text-slate-500">
                      Submissions made via the Speaker Application form will be securely listed here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {speakers.map((spk) => (
                      <div
                        key={spk.id}
                        className="p-3.5 sm:p-4 rounded-xl bg-[#0E243A] border border-[#1769AA]/30 hover:border-[#138A9E]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] text-[#138A9E] font-bold bg-[#138A9E]/10 px-2 py-0.5 rounded border border-[#138A9E]/20">
                              {spk.registration_id}
                            </span>
                            <span className="font-bold text-white text-sm">{spk.full_name}</span>
                            {renderStatusBadge(spk.status)}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                            <span className="flex items-center gap-1 text-slate-200">
                              <Building className="w-3 h-3 text-[#138A9E]" />
                              {spk.designation} at {spk.company}
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                              <Mail className="w-3 h-3" />
                              {spk.email}
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                              <Phone className="w-3 h-3" />
                              {spk.phone}
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 line-clamp-1">
                            <strong className="text-slate-300">Topics:</strong> {spk.topics}
                          </p>
                        </div>

                        {/* Status Changers & View button */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => setSelectedSpeaker(spk)}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>

                          <select
                            value={spk.status}
                            onChange={(e) => handleUpdateSpeakerStatus(spk.id, e.target.value as ApplicationStatus)}
                            className="bg-[#071524] border border-[#1769AA]/40 text-xs rounded-lg px-2 py-1.5 text-white focus:outline-none focus:ring-1 focus:ring-[#138A9E]"
                          >
                            <option value="pending">Pending</option>
                            <option value="under_review">Under Review</option>
                            <option value="approved">Approve</option>
                            <option value="rejected">Reject</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Campus Ambassadors List */
                ambassadors.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 space-y-2">
                    <p className="text-sm font-semibold">No campus ambassador applications found.</p>
                    <p className="text-xs text-slate-500">
                      Applications from students will be persistently stored and listed here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {ambassadors.map((amb) => (
                      <div
                        key={amb.id}
                        className="p-3.5 sm:p-4 rounded-xl bg-[#0E243A] border border-[#1769AA]/30 hover:border-[#138A9E]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] text-[#D6A84F] font-bold bg-[#D6A84F]/10 px-2 py-0.5 rounded border border-[#D6A84F]/20">
                              {amb.application_id}
                            </span>
                            <span className="font-bold text-white text-sm">{amb.full_name}</span>
                            {renderStatusBadge(amb.status)}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                            <span className="flex items-center gap-1 text-slate-200">
                              <Building className="w-3 h-3 text-[#138A9E]" />
                              {amb.college_name} ({amb.city_state})
                            </span>
                            <span className="text-slate-400">
                              {amb.branch} • {amb.year_of_study}
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                              <Mail className="w-3 h-3" />
                              {amb.email}
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 line-clamp-1">
                            <strong className="text-slate-300">Outreach:</strong> {amb.outreach_plan}
                          </p>
                        </div>

                        {/* Status Changers & View button */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => setSelectedAmbassador(amb)}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>

                          <select
                            value={amb.status}
                            onChange={(e) => handleUpdateAmbassadorStatus(amb.id, e.target.value as ApplicationStatus)}
                            className="bg-[#071524] border border-[#1769AA]/40 text-xs rounded-lg px-2 py-1.5 text-white focus:outline-none focus:ring-1 focus:ring-[#138A9E]"
                          >
                            <option value="pending">Pending</option>
                            <option value="under_review">Under Review</option>
                            <option value="approved">Approve</option>
                            <option value="rejected">Reject</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

          </div>
        )}

      </div>

      {/* Speaker Details Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0E243A] text-white border border-[#1769AA]/40 rounded-2xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-xs text-[#138A9E]">{selectedSpeaker.registration_id}</span>
                <h4 className="text-lg font-bold">{selectedSpeaker.full_name}</h4>
              </div>
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><strong className="text-slate-400">Designation:</strong> <p>{selectedSpeaker.designation}</p></div>
              <div><strong className="text-slate-400">Company:</strong> <p>{selectedSpeaker.company}</p></div>
              <div><strong className="text-slate-400">Email:</strong> <p>{selectedSpeaker.email}</p></div>
              <div><strong className="text-slate-400">Phone:</strong> <p>{selectedSpeaker.phone}</p></div>
              <div><strong className="text-slate-400">Preferred Mode:</strong> <p>{selectedSpeaker.preferred_mode}</p></div>
              <div><strong className="text-slate-400">Fee Range:</strong> <p>{selectedSpeaker.fee_range || 'Not specified'}</p></div>
            </div>

            <div className="text-xs space-y-2 pt-2 border-t border-white/10">
              <div>
                <strong className="text-slate-400">LinkedIn Profile:</strong>
                <a
                  href={selectedSpeaker.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[#0077B5] hover:underline truncate"
                >
                  {selectedSpeaker.linkedin_url}
                </a>
              </div>
              {selectedSpeaker.portfolio_url && (
                <div>
                  <strong className="text-slate-400">Portfolio Link:</strong>
                  <a
                    href={selectedSpeaker.portfolio_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-[#138A9E] hover:underline truncate"
                  >
                    {selectedSpeaker.portfolio_url}
                  </a>
                </div>
              )}
              <div>
                <strong className="text-slate-400">Topics & Expertise:</strong>
                <p className="bg-[#071524] p-2.5 rounded-lg border border-white/5 mt-1 leading-relaxed">
                  {selectedSpeaker.topics}
                </p>
              </div>
              {selectedSpeaker.speaking_experience && (
                <div>
                  <strong className="text-slate-400">Speaking Experience:</strong>
                  <p className="bg-[#071524] p-2.5 rounded-lg border border-white/5 mt-1 leading-relaxed">
                    {selectedSpeaker.speaking_experience}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>{renderStatusBadge(selectedSpeaker.status)}</div>
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ambassador Details Modal */}
      {selectedAmbassador && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0E243A] text-white border border-[#1769AA]/40 rounded-2xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-xs text-[#D6A84F]">{selectedAmbassador.application_id}</span>
                <h4 className="text-lg font-bold">{selectedAmbassador.full_name}</h4>
              </div>
              <button
                onClick={() => setSelectedAmbassador(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><strong className="text-slate-400">College:</strong> <p>{selectedAmbassador.college_name}</p></div>
              <div><strong className="text-slate-400">Location:</strong> <p>{selectedAmbassador.city_state}</p></div>
              <div><strong className="text-slate-400">Branch:</strong> <p>{selectedAmbassador.branch}</p></div>
              <div><strong className="text-slate-400">Year:</strong> <p>{selectedAmbassador.year_of_study}</p></div>
              <div><strong className="text-slate-400">Email:</strong> <p>{selectedAmbassador.email}</p></div>
              <div><strong className="text-slate-400">WhatsApp:</strong> <p>{selectedAmbassador.phone}</p></div>
            </div>

            <div className="text-xs space-y-2 pt-2 border-t border-white/10">
              <div>
                <strong className="text-slate-400">LinkedIn Profile:</strong>
                <a
                  href={selectedAmbassador.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[#0077B5] hover:underline truncate"
                >
                  {selectedAmbassador.linkedin_url}
                </a>
              </div>
              {selectedAmbassador.club_involvement && (
                <div>
                  <strong className="text-slate-400">Club / Leadership Positions:</strong>
                  <p className="bg-[#071524] p-2.5 rounded-lg border border-white/5 mt-1 leading-relaxed">
                    {selectedAmbassador.club_involvement}
                  </p>
                </div>
              )}
              <div>
                <strong className="text-slate-400">Campus Outreach Plan:</strong>
                <p className="bg-[#071524] p-2.5 rounded-lg border border-white/5 mt-1 leading-relaxed">
                  {selectedAmbassador.outreach_plan}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>{renderStatusBadge(selectedAmbassador.status)}</div>
              <button
                onClick={() => setSelectedAmbassador(null)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
