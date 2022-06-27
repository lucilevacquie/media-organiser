import React from 'react';

const Navigation = ({isSearchOpen, setIsSearchOpen}) => {
    return (
        <div>
            {/* Mobile navigation */}
            <nav className='relative z-20 w-full h-full bg-center rounded-xl md:hidden' style={{ backgroundImage: 'url("img/background-img.jpeg")'}}>
                <div className='max-w-7xl mx-auto px-4 lg:px-8'>
                    <div className='flex items-center justify-between h-16 text-white'>
                        <a href='/' className='h-8'>
                            <img src='img/logo.png' alt='Media Organiser Logo' className='w-full h-full'/>
                        </a>
                        <div>
                            Welcome to Media Organiser
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
                                    <input type='search' placeholder='Search' className='px-4 py-2 rounded-lg'/>
                                </div>      
                            </div>
                    }
                </div>
            </nav>
            {/* Laptop navigation */}
            <div className='w-full bg-white py-4'>
                <nav className='hidden max-w-7xl mx-auto px-4 lg:px-8 md:block'>
                    <div className='flex space-x-4 items-center'>
                        <a href='/' className='h-12'>
                            <img src='img/logo.png' alt='Media Organiser Logo' className='w-full h-full'/>
                        </a>
                        <div className='font-bold uppercase'>Media Org <br/><span className='text-xs font-normal'>by Whizzy Software</span></div>
                    </div>
                    
                </nav>
            </div>
        
        </div>
        
    )
}

export default Navigation;