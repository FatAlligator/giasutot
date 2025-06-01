
// Hook để sử dụng trong component
import { useState, useEffect } from "react";
import {getUserRole, USER_ROLES, UserRole} from "@/app/utils/RoleManagerUtils";
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

export const useUserRole = () => {
    const [user, loading] = useAuthState(getAuth());
    const [role, setRole] = useState<UserRole | null>(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            if (user) {
                const userRole = await getUserRole(user.uid);
                setRole(userRole);
            } else {
                setRole(null);
            }
            setRoleLoading(false);
        };

        fetchRole();
    }, [user]);

    return {
        user,
        role,
        loading: loading || roleLoading,
        isStudent: role === USER_ROLES.STUDENT,
        isTeacher: role === USER_ROLES.TEACHER,
        isAdmin: role === USER_ROLES.ADMIN
    };
};