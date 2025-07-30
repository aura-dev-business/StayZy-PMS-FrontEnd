  // app/property/[id]/page.tsx
  'use client';

  import { useEffect, useState } from 'react';
  import { useParams } from 'next/navigation';
  import { 
    MapPin, Home, Users, Calendar, Star, CheckCircle, XCircle, 
    Bed, Square, Eye, Heart, Share2, ChevronLeft, ChevronRight,
    Shield, Zap, Wifi, Car, Utensils, Tv, Waves, Coffee, Phone,
    MessageCircle, Clock, CheckCircle2
  } from 'lucide-react';
  import { Toaster, toast } from 'sonner';

  interface Property {
    id: string;
    title: string;
    description: string;
    city: string;
    address: string;
    pricePerMonth: number;
    propertyType: string;
    roomType: string;
    isFeatured: boolean;
    available: boolean;
    createdAt: string;
    images: string[];
  }

  const PropertyDetailsPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const getImages = (p: Property): string[] => {
      if (p.images?.length) return p.images;
      return ['https://via.placeholder.com/600x400?text=No+Image'];
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    useEffect(() => {
      if (!id) return;
      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:8081/api/properties/${id}`, {
            credentials: 'include',
          });
          if (!res.ok) throw new Error('Failed to fetch property');
          const data = await res.json();
          setProperty(data);
        } catch (err) {
          toast.error('Failed to load property');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [id]);

    // Skeleton Loader Component
    const SkeletonLoader = () => (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <div className="bg-white shadow-sm sticky top-0 z-20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                <div>
                  <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2">
              {/* Image Gallery Skeleton */}
              <div className="relative mb-8">
                <div className="relative h-[450px] bg-gray-200 rounded-3xl overflow-hidden shadow-sm animate-pulse"></div>
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-2xl animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* Property Info Skeleton */}
              <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="h-8 w-3/4 bg-gray-200 rounded-md animate-pulse mb-4"></div>
                    <div className="h-6 w-1/2 bg-gray-200 rounded-md animate-pulse mb-3"></div>
                    <div className="h-4 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>

                {/* Quick Info Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded-md mx-auto mb-2 animate-pulse"></div>
                      <div className="h-6 w-1/2 bg-gray-200 rounded-md mx-auto animate-pulse"></div>
                    </div>
                  ))}
                </div>

                {/* Description Skeleton */}
                <div className="mb-8">
                  <div className="h-6 w-1/4 bg-gray-200 rounded-md animate-pulse mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-4 w-4/5 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>

                {/* Amenities Skeleton */}
                <div>
                  <div className="h-6 w-1/4 bg-gray-200 rounded-md animate-pulse mb-6"></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div className="h-5 w-1/3 bg-gray-200 rounded-md animate-pulse mb-4"></div>
                        <div className="space-y-3">
                          {[1, 2, 3].map((j) => (
                            <div key={j} className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                              <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Section Skeleton */}
              <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-gray-100">
                <div className="h-6 w-1/4 bg-gray-200 rounded-md animate-pulse mb-6"></div>
                <div className="relative bg-gray-200 rounded-2xl overflow-hidden shadow-sm animate-pulse" style={{ height: '350px' }}></div>
              </div>

              {/* Rent & Deposit Skeleton */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="h-6 w-1/4 bg-gray-200 rounded-md animate-pulse mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[1, 2].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden animate-pulse">
                      <div className="w-full h-40 bg-gray-200"></div>
                      <div className="p-5 space-y-3">
                        <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
                        <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3].map((j) => (
                            <div key={j} className="space-y-1">
                              <div className="h-6 w-full bg-gray-200 rounded-md"></div>
                              <div className="h-3 w-3/4 bg-gray-200 rounded-md mx-auto"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 sticky top-24 shadow-sm border border-gray-100">
                {/* Pricing Skeleton */}
                <div className="mb-8">
                  <div className="h-10 w-3/4 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                  <div className="h-6 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
                </div>

                {/* Contact Form Skeleton */}
                <div className="space-y-4">
                  <div className="w-full h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">or</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-5 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
                    
                    {/* Date selector Skeleton */}
                    <div className="grid grid-cols-5 gap-2 text-center text-sm">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="p-2">
                          <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-1"></div>
                          <div className="w-full p-3 bg-gray-200 rounded-xl animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Time slots Skeleton */}
                    <div className="space-y-3">
                      <div className="h-4 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="p-3 border border-gray-200 rounded-xl bg-gray-50 animate-pulse">
                          <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-xl bg-gray-50 animate-pulse">
                          <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
                </div>

                {/* Property ID Skeleton */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="h-4 w-1/4 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                  <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                </div>

                {/* Contact Options Skeleton */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                  <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    if (loading) {
      return <SkeletonLoader />;
    }

    if (!property) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Toaster position="top-center" />
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="text-gray-400" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Property not found</h2>
            <p className="text-gray-500">The property you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      );
    }

    const images = getImages(property);

    // Enhanced amenities data
    const amenities = [
      { icon: Shield, label: 'Security', category: 'House' },
      { icon: Zap, label: 'Power Backup', category: 'House' },
      { icon: Wifi, label: 'WiFi', category: 'House' },
      { icon: Car, label: 'Parking', category: 'House' },
      { icon: Bed, label: 'Furnished', category: 'Living Room' },
      { icon: Tv, label: 'Television', category: 'Living Room' },
      { icon: Coffee, label: 'Coffee Machine', category: 'Kitchen' },
      { icon: Utensils, label: 'Kitchen', category: 'Kitchen' },
    ];

    const nextImage = () => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-center" />
        
        {/* Enhanced Header */}
        <div className="bg-white shadow-sm sticky top-0 z-20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 truncate max-w-md">
                    {property.title}
                  </h1>
                  <p className="text-sm text-gray-500 truncate max-w-md">
                    {property.city}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                  <Eye size={20} className="text-gray-600" />
                </button>
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Heart 
                    size={20} 
                    className={isLiked ? "text-red-500 fill-current" : "text-gray-600"} 
                  />
                </button>
                <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Enhanced Image Gallery */}
              <div className="relative mb-8">
                <div className="relative h-[450px] bg-gray-200 rounded-3xl overflow-hidden shadow-sm">
                  <img
                    src={images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={e =>
                      (e.currentTarget.src =
                        'https://via.placeholder.com/600x400?text=Image+Not+Found')
                    }
                  />
                  
                  {/* Navigation buttons */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-lg transition-all backdrop-blur-sm"
                      >
                        <ChevronLeft size={20} className="text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-lg transition-all backdrop-blur-sm"
                      >
                        <ChevronRight size={20} className="text-gray-700" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>

                  {/* Status badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.isFeatured && (
                      <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-sm">
                        <Star size={14} className="fill-current" />
                        Featured
                      </span>
                    )}
                    <span className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                      property.available 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {property.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>

                {/* Enhanced thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all ${
                          index === currentImageIndex ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-md'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${property.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Enhanced Property Info */}
              <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{property.title}</h1>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin size={18} className="mr-2 text-gray-500" />
                      <span className="text-lg">{property.address}, {property.city}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">Listed on {formatDate(property.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Bed className="text-blue-600" size={24} />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">Bedrooms</div>
                    <div className="text-xl font-semibold text-gray-900">1</div>
                  </div>
                  <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Square className="text-emerald-600" size={24} />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">Area</div>
                    <div className="text-xl font-semibold text-gray-900">250 sq ft</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Home className="text-purple-600" size={24} />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">Type</div>
                    <div className="text-xl font-semibold text-gray-900">{property.propertyType}</div>
                  </div>
                  <div className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-100">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="text-orange-600" size={24} />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">Room</div>
                    <div className="text-xl font-semibold text-gray-900">{property.roomType}</div>
                  </div>
                </div>

                {/* Enhanced Description */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">About this property</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {property.description}
                  </p>
                </div>

                {/* Enhanced Amenities */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900">Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['House', 'Living Room', 'Kitchen'].map((category) => (
                      <div key={category} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-4 text-lg">{category}</h4>
                        <div className="space-y-3">
                          {amenities
                            .filter(amenity => amenity.category === category)
                            .map((amenity, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                  <amenity.icon size={16} className="text-gray-600" />
                                </div>
                                <span className="text-gray-700 font-medium">{amenity.label}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Map Section */}
              <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Location & Nearby</h3>
                
                <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-sm" style={{ height: '350px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0x31c1b3a3e12ae5b!2sMarathahalli%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                  />
                  
                  <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                    <div className="text-sm font-semibold text-gray-900">12.9716°N 77.5946°E</div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 mt-2 font-medium">
                      View larger map
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Rent & Deposit */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Rent & Deposit</h3>
                 
                </div>


                {/* Enhanced Cost Breakdown */}
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Monthly rent</span>
                    <span className="font-semibold text-gray-900">₹5,300</span>
                  </div>
                  
                  <div className="flex justify-between items-start py-2">
                    <div className="flex-1">
                      <span className="text-gray-700 font-medium">Security deposit</span>
                      <div className="text-sm text-gray-500 mt-1">Fully refundable if vacated in original condition</div>
                    </div>
                    <span className="font-semibold text-gray-900">₹10,600</span>
                  </div>
                  
                  <div className="flex justify-between items-start py-2">
                    <div className="flex-1">
                      <span className="text-gray-700 font-medium">One time StayZy fees</span>
                      <div className="text-sm text-gray-500 mt-1">
                        Includes accommodation convenience fee and applicable taxes
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">₹3,100</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xl font-bold text-teal-600">Total payable amount</span>
                        <div className="text-sm text-gray-500 mt-1">
                          Monthly rent + security deposit + one time fees
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-teal-600">₹19,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 sticky top-24 shadow-sm border border-gray-100">
                {/* Enhanced Pricing */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{property.pricePerMonth.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-lg">/month</span>
                  </div>
                  <div className="text-gray-600 font-medium">
                    ₹{Math.round(property.pricePerMonth * 2).toLocaleString()} Security Deposit
                  </div>
                </div>

                {/* Enhanced Contact Form */}
                <div className="space-y-4">
                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 size={20} />
                      Book Now
                    </div>
                  </button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">or</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-gray-900">
                      Schedule a visit
                    </div>
                    
                    {/* Enhanced Date selector */}
                    <div className="grid grid-cols-5 gap-2 text-center text-sm">
                      {['Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <div key={day} className="p-2">
                          <div className="text-gray-500 font-medium mb-1">{day}</div>
                          <button className={`w-full p-3 rounded-xl font-semibold transition-all ${
                            index === 2 
                              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                              : 'hover:bg-gray-50 border border-gray-200'
                          }`}>
                            {9 + index}
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {/* Enhanced Time slots */}
                    <div className="space-y-3">
                      <div className="text-xs text-gray-500 font-medium">Available time slots</div>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left font-medium">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-500" />
                            10:00 AM - 01:00 PM
                          </div>
                        </button>
                        <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left font-medium">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-500" />
                            04:00 PM - 07:00 PM
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition-all duration-200 hover:shadow-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar size={20} />
                      Schedule Visit
                    </div>
                  </button>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500 text-center justify-center">
                    <Shield size={12} />
                    Free assistance • No brokerage
                  </div>
                </div>

                {/* Enhanced Property ID */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500 mb-2 font-medium">Property ID</div>
                  <div className="text-sm font-mono text-gray-800 bg-gray-50 p-3 rounded-xl break-all">
                    {property.id}
                  </div>
                </div>

                {/* Contact Options */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                    <Phone size={16} />
                    <span className="text-sm font-medium">Call</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors">
                    <MessageCircle size={16} />
                    <span className="text-sm font-medium">Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default PropertyDetailsPage;