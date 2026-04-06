import { useState } from 'react';

// Dummy data to simulate our database inventory
const DUMMY_INVENTORY = [
  {
    id: 1,
    title: '2015 Honda City VX',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=500&q=60',
    price: 550000,
    color: 'White',
    mileage: 18,
    points: ['First Owner', 'No Major Scratches', 'Original Paint', 'Dealer Warranty', 'Recent Service']
  },
  {
    id: 2,
    title: '2018 Maruti Swift VXI',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=500&q=60',
    price: 450000,
    color: 'Red',
    mileage: 22,
    points: ['Great City Car', 'High Mileage', 'Bluetooth Audio', 'Power Windows', 'Spare Tire Included']
  },
  {
    id: 3,
    title: '2020 Hyundai Creta SX',
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=500&q=60',
    price: 1250000,
    color: 'Black',
    mileage: 15,
    points: ['Sunroof', 'Touchscreen Screen', 'Zero Dep Insurance', 'Alloy Wheels', 'Leather Seats']
  }
];

export default function Dashboard() {
  const [cars, setCars] = useState(DUMMY_INVENTORY);
  const [selectedCars, setSelectedCars] = useState([]);
  
  // Filter States
  const [maxPrice, setMaxPrice] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [minMileage, setMinMileage] = useState('');

  // Handle selecting/deselecting a specific car
  const toggleSelectCar = (id) => {
    if (selectedCars.includes(id)) {
      setSelectedCars(selectedCars.filter(carId => carId !== id)); // Remove
    } else {
      setSelectedCars([...selectedCars, id]); // Add
    }
  };

  // Handle Multi-Delete
  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedCars.length} cars?`)) {
      const remainingCars = cars.filter(car => !selectedCars.includes(car.id));
      setCars(remainingCars);
      setSelectedCars([]); // Clear selection after delete
    }
  };

  // Mock Edit Function
  const handleEdit = (id) => {
    alert(`Editing car ID: ${id}. In a full app, this would open a modal or redirect to an edit page.`);
  };

  // Apply filters to our car list
  const filteredCars = cars.filter(car => {
    let matches = true;
    if (maxPrice && car.price > parseInt(maxPrice)) matches = false;
    if (colorFilter && car.color.toLowerCase() !== colorFilter.toLowerCase()) matches = false;
    if (minMileage && car.mileage < parseInt(minMileage)) matches = false;
    return matches;
  });

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dealer Inventory</h1>
        {selectedCars.length > 0 && (
          <button 
            onClick={handleDeleteSelected}
            className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 font-bold"
          >
            Delete Selected ({selectedCars.length})
          </button>
        )}
      </div>

      {/* FILTERS SECTION */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Max Price (₹)</label>
          <input 
            type="number" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 600000"
            className="border p-2 rounded w-40"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Color</label>
          <select 
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="border p-2 rounded w-40"
          >
            <option value="">All Colors</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Red">Red</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Min Mileage</label>
          <input 
            type="number" 
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
            placeholder="e.g. 16"
            className="border p-2 rounded w-40"
          />
        </div>
        <button 
          onClick={() => { setMaxPrice(''); setColorFilter(''); setMinMileage(''); }}
          className="text-blue-600 hover:underline text-sm font-bold pb-2"
        >
          Clear Filters
        </button>
      </div>

      {/* CAR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.length === 0 ? (
          <p className="text-gray-500">No cars match your filters.</p>
        ) : (
          filteredCars.map(car => (
            <div key={car.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden relative">
              {/* Checkbox for Multi-Delete */}
              <div className="absolute top-2 left-2 z-10 bg-white rounded-full p-1 shadow">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 cursor-pointer"
                  checked={selectedCars.includes(car.id)}
                  onChange={() => toggleSelectCar(car.id)}
                />
              </div>

              <img src={car.image} alt={car.title} className="w-full h-48 object-cover" />
              
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{car.title}</h3>
                <p className="text-blue-600 font-bold text-lg mb-2">₹{car.price.toLocaleString('en-IN')}</p>
                
                <div className="flex space-x-4 text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded">
                  <span>🎨 {car.color}</span>
                  <span>⛽ {car.mileage} kmpl</span>
                </div>

                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  {car.points.map((point, idx) => (
                    <li key={idx}>• {point}</li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleEdit(car.id)}
                  className="w-full bg-gray-100 text-gray-800 font-bold py-2 rounded hover:bg-gray-200 border border-gray-300"
                >
                  Edit Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}