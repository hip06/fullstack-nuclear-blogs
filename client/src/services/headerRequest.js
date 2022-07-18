let authHeader = () => {
    let user = JSON.parse(JSON.parse(localStorage.getItem('persist:user'))?.currentLoggendIn)
    if (user && user.token) {
        return { "access-token": user.token }
    } else {
        return {}
    }
}
export default authHeader