import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { path } from './ultils/constant';
import { useSelector } from 'react-redux'
import secureThisComponent from './hoc/secureComponent'
// IMPORT COMPONENT
import { Feed, Login, Home, Specialization, DetailPost, PostsByTag, Profile, LoginSucess } from './containers/Public'
import { Manage, ManagePost, ManageCreator, ManageUser, System, CreatePost } from './containers/System'

const App = () => {
    const token = useSelector(state => state.user.token)
    const userData = useSelector(state => state.user.userData)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    return (
        <div className='w-screen h-screen' >
            <Routes>
                <Route path={path.HOME} element={<Home token={token} userData={userData} isLoggedIn={isLoggedIn} />}>
                    <Route path='*' element={<Feed />} />
                    <Route path={path.SPECIAZATION__ID} element={<Specialization />} />
                    <Route path={path.SPECIAZATION__ID__TITLE__POSTID} element={<DetailPost token={token} />} />
                    <Route path={path.TAG__TAG} element={<PostsByTag />} />
                    <Route path={path.PROFILE__USERID} element={<Profile userData={userData} token={token} />} />
                </Route>
                <Route path={path.LOGIN} element={<Login />} />
                <Route path={path.LOGIN_SUCCESS__USERID} element={<LoginSucess />} />
                <Route path={path.SYSTEM} element={secureThisComponent(System)}>
                    <Route path='*' element={<Manage userData={userData} token={token} />} />
                    <Route path={path.MANAGE_USER} element={<ManageUser token={token} />} />
                    <Route path={path.MANAGE_CREATOR} element={<ManageCreator />} />
                    <Route path={path.MANAGE_POST} element={<ManagePost />} />
                    <Route path={path.CREATE_POST} element={<CreatePost token={token} />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App