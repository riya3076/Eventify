/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React from 'react';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="mx-auto h-12 w-12 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-700">404 Not Found</h2>
                <p className="mt-2 text-base text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
            </div>
        </div>
    );
};

export default NotFoundPage;
