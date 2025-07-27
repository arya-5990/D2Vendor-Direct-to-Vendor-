export const mockProducts = [
  {
    id: 1,
    name: 'Fresh Tomatoes',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=150&h=150&fit=crop',
    price: 25,
    category: 'Vegetables',
    inStock: true,
    brand: '',
    description: 'Fresh red tomatoes from local farms',
    stock: 50,
    orderCount: 120,
    rating: 4.5
  },
  {
    id: 2,
    name: 'Organic Bananas',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop',
    price: 30,
    category: 'Fruits',
    inStock: true,
    brand: '',
    description: 'Sweet organic bananas',
    stock: 75,
    orderCount: 200,
    rating: 4.8
  },
  {
    id: 3,
    name: 'Premium Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop',
    price: 45,
    category: 'Grains',
    inStock: true,
    brand: 'Golden Harvest',
    description: 'High-quality basmati rice',
    stock: 100,
    orderCount: 85,
    rating: 4.6
  },
  {
    id: 4,
    name: 'Fresh Milk',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150&h=150&fit=crop',
    price: 35,
    category: 'Dairy',
    inStock: false,
    brand: 'Dairy Fresh',
    description: 'Pure cow milk',
    stock: 0,
    orderCount: 150,
    rating: 4.7
  },
  {
    id: 5,
    name: 'Whole Wheat Bread',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&h=150&fit=crop',
    price: 20,
    category: 'Bakery',
    inStock: true,
    brand: 'Bread Master',
    description: 'Fresh whole wheat bread',
    stock: 30,
    orderCount: 95,
    rating: 4.4
  }
];

export const mockOrders = {
  lastDay: [
    {
      id: 1,
      customerName: 'Restaurant ABC',
      items: [
        { name: 'Fresh Tomatoes', quantity: 10, price: 25 },
        { name: 'Organic Bananas', quantity: 5, price: 30 }
      ],
      amount: 400,
      status: 'Delivered',
      date: '2024-01-15',
      time: '14:30'
    },
    {
      id: 2,
      customerName: 'Cafe XYZ',
      items: [
        { name: 'Premium Rice', quantity: 2, price: 45 },
        { name: 'Fresh Milk', quantity: 8, price: 35 }
      ],
      amount: 370,
      status: 'In Transit',
      date: '2024-01-15',
      time: '16:45'
    }
  ],
  lastWeek: [
    {
      id: 3,
      customerName: 'Hotel Grand',
      items: [
        { name: 'Fresh Tomatoes', quantity: 20, price: 25 },
        { name: 'Organic Bananas', quantity: 15, price: 30 },
        { name: 'Premium Rice', quantity: 5, price: 45 }
      ],
      amount: 1175,
      status: 'Delivered',
      date: '2024-01-10',
      time: '09:15'
    },
    {
      id: 4,
      customerName: 'Restaurant ABC',
      items: [
        { name: 'Whole Wheat Bread', quantity: 12, price: 20 },
        { name: 'Fresh Milk', quantity: 10, price: 35 }
      ],
      amount: 590,
      status: 'Delivered',
      date: '2024-01-08',
      time: '11:30'
    }
  ],
  lastMonth: [
    {
      id: 5,
      customerName: 'Catering Service',
      items: [
        { name: 'Fresh Tomatoes', quantity: 50, price: 25 },
        { name: 'Organic Bananas', quantity: 30, price: 30 },
        { name: 'Premium Rice', quantity: 10, price: 45 },
        { name: 'Fresh Milk', quantity: 20, price: 35 }
      ],
      amount: 2650,
      status: 'Delivered',
      date: '2023-12-20',
      time: '08:00'
    }
  ]
}; 