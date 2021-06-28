export default function ShareModal ({ shareEvent, closeShareModal, handleCopy }) {
  return (
    <div className='modal' id='shareModal'>
      <span
      className='close-button'
      onClick={closeShareModal}>
        &times;
      </span>
      <div className='modal-content'>
        <div className='shareModal-text'>
          {
            shareEvent === null ?
            null:
            <p>The code of [{shareEvent.name}] is <input type='text' id='event-code' value={shareEvent.code} readOnly={true}/></p>
          }
        </div>
        <span
        className='copy-button text-button'
        onClick={handleCopy}>
          Copy code
        </span>
      </div>
    </div>
  )
}
