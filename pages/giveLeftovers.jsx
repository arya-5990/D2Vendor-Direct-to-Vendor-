import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GiveLeftovers = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    description: '',
    expiryDate: '',
    pickupLocation: '',
    contactNumber: '',
    availableUntil: ''
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
    const message = `🍽️ *LEFTOVER FOOD DONATION*\n\n` +
      `*Item Name:* ${formData.itemName}\n` +
      `*Quantity:* ${formData.quantity}\n` +
      `*Description:* ${formData.description || 'N/A'}\n` +
      `*Expiry Date:* ${formData.expiryDate}\n` +
      `*Available Until:* ${formData.availableUntil}\n` +
      `*Pickup Location:* ${formData.pickupLocation}\n` +
      `*Contact Number:* ${formData.contactNumber}\n\n` +
      `Thank you for your donation! 🙏`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/917049780160?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      itemName: '',
      quantity: '',
      description: '',
      expiryDate: '',
      pickupLocation: '',
      contactNumber: '',
      availableUntil: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Give Leftovers
          </h1>
          <p className="text-gray-600">
            Share your surplus food items with those who need them. Help reduce food waste and support your community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Bread, Vegetables, Cooked Food"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., 5 kg, 10 pieces, 2 containers"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Available Until */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Until *
              </label>
              <input
                type="datetime-local"
                name="availableUntil"
                value={formData.availableUntil}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Shop Address, Landmark"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your contact number"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Additional details about the food item, storage conditions, etc."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
            >
              Donate Leftovers
            </button>
          </div>
        </form>

        {/* Information Section */}
        <div className="mt-8 p-6 bg-orange-50 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-700 mb-3">
            💡 Tips for Donating Leftovers
          </h3>
          <ul className="space-y-2 text-sm text-orange-600">
            <li>• Ensure food is still safe to consume</li>
            <li>• Package items properly to maintain freshness</li>
            <li>• Be specific about pickup times and location</li>
            <li>• Include any special storage instructions</li>
            <li>• Respond promptly to pickup requests</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GiveLeftovers; 