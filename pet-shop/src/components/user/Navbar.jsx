import {PawPrint, HomeIcon, ShoppingCartIcon, PawPrintIcon, HeartIcon} from 'lucide-react';
const Navbar = ({ activeMenu, setActiveMenu}) => {

    const navItems = [
        { name: 'Home', icon: <HomeIcon className="w-4 h-4" />  },
        { name: 'Shop', icon: <ShoppingCartIcon className="w-4 h-4" />  },
        { name: 'Adopt', icon: <PawPrintIcon className="w-4 h-4" />  },
        { name: 'Donate', icon: <HeartIcon className="w-4 h-4" />  },
        { name: 'Cart', icon: <ShoppingCartIcon className="w-4 h-4" />  },
    ]


    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                    <PawPrint className="w-6 h-6 text-gray-800" />
                    <span className="text-lg font-semibold text-gray-800">Pet Supply & Adoption</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center gap-2">
                    {navItems.map((item) => {
                        return (
                            <div key={item.name}>
                                <button 
                                    onClick={() => setActiveMenu(item.name)} 
                                    className={`px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2
                                    ${activeMenu === item.name 
                                        ? 'bg-gray-300 text-gray-700' 
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                                        {item.icon}
                                    <span className="text-sm font-medium">{item.name}</span>
                                </button>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    </header>
    );
};
export default Navbar;