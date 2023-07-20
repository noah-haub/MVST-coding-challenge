import "@/styles/globals.css";
import Head from "next/head";
import AppLayout from "@/components/layouts/AppLayout";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                    error: {
                        duration: 7000, // Display error toast for 7 sec
                    },
                }}
            />
        </>
    );
}
