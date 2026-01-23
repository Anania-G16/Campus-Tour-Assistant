import { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // Added theme hook

const DEFAULT_IMAGE = "/map_assets/upload_placeholder.png";

export default function Admin() {
  const { darkMode } = useTheme(); // Extracted darkMode state
  const [buildings, setBuildings] = useState([]);
  const [editingBuilding, setEditingBuilding] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    floors: 1,
    rooms: 1,
    depts: "",
    lat: "",
    lng: "",
    nearestNode: "",
    hours: "",
    location: "",
    tags: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const fetchBuildings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/building");
      if (res.data.success) setBuildings(res.data.buildings);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch buildings");
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const handleEdit = (building) => {
    setEditingBuilding(building);
    setFormData({
      name: building.name,
      category: building.category,
      description: building.description,
      nearestNode: building.nearstNode,
      floors: building.floorinfo?.floors || 1,
      rooms: building.floorinfo?.rooms || 1,
      depts: building.floorinfo?.depts?.join(", ") || "",
      images: building.images || "",
      lat: building.lat || building.coordinates?.[0] || "",
      lng: building.lng || building.coordinates?.[1] || "",
      hours: building.hours || "",
      location: building.location || "",
      tags: building.tags?.join(", ") || "",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("nearestNode", formData.nearestNode);
    data.append("lat", formData.lat);
    data.append("lng", formData.lng);
    data.append("hours", formData.hours);
    data.append("location", formData.location);
    data.append("tags", formData.tags);
    data.append(
      "floorinfo",
      JSON.stringify({
        floors: Number(formData.floors),
        rooms: Number(formData.rooms),
        depts: formData.depts.split(",").map((d) => d.trim()),
      })
    );

    if (imageFile) {
      data.append("images", imageFile);
    }

    try {
      if (editingBuilding) {
        await axios.put(
          `http://localhost:3000/api/building/${editingBuilding.id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:3000/api/building", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setEditingBuilding(null);
      setImageFile(null);
      setImagePreview("");
      fetchBuildings();
    } catch (err) {
      console.error(err);
      alert("Failed to save building");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this building?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/building/${id}`);
      fetchBuildings();
    } catch (err) {
      console.error(err);
      alert("Failed to delete building");
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 p-8 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto flex gap-8">
        
        {/* Table List */}
        <div className={`flex-1 rounded-xl shadow-sm border p-6 transition-colors duration-500 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between mb-6">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Campus Buildings</h2>
            <button
              onClick={() => {
                setEditingBuilding(null);
                setFormData({
                  name: "", category: "", description: "", floors: 1, rooms: 1,
                  depts: "", images: "", lat: "", lng: "", nearstNode: "",
                  hours: "", location: "", tags: "",
                });
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
            >
              <Plus size={18} /> Add New
            </button>
          </div>
          <table className="w-full text-sm text-left">
            <thead className={`${darkMode ? 'bg-slate-800/50' : 'bg-gray-50'} uppercase text-xs font-bold text-gray-500`}>
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-slate-800' : 'divide-gray-200'}`}>
              {buildings.map((b) => (
                <tr key={b.id} className={`transition-colors ${darkMode ? 'hover:bg-slate-800/30' : 'hover:bg-gray-50'}`}>
                  <td className="p-4 font-medium">{b.name}</td>
                  <td className="p-4">{b.category}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(b)}
                      className="p-2 text-blue-500 hover:bg-blue-500/10 rounded transition"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Form */}
        <div className={`w-96 rounded-xl shadow-sm border p-6 h-fit sticky top-8 overflow-y-auto max-h-[90vh] transition-colors duration-500 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {editingBuilding ? "Edit Building" : "Add Building"}
          </h2>
          <div className="space-y-4">
            <div className={`w-full h-48 border rounded-lg flex items-center justify-center overflow-hidden ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-200'}`}>
              <img
                src={imagePreview || editingBuilding?.images || DEFAULT_IMAGE}
                alt="Building"
                className="object-cover w-full h-full"
              />
            </div>

            <label className={`w-full flex items-center gap-2 p-2 border rounded cursor-pointer transition ${
              darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}>
              <Upload size={18} /> Upload Image
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>

            <input
              className={`w-full p-2 border rounded outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
              placeholder="Building Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <select
              className={`w-full p-2 border rounded outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="Academic">Academic</option>
              <option value="Libraries">Libraries</option>
              <option value="Sports">Sports</option>
              <option value="Parking">Parking</option>
              <option value="Outdoor">Outdoor</option>
            </select>
            
            <div className="flex gap-2">
              <input
                type="number"
                className={`w-1/2 p-2 border rounded outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
                placeholder="Floors"
                value={formData.floors}
                onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
              />
              <input
                type="number"
                className={`w-1/2 p-2 border rounded outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
                placeholder="Rooms"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
              />
            </div>

            <textarea
              className={`w-full p-2 border rounded outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
              placeholder="Departments (comma separated)"
              value={formData.depts}
              onChange={(e) => setFormData({ ...formData, depts: e.target.value })}
            />
            <textarea
              className={`w-full p-2 border rounded h-20 outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            
            <div className="flex gap-2">
              <input
                type="number"
                className={`w-1/2 p-2 border rounded outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
                placeholder="Latitude"
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
              />
              <input
                type="number"
                className={`w-1/2 p-2 border rounded outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
                placeholder="Longitude"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
              />
            </div>

            <input
              className={`w-full p-2 border rounded outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
              placeholder="Hours"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
            />
            <input
              className={`w-full p-2 border rounded outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
              placeholder="nearestNode"
              value={formData.nearestNode}
              onChange={(e) => setFormData({ ...formData, nearestNode: e.target.value })}
            />
            <input
              className={`w-full p-2 border rounded outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <input
              className={`w-full p-2 border rounded outline-none transition ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-indigo-500' : 'bg-white border-gray-200 focus:border-indigo-500'}`}
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />

            <button
              onClick={handleSave}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
            >
              {editingBuilding ? "Update Building" : "Save New Building"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}