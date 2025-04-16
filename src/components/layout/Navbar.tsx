
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const cartCount = getCartCount();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-sweet-darkPurple font-quicksand font-bold text-xl lg:text-2xl">
                Sweet Shop Delights
              </span>
            </Link>
          </div>

          {/* Navigation links - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link 
              to="/" 
              className="font-poppins font-medium text-gray-700 hover:text-sweet-purple transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="font-poppins font-medium text-gray-700 hover:text-sweet-purple transition-colors"
            >
              Shop
            </Link>
            <Link 
              to="/categories" 
              className="font-poppins font-medium text-gray-700 hover:text-sweet-purple transition-colors"
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="font-poppins font-medium text-gray-700 hover:text-sweet-purple transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* Right side - Cart, Search, User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Link to="/search" className="text-gray-700 hover:text-sweet-purple">
              <Search size={20} />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-sweet-purple">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-sweet-purple text-white text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>

            {/* User Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-700 hover:text-sweet-purple">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    Hi, {user?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="font-poppins bg-white border-sweet-purple text-sweet-darkPurple hover:bg-sweet-purple hover:text-white"
                >
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-700">
                    <Menu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle className="font-quicksand text-sweet-darkPurple">Sweet Shop Delights</SheetTitle>
                    <SheetDescription>Navigation</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col space-y-4">
                    <Link 
                      to="/" 
                      className="font-poppins text-lg font-medium text-gray-700 hover:text-sweet-purple"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/shop" 
                      className="font-poppins text-lg font-medium text-gray-700 hover:text-sweet-purple"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Shop
                    </Link>
                    <Link 
                      to="/categories" 
                      className="font-poppins text-lg font-medium text-gray-700 hover:text-sweet-purple"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Categories
                    </Link>
                    <Link 
                      to="/about" 
                      className="font-poppins text-lg font-medium text-gray-700 hover:text-sweet-purple"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    {!isAuthenticated && (
                      <Link 
                        to="/login" 
                        className="font-poppins text-lg font-medium text-gray-700 hover:text-sweet-purple"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login / Register
                      </Link>
                    )}
                    {isAuthenticated && (
                      <>
                        <Link 
                          to="/account" 
                          className="font-poppins text-lg font-medium text-gray-700 hover:text-sweet-purple"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <button 
                          onClick={() => {
                            logout();
                            setMobileMenuOpen(false);
                          }}
                          className="font-poppins text-lg font-medium text-red-500 hover:text-red-700 text-left"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
