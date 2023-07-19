import { getCookie } from "cookies-next";
import CryptoJS from "crypto-js";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export function getMiddlewareCookie(req: NextRequest, cookieName: string) {
    const cookieObject = req.cookies.get(cookieName);
    if (cookieObject) {
        const decryptedCookieValue = CryptoJS.AES.decrypt(cookieObject.value, process.env.ENCRYPTION_PASSPHRASE as string).toString(CryptoJS.enc.Utf8);
        return decryptedCookieValue;
    } else {
        return undefined;
    }
}

export function getApiCookie(req: NextApiRequest, res: NextApiResponse, cookieName: string) {
    const cookieObject = getCookie(cookieName, { req, res });

    if (cookieObject) {
        const decryptedCookieValue = CryptoJS.AES.decrypt(cookieObject.toString(), process.env.ENCRYPTION_PASSPHRASE as string).toString(CryptoJS.enc.Utf8);
        return decryptedCookieValue;
    } else {
        return undefined;
    }
}
