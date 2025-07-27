import React, { useState } from 'react';

const existingReviews = [
  {
    supplier: 'FreshMart Suppliers',
    rating: 4.5,
    deliverySpeed: 4,
    quality: 5,
    priceHonesty: 4,
    comment: 'Oil was diluted, but fast service. Will order again.',
    date: '2 days ago',
    helpful: 3,
  },
  {
    supplier: 'Shree Vegetables Co.',
    rating: 4.2,
    deliverySpeed: 4,
    quality: 4,
    priceHonesty: 5,
    comment: 'Fast service, good quality vegetables. Recommended!',
    date: '1 week ago',
    helpful: 5,
  },
  {
    supplier: 'A-Grade Suppliers',
    rating: 3.8,
    deliverySpeed: 3,
    quality: 4,
    priceHonesty: 4,
    comment: 'Good prices, but sometimes delivery is a bit late.',
    date: '2 weeks ago',
    helpful: 2,
  },
];

const Reviews = () => {
  const [newReview, setNewReview] = useState({
    supplier: '',
    rating: 0,
    deliverySpeed: 0,
    quality: 0,
    priceHonesty: 0,
    comment: '',
  });

  const renderStars = (rating, onStarClick = null) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onStarClick && onStarClick(star)}
          className={`text-xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          disabled={!onStarClick}
        >
          ⭐
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">⭐ Reviews & Ratings</h2>
      
      {/* Existing Reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Reviews</h3>
        {existingReviews.map((review, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{review.supplier}</h4>
                <div className="flex items-center gap-4 mt-1">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-green-500">
                  👍
                </button>
                <span className="text-sm text-gray-500">{review.helpful}</span>
                <button className="text-gray-400 hover:text-red-500">
                  🚩
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div className="flex items-center gap-2">
                🚚
                <span className="text-sm">Delivery: {review.deliverySpeed}/5</span>
              </div>
              <div className="flex items-center gap-2">
                🌿
                <span className="text-sm">Quality: {review.quality}/5</span>
              </div>
              <div className="flex items-center gap-2">
                💰
                <span className="text-sm">Price: {review.priceHonesty}/5</span>
              </div>
            </div>
            
            <p className="text-gray-700 italic">"{review.comment}"</p>
          </div>
        ))}
      </div>
      
      {/* Leave Review Form */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name</label>
            <input
              type="text"
              value={newReview.supplier}
              onChange={(e) => setNewReview({...newReview, supplier: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter supplier name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
            {renderStars(newReview.rating, (star) => setNewReview({...newReview, rating: star}))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Speed</label>
              {renderStars(newReview.deliverySpeed, (star) => setNewReview({...newReview, deliverySpeed: star}))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
              {renderStars(newReview.quality, (star) => setNewReview({...newReview, quality: star}))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Honesty</label>
              {renderStars(newReview.priceHonesty, (star) => setNewReview({...newReview, priceHonesty: star}))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              placeholder="Share your experience..."
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Submit Review
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
            >
              🚩 Report Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviews; 