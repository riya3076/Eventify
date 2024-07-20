/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const WorkingInProgress: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="mx-auto h-12 w-12 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-700">Working in Progress</h2>
                <p className="mt-2 text-base text-gray-500">We're working hard to bring you new features. Stay tuned!</p>
            </div>
        </div>
    );
};

export default WorkingInProgress;
