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
            {t('wasteToWealthTitle')}
          </h1>
          <p className="text-gray-600">
            {t('wasteToWealthDescription')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Waste Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('wasteType')} *
              </label>
              <select
                name="wasteType"
                value={formData.wasteType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">{t('selectWasteType')}</option>
                <option value="Vegetable peels and scraps">{t('vegetablePeels')}</option>
                <option value="Fruit peels and cores">Fruit peels and cores</option>
                <option value="Coffee grounds and tea leaves">{t('coffeeGrounds')}</option>
                <option value="Eggshells">{t('eggshells')}</option>
                <option value="Bread and grain waste">{t('breadWaste')}</option>
                <option value="Mixed kitchen waste">Mixed kitchen waste</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approximate {t('quantity')} *
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={t('frequencyPlaceholder')}
              />
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('frequency')} *
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">{t('selectFrequency')}</option>
                <option value="Daily">{t('daily')}</option>
                <option value="Every 2-3 days">{t('every2to3Days')}</option>
                <option value="Weekly">{t('weekly')}</option>
                <option value="Bi-weekly">{t('biWeekly')}</option>
                <option value="Monthly">{t('monthly')}</option>
                <option value="On-demand">{t('onDemand')}</option>
              </select>
            </div>

            {/* Available Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('availableDays')} *
              </label>
              <select
                name="availableDays"
                value={formData.availableDays}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">{t('selectAvailableDays')}</option>
                <option value="Monday">{t('monday')}</option>
                <option value="Tuesday">{t('tuesday')}</option>
                <option value="Wednesday">{t('wednesday')}</option>
                <option value="Thursday">{t('thursday')}</option>
                <option value="Friday">{t('friday')}</option>
                <option value="Saturday">{t('saturday')}</option>
                <option value="Sunday">{t('sunday')}</option>
                <option value="Monday, Wednesday, Friday">{t('monday')}, {t('wednesday')}, {t('friday')}</option>
                <option value="Tuesday, Thursday, Saturday">{t('tuesday')}, {t('thursday')}, {t('saturday')}</option>
                <option value="Weekdays (Monday-Friday)">{t('weekdays')} ({t('monday')}-{t('friday')})</option>
                <option value="Weekends (Saturday-Sunday)">{t('weekends')} ({t('saturday')}-{t('sunday')})</option>
                <option value="Any day">{t('anyDay')}</option>
              </select>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={t('contactNumberPlaceholder')}
              />
            </div>
          </div>

          {/* Composting Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('compostingExperience')}
            </label>
            <select
              name="compostingExperience"
              value={formData.compostingExperience}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">{t('selectExperience')}</option>
              <option value="Beginner - No experience">{t('beginner')}</option>
              <option value="Some experience with home composting">{t('someExperience')}</option>
              <option value="Experienced - Regular composting">{t('experienced')}</option>
              <option value="Expert - Professional composting">{t('expert')}</option>
            </select>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('specialInstructions')}
            </label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={t('specialInstructionsPlaceholder')}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
            >
              {t('donateKitchenWaste')}
            </button>
          </div>
        </form>

        {/* Information Section */}
        <div className="mt-8 p-6 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700 mb-3">
            {t('benefitsOfComposting')}
          </h3>
          <ul className="space-y-2 text-sm text-green-600">
            <li>{t('reducesLandfill')}</li>
            <li>{t('createsFertilizer')}</li>
            <li>{t('improvesSoil')}</li>
            <li>{t('supportsAgriculture')}</li>
            <li>{t('circularEconomy')}</li>
            <li>{t('combatsClimate')}</li>
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