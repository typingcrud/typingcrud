import { useAppSelector } from 'state'

export const useSignIn = () => useAppSelector(state => state.auth.isSignIn)
