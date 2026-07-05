"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  const checkAdminAndLoad = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (profile?.role !== "admin") {
      router.push("/");
      return;
    }
    setChecking(false);
    loadProjects();
  };

  const loadProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("id");
    setProjects(data || []);
    setLoading(false);
  };

  const toggleSoldOut = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "sold_out" ? "active" : "sold_out";
    await supabase.from("projects").update({ status: newStatus }).eq("id", id);
    loadProjects();
  };

  const deleteProject = async (id: number, name: string) => {
    if (!confirm(`Kya aap sach mein "${name}" ko delete karna chahte hain? Ye action wapas nahi ho sakta.`)) return;
    await supabase.from("projects").delete().eq("id", id);
    loadProjects();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (checking) return <div className="p-8 text-center">Checking access...</div>;
  if (loading) return <div className="p-8 text-center">Loading projects...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex justify-between items-center w-full"><h1 className="text-2xl font-bold" style={{color: "#0a1628"}}>Admin Dashboard</h1></div>
          <a href="/admin/add-project" className="text-sm px-4 py-2 rounded-lg font-bold text-white mr-2" style={{background: "#c9a84c"}}>+ Add Project</a>
          <button onClick={handleLogout} className="text-sm px-4 py-2 rounded-lg bg-gray-200">Logout</button>
        </div>

        <div className="mb-6 p-4 bg-white rounded-xl shadow">
          <p className="font-bold" style={{color: '#c9a84c'}}>Total Projects: {projects.length}</p>
        </div>

        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded-xl shadow flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm">{project.name}</h3>
                <p className="text-xs text-gray-500">{project.location}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${project.status === 'sold_out' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {project.status === 'sold_out' ? 'Sold Out' : 'Active'}
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => toggleSoldOut(project.id, project.status)}
                  className="text-xs px-3 py-2 rounded-lg font-bold text-white"
                  style={{background: project.status === 'sold_out' ? '#22c55e' : '#f59e0b'}}
                >
                  {project.status === 'sold_out' ? 'Mark Active' : 'Mark Sold Out'}
                </button>
                <button
                  onClick={() => deleteProject(project.id, project.name)}
                  className="text-xs px-3 py-2 rounded-lg font-bold text-white bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
