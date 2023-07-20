import { brandColors, urlPaths } from "@/utils/helpers";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";

import { FaFolder, FaGear, FaXmark, FaBars } from "react-icons/fa6";
import styled from "styled-components";

type Props = {};

const SideBarNav = styled.nav`
    height: 100vh;
    width: 250px;

    top: 0;
    position: sticky;

    display: flex;
    justify-content: center;

    flex-grow: 0;
    flex-shrink: 0;

    background-color: ${brandColors.white};
    filter: drop-shadow(0px 0px 10px ${brandColors.purple}25);

    /* PHONE UI */
    @media only screen and (max-width: 900px) {
        width: 50px;
    }
`;

const SideBarUl = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    overflow: hidden;
`;

const Li = styled.li`
    height: 50px;
    width: 80%;

    display: flex;
    justify-content: start;
    align-items: center;

    list-style: none;

    margin: 0 auto;
`;

const LinkDiv = styled.div`
    cursor: pointer;

    display: flex;
    align-items: center;
    padding: 0 12px;
`;

const LogoText = styled.h1`
    text-decoration: none;
    margin: 0 auto;

    font-size: 1.5rem;
    font-weight: 900;
    color: ${brandColors.black};
`;

const SideBarLinkInactive = styled.div`
    cursor: pointer;

    width: 100%;
    text-decoration: none;
    color: ${brandColors.black}75;
    padding: 12px;
    border-radius: 5px;
    font-weight: 400;

    &:hover {
        color: ${brandColors.black};
        background-color: ${brandColors.gray};
        font-weight: 500;
    }
`;

const SideBarLinkActive = styled.div`
    cursor: pointer;

    width: 100%;
    text-decoration: none;
    color: ${brandColors.black};
    background-color: ${brandColors.gray};
    padding: 12px;
    border-radius: 5px;
    font-weight: 500;
`;

const SideAside = styled.aside<{ open: boolean }>`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;

    background-color: ${brandColors.white};

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    top: ${(props) => (props.open ? "0" : "-100%")};
    opacity: ${(props) => (props.open ? "100%" : "0")};
    transition: 0.3s ease-in-out;
`;

const NormalLink = styled(Link)`
    cursor: pointer;
    color: ${brandColors.black};
    font-size: 1em;
    font-weight: 500;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const SideBarData = [
    {
        type: "Button",
        title: "Repos",
        path: urlPaths.dashboard,
        icon: <FaFolder />,
    },
    {
        type: "Button",
        title: "Settings",
        path: urlPaths.settings,
        icon: <FaGear />,
    },
];

function Sidebar(props: Props) {
    const router = useRouter();
    const currentPath = router.pathname;

    const uiBreakpoint = 900;
    const [showMobileSideBar, setShowMobileSideBar] = useState<boolean>(false);

    const [screenWidth, setScreenWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return screenWidth > uiBreakpoint ? (
        // DESKTOP
        <SideBarNav>
            <SideBarUl>
                <Li key={0} style={{ marginBottom: "24px" }}>
                    <LogoText>
                        <span style={{ color: brandColors.purple }}>Giddy</span>Hub
                    </LogoText>
                </Li>

                {SideBarData.map((item, index) => {
                    return item.type === "Button" ? (
                        <Li key={index + 1}>
                            <Link style={{ width: "100%" }} href={item.path} passHref>
                                {currentPath.includes(item.path) ? (
                                    <IconContext.Provider value={{ color: brandColors.black, size: "18" }}>
                                        <SideBarLinkActive>
                                            <LinkDiv>
                                                {item.icon}
                                                <div style={{ marginLeft: "12px" }}>{item.title}</div>
                                            </LinkDiv>
                                        </SideBarLinkActive>
                                    </IconContext.Provider>
                                ) : (
                                    <IconContext.Provider value={{ color: brandColors.black + 75, size: "18" }}>
                                        <SideBarLinkInactive>
                                            <LinkDiv>
                                                {item.icon}
                                                <div style={{ marginLeft: "12px" }}>{item.title}</div>
                                            </LinkDiv>
                                        </SideBarLinkInactive>
                                    </IconContext.Provider>
                                )}
                            </Link>
                        </Li>
                    ) : (
                        <div key={index}>Type not defined</div>
                    );
                })}
            </SideBarUl>
        </SideBarNav>
    ) : (
        // MOBILE
        <>
            <SideBarNav>
                <FaBars color={brandColors.black} size={25} style={{ cursor: "pointer" }} onClick={() => setShowMobileSideBar(!showMobileSideBar)} />
            </SideBarNav>
            {showMobileSideBar && (
                <SideAside open={showMobileSideBar} style={{ padding: "32px 12px", gap: "48px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div></div>
                        <FaXmark color={brandColors.black} size={25} onClick={() => setShowMobileSideBar(false)} style={{ cursor: "pointer" }} />
                    </div>

                    <div style={{ height: "100%", display: "flex", flexDirection: "column", textAlign: "center", gap: "24px" }}>
                        {SideBarData.map((item, index) => {
                            return (
                                <NormalLink key={index} href={item.path} onClick={() => setShowMobileSideBar(false)}>
                                    {item.title}
                                </NormalLink>
                            );
                        })}
                    </div>
                </SideAside>
            )}
        </>
    );
}

export default Sidebar;
