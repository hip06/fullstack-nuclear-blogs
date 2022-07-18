import React, { useEffect, useState, useCallback, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Scrollbars from 'react-custom-scrollbars-2'
import { tagSuggest } from '../../ultils/constant'
import MDEditor from '@uiw/react-md-editor';
import { apiGetSpecialization } from '../../services/appService'
import { apiCreatePost } from '../../services/postService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
// IMPORT COMPONENT
import TagName from '../../components/TagName'
import Button from '../../components/Button'
import SelectForm from '../../components/SelectForm'
import Loading from '../../components/Loading'


const CreatePost = ({ token }) => {
    const [mdContent, setMdContent] = useState('')
    const [tagInput, setTagInput] = useState('')
    const [tags, setTags] = useState(tagSuggest)
    const [title, setTitle] = useState('')
    const [hMd, setHMd] = useState(100) // SET HEIGHT MD EDITOR
    const [options, setOptions] = useState([])
    const [specCode, setSpecCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const mdRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSpecialization = async () => {
            let response = await apiGetSpecialization()
            if (response?.data?.err === 0) setOptions(response?.data?.response)
        }
        const mdEl = mdRef.current?.getBoundingClientRect()
        setHMd(mdEl?.height)
        fetchSpecialization()
    }, [])

    const handleCreateTag = (e) => {
        if (e.keyCode === 13) {
            if (tags.some(tag => tag === tagInput)) {
                toast.warn('Hashtag đã có rồi !')
            } else {
                setTags(prev => [...prev, formatTag(tagInput)])
                setTagInput('')
            }
        }
    }
    const handleClear = useCallback((tag) => {
        let deletedTags = tags.filter(t => t !== tag)
        setTags(deletedTags)
    }, [tags])
    const formatTag = (tag) => {
        return tag.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .split(" ")
            .join("")
    }
    // HANDLE PUBLISH
    const handlePublish = async () => {
        setIsLoading(true)
        let response = await apiCreatePost({ title, tags: JSON.stringify(tags), mdContent, specCode, thumbnailUrl }, token)
        setIsLoading(false)
        if (response?.data.err === 0) {
            setMdContent('')
            setTitle('')
            setThumbnailUrl('')
            setTags(tagSuggest)
            navigate('/')
            toast.success('Create done !')
        } else {
            toast.error(response?.data.msg || 'Có lỗi rồi !')
        }
    }
    return (
        <>
            <div className='p-5 w-full h-full flex flex-col'>
                <div className='flex flex-col items-start justify-center gap-3'>
                    <div className='flex w-full gap-5 justify-between items-center'>
                        <input
                            type="text"
                            id="titleInput"
                            className='flex-3 p-2 rounded-md placeholder:italic placeholder:text-gray-500 placeholder:text-sm outline-none'
                            placeholder='Type title here ...'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}

                        />
                        <div className='flex-1'>
                            <input
                                type="text"
                                id="tagInput"
                                className='flex-1 p-2 rounded-md placeholder:italic placeholder:text-gray-500 placeholder: text-sm w-full outline-none'
                                placeholder='Type hashtag here then enter ...'
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyUp={handleCreateTag}
                            />
                        </div>
                    </div>
                    <div className='flex w-full justify-end items-center gap-5'>
                        <input
                            type="text"
                            id="thumbnailInput"
                            className='p-2 rounded-md placeholder:italic placeholder:text-gray-500 flex-1 placeholder:text-sm'
                            placeholder='Thumbnail url ...'
                            value={thumbnailUrl}
                            onChange={e => setThumbnailUrl(e.target.value)}
                        />
                        <SelectForm type={'môn học'} className='w-56' options={options} value={specCode} setValue={setSpecCode} />
                        <Button text='Publish' bgColor={'bg-[#4D658D]'} handleOnClick={handlePublish} />
                    </div>
                    <div className='flex w-full flex-wrap gap-3 items-center justify-start'>
                        <div>
                            Selected tags:
                        </div>
                        <div className='flex gap-3 flex-wrap'>
                            {tags.length > 0 && tags.map((t, index) => {
                                return (
                                    <TagName tag={t} key={index} clear={handleClear} />
                                )
                            })}

                        </div>
                    </div>
                </div>

                <div className='w-full h-4/5 flex justify-center items-center mt-5'>
                    <div className='w-1/2 h-full'>
                        <div className='w-full h-full rounded-md'>
                            <MDEditor
                                value={mdContent}
                                onChange={(editor) => setMdContent(editor)}
                                height={hMd}
                                preview={'edit'}
                            />

                        </div>
                    </div>
                    <div ref={mdRef} className='w-1/2 h-full p-2 bg-white rounded-md border-l'>
                        <Scrollbars style={{ width: '100%', height: '100%' }}>
                            <ReactMarkdown className='mdContent' children={mdContent} remarkPlugins={[remarkGfm]} />
                        </Scrollbars>
                    </div>
                </div>

            </div>
            {isLoading && <Loading top={'top-[50px]'} />}
        </>
    )
}

export default CreatePost