import { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContex';

const RightSidebar = () => {

  const { selectedUser, messages, setSelectedUser } = useContext(ChatContext);
  const { logout, onlineUsers, axios } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([])

  // Get all images from the messages and set them to state
  useEffect(()=>{
    setMsgImages(messages.filter(msg => msg.image).map(msg => msg.image));
  },[messages])

  return selectedUser && (
    <div className={` bg-[#8185B2]/10 w-full overflow-y-scroll text-white relative ${selectedUser ? "max-md:hidden" : ''}`}>

      {/* user image, name and bio */}
      <div className='pt-10 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <div className='md:hidden absolute left-3 top-3'>
          <img src={assets.arrow_icon} className='w-6 h-6 cursor-pointer'  />
        </div>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt=""
          className='w-20 aspect-[1/1] rounded-full' />
        <h1 className='px-10 text-center text-xl font-medium mx-auto flex items-center
        gap-2'>
          {onlineUsers.includes(selectedUser._id) && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
          {selectedUser.fullName}
        </h1>
        <p className='px-10 mx-auto'>{selectedUser.bio}</p>
      </div>

      <hr className='border-[#ffffff50] my-4' />

      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2
        gap-4 opacity-80'>
          {msgImages.map((url, index) => (
            <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded'>
              <img src={url} alt="" className='h-full rounded-md' />
            </div>
          ))}
        </div>
      </div>

      <div className='sticky bottom-0 left-0 w-full px-5 pb-6 pt-4 bg-gradient-to-t from-[#0f0f12]/80 via-[#0f0f12]/50 to-transparent'>
        <div className='flex gap-3 max-md:flex-col'>
          <button
            type='button'
            onClick={async () => {
              try {
                await axios.delete(`/api/friends/remove/${selectedUser._id}`);
                setSelectedUser(null);
              } catch (e) {
                console.error(e);
              }
            }}
            className='flex-1 bg-gradient-to-r from-[#FF4D4D] to-[#B30000] text-white text-xs font-medium py-3 rounded-full cursor-pointer transition hover:opacity-90'
          >
            Remove Friend
          </button>
          <button
            type='button'
            onClick={logout}
            className='flex-1 bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-medium py-3 rounded-full cursor-pointer transition hover:opacity-90'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar