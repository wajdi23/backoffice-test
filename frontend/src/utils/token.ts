import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: number;
}

export const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};
