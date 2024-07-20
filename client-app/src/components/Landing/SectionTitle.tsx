/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React from "react";

interface SectionTitleProps {
  title: string;
  classes?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, classes = "" }) => {
  return (
    <h1 className={`md:text-[40px] text-[30px] font-bold uppercase text-center ${classes}`}>
      {title}
    </h1>
  );
};

export default SectionTitle;
