import AuthForm from "@/components/ui/AuthForm";
import Image from "next/image";

const LoginPage = () => {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex items-center justify-center">
                <AuthForm />
            </div>
            <div className="w-1/2">
                <Image src="/auth-image.svg" alt="Auth Image" width={1200} height={900} className="object-cover w-full h-full" />
            </div>
        </div>
    );
};

export default LoginPage;
