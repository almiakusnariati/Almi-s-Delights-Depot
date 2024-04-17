import React from 'react';
import VideoBackground from '../components/backround';

export default function About() {
    return (
        <div className="bg-gray-800 text-white">
            <div className="relative w-full h-full">
                <div className="inset-0 flex justify-center items-center">
                    <VideoBackground/>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center max-w-lg p-1 w-96  mt-15 ">
                        <h5 className="font-serif text-5xl font-bold mb-4">About</h5>
                        <p className="font-serif text-lg mb-4">Almi's Delights Depot is your one-stop destination for premium quality shoes. We are passionate about providing our customers with the latest trends and styles in footwear. With our wide selection of shoes for men, women, and children, you're sure to find the perfect pair to suit your style and budget. From casual sneakers to elegant heels, we've got something for everyone. Almi's Delights Depot prioritizes customer satisfaction above all else. Our team is dedicated to providing excellent service and ensuring that you have a seamless shopping experience. Shop with confidence knowing that you're getting top-quality shoes at unbeatable prices. Thank you for choosing Almi's Delights Depot for all your footwear needs!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
