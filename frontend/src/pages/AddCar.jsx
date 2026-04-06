import { useState } from 'react';

export default function AddCar() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  // We use an array of 5 empty strings to manage exactly 5 bullet points
  const [bullets, setBullets] = useState(['', '', '', '', '']);

  const handleBulletChange = (index, value) => {
    const newBullets = [...bullets];
    newBullets[index] = value;
    setBullets(newBullets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const carData = {
      title,
      imageUrl,
      price,
      description_points: bullets
    };

    console.log('Submitting new car to inventory:', carData);
    alert('Car added successfully! (Check console for data)');
    
    // Reset form after submission
    setTitle('');
    setImageUrl('');
    setPrice('');
    setBullets(['', '', '', '', '']);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Add New Car to Inventory</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Basic Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Listing Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="e.g. 2015 Honda City VX"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
              <input 
                type="url" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="https://example.com/car-image.jpg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Dealer Price (₹)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="550000"
                required
              />
            </div>
          </div>

          {/* Right Column: 5 Bullet Points */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">5 Bullet Point Description</label>
            <p className="text-xs text-gray-500 mb-3">Highlight the best features of this vehicle.</p>
            
            <div className="space-y-3">
              {bullets.map((bullet, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2 text-gray-500 font-bold">{index + 1}.</span>
                  <input 
                    type="text" 
                    value={bullet}
                    onChange={(e) => handleBulletChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    placeholder={`Description point ${index + 1}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button 
            type="submit" 
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
          >
            Add Car to Inventory
          </button>
        </div>
      </form>
    </div>
  );
}