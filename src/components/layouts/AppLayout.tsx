import { brandColors, urlPaths } from "@/utils/helpers";
import { useRouter } from "next/router";
import React from "react";
import Sidebar from "../SideBar";
import styled from "styled-components";

type Props = {
    children: React.ReactNode;
};

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
    color: ${brandColors.black};
    font-size: 1.5rem;
    font-weight: 900;
`;

const Caption = styled.p`
    color: ${brandColors.captionBlack};
    font-size: 0.85rem;
    font-weight: 600;
`;

function AppLayout(props: Props) {
    const router = useRouter();
    const noLayoutPages = [urlPaths.signin];

    if (noLayoutPages.includes(router.pathname)) {
        return <main>{props.children}</main>;
    } else {
        return (
            <div style={{ display: "flex" }}>
                <Sidebar />
                <main style={{ width: "100%" }}>{props.children}</main>
            </div>
        );
    }
}

export default AppLayout;
