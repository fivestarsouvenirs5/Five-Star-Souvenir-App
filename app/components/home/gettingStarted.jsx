import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function GettingStarted() {
    return (
        <section className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 h-full">
            <Card className="w-full bg-neutral-beige-light border-0 shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 pb-1 flex flex-row items-start justify-between gap-4">
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-secondary">
                        Getting Started
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-6 lg:px-8 py-4 sm:py-5">
                    <p className="text-xl">
                        To get started with Five Star Souvenirs, create an account by clicking <a href="/signup" className="text-secondary-dark hover:underline"> Sign Up</a> in the top right corner.
                       <br></br>
                       <br></br>
                        Once you have created an account please use the <a href="/contact" className="text-secondary-dark hover:underline">Contact Page</a> to let us know you have signed up.
                        <br></br>
                        <br></br>
                        We will reach out to you to dicuss more details and <span className="font-bold">approve</span> your account so you can view more details about our products and place orders!
                    </p>
                </CardContent>
            </Card>
        </section>
    )
}