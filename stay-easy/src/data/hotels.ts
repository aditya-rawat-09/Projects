export interface Hotel {
  name: string;
  image: string;
  rating: number;
  price: number;
  location: string;
  amenities: string[];
}

export const hotels: Hotel[] = [
  {
    name: "Hotel Sumedha",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800",
    rating: 4.8,
    price: 2999,
    location: "Pithampur,Dhar",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant"]
  },
  {
    name: "Business Suite Inn",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800",
    rating: 4.5,
    price: 1999,
    location: "Bangalore, Karnataka",
    amenities: ["WiFi", "Gym", "Business Center"]
  },
  {
    name: "Seaside Resort",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800",
    rating: 4.7,
    price: 3499,
    location: "Goa",
    amenities: ["Beach Access", "Pool", "Bar", "Spa"]
  },
  {
    name: "Mountain View Lodge",
    image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=800",
    rating: 4.6,
    price: 4299,
    location: "Manali, Himachal Pradesh",
    amenities: ["Mountain View", "Fireplace", "Restaurant", "Spa"]
  },
  {
    name: "City Center Hotel",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800",
    rating: 4.3,
    price: 1799,
    location: "Delhi, NCR",
    amenities: ["WiFi", "Restaurant", "Business Center"]
  },
  {
    name: "Desert Oasis Resort",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800",
    rating: 4.9,
    price: 5999,
    location: "Jaisalmer, Rajasthan",
    amenities: ["Desert View", "Pool", "Spa", "Cultural Activities"]
  },
  {
    name: "Lake View Inn",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800",
    rating: 4.4,
    price: 2499,
    location: "Udaipur, Rajasthan",
    amenities: ["Lake View", "Restaurant", "Boat Rides"]
  },
  {
    name: "Tech Valley Suites",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800",
    rating: 4.6,
    price: 2799,
    location: "Hyderabad, Telangana",
    amenities: ["WiFi", "Work Spaces", "Gym", "Restaurant"]
  },
  {
    name: "Beachfront Paradise",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800",
    rating: 4.8,
    price: 4599,
    location: "Kovalam, Kerala",
    amenities: ["Private Beach", "Spa", "Water Sports", "Restaurant"]
  },
  {
    name: "Heritage Haveli",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800",
    rating: 4.7,
    price: 3999,
    location: "Jaipur, Rajasthan",
    amenities: ["Heritage Architecture", "Restaurant", "Cultural Tours"]
  },
  {
    name: "Green Valley Resort",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800",
    rating: 4.5,
    price: 3299,
    location: "Munnar, Kerala",
    amenities: ["Tea Garden View", "Spa", "Nature Trails"]
  },
  {
    name: "Metro Business Hotel",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800",
    rating: 4.2,
    price: 1599,
    location: "Pune, Maharashtra",
    amenities: ["WiFi", "Meeting Rooms", "Restaurant"]
  },
  {
    name: "Royal Palace Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800",
    rating: 4.9,
    price: 6999,
    location: "Mysore, Karnataka",
    amenities: ["Palace View", "Spa", "Fine Dining", "Pool"]
  },
  {
    name: "Riverside Retreat",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800",
    rating: 4.6,
    price: 2899,
    location: "Rishikesh, Uttarakhand",
    amenities: ["River View", "Yoga Center", "Adventure Sports"]
  },
  {
    name: "Silicon Suites",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800",
    rating: 4.4,
    price: 2199,
    location: "Bangalore, Karnataka",
    amenities: ["WiFi", "Co-working Space", "Cafe"]
  },
  {
    name: "Coastal Comfort Inn",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800",
    rating: 4.3,
    price: 1899,
    location: "Pondicherry",
    amenities: ["Beach Access", "French Cuisine", "Bicycle Rental"]
  },
  {
    name: "Hill Station Haven",
    image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=800",
    rating: 4.7,
    price: 3799,
    location: "Darjeeling, West Bengal",
    amenities: ["Mountain View", "Tea Garden", "Restaurant"]
  },
  {
    name: "Urban Luxury Hotel",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800",
    rating: 4.5,
    price: 2699,
    location: "Chennai, Tamil Nadu",
    amenities: ["Pool", "Spa", "Fine Dining", "Gym"]
  },
  {
    name: "Forest Lodge",
    image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=800",
    rating: 4.8,
    price: 4199,
    location: "Thekkady, Kerala",
    amenities: ["Wildlife Tours", "Restaurant", "Nature Walks"]
  },
  {
    name: "Budget Comfort Inn",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800",
    rating: 4.1,
    price: 1299,
    location: "Ahmedabad, Gujarat",
    amenities: ["WiFi", "Restaurant", "Parking"]
  }
];