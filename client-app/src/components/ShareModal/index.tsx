/**
 * Author: Aharnish Solanki (B00933563)
 */

import React, { useState } from "react";
import Button from "../UI/Button";
import { FaTimes } from "react-icons/fa";
//https://www.iconpacks.net/ reference for svg icons
import FacebookSVG from "../../assets/brandicons/facebook.svg";
import WhatsAppSVG from "../../assets/brandicons/whatsapp.svg";
import EmailSVG from "../../assets/brandicons/mail.svg";
import RedditSVG from "../../assets/brandicons/reddit.svg";

const ShareModal = ({
  url,
  isOpen,
  onClose,
}: {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const socialMedia = [
    {
      name: "Facebook",
      svg: FacebookSVG,
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: "WhatsApp",
      svg: WhatsAppSVG,
      shareUrl: `https://api.whatsapp.com/send?text=${url}`,
    },
    { name: "Email", svg: EmailSVG, shareUrl: `mailto:?body=${url}` },
    {
      name: "Reddit",
      svg: RedditSVG,
      shareUrl: `https://reddit.com/submit?url=${url}`,
    },
  ];

  const handleSocialShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank");
    onClose();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === "modal-backdrop") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-backdrop"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Share</h3>
          <Button onClick={onClose} variant="text" color="inherit">
            <FaTimes size={25} />
          </Button>
        </div>
        <div className=" flex justify-center items-center mt-2 px-7 py-3">
          {socialMedia.map((media) => (
            <Button
              key={media.name}
              onClick={() => handleSocialShare(media.shareUrl)}
              variant="text"
            >
              <img
                src={media.svg}
                alt={`${media.name} icon`}
                className="w-12 h-12"
              />
            </Button>
          ))}
        </div>
        <div className="flex justify-center items-center mt-4">
          <input
            type="text"
            readOnly
            value={url}
            className="input w-full border mr-2 "
          />
          <Button onClick={copyToClipboard} className="copy-btn">
            Copy
          </Button>
        </div>
        {copied && <span className="text-sm text-green-500">Copied!</span>}
        <div className="items-center px-4 py-3"></div>
      </div>
    </div>
  );
};

export default ShareModal;
