import { brandColors } from "@/utils/helpers";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { FaGithub } from "react-icons/fa6";
import { toast } from "react-hot-toast";

type Props = {};

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentDiv = styled.div`
    text-align: center;
    width: 300px;
`;

const Headline = styled.h2`
    font-size: 1.5rem;
    font-weight: 900;
    color: ${brandColors.black};
`;

const Caption = styled.p`
    font-size: 1rem;
    font-weight: 400;
    color: ${brandColors.captionBlack};
`;

const GitHubAuthButton = styled.button`
    cursor: pointer;

    width: 100%;
    padding: 12px;
    font-size: 1rem;

    border: none;
    border-radius: 5px;
    background-color: white;

    box-shadow: inset 0 0 0 1px ${brandColors.purple};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

const SignUpLink = styled(Link)`
    cursor: pointer;

    font-size: 1rem;
    font-weight: 300;
    color: ${brandColors.purple};
    text-decoration: underline;
`;

function signin(props: Props) {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Sign In - GiddyHub</title>
                <meta name="description" content="The user's signin page." />
            </Head>

            <Container>
                <ContentDiv>
                    <Headline style={{ marginBottom: "48px" }}>
                        Welcome back to
                        <br />
                        <span style={{ color: brandColors.purple }}>Giddy</span>Hub
                    </Headline>

                    <GitHubAuthButton
                        data-test="github-auth-button"
                        onClick={() => {
                            toast.loading("");
                            // Signin with github...
                            router.push(`/api/integrations/github/auth/signin`);
                        }}
                    >
                        <FaGithub size={25} color={brandColors.black} />
                        <p>Continue with GitHub</p>
                    </GitHubAuthButton>

                    <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                        <Caption>No account yet?</Caption>
                        <SignUpLink href="https://github.com/join">Sign up.</SignUpLink>
                    </div>
                </ContentDiv>
            </Container>
        </>
    );
}

export default signin;
