import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { path } from '../../ultils/constant'

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

const Specialization = () => {
    let { id } = useParams()
    const { posts } = useSelector(state => state.post)
    const [postsBySpecialization, setPostsBySpecialization] = useState([])
    const navigate = useNavigate()
    // FILTER POSTS BY SPECIALIZATION ID
    useEffect(() => {
        let filteredPosts = posts.filter(post => post.specCode === id.toLocaleUpperCase())
        setPostsBySpecialization(filteredPosts)
    }, [id])

    const handleUnicode = title => title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")

    return (
        <div className='flex w-full justify-start m-auto items-start p-5 pb-0 h-full flex-wrap gap-5 2xl:justify-start'>
            <Masonry
                breakpointCols={breakpointColumnsObject}
                className='flex gap-5'
            >
                {postsBySpecialization && postsBySpecialization.length > 0 && postsBySpecialization.map(post => {
                    return (
                        <div
                            key={post.id}
                            onClick={() => navigate(`${path.SPECIAZATION}/${post.specCode.toLowerCase()}/${handleUnicode(post?.title)}/${post.id}`)}
                            className='mb-5 cursor-pointer'
                        >
                            <Post
                                title={post.title}
                                firstName={post['author.firstName']}
                                lastName={post['author.lastName']}
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

export default Specialization