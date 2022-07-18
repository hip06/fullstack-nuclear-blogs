import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
export default (Component) => {
    const user = useSelector(state => state.user)
    if (user?.isLoggedIn) {
        return <Component user={user} />
    } else {
        return <Navigate to={'/login'} replace={true} />
    }
}
