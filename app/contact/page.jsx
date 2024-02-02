export default function Contact() {
    // const [fullname, setFullname] = useState("");
    // const [email, setEmail] = useState("");
    // const [subject, setSubject] = useState("");
    // const [message, setMessage] = useState("");

    return (
        <main>
            <div className="py-20 px-20 grid grid-cols-1 lg:grid-cols-2">
                <form className="flex flex-col gap-8">
                    <h1 className="relative inline">
                        <label class="font-bold text-sm/[5px] text-[50px]"> Contact</label>
                        {/* Contact */}
                        {/* <span className="absolute left-1/2 font-bold bg-gray-500 -translate-x-1/2 h-[2px] w-[60px]"></span> */}
                    </h1>

                    {/* name */}
                    <div className="flex flex-col">
                        <label class="font-bold">Your Name (required)</label>
                        <input type="text" placeholder="Name" class="border-2 border-rose-600/50"/>
                    </div>

                    {/* email */}
                    <div className="flex flex-col">
                        <label class="font-bold"> Your Email (required) </label>
                        <input type="email" placeholder="Email" class="border-2 border-rose-600/50"/>
                        {/* <div class="border border-black-600"></div> */}
                        <div className="focus:border-black focus:ring-0" shadow={true} placeholder="Firstname" />
                    </div>

                    {/* subject */}
                    <div className="flex flex-col">
                        <label class="font-bold">Subject</label>
                        <input type="text" placeholder="Subject" class="border-2 border-rose-600/50"/>
                    </div>
                    
                    {/* message */}
                    <div className="flex flex-col">
                        <label class="font-bold">Your Message </label>
                        <textarea class="border-2 border-rose-600/50" cols="10" rows="20" className="resize-none"></textarea>
                    </div>
                    <div className=""> {/* py-10 px-20*/}
                        <button href="" class="w-[100px] h-[50px] font-bold border border-rose-600/50 hover:border-rose-600 ...">
                            Submit
                        </button>
                    </div>
                    </form>
                </div>
        </main>
    )
    }
