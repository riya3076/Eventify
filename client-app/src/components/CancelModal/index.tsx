/**
 * Author: Aharnish Solanki (B00933563)
 */

import React from "react";
import Button from "../UI/Button";

type CancellationModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const CancellationModal: React.FC<CancellationModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-bold">Cancel Tickets</h3>
                <div className="mt-2">
                  <p>
                   <div> Are you sure you want to cancel your tickets? </div>
                    <span className="text-rose-600">This action cannot be reverted.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <Button
                onClick={onConfirm}
                type="button"
                className="inline-flex justify-center w-full rounded-md px-4 py-2 shadow-sm  sm:text-sm sm:leading-5"
                color="error"
              >
                cancel my tickets
              </Button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <Button
                onClick={onCancel}
                type="button"
                className="inline-flex justify-center w-full rounded-md shadow-sm sm:text-sm sm:leading-5"
              >
                keep my tickets
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationModal;
