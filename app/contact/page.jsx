import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const v = process.env.API_KEY

  return (
    <>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10">

            <h1 className="text-4xl font-bold text-center mb-4 w-full max-w-6xl text-secondary-dark">
            Contact Us
            </h1>

            <div className="w-24 h-[2px] bg-secondary mb-12 rounded-full" />

            <div className="grid lg:grid-cols-2 gap-14 items-center w-full max-w-6xl">

            <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-[420px] h-[420px]">
                <Image
                    src="/contact-image.png"
                    alt="Contact illustration"
                    fill
                    className="object-contain"
                    priority
                />
                </div>
            </div>

            <Card className="w-full shadow-2xl border border-border/40 rounded-3xl bg-neutral-beige-light backdrop-blur-sm">
                <CardContent className="p-10">

                <h2 className="text-2xl font-bold mb-2">
                    HAVE SOME QUESTIONS?
                </h2>

                <p className="text-sm text-muted-foreground mb-6">
                    Send us a message and we’ll get back to you shortly.
                </p>

                <form
                    action="https://api.web3forms.com/submit"
                    method="POST"
                    className="flex flex-col gap-4"
                >
                    <input type="hidden" name="access_key" value={v} />

                    <Input
                    name="name"
                    placeholder="What's your name?"
                    className="rounded-full h-11 border-text border"
                    required
                    />

                    <Input
                    type="email"
                    name="email"
                    placeholder="What's your email?"
                    className="rounded-full h-11 border-text border"
                    required
                    />

                    <Textarea
                    name="message"
                    placeholder="Your message...."
                    className="rounded-2xl min-h-[140px] border-text border"
                    required
                    />

                    <Button
                    type="submit"
                    className="w-full rounded-full bg-primary text-white font-semibold h-11 mt-2"
                    >
                    SEND MESSAGE
                    </Button>
                </form>

                </CardContent>
            </Card>

            </div>
        </div>
        </>
  )
}