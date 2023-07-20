import { useRouter } from "next/router";
import React from "react";

type Props = {};

function signin(props: Props) {
    const router = useRouter();

    return (
        <div>
            <p>Sign In</p>
            <button
                onClick={() => {
                    // Send user through GitHub OAuth
                    router.push(`/api/integrations/github/auth/signin`);
                }}
            >
                Sign in with GitHub
            </button>
        </div>
    );
}

export default signin;
