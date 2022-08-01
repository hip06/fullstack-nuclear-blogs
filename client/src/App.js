import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { path } from './ultils/constant';
import { useSelector } from 'react-redux'
import secureThisComponent from './hoc/secureComponent'
// IMPORT COMPONENT
import { Feed, Login, Home, Specialization, DetailPost, PostsByTag, Profile } from './containers/Public'
import { Manage, ManagePost, ManageCreator, ManageUser, System, CreatePost } from './containers/System'

const App = () => {
    const currentLoggendIn = useSelector(state => state.user.currentLoggendIn)
    const userData = useSelector(state => state.user.userData)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    return (
        <div className='w-screen h-screen' >
            <Routes>
                <Route path={path.HOME} element={<Home currentLoggendIn={currentLoggendIn} userData={userData} isLoggedIn={isLoggedIn} />}>
                    <Route path='*' element={<Feed />} />
                    <Route path={path.SPECIAZATION__ID} element={<Specialization />} />
                    <Route path={path.SPECIAZATION__ID__TITLE__POSTID} element={<DetailPost token={currentLoggendIn && currentLoggendIn.token} />} />
                    <Route path={path.TAG__TAG} element={<PostsByTag />} />
                    <Route path={path.PROFILE__USERID} element={<Profile userData={userData} token={currentLoggendIn && currentLoggendIn.token} />} />
                </Route>
                <Route path={path.LOGIN} element={<Login />} />
                <Route path={path.SYSTEM} element={secureThisComponent(System)}>
                    <Route path='*' element={<Manage />} />
                    <Route path={path.MANAGE_USER} element={<ManageUser />} />
                    <Route path={path.MANAGE_CREATOR} element={<ManageCreator />} />
                    <Route path={path.MANAGE_POST} element={<ManagePost />} />
                    <Route path={path.CREATE_POST} element={<CreatePost token={currentLoggendIn && currentLoggendIn.token} />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App