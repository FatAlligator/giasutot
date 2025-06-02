// app/api/check-role/route.ts
import { NextResponse } from "next/server";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase";

export async function GET() {
    const tokens = await getTokens( await cookies(), {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
        cookieName: process.env.AUTH_COOKIE_NAME!,
        cookieSignatureKeys: [
            process.env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT!,
            process.env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS!,
        ],
        serviceAccount: {
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
            privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n")!,
        },
    });

    if (!tokens) {
        return NextResponse.json({ role: null }, { status: 401 });
    }

    const db = getFirestore(app);
    const userDoc = await getDoc(doc(db, "Users", tokens.decodedToken.uid));
    const role = userDoc.exists() ? userDoc.data().role : null;

    return NextResponse.json({ role });
}