import MainLinks  from './mainLinks';
import AuthenticationButtons from './authenticationButtons'

export default function NavBar() {
    return (
    <nav>
        <nav className="bg-red-100">
            {/* to indent: max-w-5xl */}
            <div className="px-4 mx-auto">
                <div className="flex justify-between">
                
                    {/* logo */}
                    <div className="flex items-center space-x-1">
                        <img className="h-14 w-28" src="/images/Logo.png" alt="" />
                    </div>
                
                    <div className="hidden md:flex">
                        <div className="flex items-center space-x-1">
                            <MainLinks />
                        </div>
                        
                    </div>

                    <div className="hidden md:flex">
                        <AuthenticationButtons />
                    </div>
                    

                    {/* mobile button here */}
                    <div className="md:hidden flex items-center">
                        <AuthenticationButtons />
                    </div>

                </div>

            </div>

            {/* mobile menu */}
            <div className="md:hidden">
                <MainLinks/>
            </div>
        </nav>
        

        
    </nav>
    )
   
}