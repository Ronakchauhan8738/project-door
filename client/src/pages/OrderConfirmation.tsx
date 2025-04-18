
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Printer, Home } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface OrderData {
  timestamp: string;
  total: number;
}

interface DeliveryInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  paymentMethod: string;
}

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);

  useEffect(() => {
    const loadOrderData = () => {
      const orderDataFromStorage = sessionStorage.getItem('orderData');
      const cartItemsFromStorage = sessionStorage.getItem('cartItems');
      const deliveryInfoFromStorage = sessionStorage.getItem('deliveryInfo');

      if (!orderDataFromStorage || !cartItemsFromStorage || !deliveryInfoFromStorage) {
        // Redirect if there's no order data
        navigate('/');
        return;
      }

      try {
        setOrderData(JSON.parse(orderDataFromStorage));
        setCart(JSON.parse(cartItemsFromStorage));
        setDeliveryInfo(JSON.parse(deliveryInfoFromStorage));
      } catch (error) {
        console.error('Error loading order data:', error);
        navigate('/');
      }
    };

    loadOrderData();
  }, [navigate]);

  const handlePrintReceipt = () => {
    window.print();
  };

  if (!orderData || !deliveryInfo || cart.length === 0) {
    return <div className="p-8 text-center">Loading order information...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-800">Luxury Doors</Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors">Home</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 overflow-hidden print:shadow-none">
            <div className="bg-green-500 p-6 text-white text-center">
              <div className="mb-4 flex justify-center">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
              <p>Your order has been confirmed and is being processed.</p>
            </div>
            
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="ml-auto">
                        <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between font-bold text-lg mt-6 pt-4 border-t">
                  <span>Total:</span>
                  <span>₹{orderData.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Delivery Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p>{deliveryInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{deliveryInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p>{deliveryInfo.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p>{deliveryInfo.city}, {deliveryInfo.state}, {deliveryInfo.zip}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p>{deliveryInfo.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-md border">
                  <p className="font-semibold">Estimated Delivery:</p>
                  <p>Within 7-10 business days</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 print:hidden">
                <Button 
                  onClick={() => navigate('/')}
                  className="flex-1 flex items-center justify-center gap-2"
                  variant="outline"
                >
                  <Home className="h-4 w-4" /> Continue Shopping
                </Button>
                <Button
                  onClick={handlePrintReceipt} 
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Printer className="h-4 w-4" /> Print Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 print:hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Luxury Doors</h3>
              <p className="text-gray-300">Premium quality doors for your home and office spaces.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><a href="/#products" className="text-gray-300 hover:text-white transition-colors">Products</a></li>
                <li><a href="/#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <p className="flex items-center text-gray-300 mb-2">
                <span className="mr-2">📍</span> 123 Door Street, Bangalore, India
              </p>
              <p className="flex items-center text-gray-300 mb-2">
                <span className="mr-2">📞</span> +91 98765 43210
              </p>
              <p className="flex items-center text-gray-300">
                <span className="mr-2">✉️</span> info@luxurydoors.com
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 Luxury Doors. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrderConfirmation;
