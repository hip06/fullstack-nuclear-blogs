import React, { useState, useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { path } from '../../ultils/constant'
// IMPORT COMPONENT
import Post from './Post'
const breakpointColumnsObject = {
    3000: 4,
    2000: 3,
    1500: 2,
    1300: 2,
    950: 1,
    768: 2,
    650: 1
};


const RelatedPosts = ({ tags, postId }) => {
    const posts = useSelector(state => state.post.posts)
    const [relatedPosts, setRelatedPosts] = useState([])
    const navigate = useNavigate()
    // FILTER RELATED POSTS WHEN POSTID CHANGED
    useEffect(() => {
        let postsEdited = posts?.map((post) => {
            return { ...post, tags: JSON.parse(post.tags) }
        })
        let result = postsEdited.map(post => {
            if (post.tags?.some(tag => tags.indexOf(tag) > -1)) return post
        })
        setRelatedPosts(result.filter(i => i !== undefined).filter(i => i.id !== postId));
    }, [postId])
    // FORMAT TO WORD SLASH WORD (w-w)
    const handleUnicode = title => title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")
    return (
        <div className='w-full'>
            <h3 className='font-bold'>Có thể bạn quan tâm</h3>
            <div className='flex w-full justify-start m-auto items-start p-5 pb-0 h-full flex-wrap gap-5 2xl:justify-start'>
                <Masonry
                    breakpointCols={breakpointColumnsObject}
                    className='flex gap-5'
                >
                    {relatedPosts && relatedPosts.length > 0 && relatedPosts.map(post => {
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
                                    tags={post.tags}
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

export default memo(RelatedPosts)