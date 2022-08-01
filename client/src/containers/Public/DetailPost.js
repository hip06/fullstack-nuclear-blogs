import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import icons from '../../ultils/icons'
import { apiGetPost } from '../../services/postService'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { thumbnailDefault } from '../../ultils/constant'
import TagName from '../../components/TagName'
import Comments from './Comments'
import RelatedPosts from './RelatedPosts'
import { path } from '../../ultils/constant'

const { FaHome } = icons
const DetailPost = ({ token }) => {

    const [breadCrumb, setBreadCrumb] = useState([])
    const [postData, setPostData] = useState(null)
    const navigate = useNavigate()
    const topRef = useRef()
    const { postId } = useParams()
    const searchByTag = useCallback((tag) => {
        navigate(`${path.TAG}/${tag}`)
    }, [])

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                let response = await apiGetPost(postId)
                if (response?.data.err === 0) {
                    setPostData(response.data?.response)
                    setBreadCrumb([
                        {
                            path: '/',
                            value: 'Trang chủ'
                        },
                        {
                            path: `/${path.SPECIAZATION}/${response.data?.response?.specCode.toLowerCase()}`,
                            value: response.data?.response?.specialization.value
                        },
                        {
                            path: `/${path.SPECIAZATION}/${response.data?.response?.specCode.toLowerCase()}/${handleUnicode(response.data?.response?.title)}`,
                            value: response.data?.response?.title
                        },
                    ])
                }
            }
        }
        fetchPost()
        topRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [postId])
    const handleUnicode = title => title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")
    // console.log(postData);
    return (
        <div className='mt-2'>
            <div ref={topRef}></div>
            <div className='max-w-1000 mx-auto p-2 px-4 pr-6 bg-white pb-7'>
                <div className='breadcrumb py-2 flex text-sm'>
                    {breadCrumb && breadCrumb.length > 0 && breadCrumb.map((i, index) => {
                        return (
                            <Link
                                to={i.path}
                                key={i.path}
                                className='text-[blue] flex gap-2 items-center'
                            >
                                {index === 0 ? <FaHome size={15} /> : ''}
                                {index === breadCrumb.length - 1
                                    ? <span className='hover:underline'>{i.value}</span>
                                    : <span>
                                        <span className='hover:underline'>{`${i.value}`}</span>
                                        <span className='text-red'>{' > '}</span>
                                    </span>}
                            </Link>
                        )
                    })}
                </div>
                {postData && <div>
                    <div className='font-bold text-2xl py-3'>{postData.title}</div>
                    <small className='opacity-90'>
                        <span className='opacity-90'>Posted by: </span>
                        <Link className='text-[blue] hover:underline' to={`${path.PROFILE}/${postData.authorId}`}>{`${postData?.author.lastName} ${postData?.author.firstName}`}</Link>
                    </small>
                    <small className='block opacity-90'>{`Ngày đăng bài: ${moment(postData.createdAt).format('DD/MM/YY')} (${moment(postData.createdAt).fromNow()})`}</small>
                    <small className='block opacity-90'>{`Lĩnh vực chuyên môn: ${postData?.specialization.value}`}</small>
                    <div className='w-full h-[300px] my-5'>
                        <img
                            src={postData.thumbnailUrl || thumbnailDefault.REACTOR}
                            alt="thumbnail"
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='pb-7'>
                        <ReactMarkdown className='mdContent' children={postData.mdContent} remarkPlugins={[remarkGfm]} />
                    </div>
                    <div className='flex gap-3 flex-wrap justify-start items-center pb-7'>
                        {JSON.parse(postData.tags) && JSON.parse(postData.tags).length > 0 && JSON.parse(postData.tags).map((item, index) => {
                            return (
                                <div key={index} className='cursor-pointer'>
                                    <TagName handleOnclick={searchByTag} tag={item} />
                                </div>
                            )
                        })}
                    </div>
                    <div className='w-full my-5 '>
                        <RelatedPosts tags={JSON.parse(postData?.tags)} postId={postData && postData.id} />
                    </div>
                    <div className='w-full '>
                        <Comments token={token} postId={postData && postData.id} />
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default DetailPost