

import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function AboutUs() {
    return (
        <div className="bg-background pb-24">

            <div className="text-center pt-16 pb-10 px-6 bg-primary-dark text-white">
                <p className="text-sm text-white mb-3">About Us</p>

                <h1 className="text-5xl font-bold tracking-tight">
                    Hello, we are Five Star Souvenirs Inc.
                </h1>

                <div className="mt-10 flex justify-center">
                   <Image src="/about_us_hero.png" alt="About Us illustration" width={600} height={500} className="object-contain" priority />
                </div>
            </div>


            <div className="max-w-6xl mx-auto px-6 mt-16 grid md:grid-cols-2 gap-12 items-start">

                <div className="flex flex-col gap-2 items-start">
                    <h2 className="text-3xl justify-center font-bold text-secondary-dark leading-snug">
                        Your one-stop shop
                        <br />
                        for affordable souvenirs 
                        <br />
                        with creative designs 
                        <br />
                        and innovative ideas.
                    </h2>

                    <div className="items-start">
                         <Image src="/about_us_left.png" alt="About Us illustration" width={600} height={600} className="object-contain" priority />
                    </div>
                   
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">

                    <p>
                        Five Star Souvenirs Inc. is a family-owned wholesale corporation that has been around for over 20 years.  It was started as a small private company specializing in assembling and distributing frame-around magnets with images of New York City. They were assembled from parts exclusively made in the USA in the garage. Soon, the magnets became very popular among tourists and the company had to extend in order to keep up with the demand.  That was the starting point for future growth and success.
                    </p>

                    <p>
                        By using innovative ideas, Five Star Souvenirs has developed many new designs and incorporated them into different items creating various souvenirs of New York City. Our variety includes magnets, mugs, stationary, kitchen, postcards, keychains, bags, purses and much more.
                    </p>

                    <p>
                        The company has been growing and moved to a bigger warehouse located in NJ in 2014. At the same time, the company started to work with the overseas vendors, hired more salespeople and widened its customer base to other areas. The company continued working on generating new ideas and looking for new opportunities.
                    </p>

                    <p>
                        Today, we are working with more than 20 suppliers, and have a team of dedicated salespeople who market and distribute about 50 different types of souvenirs to more than 100 retail stores. We consider all of them to be our partners, who help us reach our main goal: to produce affordable high-quality souvenirs. We are really thankful to all of them for making this possible.
                    </p>

                </div>
            </div>
                

                <Card className="p-8 bg-neutral-beige-light max-w-6xl mx-auto px-6 mt-10 rounded-lg border shadow-lg">
                    <h3 className="text-center text-secondary-dark font-bold text-xl">
                    What sets us apart:
                                    </h3>
                    <ul className="list-disc p-6 space-y-3 text-lg">
                        <li>We create unique designs by using real images and drawings of New York City and its landmarks as well as other tourist destinations.</li>
                        <li>We work with our own photographer and designer to create the most unique and appealing products.</li>
                        <li>We are dedicated to always make high quality items using eco-friendly materials when possible.</li>
                        <li>We aspire to make our retail partners happy by setting good wholesale prices and working individually with each of them.</li>
                        <li>We make souvenirs that are colorful, creative and useful at the same time.</li>
                    </ul>
                </Card>

        </div>
    )
}