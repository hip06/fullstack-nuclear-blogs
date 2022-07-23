import React, { useEffect } from 'react'
import * as actions from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Masonry from 'react-masonry-css'

// IMPORT COMPONENT
import Post from './Post'

const breakpointColumnsObject = {
    3000: 5,
    2000: 4,
    1500: 3,
    1300: 2,
    900: 1,
    768: 2,
    650: 1
};
const Feed = () => {
    const { posts } = useSelector(state => state.post)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(actions.getAllPost())
    }, [dispatch])

    const handleUnicode = title => title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")

    return (
        <div className='flex w-full justify-start m-auto items-start p-5 pr-7 pb-0 h-full flex-wrap gap-5 2xl:justify-start'>
            <Masonry
                breakpointCols={breakpointColumnsObject}
                className='flex gap-5'
            >
                {posts && posts.length > 0 && posts.map(post => {
                    return (
                        <div
                            key={post.id}
                            onClick={() => navigate(`specialization/${post.specCode.toLowerCase()}/${handleUnicode(post?.title)}/${post.id}`)}
                            className='mb-5 cursor-pointer'
                        >
                            <Post
                                title={post.title}
                                firstName={post?.author.firstName}
                                lastName={post?.author.lastName}
                                tags={JSON.parse(post.tags)}
                                mdContent={post.mdContent}
                                thumbnail={post.thumbnailUrl}
                                createdAt={post.createdAt}
                            />
                        </div>
                    )
                })}
            </Masonry>
        </div>
    )
}

export default Feed