"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const Wrapper = (props: any) => {
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
