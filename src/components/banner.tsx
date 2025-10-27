import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

type BannerProps = {
    title: string;
}
const Banner = ({title}: BannerProps) => {
    const { user } = useAuthState();
    return (
        <header className="relative flex items-center justify-between py-4 px-6">
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold">{title}</h1>

            <div className="ml-auto p-2 flex gap-4 items-center">
                <span className="text-xl text-blue-400">
                    Welcome, { user ? user.displayName : 'guest' }!
                </span>
            {
                user
                ? <button type="button" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition" onClick={signOut}>Sign Out</button>
                : <button type="button" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition" onClick={signInWithGoogle}>Sign In</button>
            }
            </div>

      </header>
      )
}
export default Banner