export default function NameList ({list}) {
  return (
    <div className='name-list'>
      <h4>Available Attendents:</h4>
      <div>
        {
          list.a.length === 0 ?
          (<span>none</span>) :
          list.a.map((name, i) => (
            i === list.a.length - 1 ?
            <span>{name}</span> :
            <span>{name}, </span>
          ))
        }
      </div>
      <h4>Unavailable Attendents:</h4>
      <div>
        {
          list.u.length === 0 ?
          (<span>none</span>) :
          list.u.map((name, i) => (
            i === list.u.length - 1 ?
            <span>{name}</span> :
            <span>{name}, </span>
          ))
        }
      </div>
    </div>
  )
}
