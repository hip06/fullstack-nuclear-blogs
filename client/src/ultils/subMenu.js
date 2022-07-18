export default [
    { path: 'profile/', dynamic: 'userData?.id', text: 'Thông tin cá nhân', condition: true },
    { path: '/system/setting-authentication', dynamic: '', text: 'Bảo mật', condition: true },
    { path: '/system/admin', dynamic: '', text: 'Quản trị Admin', condition: 'userData?.roleCode === "ADMIN"' },
    { path: '/system/creator', dynamic: '', text: 'Quản trị Creator', condition: 'userData?.roleCode === "CRE"' },

]