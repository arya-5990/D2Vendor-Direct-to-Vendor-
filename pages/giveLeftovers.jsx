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
    const message = `${t('leftoverDonationMessage')}\n\n` +
      `*${t('itemName')}:* ${formData.itemName}\n` +
      `*${t('quantity')}:* ${formData.quantity}\n` +
      `*${t('description')}:* ${formData.description || 'N/A'}\n` +
      `*${t('expiryDate')}:* ${formData.expiryDate}\n` +
      `*${t('availableUntil')}:* ${formData.availableUntil}\n` +
      `*${t('pickupLocation')}:* ${formData.pickupLocation}\n` +
      `*${t('contactNumber')}:* ${formData.contactNumber}\n\n` +
      `${t('thankYouDonation')}`;
    
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
            {t('giveLeftoversTitle')}
          </h1>
          <p className="text-gray-600">
            {t('giveLeftoversDescription')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('itemName')} *
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder={t('itemNamePlaceholder')}
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('quantity')} *
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder={t('quantityPlaceholder')}
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('expiryDate')} *
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
                {t('availableUntil')} *
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
                {t('pickupLocation')} *
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder={t('pickupLocationPlaceholder')}
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('contactNumber')} *
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder={t('contactNumberPlaceholder')}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('description')}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={t('descriptionPlaceholder')}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
            >
              {t('donateLeftovers')}
            </button>
          </div>
        </form>

        {/* Information Section */}
        <div className="mt-8 p-6 bg-orange-50 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-700 mb-3">
            {t('tipsForDonating')}
          </h3>
          <ul className="space-y-2 text-sm text-orange-600">
            <li>{t('ensureFoodSafe')}</li>
            <li>{t('packageProperly')}</li>
            <li>{t('specificPickup')}</li>
            <li>{t('storageInstructions')}</li>
            <li>{t('respondPromptly')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GiveLeftovers; 