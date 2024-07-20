import React from 'react';
import Button from '@mui/material/Button';

interface CustomButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    variant?: 'text' | 'contained' | 'outlined';
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    disabled?: boolean;
}

const EButton: React.FC<CustomButtonProps> = ({
    children,
    onClick,
    type = 'button',
    className,
    variant = 'contained',
    color = 'primary',
    disabled = false,
}) => {
    return (
        <Button
            type={type}
            onClick={onClick}
            className={`py-2 px-4 rounded ${className}`}
            variant={variant}
            color={color}
            disabled={!disabled ? false : true}
        >
            {children}
        </Button>
    );
};

export default EButton;
