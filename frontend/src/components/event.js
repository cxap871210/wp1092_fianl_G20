export default function Event ({ username, event, openEditPage, openViewPage, openShareModal, handleDelete, handleQuit }) {
  const isCreator = username === event.creator
  //console.log(isCreator)
  return (
    <div className='event'>
      <div className='event-name'>
        <i class="fas fa-caret-right pointer-icon"></i> {event.name}
      </div>
      <div className='event-creator'>
        <span className='light-text'>created by </span>{event.creator}
      </div>
      <div className='event-button-wrapper'>
        <span
        className='edit-button icon-button'
        title='Edit available time'
        onClick={() => openEditPage(event)}>
          <i class="fas fa-edit"></i>
        </span>
        <span
        className='view-button icon-button'
        title='View available time of all attendents'
        onClick={() => openViewPage(event)}>
          <i class="fas fa-eye"></i>
        </span>
        <span
        className='share-button icon-button'
        title='Get the event code to share with others'
        onClick={() => openShareModal(event)}>
          <i class="fas fa-share-alt"></i>
        </span>
        {isCreator ?
          <span
          className='delete-button icon-button'
          title='Delete this event'
          onClick={() => handleDelete(event)}>
            <i class="far fa-times-circle"></i>
          </span>:
          <span
          className='quit-button icon-button'
          title='Quit this event'
          onClick={() => handleQuit(event)}>
            <i class="fas fa-sign-out-alt"></i>
          </span>
        }
      </div>
    </div>
  )
}
