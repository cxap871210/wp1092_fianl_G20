export default function Event ({ event, openEditPage, openViewPage, openShareModal, handleLeave }) {
  return (
    <div className='event'>
      <span
      className='leave-button icon-button'
      onClick={handleLeave}>
        <i class="far fa-times-circle"></i>
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
      </div>
    </div>
  )
}
