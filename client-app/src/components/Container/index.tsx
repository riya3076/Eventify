/**
 * Author: Keyur Pradipbhai Khant (B00935171)
 */
import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto">{children}</div>;
};

export default Container;
