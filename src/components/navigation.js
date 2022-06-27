import React from 'react';

//ASSETS
import Logo from '../img/logo.png';
import Background from '../img/background-img.jpeg';

const Navigation = ({ title, isSearchOpen, setIsSearchOpen }) => {

    const search = () => { }

    return (
        <div>
            {/* Mobile navigation */}
            <nav className='relative z-20 w-full h-full bg-center rounded-xl md:hidden' style={{ backgroundImage: `url(${Background})` }}>
                <div className='max-w-7xl mx-auto px-4 lg:px-8'>
                    <div className='flex items-center justify-between h-16 text-white'>
                        <a href='/' className='h-8'>
                            <img src={Logo} alt='Media Organiser Logo' className='w-full h-full' />
                        </a>
                        <div>
                            {title}
                        </div>
                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className='p-2 border border-transparent rounded-xl hover:border-white focus:border-white'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    {
                        isSearchOpen &&
                        <div
                            className='absolute z-10 top-14 left-0 w-full pt-8 pb-4 rounded-b-xl bg-gray-200'
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-y-full"
                            enterTo="translate-y-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-y-0"
                            leaveTo="translate-y-full"
                        >
                            <div className='flex flex-col space-y-2 max-w-7xl mx-auto px-4 lg:px-8'>
                                <input type='search' placeholder='Search' className='px-4 py-2 rounded-lg' />
                            </div>
                        </div>
                    }
                </div>
            </nav>
            {/* Laptop navigation */}
            <div className='hidden w-full bg-white py-4 md:block'>
                <nav className='max-w-7xl mx-auto px-4 flex justify-between lg:px-8'>
                    <div className='flex space-x-4 items-center'>
                        <a href='/' className='h-12'>
                            <img src={Logo} alt='Media Organiser Logo' className='w-full h-full' />
                        </a>
                        <div className='font-bold uppercase'>Media Org <br /><span className='text-xs font-normal'>by Whizzy Software</span></div>
                    </div>
                    <form onSubmit={() => search()} className='flex space-x-4'>
                        <input type='search' placeholder='Search' className='px-4 py-2 border rounded-lg' />
                        <button type='submit' className='p-2 border border-transparent rounded-xl hover:border-white focus:border-white'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </nav>
            </div>

        </div>

    )
}

export default Navigation;