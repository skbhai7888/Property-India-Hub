"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SiteVisitForm({ projectName }: { projectName: string }) {
  const [formData, setFormData] = useState({ name: '', phone: '', preferred_date: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Supabase me data insert karna
    const { error } = await supabase.from('site_visits').insert([
      { 
        name: formData.name, 
        phone: formData.phone, 
        project_name: projectName, 
        preferred_date: formData.preferred_date, 
        message: formData.message,
        status: 'pending'
      }
    ]);

    if (error) {
      console.error("Supabase Error:", error);
      setStatus('error');
    } else {
      setStatus('success');
      setFormData({ name: '', phone: '', preferred_date: '', message: '' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mt-8">
      <h3 className="text-xl font-bold text-[#0a1628] mb-4">Book a Free Site Visit</h3>
      
      {status === 'success' ? (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          Your visit request has been sent successfully! Our team will contact you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            required 
            placeholder="Your Full Name" 
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#c9a84c]"
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          <input 
            type="tel" 
            required 
            placeholder="Your Mobile Number" 
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#c9a84c]"
            value={formData.phone} 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} 
          />
          <input 
            type="date" 
            required 
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#c9a84c]"
            value={formData.preferred_date} 
            onChange={(e) => setFormData({...formData, preferred_date: e.target.value})} 
          />
          <textarea 
            placeholder="Any specific requirement? (Optional)" 
            rows={3}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#c9a84c]"
            value={formData.message} 
            onChange={(e) => setFormData({...formData, message: e.target.value})} 
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-[#0a1628] text-white p-3 rounded-lg font-bold hover:bg-[#c9a84c] transition-colors disabled:opacity-70"
          >
            {status === 'loading' ? 'Submitting...' : 'Request Site Visit'}
          </button>
          
          {status === 'error' && (
            <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </div>
  );
}
