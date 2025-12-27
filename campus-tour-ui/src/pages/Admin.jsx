import { useState } from 'react';
import { Pencil, Trash2, Upload } from 'lucide-react';
import { locations } from '../data/locations';

export default function Admin() {
  const [buildings, setBuildings] = useState(locations);
  const [editingBuilding, setEditingBuilding] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    latitude: 0,
    longitude: 0,
    photo: null
  });

  const handleEdit = (building) => {
    setEditingBuilding(building);
    setFormData({
      name: building.name,
      type: building.category,
      description: building.description,
      latitude: 0,
      longitude: 0,
      photo: null
    });
  };

  const handleDelete = (id) => {
    setBuildings(buildings.filter(b => b.id !== id));
  };

  const handleSave = () => {
    if (editingBuilding) {
      setBuildings(buildings.map(b => 
        b.id === editingBuilding.id 
          ? { ...b, name: formData.name, category: formData.type, description: formData.description }
          : b
      ));
    } else {
      const newBuilding = {
        id: buildings.length + 1,
        name: formData.name,
        category: formData.type,
        description: formData.description,
        image: '/map_assets/gateway.jpg',
        rating: 4.5,
        location: '5 Kilo',
        hours: '8AM - 5PM',
        tags: []
      };
      setBuildings([...buildings, newBuilding]);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setEditingBuilding(null);
    setFormData({
      name: '',
      type: '',
      description: '',
      latitude: 0,
      longitude: 0,
      photo: null
    });
  };

  const handleAddNew = () => {
    setEditingBuilding(null);
    setFormData({
      name: '',
      type: '',
      description: '',
      latitude: 0,
      longitude: 0,
      photo: null
    });
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/map_assets/gateway.jpg')" }}
    >
      <div className="min-h-screen bg-black/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-primary-600">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Building Table */}
            <div className="flex-1">
              <div className="bg-blue-100/90 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-lg font-bold text-primary-700 mb-6">
                  MANAGE CAMPUS BUILDING
                </h2>

                {/* Table */}
                <div className="bg-white rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Building Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Edit</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildings.map((building) => (
                        <tr key={building.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-700">{building.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{building.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{building.category}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">{building.description}</td>
                          <td className="px-4 py-3 text-center">
                            <button 
                              onClick={() => handleEdit(building)}
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button 
                              onClick={() => handleDelete(building.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {/* Empty rows for visual consistency */}
                      {[...Array(Math.max(0, 5 - buildings.length))].map((_, i) => (
                        <tr key={`empty-${i}`} className="border-b border-gray-100">
                          <td className="px-4 py-3">&nbsp;</td>
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add New Button */}
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={handleAddNew}
                    className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    ADD NEW BUILDING
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - Add/Edit Form */}
            <div className="lg:w-80">
              <div className="bg-blue-100/90 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-lg font-bold text-primary-700 mb-6 text-center">
                  ADD/EDIT BUILDING
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name of the Area
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type(Dept,Office,Service)
                    </label>
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="Description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {/* Latitude and Longitude */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Latitude and longitude
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        value={formData.latitude}
                        onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                        placeholder=":0"
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <input
                        type="number"
                        value={formData.longitude}
                        onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                        placeholder=":0"
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  {/* Upload Photo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload photo
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label 
                        htmlFor="photo-upload"
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <Upload className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Choose file</span>
                      </label>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button 
                      onClick={handleSave}
                      className="flex-1 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      SAVE
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="flex-1 px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
