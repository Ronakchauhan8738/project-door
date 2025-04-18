import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Product data
const products = [
  {
    id: "1",
    name: "Modern Oak Door",
    price: 12999,
    category: "modern",
    image: "/lovable-uploads/3f1d83a4-f74a-487f-87fb-d8553cf927f7.png",
    description: "Contemporary oak finish with sleek design"
  },
  {
    id: "2",
    name: "Classic Teak Door",
    price: 15999,
    category: "classic",
    image: "/lovable-uploads/5cd7c3f8-2d00-47b3-b368-80e1c312fc26.png",
    description: "Traditional teak finish with intricate carvings"
  },
  {
    id: "3",
    name: "Premium Mahogany Door",
    price: 24999, 
    category: "premium",
    image: "/lovable-uploads/70f6da16-17f3-4e52-abfe-ce0d58bd3b92.png",
    description: "Luxurious mahogany finish with gold accents"
  },
  {
    id: "4",
    name: "Designer Glass Door",
    price: 19999,
    category: "modern",
    image: "/lovable-uploads/7e601890-94fc-4716-8ba4-92a24f323d26.png", 
    description: "Contemporary design with frosted glass panels"
  },
  {
    id: "5", 
    name: "Antique Carved Door",
    price: 29999,
    category: "classic",
    image: "/lovable-uploads/c093409c-5c04-4247-9421-a0b00209ebd7.png",
    description: "Hand-carved traditional design with vintage appeal"
  },
  {
    id: "6",
    name: "Modern Steel Door",
    price: 17999,
    category: "modern", 
    image: "/lovable-uploads/cd7662a8-df28-497d-849a-fa24491412fc.png",
    description: "Sleek steel finish with contemporary styling"
  }
];

// Cart item type
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "Karnataka",
    zip: "",
    phone: "",
    paymentMethod: "cod"
  });

  // Filter products based on category
  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(product => product.category === filter);

  // Add to cart
  const addToCart = (product: typeof products[0]) => {
    setCart(currentCart => {
      // Check if product is already in cart
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const newCart = [...currentCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        // Add new item to cart
        return [...currentCart, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }];
      }
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Buy now
  const buyNow = (product: typeof products[0]) => {
    setCart([{
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }]);
    setCheckoutOpen(true);
  };

  // Remove from cart
  const removeFromCart = (id: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id));
  };

  // Update cart quantity
  const updateQuantity = (id: string, amount: number) => {
    setCart(currentCart => {
      return currentCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      });
    });
  };

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkout
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store order data in sessionStorage
    sessionStorage.setItem('orderData', JSON.stringify({
      timestamp: new Date().toISOString(),
      total: cartTotal
    }));
    sessionStorage.setItem('cartItems', JSON.stringify(cart));
    sessionStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
    
    // Navigate to confirmation page
    navigate('/order-confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Luxury Doors</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-800 hover:text-blue-600 transition-colors">Home</a>
            <a href="#products" className="text-gray-800 hover:text-blue-600 transition-colors">Products</a>
            <a href="#about" className="text-gray-800 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-800 hover:text-blue-600 transition-colors">Contact</a>
          </nav>
          
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Premium Quality Doors</h2>
              <p className="text-lg text-gray-600 mb-6">Elevate your home's aesthetics with our luxury door collection.</p>
              <Button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                Shop Now
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/0fe03054-2fc9-4060-9102-402f41f0cf43.png" 
                alt="Luxury Door" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Collection</h2>
          
          {/* Filter Buttons */}
          <div className="flex justify-center mb-8 space-x-4">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "modern" ? "default" : "outline"} 
              onClick={() => setFilter("modern")}
            >
              Modern
            </Button>
            <Button 
              variant={filter === "classic" ? "default" : "outline"} 
              onClick={() => setFilter("classic")}
            >
              Classic
            </Button>
            <Button 
              variant={filter === "premium" ? "default" : "outline"} 
              onClick={() => setFilter("premium")}
            >
              Premium
            </Button>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-2xl font-bold text-gray-800">₹{product.price.toLocaleString('en-IN')}</p>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0">
                  <Button variant="outline" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                  <Button onClick={() => buyNow(product)}>Buy Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="/lovable-uploads/0a6d1971-2210-4915-835a-aa55df9adb77.png" 
                alt="About Us" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-3xl font-bold mb-4">About Luxury Doors</h2>
              <p className="text-lg text-gray-600 mb-4">
                With over 15 years of experience in the industry, we provide premium quality doors crafted with the finest materials. Our doors are designed to blend aesthetics with durability, enhancing the beauty of your spaces.
              </p>
              <p className="text-lg text-gray-600">
                Each door undergoes rigorous quality checks to ensure that it meets our high standards. We take pride in our craftsmanship and attention to detail, offering you the best doors in the market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-gray-600 mb-4">
                  Have questions about our products? Reach out to us and our team will be happy to assist you.
                </p>
                <div className="space-y-2 mb-4">
                  <p className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span> 123 Door Street, Bangalore, India
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="mr-2">📞</span> +91 98765 43210
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="mr-2">✉️</span> info@luxurydoors.com
                  </p>
                </div>
              </div>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your Email" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea 
                    id="message" 
                    placeholder="Your Message" 
                    className="w-full h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <Button type="submit">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Luxury Doors</h3>
              <p className="text-gray-300">Premium quality doors for your home and office spaces.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#products" className="text-gray-300 hover:text-white transition-colors">Products</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 Luxury Doors. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Your Cart
              <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-auto">
            {cart.length === 0 ? (
              <p className="text-center py-8 text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center py-2 border-b">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md mr-3"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-gray-600">₹{item.price.toLocaleString('en-IN')}</p>
                      <div className="flex items-center mt-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="ml-auto text-red-500 hover:text-red-700" 
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total:</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <Button 
              className="w-full" 
              disabled={cart.length === 0}
              onClick={() => {
                setCartOpen(false);
                setCheckoutOpen(true);
              }}
            >
              Checkout
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Modal */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Complete your order by providing delivery information
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <Label htmlFor="checkout-name">Full Name</Label>
              <Input 
                id="checkout-name" 
                name="name"
                value={deliveryInfo.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="checkout-address">Address</Label>
              <Input 
                id="checkout-address" 
                name="address"
                value={deliveryInfo.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkout-city">City</Label>
                <Input 
                  id="checkout-city" 
                  name="city"
                  value={deliveryInfo.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="checkout-state">State</Label>
                <select
                  id="checkout-state"
                  name="state"
                  value={deliveryInfo.state}
                  onChange={handleInputChange}
                  required
                  className="w-full h-10 px-3 py-2 border rounded-md"
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkout-zip">Postal Code</Label>
                <Input 
                  id="checkout-zip" 
                  name="zip"
                  value={deliveryInfo.zip}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="checkout-phone">Phone</Label>
                <Input 
                  id="checkout-phone" 
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Payment Method</Label>
              <div className="space-x-4 mt-2 flex">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={deliveryInfo.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <Label htmlFor="cod" className="cursor-pointer">Cash on Delivery</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="online"
                    name="paymentMethod"
                    value="online"
                    checked={deliveryInfo.paymentMethod === "online"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <Label htmlFor="online" className="cursor-pointer">Online Payment</Label>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <h3 className="font-semibold">Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                <span>Total:</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCheckoutOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Place Order</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
