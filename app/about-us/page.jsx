export default function AboutUs() {
    return (
        <main>
           <h1 className="text-center text-4xl pt-10 font-bold">About Us</h1>
            
            <div className="flex items-center justify-center">
                <div className="w-2/3">
                    {/* quote */}
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-1 my-8 bg-gray-600 border-0 rounded dark:bg-gray-700"/> {/* line */}
                        {/* quote image part */}
                        <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                            <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-center font-bold mb-5">
                        <b className="text-red-600">F</b>avorite <b className="text-red-600">S</b>top for affordable <b className="text-red-600">S</b>ouvenirs with creative designs and innovative ideas.
                    </h3>
                    
                    <p>Five Star Souvenirs Inc. is a family-owned wholesale corporation that has been around for over 20 years.  It was started as a small private company specializing in assembling and distributing frame-around magnets with images of New York City. They were assembled from parts exclusively made in the USA in the garage. Soon, the magnets became very popular among tourists and the company had to extend in order to keep up with the demand.  That was the starting point for future growth and success. </p> 
                    <br></br>
                    <p> By using innovative ideas, Five Star Souvenirs has developed many new designs and incorporated them into different items creating various souvenirs of New York City. Our variety includes magnets, mugs, stationary, kitchen, postcards, keychains, bags, purses and much more. </p> 
                    <br></br>
                    <p>The company has been growing and moved to a bigger warehouse located in NJ in 2014. At the same time, the company started to work with the overseas vendors, hired more salespeople and widened its customer base to other areas. The company continued working on generating new ideas and looking for new opportunities.</p>
                    <br></br>
                    <p>Today, we are working with more than 20 suppliers, and have a team of dedicated salespeople who market and distribute about 50 different types of souvenirs to more than 100 retail stores. We consider all of them to be our partners, who help us reach our main goal: to produce affordable high-quality souvenirs. We are really thankful to all of them for making this possible.
                    </p>
                    <br></br>
                    <h3 className="text-center font-bold">What sets Five Star Souvenirs Inc. from other companies is:</h3>
                    <div className="w-2/3 p-6 mx-auto">
                        <ul className="list-disc text-left">
                            <li>ability to create unique designs by using real images and drawings of New York City and its landmarks as well as other tourist destinations. </li>
                            <li>working with our own photographer and designer to create the most unique and appealing products.</li>
                            <li>dedication to always make high quality items using eco-friendly materials when possible.</li>
                            <li>aspiration to make our retail partners happy by setting good wholesale prices and working individually with each of them.</li>
                            <li>ability to make souvenirs that are colorful, creative and useful at the same time.</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
            
        </main>
    )
}

  