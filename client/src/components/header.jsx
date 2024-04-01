
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { AuthContext } from '../App.jsx';

const Header = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div>
            <nav className="bg-white shadow-inner">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-3">
                        <Link to="/" className="font-bold text-xl text-black">Almi-s-Delights-Depot</Link>
                        <button className="block lg:hidden focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                        <div className="hidden lg:flex lg:items-center lg:w-auto">
                            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link px-4 py-2 text-black">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about" className="nav-link px-4 py-2 text-black">About</Link>
                                </li>
                            </ul>
                            <div className="flex items-center ml-4">
                                {isLoggedIn ? (
                                    <>
                                        <Link to="/logout" className="btn btn-outline-dark mr-3 flex items-center">
                                            <LogOut className="mr-1" />
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="btn btn-outline-dark mr-3 flex items-center">
                                            <LogIn className="mr-1" /> Login
                                        </Link>
                                        <Link to="/register" className="btn btn-outline-dark flex items-center">
                                            <UserPlus className="mr-1" /> Register
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

