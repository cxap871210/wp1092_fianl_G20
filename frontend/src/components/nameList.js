export default function NameList ({list}) {
  return (
    <div className='name-list'>
      <div>Available Members:</div>
      <div>
        {
          list.a.map((name, i) => (
            i === list.a.length - 1 ?
            <span>{name}</span> :
            <span>{name}, </span>
          ))
        }
      </div>
      <div>Unavailable Members:</div>
      <div>
        {
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
