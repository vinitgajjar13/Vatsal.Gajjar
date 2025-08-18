import React, { useState, useEffect } from 'react';
import AdminProjectModal from './AdminProjectModal';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };
  useEffect(()=>{ load(); }, []);
  const handleSaved = (p) => { load(); alert('Saved'); };
  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    const res = await fetch('/api/projects/' + id, { method: 'DELETE', headers: { 'x-api-key': process.env.REACT_APP_API_KEY || 'super-secret-dev-key' } });
    if (res.ok) { alert('Deleted'); load(); } else alert('Delete failed');
  };

  const counts = {
    total: projects.length,
    published: projects.filter(p=>p.published).length,
    images: projects.reduce((s,p)=>s + (p.images? p.images.length:0), 0),
    videos: projects.reduce((s,p)=>s + (p.videos? p.videos.length:0), 0)
  };

  return (
    <div style={{padding:20}}>
      <h2>Admin Dashboard</h2>
      <div>
        <button onClick={()=>{setEditing(null); setOpenModal(true);}}>Add Project</button>
        <button onClick={()=>window.location='/'}>Logout</button>
      </div>
      <div>
        <strong>Total:</strong> {counts.total} &nbsp;
        <strong>Published:</strong> {counts.published} &nbsp;
        <strong>Images:</strong> {counts.images} &nbsp;
        <strong>Videos:</strong> {counts.videos}
      </div>
      <table border="1" cellPadding="8" style={{marginTop:10}}>
        <thead><tr><th>Name</th><th>Year</th><th>Published</th><th>Actions</th></tr></thead>
        <tbody>
          {projects.map(p=>(
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.year}</td>
              <td>{p.published ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={()=>{setEditing(p); setOpenModal(true);}}>Edit</button>
                <button onClick={()=>handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AdminProjectModal open={openModal} onClose={()=>setOpenModal(false)} onSaved={handleSaved} project={editing} />
    </div>
  );
};
export default AdminDashboard;
