"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const Wrapper = (props: P) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const authenticated = localStorage.getItem("authenticated") === "true";
            if (!authenticated) {
                router.push("/login");
            } else {
                setIsAuthenticated(true);
            }
        }, [router]);

        if (!isAuthenticated) {
            return null; // or a loading spinner
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;