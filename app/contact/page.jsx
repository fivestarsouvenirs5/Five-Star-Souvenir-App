export default function AboutUs() {
    return (
        <main >
            {/* /* <div className="x1:container mx-auto mb-32">
                <div
                    className="flex justify-center"
                    style={{
                        background: 'radical-gradient(circle, rgba(0,0,0,1) 40%, rgba(252,70,107,1) 100%',
                        height: '250px',
                    }}
                >
                    <h1 className="text-5x1 sm:text-7x1 text-white uppercase pt-12">Contact</h1>
                </div>
                <div className="px-4 sm:w-2/3 lg:w-1/2 mx-auto">
                    <div className="rounded-lg shadow-lg bg-white -mt-24 py-10 md:py-12 px-4 md:px-6">FORM</div>
                </div>
            </div> */ }
            {/* <div className="w-[807px] h-[27px] text-black text-xl font-normal font-['Inter']">Fields marked with an asterisk (*) are required</div>
                <div className="w-[73px] h-[31px]"><span className="text-black text-xl font-bold font-['Inter']">Name</span><span className="text-red-500 text-xl font-bold font-['Inter']">*</span></div>
                <div className="w-[441px]" /><input type="text" class="border-b focus: border-black focus: border-b-2"></input>
                <div className="w-[164px] h-[31px]"><span className="text-black text-xl font-bold font-['Inter']">Email Address</span><span className="text-red-500 text-xl font-bold font-['Inter']">*</span></div>
                <div className="w-[700px]" /><input type="text" class="border-b focus: border-black focus: border-b-2"></input>
                <div className="w-[137px] h-[31px] text-black text-xl font-bold font-['Inter']">Message</div>
                <div className="w-[1000px]" /><input type="text" class="border-b focus: border-black focus: border-b-2"></input> */}
                <div className="py-20 px-20 grid grid-cols-1 lg:grid-cols-2">
                    <form className="flex flex-col gap-8">
                        <h1 className="relative inline">
                            <label class="font-bold text-sm/[5px] text-[50px]"> Contact</label>
                            {/* Contact */}
                            {/* <span className="absolute left-1/2 font-bold bg-gray-500 -translate-x-1/2 h-[2px] w-[60px]"></span> */}
                        </h1>
                        <div className="flex flex-col">
                            <label class="font-bold">Your Name(required)</label>
                            <input class="border-2 border-rose-600/50"/>
                        </div>
                        <div className="flex flex-col">
                            <label class="font-bold"> Your Email (required) </label>
                            <input class="border-2 border-rose-600/50"/>
                            {/* <div class="border border-black-600"></div> */}
                            <div className="focus:border-black focus:ring-0" shadow={true} placeholder="Firstname" />
                        </div>
                        <div className="flex flex-col">
                            <label class="font-bold">Subject</label>
                            <input class="border-2 border-rose-600/50"/>
                        </div>
                        <div className="flex flex-col">
                            <label class="font-bold">Your Message </label>
                            <textarea class="border-2 border-rose-600/50" cols="10" rows="20" className="resize-none"></textarea>
                        </div>
                        <div className="py-10 px-20">
                            <button href="" class="w-[100px] h-[50px] font-bold border border-rose-600/50 hover:border-rose-600 ...">
                                Submit
                            </button>
                        </div>
                        </form>
                    </div>
        </main>
    )
    }
