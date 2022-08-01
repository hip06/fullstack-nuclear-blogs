import React, { useState, useCallback, memo } from 'react'
import TagName from '../../components/TagName'
import { thumbnailDefault } from '../../ultils/constant'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { path } from '../../ultils/constant'

const Post = ({ title, firstName, lastName, tags, mdContent, thumbnail, createdAt }) => {
    const [isHoverThumbnail, setIsHoverThumbnail] = useState(false)
    const navigate = useNavigate()
    const searchByTag = useCallback((tag) => {
        navigate(`${path.TAG}/${tag}`)
    }, [])
    return (
        <div className='bg-white flex flex-col justify-center items-start shadow-md rounded-md w-full'>
            <div className='h-48 relative w-full overflow-hidden rounded-t-md'>
                <img
                    src={thumbnail || thumbnailDefault.REACTOR}
                    alt="thumbnail"
                    className={isHoverThumbnail ? 'w-full h-full object-cover animate-scale-image rounded-t-md' : 'w-full h-full object-cover rounded-t-md'}
                    onMouseEnter={() => setIsHoverThumbnail(true)}
                    onMouseLeave={() => setIsHoverThumbnail(false)}
                />
                {isHoverThumbnail && <div
                    onMouseEnter={() => setIsHoverThumbnail(true)}
                    onMouseLeave={() => setIsHoverThumbnail(false)}
                    className='absolute top-0 left-0 right-0 h-48 bg-blackOverlay2 rounded-t-md'
                ></div>}
            </div>
            <div className='flex-1 flex flex-col gap-2 p-2'>
                <div className='text-lg font-bold'>
                    {title}
                </div>
                <small className='text-sm opacity-80 italic'>{`Posted by: ${lastName} ${firstName}`}</small>
                <small className='text-sm opacity-80 italic'>{`Ngày đăng bài: ${moment(createdAt).format('DD/MM/YYYY')} (${moment(createdAt).fromNow()})`}</small>
                <p className='text-sm text-justify w-full'>{mdContent.slice(0, 100) + ' ...'}</p>
                <div className='flex gap-2 justify-start items-center flex-wrap '>
                    {tags && tags.length > 0 && tags.map((item, index) => {
                        return (
                            <TagName handleOnclick={searchByTag} tag={item} key={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}//

export default memo(Post)