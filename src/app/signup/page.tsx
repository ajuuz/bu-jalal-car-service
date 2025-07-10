import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FaGoogle } from "react-icons/fa";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-6 justify-between items-center">
            <div className=" flex flex-col gap-2">
                <h1 className="text-3xl font-semibold text-center">Create an account</h1>
                <p>Enter your email and Password below to create your account</p>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <Input placeholder="email: example@gmail.com"/>
                <Input placeholder="password"/>
            </div>
            <Button className="w-full">Sign Up</Button>
            <div className="flex items-center w-full">
                <Separator className="border-2 flex-1"/>
                    <span className="text-muted-foreground font-medium mx-2 text-xs">OR CONTINUE WITH</span>
                <Separator className="border-2 flex-1"/>
            </div>

            <div className="bg-black/90 border-2 border-slate-500 w-full flex justify-center items-center  py-3 rounded-md">
                <FaGoogle className="text-white"/>
            </div>
        </div>
    </div>
  )
}

export default page
