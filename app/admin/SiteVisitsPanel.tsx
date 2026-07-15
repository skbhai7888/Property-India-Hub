"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function SiteVisitsPanel() {
  const [visits, setVisits] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadVisits(); }, []);

  async function loadVisits() {
    setLoading(true);
    const { data } = await supabase.from('site_visits').select('*').order('created_at', { ascending: false });
    setVisits(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('site_visits').update({ status }).eq('id', id);
    loadVisits();
  }

  function matchesFilter(v: any) {
    if (filter === 'all') return true;
    {v.poster_name ? (
      <p className="text-xs mt-1 font-bold" style={{color: '#0a1628'}}>👤 Poster: {v.poster_name} ({v.poster_phone})</p>
    ) : (
      <p className="text-xs mt-1 text-gray-400">👤 Poster: Not linked (admin-added listing)</p>
    )}
    if (filter === 'today') return v.preferred_date === 'Today';
    if (filter === 'week') return v.preferred_date === 'This Week';
    if (filter === 'next') return v.preferred_date === 'Next Week';
    return true;
  }

  const filtered = visits.filter(matchesFilter);

  if (loading) return <p className="text-sm text-gray-500 p-4">Loading site visits...</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3" style={{color: '#0a1628'}}>🏠 Site Visit Requests</h2>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {['all', 'today', 'week', 'next'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-bold border-2 whitespace-nowrap"
            style={{
              background: filter === f ? '#0a1628' : 'white',
              color: filter === f ? '#c9a84c' : '#0a1628',
              borderColor: '#0a1628'
            }}>
            {f === 'all' ? 'All' : f === 'today' ? 'Today' : f === 'week' ? 'This Week' : 'Next Week'}
          </button>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-sm text-gray-400">No requests found.</p>}

      <div className="flex flex-col gap-3">
        {filtered.map(v => (
          <div key={v.id} className="bg-white rounded-xl shadow p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-sm" style={{color: '#0a1628'}}>{v.name}</p>
                <p className="text-xs text-gray-500">{v.phone}</p>
                <p className="text-xs text-gray-500 mt-1">📍 {v.project_name}</p>
                <p className="text-xs mt-1" style={{color: '#c9a84c'}}>🗓️ {v.preferred_date}</p>
                {v.message && <p className="text-xs text-gray-400 mt-1">{v.message}</p>}
              </div>
              <span className="text-xs px-2 py-1 rounded-full font-bold"
                style={{
                  background: v.status === 'pending' ? '#fef3c7' : v.status === 'contacted' ? '#dbeafe' : v.status === 'visit_done' ? '#dcfce7' : '#fee2e2',
                  color: v.status === 'pending' ? '#92400e' : v.status === 'contacted' ? '#1e40af' : v.status === 'visit_done' ? '#166534' : '#991b1b'
                }}>
                {v.status}
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              {['pending', 'contacted', 'visit_done', 'cancelled'].map(s => (
                <button key={s} onClick={() => updateStatus(v.id, s)}
                  className="text-xs px-2 py-1 rounded-lg border"
                  style={{ borderColor: v.status === s ? '#c9a84c' : '#ddd', fontWeight: v.status === s ? 'bold' : 'normal' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
