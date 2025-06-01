// "use client";
// import { FormEvent, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
// import { app } from "@/firebase";
//
// export default function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const router = useRouter();
//
//     async function handleSubmit(event: FormEvent) {
//         event.preventDefault();
//         setError("");
//
//         try {
//             const credential = await signInWithEmailAndPassword(
//                 getAuth(app),
//                 email,
//                 password
//             );
//             const idToken = await credential.user.getIdToken();
//
//             await fetch("/api/login", {
//                 headers: {
//                     Authorization: `Bearer ${idToken}`,
//                 },
//             });
//
//             router.push("/");
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
//                         Speak thy secret word!
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
//                             Enter
//                         </button>
//                         <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                             Don&apos;t have an account?{" "}
//                             <Link
//                                 href="/register"
//                                 className="font-medium text-gray-600 hover:underline dark:text-gray-500"
//                             >
//                                 Register here
//                             </Link>
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </main>
//     );
// }






"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app } from "@/firebase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetMessage, setResetMessage] = useState("");
    const [resetError, setResetError] = useState("");
    const [resetLoading, setResetLoading] = useState(false);
    const router = useRouter();

    const auth = getAuth(app);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);

            // Check if email is verified
            if (!credential.user.emailVerified) {
                setError("Please verify your email before logging in. Check your inbox for the verification link.");
                setLoading(false);
                return;
            }

            const idToken = await credential.user.getIdToken();

            await fetch("/api/login", {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            router.push("/");
        } catch (e) {
            console.error("Login error:", e);
            const errorMessage = (e as Error).message;

            // Customize error messages
            if (errorMessage.includes("user-not-found")) {
                setError("No account found with this email address.");
            } else if (errorMessage.includes("wrong-password")) {
                setError("Incorrect password. Please try again.");
            } else if (errorMessage.includes("invalid-email")) {
                setError("Please enter a valid email address.");
            } else if (errorMessage.includes("too-many-requests")) {
                setError("Too many failed attempts. Please try again later.");
            } else {
                setError("Login failed. Please check your credentials and try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleForgotPassword(event: FormEvent) {
        event.preventDefault();
        setResetError("");
        setResetMessage("");
        setResetLoading(true);

        if (!resetEmail) {
            setResetError("Please enter your email address.");
            setResetLoading(false);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setResetMessage(`Password reset email sent to ${resetEmail}. Please check your inbox and follow the instructions.`);
            // Optionally, reset the form after a delay
            setTimeout(() => {
                setShowForgotPassword(false);
                setResetEmail("");
                setResetMessage("");
            }, 3000);
        } catch (e) {
            console.error("Password reset error:", e);
            const errorMessage = (e as Error).message;

            if (errorMessage.includes("user-not-found")) {
                setResetError("No account found with this email address.");
            } else if (errorMessage.includes("invalid-email")) {
                setResetError("Please enter a valid email address.");
            } else {
                setResetError("Failed to send reset email. Please try again.");
            }
        } finally {
            setResetLoading(false);
        }
    }

    // Forgot Password Modal/Form
    if (showForgotPassword) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-8">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Reset Your Password
                        </h1>

                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>Enter your email address and we'll send you a link to reset your password.</p>
                        </div>

                        <form onSubmit={handleForgotPassword} className="space-y-4 md:space-y-6">
                            <div>
                                <label
                                    htmlFor="reset-email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="reset-email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    id="reset-email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                    disabled={resetLoading}
                                />
                            </div>

                            {resetMessage && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                    <p className="text-sm">{resetMessage}</p>
                                </div>
                            )}

                            {resetError && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    <p className="text-sm">{resetError}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <button
                                    type="submit"
                                    disabled={resetLoading}
                                    className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                                        resetLoading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
                                    }`}
                                >
                                    {resetLoading ? "Sending..." : "Send Reset Email"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForgotPassword(false);
                                        setResetEmail("");
                                        setResetMessage("");
                                        setResetError("");
                                    }}
                                    className="w-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 text-sm underline"
                                >
                                    Back to Login
                                </button>
                            </div>
                        </form>
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
                        Speak thy secret word!
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

                        <div className="flex items-center justify-between">
                            <div></div>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                            >
                                Forgot password?
                            </button>
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
                                    : 'bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300'
                            }`}
                        >
                            {loading ? "Signing in..." : "Enter"}
                        </button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="font-medium text-gray-600 hover:underline dark:text-gray-500"
                            >
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}