// "use client";
//
// import { FormEvent, useState } from "react";
// import Link from "next/link";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { app } from "../../firebase";
// import { useRouter } from "next/navigation";
// import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
//
// export default function Register() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmation, setConfirmation] = useState("");
//     const [error, setError] = useState("");
//     const router = useRouter();
//
//     async function handleSubmit(event: FormEvent) {
//         event.preventDefault();
//
//         setError("");
//
//         if (password !== confirmation) {
//             setError("Passwords don't match");
//             return;
//         }
//
//         try {
//             await createUserWithEmailAndPassword(getAuth(app), email, password);
//             router.push("/login");
//         } catch (e) {
//             setError((e as Error).message);
//         }
//     }
//
//     return (
//         <main className="flex min-h-screen flex-col items-center justify-center p-8">
//             <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                 <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                     <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                         Pray tell, who be this gallant soul seeking entry to mine humble
//                         abode?
//                     </h1>
//                     <form
//                         onSubmit={handleSubmit}
//                         className="space-y-4 md:space-y-6"
//                         action="#"
//                     >
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                                 Your email
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 id="email"
//                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                 placeholder="name@company.com"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 id="password"
//                                 placeholder="••••••••"
//                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="confirm-password"
//                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                                 Confirm password
//                             </label>
//                             <input
//                                 type="password"
//                                 name="confirm-password"
//                                 value={confirmation}
//                                 onChange={(e) => setConfirmation(e.target.value)}
//                                 id="confirm-password"
//                                 placeholder="••••••••"
//                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                 required
//                             />
//                         </div>
//                         {error && (
//                             <div
//                                 className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//                                 role="alert"
//                             >
//                                 <span className="block sm:inline">{error}</span>
//                             </div>
//                         )}
//                         <button
//                             type="submit"
//                             className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
//                         >
//                             Create an account
//                         </button>
//                         <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                             Already have an account?{" "}
//                             <Link
//                                 href="/login"
//                                 className="font-medium text-gray-600 hover:underline dark:text-gray-500"
//                             >
//                                 Login here
//                             </Link>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </main>
//     );
// }
//default khi chưa phân quyền, giống bên dưới nhưng không lưu vào firestore


// "use client";
// import { FormEvent, useState } from "react";
// import Link from "next/link";
// import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged} from "firebase/auth";
// import { app } from "@/firebase";
// import { useRouter } from "next/navigation";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
//
// export default function Register() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmation, setConfirmation] = useState("");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [emailSent, setEmailSent] = useState(false);//for verification
//     const [message, setMessage] = useState("");//for verification
//     const router = useRouter();
//
//     const auth = getAuth(app);
//     const db = getFirestore(app);
//
//     async function handleSubmit(event: FormEvent) {
//         event.preventDefault();
//         setError("");
//         setLoading(true);
//
//         if (password !== confirmation) {
//             setError("Passwords don't match");
//             setLoading(false);
//             return;
//         }
//
//         try {
//             // Tạo user trong Authentication
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;
//
//
//             // Lưu thông tin user vào Firestore collection "Users"
//             await setDoc(doc(db, "Users", user.uid), {
//                 email: user.email,
//                 role: "student", // Role mặc định
//                 created: new Date(),
//                 uid: user.uid
//             });
//
//             console.log("User created successfully with UID:", user.uid);
//
//             // Chuyển hướng đến trang login
//             router.push("/login");
//
//         } catch (e) {
//             console.error("Registration error:", e);
//             setError((e as Error).message);
//         } finally {
//             setLoading(false);
//         }
//     }
//
//     return (
//         <main className="flex min-h-screen flex-col items-center justify-center p-8">
//             <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                 <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                     <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                         Pray tell, who be this gallant soul seeking entry to mine humble
//                         abode?
//                     </h1>
//                     <form
//                         onSubmit={handleSubmit}
//                         className="space-y-4 md:space-y-6"
//                         action="#"
//                     >
//                         <div>
//                             <label
//                                 htmlFor="email"
//                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                                 Your email
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 id="email"
//                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                 placeholder="name@company.com"
//                                 required
//                                 disabled={loading}
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 id="password"
//                                 placeholder="••••••••"
//                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                 required
//                                 disabled={loading}
//                             />
//                         </div>
//                         <div>
//                             <label
//                                 htmlFor="confirm-password"
//                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                             >
//                                 Confirm password
//                             </label>
//                             <input
//                                 type="password"
//                                 name="confirm-password"
//                                 value={confirmation}
//                                 onChange={(e) => setConfirmation(e.target.value)}
//                                 id="confirm-password"
//                                 placeholder="••••••••"
//                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                 required
//                                 disabled={loading}
//                             />
//                         </div>
//                         {error && (
//                             <div
//                                 className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//                                 role="alert"
//                             >
//                                 <span className="block sm:inline">{error}</span>
//                             </div>
//                         )}
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
//                                 loading
//                                     ? 'bg-gray-400 cursor-not-allowed'
//                                     : 'bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800'
//                             }`}
//                         >
//                             {loading ? "Creating account..." : "Create an account"}
//                         </button>
//                         <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                             Already have an account?{" "}
//                             <Link
//                                 href="/login"
//                                 className="font-medium text-gray-600 hover:underline dark:text-gray-500"
//                             >
//                                 Login here
//                             </Link>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </main>
//     );
// }



//đã phân quyen nhưng chua verify


"use client";
import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged} from "firebase/auth";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);//for verification
    const [message, setMessage] = useState("");//for verification
    const [isVerified, setIsVerified] = useState(false);
    const router = useRouter();

    const auth = getAuth(app);
    const db = getFirestore(app);

    // Polling để check verification status
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (emailSent && !isVerified) {
            intervalId = setInterval(async () => {
                const user = auth.currentUser;
                if (user) {
                    // Reload user để lấy trạng thái emailVerified mới nhất
                    await user.reload();

                    if (user.emailVerified) {
                        setIsVerified(true);
                        setMessage("Email verified successfully! Redirecting to login...");

                        // Cập nhật trạng thái trong Firestore
                        try {
                            await setDoc(doc(db, "Users", user.uid), {
                                emailVerified: true
                            }, { merge: true });
                        } catch (error) {
                            console.error("Error updating verification status:", error);
                        }

                        // Clear interval
                        clearInterval(intervalId);

                        // Chờ 2 giây rồi chuyển hướng
                        setTimeout(() => {
                            router.push("/login");
                        }, 2000);
                    }
                }
            }, 3000); // Check mỗi 3 giây
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [emailSent, isVerified, auth, router, db]);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setError("");
        setLoading(true);

        if (password !== confirmation) {
            setError("Passwords don't match");
            setLoading(false);
            return;
        }

        try {
            // Tạo user trong Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            //verify
            await sendEmailVerification(user);
            setEmailSent(true);
            setMessage("Email verification has been sent! Please check your email and click the verification link.");

            // Lưu thông tin user vào Firestore collection "Users"
            await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                role: "student", // Role mặc định
                created: new Date(),
                uid: user.uid,
                emailVerified: false // Thêm trường theo dõi verification
            });

            console.log("User created successfully with UID:", user.uid);

        } catch (e) {
            console.error("Registration error:", e);
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    }

    // Function để gửi lại email verification
    async function resendVerification() {
        if (auth.currentUser) {
            setLoading(true);
            try {
                await sendEmailVerification(auth.currentUser);
                setMessage("Verification email sent again! Please check your email.");
                setError("");
            } catch (error) {
                setError("Failed to resend verification email. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    }

    // Function để manually check verification
    async function checkVerificationStatus() {
        const user = auth.currentUser;
        if (user) {
            setLoading(true);
            try {
                await user.reload();
                if (user.emailVerified) {
                    setIsVerified(true);
                    setMessage("Email verified successfully! Redirecting to login...");

                    // Cập nhật trạng thái trong Firestore
                    await setDoc(doc(db, "Users", user.uid), {
                        emailVerified: true
                    }, { merge: true });

                    // Chờ 2 giây rồi chuyển hướng
                    setTimeout(() => {
                        router.push("/login");
                    }, 2000);
                } else {
                    setError("Email not verified yet. Please check your email and try again.");
                }
            } catch (error) {
                console.error("Error checking verification:", error);
                setError("Error checking verification status. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    }

    // Nếu đã gửi email verification, hiển thị UI chờ verification
    if (emailSent && !isVerified) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-8">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Email Verification Required
                        </h1>

                        <div className="space-y-4">
                            {message && (
                                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                                    <p>{message}</p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <p>We've sent a verification email to:</p>
                                <p className="font-semibold">{email}</p>
                            </div>

                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                <p>Please check your email and click the verification link.</p>
                                <p>After clicking the link, come back and click "I've verified my email" below.</p>
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={checkVerificationStatus}
                                    disabled={loading}
                                    className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                                        loading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
                                    }`}
                                >
                                    {loading ? "Checking..." : "I've verified my email"}
                                </button>

                                <button
                                    onClick={resendVerification}
                                    disabled={loading}
                                    className={`w-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 text-sm underline ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    Resend verification email
                                </button>
                            </div>

                            <div className="pt-4">
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:underline dark:text-gray-400 text-sm"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Nếu đã verified, hiển thị success message
    if (isVerified) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-8">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Email Verified Successfully!
                        </h1>

                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            <p>Your email has been verified. Redirecting to login...</p>
                        </div>

                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Pray tell, who be this gallant soul seeking entry to mine humble
                        abode?
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 md:space-y-6"
                        action="#"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Confirm password
                            </label>
                            <input
                                type="password"
                                name="confirm-password"
                                value={confirmation}
                                onChange={(e) => setConfirmation(e.target.value)}
                                id="confirm-password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                disabled={loading}
                            />
                        </div>
                        {error && (
                            <div
                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                role="alert"
                            >
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                                loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800'
                            }`}
                        >
                            {loading ? "Creating account..." : "Create an account"}
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-medium text-gray-600 hover:underline dark:text-gray-500"
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}