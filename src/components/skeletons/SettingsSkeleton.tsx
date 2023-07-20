import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { brandColors } from "@/utils/helpers";
import ContentWrapper from "../ContentWrapper";

type Props = {};

function SettingsSkeleton(props: Props) {
    return (
        <ContentWrapper>
            <div style={{ margin: "0 auto", maxWidth: "600px" }}>
                <SkeletonTheme baseColor={brandColors.white} highlightColor={brandColors.captionBlack}>
                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                        <Skeleton height={100} width={100} style={{ borderRadius: "50%" }} />
                    </div>
                    <div style={{ width: "100%" }}>
                        <Skeleton height={75} style={{ marginBottom: "6px", borderRadius: "5px" }} />
                        <Skeleton height={75} style={{ marginBottom: "12px", borderRadius: "5px" }} />
                    </div>
                    <div style={{ width: "25%", margin: "0 auto" }}>
                        <Skeleton height={30} style={{ marginBottom: "12px", borderRadius: "5px" }} />
                    </div>
                </SkeletonTheme>
            </div>
        </ContentWrapper>
    );
}

export default SettingsSkeleton;
