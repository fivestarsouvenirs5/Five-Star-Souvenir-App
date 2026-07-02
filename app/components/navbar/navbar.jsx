
import MainLinks  from './mainLinks';
import AuthenticationButtons from './authenticationButtons';
import MobileNav from './mobileNav';
import CartPopover from './cartPopover';

export default async function NavBar() {

    return (
        <nav className="bg-primary-dark ">
            {/* to indent: max-w-5xl */}
            <div className="px-4 mx-auto">
                <div className="flex justify-between">
                
                {/* Logo and main links not mobile */}
                    <div className="flex items-center space-x-1 hidden md:flex">
                        <img className="h-14 w-28" src="/images/Logo.png" alt="" />
                    </div>
                
                    <div className="hidden md:flex">
                        <div className="flex items-center space-x-1">
                            <MainLinks />
                        </div>
                    </div>

                {/* mobile logo and main links */}
                 <div className="md:hidden flex">
                        <div className="flex items-center space-x-1">
                            <MobileNav />
                        </div>
                    </div>

                    <div className="md:hidden flex items-center space-x-1">
                        <img className="h-14 w-28" src="/images/Logo.png" alt="" />
                    </div>

                {/* authentication buttons */}
                <div className="flex items-center space-x-4">
                    <CartPopover />
                    <AuthenticationButtons />
                </div>

                </div>

            </div>
        </nav>
    )
   
}