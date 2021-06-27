export default function InfoBar ({ username, handleSignOut, openCreateModal, openJoinModal }) {
  return (
    <div className='infoBar-wrapper'>
      <div className='userInfo-wrapper'>
        <div className='userInfo'>
          Hi, {username}!
        </div>
        <span
        className='signOut-button text-button'
        onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      <div className='function-button-wrapper'>
        <span
        className='create-button text-button'
        onClick={openCreateModal}>
          Create
        </span>
        <span
        className='join-button text-button'
        onClick={openJoinModal}>
          Join
        </span>
      </div>
    </div>
  )
}
