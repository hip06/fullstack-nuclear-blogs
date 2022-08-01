import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { path } from '../../ultils/constant'
// IMPORT COMPONENT
import Post from './Post'
import TagName from '../../components/TagName'
const breakpointColumnsObject = {
    3000: 5,
    2000: 4,
    1500: 3,
    1300: 2,
    900: 1,
    768: 2,
    650: 1
};


const PostsByTag = () => {
    let { tag } = useParams()
    const { posts } = useSelector(state => state.post)
    const [postsByTag, setPostsByTag] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let filteredPosts = posts.filter(post => JSON.parse(post.tags).some(t => t === tag))
        setPostsByTag(filteredPosts)
    }, [tag])

    const handleUnicode = title => title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")

    return (
        <div className='flex flex-col w-full justify-start m-auto items-start p-5 pb-0 h-full gap-7'>
            <h2 className='flex justify-start items-center gap-2 text-xl font-semibold bg-white rounded-md p-5 shadow-md'>
                {`Những bài viết có hashtag: `}
                <TagName tag={tag} />
            </h2>
            <div className='flex w-full flex-wrap gap-5 2xl:justify-start'>
                <Masonry
                    breakpointCols={breakpointColumnsObject}
                    className='flex gap-5 w-full'
                >
                    {postsByTag && postsByTag.length > 0 && postsByTag.map(post => {
                        return (
                            <div
                                key={post.id}
                                onClick={() => navigate(`/${path.SPECIALIZATION}/${post.specCode.toLowerCase()}/${handleUnicode(post?.title)}/${post.id}`)}
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
        </div>
    )
}

export default PostsByTag