import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

export const ScrollTop = ({children}: {children: any}) => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [location.pathname]);
    return children
} 
  