import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const KitchenWasteDonation = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    frequency: '',
    pickupLocation: '',
    contactNumber: '',
    availableDays: '',
    specialInstructions: '',
    compostingExperience: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const message = `🌱 *KITCHEN WASTE FOR SUSTAINABLE GROWTH*\n\n` +
      `*Waste Type:* ${formData.wasteType}\n` +
      `*Quantity:* ${formData.quantity}\n` +
      `*Frequency:* ${formData.frequency}\n` +
      `*Available Days:* ${formData.availableDays}\n` +
      `*Pickup Location:* ${formData.pickupLocation}\n` +
      `*Contact Number:* ${formData.contactNumber}\n` +
      `*Special Instructions:* ${formData.specialInstructions || 'N/A'}\n` +
      `*Composting Experience:* ${formData.compostingExperience}\n\n` +
      `♻️ *Together we can turn waste into wealth!* 🌿`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/917049780160?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      wasteType: '',
      quantity: '',
      frequency: '',
      pickupLocation: '',
      contactNumber: '',
      availableDays: '',
      specialInstructions: '',
      compostingExperience: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🌱 Waste to Wealth: Kitchen Composting Initiative
          </h1>
          <p className="text-gray-600">
            Transform your kitchen waste into nutrient-rich compost. Join our sustainable growth program and contribute to a greener future.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Waste Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Kitchen Waste *
              </label>
              <select
                name="wasteType"
                value={formData.wasteType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select waste type</option>
                <option value="Vegetable peels and scraps">Vegetable peels and scraps</option>
                <option value="Fruit peels and cores">Fruit peels and cores</option>
                <option value="Coffee grounds and tea leaves">Coffee grounds and tea leaves</option>
                <option value="Eggshells">Eggshells</option>
                <option value="Bread and grain waste">Bread and grain waste</option>
                <option value="Mixed kitchen waste">Mixed kitchen waste</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approximate Quantity *
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 2 kg per day, 5 liters per week"
              />
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection Frequency *
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Every 2-3 days">Every 2-3 days</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="On-demand">On-demand</option>
              </select>
            </div>

            {/* Available Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Collection Days *
              </label>
              <input
                type="text"
                name="availableDays"
                value={formData.availableDays}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Monday, Wednesday, Friday or Any day"
              />
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location *
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Shop Address, Landmark, Area"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Your contact number"
              />
            </div>
          </div>

          {/* Composting Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Composting Experience
            </label>
            <select
              name="compostingExperience"
              value={formData.compostingExperience}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select experience level</option>
              <option value="Beginner - No experience">Beginner - No experience</option>
              <option value="Some experience with home composting">Some experience with home composting</option>
              <option value="Experienced - Regular composting">Experienced - Regular composting</option>
              <option value="Expert - Professional composting">Expert - Professional composting</option>
            </select>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions or Notes
            </label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Any special requirements, storage conditions, or additional information..."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
            >
              🌱 Donate Kitchen Waste
            </button>
          </div>
        </form>

        {/* Information Section */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700 mb-3">
            🌿 Benefits of Kitchen Waste Composting
          </h3>
          <ul className="space-y-2 text-sm text-green-600">
            <li>• Reduces landfill waste and methane emissions</li>
            <li>• Creates nutrient-rich organic fertilizer</li>
            <li>• Improves soil health and water retention</li>
            <li>• Supports sustainable agriculture practices</li>
            <li>• Contributes to circular economy principles</li>
            <li>• Helps combat climate change</li>
          </ul>
        </div>

        {/* Accepted Waste Types */}
        <div className="mt-6 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            ♻️ Accepted Kitchen Waste Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
            <div>
              <h4 className="font-semibold mb-2">✅ Good for Composting:</h4>
              <ul className="space-y-1">
                <li>• Vegetable and fruit peels</li>
                <li>• Coffee grounds and tea leaves</li>
                <li>• Eggshells (crushed)</li>
                <li>• Bread and grain waste</li>
                <li>• Rice and pasta (cooked)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">❌ Not Accepted:</h4>
              <ul className="space-y-1">
                <li>• Meat and dairy products</li>
                <li>• Oily or greasy food</li>
                <li>• Plastic or non-organic items</li>
                <li>• Diseased plant material</li>
                <li>• Pet waste</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenWasteDonation; 