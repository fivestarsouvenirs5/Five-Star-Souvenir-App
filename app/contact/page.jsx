export default function Contact() {

    const v = process.env.API_KEY

    return (
        
        <main>
            <div className="py-20 px-20 grid grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col gap-8">
                    
                    <h1 className="mt-3 font-bold text-2xl">Contact</h1>
                    <div className="h-1 bg-rose-600/50 rounded"/>
                    
                    
                        <form action="https://api.web3forms.com/submit" method="POST">
                            <input type="hidden" name="access_key" value={v} />
                        
                        {/* name */}
                        <div className="flex flex-col gap-2 py-2">
                            <label className="font-bold"id="yourName">Your Name (required)</label>
                            <input type="text" placeholder="Name" name="name" className="border-2 border-rose-600/50" required />
                        </div>

                        {/* email */}
                        <div className="flex flex-col gap-2 py-2">
                            <label className="font-bold" id="yourEmail"> Your Email (required) </label>
                            <input type="email" placeholder="Email" name="email" className="border-2 border-rose-600/50" required/>
                            {/* <div className="border border-black-600"></div> */}
                            {/* <div className="focus:border-black focus:ring-0" shadow={true} placeholder="Firstname" /> */}
                        </div>
                        
                        {/* message */}
                        <div className="flex flex-col gap-2 py-2">
                            <label className="font-bold" id="yourMessage">Your Message </label>
                            <textarea placeholder="Message..." name="message" className="border-2 border-rose-600/50 resize-none" cols="10" rows="20"></textarea>
                        </div>

                        {/* Submit */}
                        <div className="py-2"> {/* py-10 px-20*/}
                            <button href="" className="w-[100px] h-[50px] font-bold border border-rose-600/50 hover:border-rose-600 ...">
                                Submit
                            </button>
                        </div>
                        </form>
                </div>
            </div>
        </main>
    )
    }
