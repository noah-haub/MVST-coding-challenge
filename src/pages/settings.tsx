import ContentWrapper from "@/components/ContentWrapper";
import ErrorBox from "@/components/ErrorBox";
import QuestionPrompt from "@/components/QuestionPrompt";
import SettingsSkeleton from "@/components/skeletons/SettingsSkeleton";
import { useUser } from "@/functions/github.functions";
import { axiosApi } from "@/utils/axios";
import { brandColors, getErrorMessage } from "@/utils/helpers";
import Head from "next/head";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import styled from "styled-components";

type Props = {};

const Headline = styled.h1`
    color: ${brandColors.black};
    font-size: 1.25rem;
    font-weight: 600;
`;

const Box = styled.div`
    background-color: ${brandColors.white};
    border-radius: 10px;
    padding: 24px;
`;

const LabelH4 = styled.h4`
    color: ${brandColors.captionBlack};
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 5px;
`;

const ValueH4 = styled.h4`
    color: ${brandColors.black};
    font-weight: 500;
    font-size: 1rem;
    margin-top: 0px;
`;

const ManageSubscriptionButton = styled.button`
    all: unset;
    cursor: pointer;
    color: ${brandColors.white};
    background-color: ${brandColors.purple};
    padding: 10px;
    border-radius: 5px;
    margin-left: auto;
    height: 20px;
    align-self: center;

    &:hover:enabled {
        background-color: ${brandColors.darkPurple};
        outline: 1px solid ${brandColors.purple};

        color: ${brandColors.white};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const LogoutButton = styled.button`
    all: unset;
    cursor: pointer;
    color: ${brandColors.black};
    background-color: ${brandColors.cancelColor};
    padding: 10px;
    border-radius: 5px;
    height: 20px;

    &:hover {
        background-color: ${brandColors.gray};
        outline: 1px solid ${brandColors.cancelColor};
    }
`;
function settings(props: Props) {
    const { user, errorUser, isLoadingUser } = useUser();

    const [showSignoutPrompt, setShowSignoutPrompt] = useState(false);

    const isLoading = isLoadingUser;
    const error = getErrorMessage([errorUser]);

    if (isLoading) return <SettingsSkeleton />;
    if (error) return <ErrorBox errorMessage={error} />;
    return (
        <>
            <Head>
                <title>Settings - GiddyHub</title>
                <meta name="description" content="The user's settings page." />
            </Head>
            <ContentWrapper>
                <div style={{ margin: "0 auto", maxWidth: "600px" }}>
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <Headline>Settings</Headline>
                    </div>

                    <Box style={{ marginBottom: "24px" }}>
                        <div style={{ marginBottom: "36px" }}>
                            <div style={{ display: "inline-block" }}>
                                <LabelH4>Username</LabelH4>
                                {/* <Myh4White>{newName}</Myh4White> */}
                                <ValueH4>{user.username}</ValueH4>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: "inline-block" }}>
                                <LabelH4>Displayname</LabelH4>
                                {/* <Myh4White>{newName}</Myh4White> */}
                                <ValueH4>{user.displayName}</ValueH4>
                            </div>
                        </div>
                    </Box>

                    <div style={{ textAlign: "center" }}>
                        <LogoutButton
                            onClick={() => {
                                setShowSignoutPrompt(true);
                            }}
                        >
                            Sign out
                        </LogoutButton>
                    </div>
                </div>

                <QuestionPrompt
                    showPrompt={showSignoutPrompt}
                    setShowPrompt={setShowSignoutPrompt}
                    headline="Are you sure, you want to sign out?"
                    caption=""
                    cancelButtonText="Cancel"
                    confirmButtonText="Sign out"
                    functionOnConfirm={async () => {
                        // Sign out the user
                        toast.loading("");
                        try {
                            await axiosApi.post("/integrations/github/auth/signout");
                            toast.dismiss();
                            toast.success("Signed out successfully");
                        } catch (error) {
                            toast.dismiss();
                            toast.error(`${error}`);
                            console.log(error);
                        }
                    }}
                />
            </ContentWrapper>
        </>
    );
}

export default settings;
