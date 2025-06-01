// import Image from "next/image";
// import {Header} from "@/app/components/Header";
//
//
//
// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Header/>
//         <div className="flex flex-col gap-[32px]">Không phải gia sư tốt</div>
//       </main>
//
//     </div>
//   );
// }
// import { getTokens } from "next-firebase-auth-edge";
// import { cookies } from "next/headers";
// import { notFound } from "next/navigation";
// import { clientConfig, serverConfig } from "./config";
//
// export default async function Home() {
//     const tokens = await getTokens(await cookies(), {
//         apiKey: clientConfig.apiKey,
//         cookieName: serverConfig.cookieName,
//         cookieSignatureKeys: serverConfig.cookieSignatureKeys,
//         serviceAccount: serverConfig.serviceAccount,
//     });
//
//     if (!tokens) {
//         notFound();
//     }
//
//     return (
//         <main className="flex min-h-screen flex-col items-center justify-center p-24">
//             <h1 className="text-xl mb-4">Super secure home page</h1>
//             <p>
//                 Only <strong>{tokens?.decodedToken.email}</strong> holds the magic key to this kingdom!
//             </p>
//         </main>
//     );
// }




import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "./config";
import HomePage from "@/app/Homepage";


export default async function Home() {
    const tokens = await getTokens(await cookies(), {
        apiKey: clientConfig.apiKey,
        cookieName: serverConfig.cookieName,
        cookieSignatureKeys: serverConfig.cookieSignatureKeys,
        serviceAccount: serverConfig.serviceAccount,
    });

    if (!tokens) {
        notFound();
    }

    return <HomePage email={tokens?.decodedToken.email} />;
}