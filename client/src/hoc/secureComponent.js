import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
import { path } from "../ultils/constant"
export default (Component) => {
    const user = useSelector(state => state.user)
    if (user?.isLoggedIn) {
        return <Component user={user} />
    } else {
        return <Navigate to={path.LOGIN} replace={true} />
    }
}
