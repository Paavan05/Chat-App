import { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMassageTime } from '../lib/util';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContex';
import toast from 'react-hot-toast';
import { EllipsisVertical, Images } from 'lucide-react';

export const ChatContainer = () => {

    const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
    const { authUser, onlineUsers, axios } = useContext(AuthContext)

    const scrollEnd = useRef();

    const [input, setInput] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    
    // Handle sending a message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === "") return null

        await sendMessage({text: input.trim()});
        setInput("");
    }

    // Handle sending an image
    const handleSendImage = async (e) => {
        const file = e.target.files[0];
        if(!file || !file.type.startsWith("image/")) {
            toast.error("Select an Image file");
            return;
        }
        const reader = new FileReader();

        reader.onloadend = async () => {
            await sendMessage({image: reader.result})
            e.target.value = "";
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id);
        }
    },[selectedUser])

    useEffect(() => {
        if (scrollEnd.current &&  messages) {
            scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    // close mobile header menu on outside click / escape
    useEffect(() => {
        const handleOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        };
        const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
        document.addEventListener('mousedown', handleOutside);
        document.addEventListener('touchstart', handleOutside);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
            document.removeEventListener('touchstart', handleOutside);
            document.removeEventListener('keydown', handleKey);
        };
    }, []);

    return selectedUser ? (
        <div className='h-full flex flex-col overflow-hidden backdrop-blur-lg'>
            <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500 shrink-0'>
                <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="info icon" className='md:hidden max-w-7' />
                <img src={ selectedUser?.profilePic || assets.avatar_icon} alt="user profile image" className='w-8 rounded-full' />
                <p className='flex-1 text-lg dark:text-white text-black flex items-center gap-2'>
                    {selectedUser.fullName}
                    {onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-green-500 items-center'></span>}
                </p>
                <div ref={menuRef} className='relative md:hidden'>
                    <EllipsisVertical  className='max-h-5 text-black dark:text-white cursor-pointer' onClick={() => setMenuOpen(prev => !prev)} />
                    {menuOpen && (
                        <div className='absolute right-0 top-full z-20 w-36 p-3 rounded-md border border-gray-600 text-gray-100 bg-[#282142]'>
                            <button
                                onClick={async()=>{
                                    try {
                                        await axios.delete(`/api/friends/remove/${selectedUser._id}`);
                                        setMenuOpen(false);
                                        setSelectedUser(null);
                                    } catch(e) {}
                                }}
                                className='w-full text-left text-sm bg-red-600 hover:bg-red-700 rounded px-3 py-1'>
                                Remove Friend
                            </button>
                        </div>
                    )}
                </div>
                {/* <img src={assets.help_icon} alt="" className='max-m:hidden max-w-5' /> */}
            </div>

            {/* masseage container */}
            <div className='flex-1 overflow-y-auto p-3 pb-6'>
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 justify-end  ${msg.senderId !== authUser._id && 'flex-row-reverse'} `}>
                        {msg.image ? (
                            <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8 ' />
                        ) : (
                            <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-1g mb-8 rounded-2xl break-all bg-violet-500/30 text-white ${msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
                        )}

                        {/* chat proflile image */}
                        <div className='text-center text-xs'>
                            <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-7 rounded-full' />
                            {/* masseage time */}
                            <p className='text-gray-500'>{formatMassageTime(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}
                <div ref={scrollEnd}></div>
            </div>

            {/* chat container input area */}
            <div className='flex items-center gap-3 p-3 shrink-0'>
                <div className='flex-1 flex items-center bg-gray-200 px-3 rounded-full' >
                    <input onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null } type="text" placeholder="Send a message"
                        className='flex-1 text-sm p-3 border-none rounded-lg outline-none dark:text-black font-medium text-gray-300 placeholder-gray-900 dark:placeholder-gray-600'/>
                    <input onChange={handleSendImage} type="file" id="image" accept='image/png, image/jpeg' hidden />
                    <label htmlFor="image">
                        {/* <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer"/> */}
                        <Images className="w-5 mr-2 cursor-pointer dark:text-black "/>
                    </label>
                </div>
                <img onClick={handleSendMessage} src={assets.send_button} alt="" className="w-7 cursor-pointer" />
            </div>
        </div>
    ) : (
        <div className='flex flex-col justify-center items-center h-full gap-2 text-gray-500 bg-white/10 max-md:hidden rounded-r-xl'>
            <img src={assets.logo_icon} alt="app logo" className='max-w-30' />
            <p className='text-2xl font-medium dark:text-white text-black'>Chat anywhere, anytime</p>
        </div>
    )
}

export default ChatContainer