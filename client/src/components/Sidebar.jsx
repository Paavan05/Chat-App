import React, { useContext, useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast';
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContex';
import { ChatContext } from '../../context/ChatContext';
import { EllipsisVertical, MessageCircleMore, Moon, Search, Sun } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

const Sidebar = () => {

    const { getUsers, users, SelectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);
    const { axios } = useContext(AuthContext);

    const { logout, onlineUsers } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const [input, setInput] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [friendModal, setFriendModal] = useState(false)
    const [searchEmail, setSearchEmail] = useState("")
    const [searchResult, setSearchResult] = useState(null)
    const [pending, setPending] = useState([])
    const menuRef = useRef(null)

    const navigate = useNavigate();

    const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users

    useEffect(()=>{
        getUsers();

    },[onlineUsers])

    // fetch pending when modal opens
    useEffect(() => {
        const run = async () => {
            if (!friendModal) return;
            try {
                const { data } = await axios.get('/api/friends/pending');
                if (data.success) setPending(data.pending || [])
                else toast.error(data.message || 'Unable to load pending requests');
            } catch (e) {
                toast.error(e.response?.data?.message || e.message);
            }
        };
        run();
    }, [friendModal])

    // close menu when clicking outside or pressing Escape 
    useEffect(() => {
        const handleOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }

        const handleKey = (e) => {
            if (e.key === 'Escape') setMenuOpen(false)
        }

        document.addEventListener('mousedown', handleOutside)
        document.addEventListener('touchstart', handleOutside)
        document.addEventListener('keydown', handleKey)

        return () => {
            document.removeEventListener('mousedown', handleOutside)
            document.removeEventListener('touchstart', handleOutside)
            document.removeEventListener('keydown', handleKey)
        }
    }, [])

    return (<>
        <div className={`relative bg-white dark:bg-[#131326] h-full p-5 rounded-l-xl overflow-x-hidden overflow-y-auto text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-800 transition-colors ${SelectedUser ? "max-md:hidden" : ''}`}>
            <div className='pb-5'>
                <div className='flex justify-between items-center'>
                    {/* <img src={assets.logo} alt="" className='max-w-40' /> */}
                    <div className='flex items-center gap-2'>
                    <MessageCircleMore className='w-6 h-6 cursor-pointer dark:text-white text-black' />
                    <h3 className='text-lg font-bold'>Convergo</h3>
                    </div>
                        <div ref={menuRef} className="relative py-2 group">
                            <EllipsisVertical className='w-5 h-5 cursor-pointer' onClick={() => setMenuOpen(prev => !prev)}/>
                            <div className={`absolute top-full right-0 z-20 w-32 p-5 rounded-md border border-slate-200 dark:border-gray-600 text-slate-900 dark:text-gray-100 ${menuOpen ? 'block' : 'hidden'} md:group-hover:block bg-white dark:bg-[#282142] shadow-lg`}>
                                <p className='cursor-pointer text-sm' onClick={() => { setMenuOpen(false); navigate('/profile') }}>Edit Profile</p>
                                <hr className="my-2 border-t border-gray-200 dark:border-gray-500" />
                                <p className='cursor-pointer text-sm' onClick={() => { setMenuOpen(false); setFriendModal(true) }}>Add Friend</p>
                                <hr className="my-2 border-t border-gray-200 dark:border-gray-500" />
                                <p onClick={() => { setMenuOpen(false); logout() }} className='cursor-pointer text-sm'>Logout</p>
                                <hr className="my-2 border-t border-gray-200 dark:border-gray-500" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        toggleTheme();
                                        setMenuOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between gap-2 text-left text-sm cursor-pointer hover:opacity-90"
                                >
                                    <span>{theme === "dark" ? "Light" : "Dark"}</span>
                                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                                </button>
                            </div>
                        </div>
                </div>
                <div className='bg-slate-100 dark:bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5 transition-colors' >
                    {/* <img src={assets.search_icon} alt="Search" className='w-4 dark:text-white text-black' /> */}
                    <Search className="w-5 dark:text-white text-black" />
                    <input onChange={(e) => setInput(e.target.value)} type="text" className='bg-transparent border-none outline-none text-slate-900 dark:text-white text-[13px] placeholder-[#7c7c7c] dark:placeholder-[#c8c8c8] flex-1' placeholder='Search User' />
                </div>
            </div>

            <div className='flex flex-col'>
                {filteredUsers.map((user,index) => (
                    <div onClick={()=>{setSelectedUser(user); setUnseenMessages((prev) => ({...prev, [user._id]: 0}))}} key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm border-b border-slate-200 dark:border-gray-600 transition-colors ${SelectedUser?._id === user._id && 'bg-slate-100 dark:bg-[#282142]/50'}`}>
                        <img src={user?.profilePic || assets.avatar_icon} alt="user image" className='w-[35px] aspect-[1/1] rounded-full' />
                        <div className='flex flex-col leading-5'>
                            <p>{user.fullName}</p>
                            {
                                onlineUsers.includes(user._id)
                                ? <span className='text-green-400 text-xs'>Online</span>
                                : <span className='text-neutral-500 dark:text-neutral-400 text-xs'>Offline</span>
                            }
                        </div> 
                        {unseenMessages[user._id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full text-black font-medium bg-green-400'>{unseenMessages[user._id]}</p>}
                    </div>
                ))}
            </div>
        <div className='absolute bottom-5 right-5 md:right-auto md:left-5 z-10'>
                <button
                    className='h-12 w-12 rounded-full bg-violet-600 cursor-pointer text-white text-2xl flex items-center justify-center shadow hover:bg-violet-500 active:scale-95'
                    onClick={() => setFriendModal(true)}
                >
                    +
                </button>
            </div>
        </div>
        {friendModal && (
            <div className='fixed inset-0 z-30 flex items-center justify-center bg-black/60'>
                <div className='w-11/12 max-w-md max-h-[85vh] overflow-y-auto bg-[#282142] text-white rounded-lg p-4 relative'>
                    <button onClick={() => setFriendModal(false)} className='absolute right-3 top-2 text-gray-300 cursor-pointer'>✕</button>
                    <h3 className='text-lg mb-3'>Add Friend</h3>
                    <div className='flex gap-2 mb-3 max-[350px]:flex-col'>
                        <input value={searchEmail} onChange={(e)=>setSearchEmail(e.target.value)} type='email' placeholder='Search by email' className='flex-1 bg-transparent border border-gray-600 rounded px-3 py-2 text-sm outline-none max-[350px]:w-full' />
                        <button onClick={async()=>{
                            if (!searchEmail.trim()) {
                                toast.error('Enter an email to search');
                                return;
                            }
                            try {
                                const { data } = await axios.get(`/api/friends/search?email=${encodeURIComponent(searchEmail.trim())}`)
                                if (data.success) {
                                    setSearchResult(data.user);
                                } else {
                                    setSearchResult(null);
                                    toast.error(data.message || 'User not found');
                                }
                            } catch(e) {
                                setSearchResult(null);
                                toast.error(e.response?.data?.message || e.message);
                            }
                        }} className='bg-violet-600 rounded px-4 py-2 text-sm cursor-pointer max-[350px]:w-full max-[350px]:mt-1'>Search</button>
                    </div>
                    {searchResult && (
                        <div className='flex items-center justify-between p-2 border border-gray-700 rounded mb-4'>
                            <div className='flex items-center gap-2'>
                                <img src={searchResult.profilePic || assets.avatar_icon} className='w-8 h-8 rounded-full' />
                                <div>
                                    <p className='text-sm'>{searchResult.fullName}</p>
                                    <p className='text-xs text-gray-300'>{searchResult.email}</p>
                                </div>
                            </div>
                            <button onClick={async()=>{
                                try {
                                    const { data } = await axios.post('/api/friends/invite', { toUserId: searchResult._id })
                                    if (data.success) {
                                        toast.success(data.message || (data.autoAccepted ? 'Friend request accepted' : 'Invite sent'));
                                        setSearchEmail(""); setSearchResult(null);
                                        getUsers();
                                    } else {
                                        toast.error(data.message || 'Unable to send invite');
                                    }
                                } catch(e) {
                                    toast.error(e.response?.data?.message || e.message);
                                }
                            }} className='bg-green-600 rounded px-3 text-sm cursor-pointer'>Add</button>
                        </div>
                    )}

                    <h4 className='text-sm mb-2'>Pending Friend Requests</h4>
                    <div className='space-y-2 max-h-52 overflow-y-auto'>
                        {pending.length === 0 && <p className='text-xs text-gray-300'>No pending requests</p>}
                        {pending.map((p, idx)=> (
                            <div key={idx} className='flex items-center justify-between p-2 border border-gray-700 rounded'>
                                <div className='flex items-center gap-2'>
                                    <img src={(p.from?.profilePic) || assets.avatar_icon} className='w-8 h-8 rounded-full' />
                                    <div>
                                        <p className='text-sm'>{p.from?.fullName}</p>
                                        <p className='text-xs text-gray-300'>{p.from?.email}</p>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <button onClick={async()=>{
                                        try {
                                            const { data } = await axios.post('/api/friends/respond', { fromUserId: p.from._id, accept: true })
                                            if (data.success) {
                                                toast.success('Friend request accepted');
                                                setPending(prev=>prev.filter(x=>x.from._id!==p.from._id));
                                                getUsers();
                                            } else {
                                                toast.error(data.message || 'Unable to accept request');
                                            }
                                        } catch(e) {
                                            toast.error(e.response?.data?.message || e.message);
                                        }
                                    }} className='bg-green-600 rounded px-3 text-sm cursor-pointer'>Accept</button>
                                    <button onClick={async()=>{
                                        try {
                                            const { data } = await axios.post('/api/friends/respond', { fromUserId: p.from._id, accept: false })
                                            if (data.success) {
                                                toast.success('Friend request rejected');
                                                setPending(prev=>prev.filter(x=>x.from._id!==p.from._id));
                                            } else {
                                                toast.error(data.message || 'Unable to reject request');
                                            }
                                        } catch(e) {
                                            toast.error(e.response?.data?.message || e.message);
                                        }
                                    }} className='bg-red-600 rounded px-3 text-sm cursor-pointer'>Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>)
}

export default Sidebar