import { useAppSelector } from "hooks";

export const useAuth = () => {
   const id = useAppSelector(state => state.auth.user.id);
   return !!id;
}