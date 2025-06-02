// import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware, redirectToHome, redirectToLogin } from "next-firebase-auth-edge";
// import { clientConfig, serverConfig } from "@/app/config";
//
// const PUBLIC_PATHS = ['/register', '/login'];
//
// export async function middleware(request: NextRequest) {
//     return authMiddleware(request, {
//         loginPath: "/api/login",
//         logoutPath: "/api/logout",
//         apiKey: clientConfig.apiKey,
//         cookieName: serverConfig.cookieName,
//         cookieSignatureKeys: serverConfig.cookieSignatureKeys,
//         cookieSerializeOptions: serverConfig.cookieSerializeOptions,
//         serviceAccount: serverConfig.serviceAccount,
//         handleValidToken: async ({token, decodedToken}, headers) => {
//             if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
//                 return redirectToHome(request);
//             }
//
//             return NextResponse.next({
//                 request: {
//                     headers
//                 }
//             });
//         },
//         handleInvalidToken: async (reason) => {
//             console.info('Missing or malformed credentials', {reason});
//
//             return redirectToLogin(request, {
//                 path: '/login',
//                 publicPaths: PUBLIC_PATHS
//             });
//         },
//         handleError: async (error) => {
//             console.error('Unhandled authentication error', {error});
//
//             return redirectToLogin(request, {
//                 path: '/login',
//                 publicPaths: PUBLIC_PATHS
//             });
//         }
//     });
// }
//
// export const config = {
//     matcher: [
//         "/",
//         "/((?!_next|api|.*\\.).*)",
//         "/api/login",
//         "/api/logout",
//     ],
// };



import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, redirectToHome, redirectToLogin } from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "@/app/config";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import { app } from "@/firebase";

const PUBLIC_PATHS = ['/register', '/login'];
const PROTECTED_PATHS = {
    admin: ['/dashboard/admin', '/admin'], // Các route chỉ admin có quyền truy cập
    teacher: ['/dashboard/teacher'], // Các route dành cho teacher
    student: ['/dashboard/student'] // Các route dành cho student
};

export async function middleware(request: NextRequest) {
    return authMiddleware(request, {
        loginPath: "/api/login",
        logoutPath: "/api/logout",
        apiKey: clientConfig.apiKey,
        cookieName: serverConfig.cookieName,
        cookieSignatureKeys: serverConfig.cookieSignatureKeys,
        cookieSerializeOptions: serverConfig.cookieSerializeOptions,
        serviceAccount: serverConfig.serviceAccount,
        handleValidToken: async ({token, decodedToken}, headers) => {
            const db = getFirestore(app);
            const userId = decodedToken.uid;

            // Lấy role từ Firestore
            let userRole = 'student';
            try {
                const userDoc = await getDoc(doc(db, "Users", userId));
                if (userDoc.exists()) {
                    userRole = userDoc.data().role || 'student';
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                // Nếu có lỗi khi lấy role, vẫn cho phép truy cập và để client-side xử lý
                return NextResponse.next({ request: { headers } });
            }

            // Thêm role vào headers để client-side có thể sử dụng
            headers.set('x-user-role', userRole);

            // Kiểm tra public paths
            if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
                return redirectToHome(request);
            }

            // Kiểm tra quyền truy cập
            const path = request.nextUrl.pathname;
            let hasAccess = false;

            for (const [role, paths] of Object.entries(PROTECTED_PATHS)) {
                if (paths.some(p => path.startsWith(p))) {
                    hasAccess = userRole === role;
                    break;
                }
            }

            // Nếu không có quyền, chuyển hướng đến 404
            if (!hasAccess && Object.values(PROTECTED_PATHS).flat().some(p => path.startsWith(p))) {
                return NextResponse.rewrite(new URL('/404', request.url));
            }

            return NextResponse.next({ request: { headers } });
        },
        handleInvalidToken: async (reason) => {
            console.info('Missing or malformed credentials', {reason});

            return redirectToLogin(request, {
                path: '/login',
                publicPaths: PUBLIC_PATHS
            });
        },
        handleError: async (error) => {
            console.error('Unhandled authentication error', {error});

            return redirectToLogin(request, {
                path: '/login',
                publicPaths: PUBLIC_PATHS
            });
        }
    });
}

export const config = {
    matcher: [
        "/",
        "/((?!_next|api|.*\\.).*)",
        "/api/login",
        "/api/logout",
    ],
};
//lien quan den phan quyen
