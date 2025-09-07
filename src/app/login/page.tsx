import AuthForm from "@/components/ui/AuthForm";
import Image from "next/image";

const LoginPage = () => {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex items-center justify-center">
                <AuthForm />
            </div>
            <div className="w-1/2 relative">
                <div className="absolute left-[50%] w-[65%]  top-[50%] -translate-[50%]">
                    <h1 className="text-white text-5xl leading-14">Drive Better Decisions with Centralized Performance & Account Intelligence.</h1>
                </div>
                <Image src="/login-screen-image.jpg" alt="Auth Image" width={1200} height={900} className="object-cover w-full h-full" />
            </div>
        </div>
    );
};

export default LoginPage;
