import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, LogOut } from 'lucide-react';
import { AuthContext } from '../App.jsx';

const Header = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className="relative">
            <nav className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg absolute top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-3">
                        <Link to="/" className="font-bold text-xl text-white flex items-center">
                            <span className="mr-2">Almi-s-Delights-Depot</span>
                        </Link>
                        <div className="flex items-center">
                            <div className="hidden lg:flex lg:mx-auto">
                                <Link to="/" className="hover:bg-gray-700 text-white font-bold rounded inline-flex mr-5 px-4 py-2">Home</Link>
                                <Link to="/about" className="hover:bg-gray-700 text-white font-bold rounded inline-flex px-4 py-2">About</Link>
                            </div>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:w-auto">
                            <div className="flex items-center ml-4">
                                {isLoggedIn ? (
                                    <>
                                        <Link to="/logout" className="hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-3">
                                            <LogOut className="mr-1" />
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <> 
                                        <Link to="/register" className="hover:bg-gray-700 text-white font-bold rounded inline-flex px-4 py-2">
                                            <UserPlus className="mr-1" /> Register
                                        </Link>
                                        <Link to="/login" className="hover:bg-gray-700 text-white font-bold rounded inline-flex mr-4 px-4 py-2">
                                            <LogIn className="mr-1" /> Login
                                        </Link>
                                       
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        
    );
}

export default Header;
