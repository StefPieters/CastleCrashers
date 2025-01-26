import { useState } from 'react';
import logo from '/assets/Ui/logo-stef.svg';

const LogoStef = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            window.open('https://stef-portfolio.vercel.app', '_blank');
        }, 100);
    };

    return (
        <div className='fixed top-0 left-0 p-4 z-30'>
            <img 
                src={logo} 
                alt="logo" 
                className='w-12 h-12 transition-transform duration-100 hover:scale-110 cursor-pointer'
                onClick={handleClick} 
            />
        </div>
    );
}

export default LogoStef;