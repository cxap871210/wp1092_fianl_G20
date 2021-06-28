export default function Event ({ username, event, openEditPage, openViewPage, openShareModal, handleDelete, handleQuit }) {
  const isCreator = username === event.creator
  //console.log(isCreator)
  return (
    <div className='event'>
      <span
      className='pointer-icon'>
        <i class="fas fa-caret-right"></i>
      </span>
      <div className='event-name'>
        {event.name}
      </div>
      <div className='event-creator'>
        <span className='light-text'>created by </span>{event.creator}
      </div>
      <div className='event-button-wrapper'>
        <span
        className='edit-button icon-button'
        onClick={() => openEditPage(event)}>
          <i class="fas fa-edit"></i>
        </span>
        <span
        className='view-button icon-button'
        onClick={() => openViewPage(event)}>
          <i class="fas fa-eye"></i>
        </span>
        <span
        className='share-button icon-button'
        onClick={() => openShareModal(event)}>
          <i class="fas fa-share-alt"></i>
        </span>
        {isCreator ?
          <span
          className='delete-button icon-button'
          onClick={() => handleDelete(event)}>
            <i class="far fa-times-circle"></i>
          </span>:
          <span
          className='quit-button icon-button'
          onClick={() => handleQuit(event)}>
            <i class="fas fa-sign-out-alt"></i>
          </span>
        }
      </div>
    </div>
  )
}
