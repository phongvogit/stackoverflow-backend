export const isAuthenticated = () => {
	const token = localStorage.getItem('token');
	const expiresAt = localStorage.getItem('expiresAt');
	const userInfo = localStorage.getItem('userInfo');

	if (!token || !expiresAt || !userInfo) {
		return false;
	}
	return new Date().getTime() / 1000 < expiresAt;
};
