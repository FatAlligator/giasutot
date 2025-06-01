import {doc, updateDoc, getDoc, getFirestore} from "firebase/firestore";
import { app } from "@/firebase";

const db= getFirestore(app);
export const USER_ROLES = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin"
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Cập nhật role của user (chỉ admin mới được gọi)
export const updateUserRole = async (uid: string, newRole: UserRole) => {

    try {
        await updateDoc(doc(db, "Users", uid), {
            role: newRole,
            roleUpdated: new Date()
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating user role:", error);
        return { success: false, error };
    }
};

// Lấy role của user
export const getUserRole = async (uid: string): Promise<UserRole | null> => {
    try {
        const userDoc = await getDoc(doc(db, "Users", uid));
        if (userDoc.exists()) {
            return userDoc.data().role as UserRole;
        }
        return null;
    } catch (error) {
        console.error("Error getting user role:", error);
        return null;
    }
};
