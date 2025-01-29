import React, { useState, useEffect } from 'react';

    const initialAssets = [
      { id: 1, name: 'Laptop', type: 'hardware', size: '1.5 kg' },
      { id: 2, name: 'Project Proposal', type: 'document', size: '2 MB' },
    ];

    function App() {
      const [assets, setAssets] = useState(initialAssets);
      const [newAssetName, setNewAssetName] = useState('');
      const [newAssetType, setNewAssetType] = useState('');
      const [newAssetSize, setNewAssetSize] = useState('');
      const [editAssetId, setEditAssetId] = useState(null);
      const [editAssetName, setEditAssetName] = useState('');
      const [editAssetType, setEditAssetType] = useState('');
      const [editAssetSize, setEditAssetSize] = useState('');
      const [isDarkMode, setIsDarkMode] = useState(false);

      useEffect(() => {
        if (isDarkMode) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
      }, [isDarkMode]);

      const handleAddAsset = () => {
        if (newAssetName && newAssetType && newAssetSize) {
          const newAsset = {
            id: Date.now(),
            name: newAssetName,
            type: newAssetType,
            size: newAssetSize,
          };
          setAssets([...assets, newAsset]);
          setNewAssetName('');
          setNewAssetType('');
          setNewAssetSize('');
        }
      };

      const handleEditAsset = (asset) => {
        setEditAssetId(asset.id);
        setEditAssetName(asset.name);
        setEditAssetType(asset.type);
        setEditAssetSize(asset.size);
      };

      const handleUpdateAsset = () => {
        if (editAssetId && editAssetName && editAssetType && editAssetSize) {
          const updatedAssets = assets.map((asset) =>
            asset.id === editAssetId
              ? {
                  ...asset,
                  name: editAssetName,
                  type: editAssetType,
                  size: editAssetSize,
                }
              : asset
          );
          setAssets(updatedAssets);
          setEditAssetId(null);
          setEditAssetName('');
          setEditAssetType('');
          setEditAssetSize('');
        }
      };

      const handleDeleteAsset = (id) => {
        setAssets(assets.filter((asset) => asset.id !== id));
      };

      return (
        <div className={`container mx-auto p-4 ${isDarkMode ? 'dark' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Asset Manager</h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-gray-200 dark:bg-gray-700 p-2 rounded"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          {/* Add Asset Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Add New Asset</h2>
            <input
              type="text"
              placeholder="Asset Name"
              className="border p-2 mr-2 dark:bg-gray-700 dark:text-white"
              value={newAssetName}
              onChange={(e) => setNewAssetName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Asset Type"
              className="border p-2 mr-2 dark:bg-gray-700 dark:text-white"
              value={newAssetType}
              onChange={(e) => setNewAssetType(e.target.value)}
            />
            <input
              type="text"
              placeholder="Asset Size"
              className="border p-2 mr-2 dark:bg-gray-700 dark:text-white"
              value={newAssetSize}
              onChange={(e) => setNewAssetSize(e.target.value)}
            />
            <button onClick={handleAddAsset} className="bg-blue-500 text-white p-2 rounded">
              Add Asset
            </button>
          </div>

          {/* Asset List */}
          <h2 className="text-xl font-semibold mb-2">Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((asset) => (
              <div key={asset.id} className="border rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="font-semibold dark:text-white">{asset.name}</h3>
                <p className="dark:text-gray-300">Type: {asset.type}</p>
                <p className="dark:text-gray-300">Size: {asset.size}</p>
                <div className="mt-2 flex justify-between">
                  <button
                    onClick={() => handleEditAsset(asset)}
                    className="bg-yellow-500 text-white p-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Asset Modal */}
          {editAssetId && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
              <div className="bg-white dark:bg-gray-700 p-8 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Edit Asset</h2>
                <input
                  type="text"
                  placeholder="Asset Name"
                  className="border p-2 mb-2 w-full dark:bg-gray-800 dark:text-white"
                  value={editAssetName}
                  onChange={(e) => setEditAssetName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Asset Type"
                  className="border p-2 mb-2 w-full dark:bg-gray-800 dark:text-white"
                  value={editAssetType}
                  onChange={(e) => setEditAssetType(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Asset Size"
                  className="border p-2 mb-2 w-full dark:bg-gray-800 dark:text-white"
                  value={editAssetSize}
                  onChange={(e) => setEditAssetSize(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <button onClick={handleUpdateAsset} className="bg-blue-500 text-white p-2 rounded mr-2">
                    Update
                  </button>
                  <button onClick={() => setEditAssetId(null)} className="bg-gray-400 text-white p-2 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default App;
