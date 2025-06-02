"use client";
import { useUserRole } from "@/app/utils/UserRole";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const { role, isAdmin, loading } = useUserRole();
    const [serverRole, setServerRole] = useState<string | null>(null);
    const router = useRouter();

    // Lấy role từ server-side (headers)
    useEffect(() => {
        fetch('/api/check-role')
            .then(res => res.json())
            .then(data => setServerRole(data.role))
            .catch(() => setServerRole(null));
    }, []);

    // Chỉ redirect nếu cả server và client đều xác nhận không có quyền
    useEffect(() => {
        if (!loading && serverRole !== null) {
            const hasAccess = isAdmin || serverRole === 'admin';
            if (!hasAccess) {
                router.replace('/404');
            }
        }
    }, [loading, isAdmin, serverRole, router]);

    if (loading || serverRole === null) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl caret-black font-semibold mb-2">User Management</h2>
                    <p>Manage all users in the system</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl caret-black font-semibold mb-2">System Settings</h2>
                    <p>Configure system settings</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl caret-black font-semibold mb-2">Reports</h2>
                    <p>View system reports</p>
                </div>
            </div>
        </div>
    );
}