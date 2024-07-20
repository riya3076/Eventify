/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React from "react";

interface NewsCardProps {
  text: string;
  name: string;
  holder: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ text, name, holder }) => (
  <div className="w-[320px] px-4 py-6 bg-white rounded-md news_card_shadow">
    <p className="text-[#5B6469] font-bold text-[15px]">{text}</p>
    <div className="pt-7 text-[13px] flex items-center gap-2">
      <img src='https://picsum.photos/500/500?random=7' alt="person" className="w-10 h-10 rounded-full" />
      <div>
        <h1 className="font-medium">{name}</h1>
        <p className="text-[#BFBFC8]">@{holder}</p>
      </div>
    </div>
  </div>
);

export default NewsCard;
