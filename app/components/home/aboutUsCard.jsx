import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutUsCard() {
    return (
        <section className="w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-6 h-full">
            <Card className="w-full bg-neutral-beige-light border-0 shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 pb-1 flex flex-row items-start justify-between gap-4">
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-secondary">
                        About Us
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                    <p className="text-xl">
                        Five Star Souvenirs Inc. is a family-owned wholesale corporation known for its over 20 years of expertise in crafting and distributing unique, high-quality souvenirs featuring real images of New York City landmarks.
                        <br></br>
                         With a commitment to eco-friendly materials and personalized customer relationships, the company sets itself apart by creating colorful, creative, and practical items.
                    </p>
                </CardContent>
                <CardFooter className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
                    <a href="/about-us" className="text-sm sm:text-base text-primary hover:underline whitespace-nowrap">
                        Read More
                    </a>
                </CardFooter>
            </Card>
        </section>
    );
}