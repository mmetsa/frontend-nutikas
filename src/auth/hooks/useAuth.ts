// useRole.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from "../../util/UserUtil"
import Auth from "../auth-service"

const useRole = (requiredRoles: (Role | null)[] | Role): boolean => {
	const navigate = useNavigate();
	const authService = Auth.getInstance();
	const isAuthenticated = authService.isAuthenticated();
	const userRole = authService.getRole();
	
	const hasRequiredRole = Array.isArray(requiredRoles)
		? requiredRoles.includes(userRole)
		: userRole === requiredRoles;
	
	useEffect(() => {
		if (!isAuthenticated || !hasRequiredRole) {
			navigate('/login');
		}
	}, [isAuthenticated, hasRequiredRole, navigate]);
	
	return isAuthenticated && hasRequiredRole;
};

export default useRole;
