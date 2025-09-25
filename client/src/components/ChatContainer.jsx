import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMassageTime } from '../lib/util';

export const ChatContainer = ({ SelectedUser, setSelectedUser }) => {

    const scrollEnd = useRef();
    useEffect(() => {
        if (scrollEnd.current) {
            scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [])

    return SelectedUser ? (
        <div className='h-full relative overflow-scroll backdrop-blur-lg'>
            <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
                <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="info icon" className='md:hidden max-w-7' />
                <img src={assets.profile_martin} alt="user profile image" className='w-8 rounded-full' />
                <p className='flex-1 text-lg text-white flex items-center gap-2'>
                    Martin Johnson
                    <span className='w-2 h-2 rounded-full bg-green-500 items-center'></span>
                </p>
                <img src={assets.help_icon} alt="" className='max-m:hidden max-w-5' />
            </div>

            {/* masseage container */}
            <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
                {messagesDummyData.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 justify-end  ${msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'} `}>
                        {msg.image ? (
                            <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8 ' />
                        ) : (
                            <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-1g mb-8 rounded-2xl break-all bg-violet-500/30 text-white ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
                        )}

                        {/* chat proflile image */}
                        <div className='text-center text-xs'>
                            <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} alt="" className='w-7 rounded-full' />
                            {/* masseage time */}
                            <p className='text-gray-500'>{formatMassageTime(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}
                <div ref={scrollEnd}></div>
            </div>

            {/* chat container input area */}
            <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
                <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full' >
                    <input type="text" placeholder="Send a message"
                        className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'/>
                    <input type="file" id="image" accept='image/png, image/jpeg' hidden />
                    <label htmlFor="image">
                        <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer"/>
                    </label>
                </div>
                <img src={assets.send_button} alt="" className="w-7 cursor-pointer" />
            </div>
        </div>
    ) : (
        <div className='flex flex-col justify-center items-center h-full gap-2 text-gray-500 bg-white/10 max-md:hidden rounded-r-xl'>
            <img src={assets.logo_icon} alt="app logo" className='max-w-30' />
            <p className='text-2xl font-medium text-white'>Chat anywhere, anytime</p>
        </div>
    )
}

export default ChatContainer