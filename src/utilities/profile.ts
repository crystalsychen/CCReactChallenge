import { useAuthState, useIsAdmin } from "./firebase";

export const useProfile = () => {
  const { user } = useAuthState();
  const isAdmin = useIsAdmin();
  
  return [user, isAdmin];
};