import React, { useState, useEffect } from 'react';

const AdminProjectModal = ({ open, onClose, onSaved, project }) => {
  const [form, setForm] = useState({
    name: '', description: '', year: '', categories: '', client: '', type: '', published: false
  });
  const [files, setFiles] = useState(null);

  useEffect(()=> {
    if (project) {
      setForm({
        name: project.name || '',
        description: project.description || '',
        year: project.year || '',
        categories: (project.categories || []).join(', '),
        client: project.client || '',
        type: project.type || '',
        published: project.published || false
      });
    }
  }, [project]);

  if (!open) return null;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f=>({...f, [name]: type==='checkbox'?checked:value}));
  };
  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k,v])=>fd.append(k, v));
    if (files) {
      for (let i=0;i<files.length;i++) fd.append('files', files[i]);
    }
    const url = project ? `/api/projects/${project._id}` : '/api/projects';
    const method = project ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'x-api-key': process.env.REACT_APP_API_KEY || 'super-secret-dev-key' }, body: fd });
    if (res.ok) {
      const data = await res.json();
      onSaved && onSaved(data);
      onClose && onClose();
    } else {
      alert('Error saving project');
    }
  };

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <form onSubmit={submit} style={{background:'#fff',padding:20,borderRadius:8,width:600}}>
        <h3>{project ? 'Edit' : 'Add'} Project</h3>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <br />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <br />
        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <br />
        <input name="categories" placeholder="categories (comma separated)" value={form.categories} onChange={handleChange} />
        <br />
        <input name="client" placeholder="Client" value={form.client} onChange={handleChange} />
        <br />
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} />
        <br />
        <label><input type="checkbox" name="published" checked={form.published} onChange={handleChange} /> Published</label>
        <br />
        <input type="file" multiple onChange={(e)=>setFiles(e.target.files)} />
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};
export default AdminProjectModal;
