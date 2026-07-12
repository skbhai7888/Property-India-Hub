"use client";
import PropertyForm from "../../../components/PropertyForm";

export default function AddProjectPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6" style={{color: '#0a1628'}}>Add New Project</h1>
        <PropertyForm mode="admin" />
      </div>
    </main>
  );
}
