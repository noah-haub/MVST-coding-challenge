import { urlPaths } from "@/utils/helpers";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.replace(urlPaths.dashboard);
    }, []);

    return <></>;
}
