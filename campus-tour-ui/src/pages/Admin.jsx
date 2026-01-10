import { useState } from 'react';
import { Pencil, Trash2, Upload, Plus, MessageSquare, Map, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { locations } from '../data/locations';

export default function Admin() {
  const [buildings, setBuildings] = useState(locations);
  const [editingBuilding, setEditingBuilding] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    floors: 1,
    rooms: 1,
    depts: '' 
  });

  const handleEdit = (building) => {
    setEditingBuilding(building);
    setFormData({
      name: building.name,
      category: building.category,
      description: building.description,
      floors: building.floorInfo?.floors || 1,
      rooms: building.floorInfo?.rooms || 1,
      depts: building.floorInfo?.depts?.join(', ') || ''
    });
  };

  const handleSave = () => {
    const updatedBuildingData = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      floorInfo: {
        floors: parseInt(formData.floors),
        rooms: parseInt(formData.rooms),
        depts: formData.depts.split(',').map(d => d.trim())
      }
    };

    if (editingBuilding) {
      setBuildings(buildings.map(b => 
        b.id === editingBuilding.id ? { ...b, ...updatedBuildingData } : b
      ));
    } else {
      const newBuilding = {
        id: Math.max(...buildings.map(b => b.id)) + 1,
        ...updatedBuildingData,
        images: ['/map_assets/gateway.jpg'],
        coordinates: [9.035, 38.75], 
        rating: 4.5,
        hours: '8AM - 5PM',
        walking: { distance: "0m", duration: "0 min" }
      };
      setBuildings([...buildings, newBuilding]);
    }
    setEditingBuilding(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', description: '', floors: 1, rooms: 1, depts: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Table List */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Campus Buildings</h2>
            <button onClick={() => { setEditingBuilding(null); resetForm(); }} className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus size={18} /> Add New
            </button>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 uppercase text-xs font-bold text-gray-500">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buildings.map(b => (
                <tr key={b.id} className="border-t">
                  <td className="p-4 font-medium">{b.name}</td>
                  <td className="p-4">{b.category}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button onClick={() => handleEdit(b)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Pencil size={16}/></button>
                    <button onClick={() => setBuildings(buildings.filter(x => x.id !== b.id))} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Form */}
        <div className="w-96 bg-white rounded-xl shadow-sm border p-6 h-fit sticky top-8">
          <h2 className="text-xl font-bold mb-6">{editingBuilding ? 'Edit Building' : 'Add Building'}</h2>
          <div className="space-y-4">
            <input className="w-full p-2 border rounded" placeholder="Building Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <select className="w-full p-2 border rounded" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="">Select Category</option>
              <option value="Academic">Academic</option>
              <option value="Libraries">Libraries</option>
              <option value="Dining">Dining</option>
            </select>
            <div className="flex gap-2">
              <input type="number" className="w-1/2 p-2 border rounded" placeholder="Floors" value={formData.floors} onChange={e => setFormData({...formData, floors: e.target.value})} />
              <input type="number" className="w-1/2 p-2 border rounded" placeholder="Rooms" value={formData.rooms} onChange={e => setFormData({...formData, rooms: e.target.value})} />
            </div>
            <textarea className="w-full p-2 border rounded" placeholder="Departments (comma separated)" value={formData.depts} onChange={e => setFormData({...formData, depts: e.target.value})} />
            <textarea className="w-full p-2 border rounded h-24" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            <button onClick={handleSave} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              {editingBuilding ? 'Update Building' : 'Save New Building'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}