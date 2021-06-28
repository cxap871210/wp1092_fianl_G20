export default function SignInSec({ handleSignIn, setSignIn, setUserName, setPassword }) {
  const handleChange = (func) => (event) => {
    func(event.target.value)
  }
  return (
    <div className='signIn-sec'>
      <div className='signIn-input-wrapper'>
        <h2>Sign In</h2>
        <span className='signIn-input'>
          <label for='username'>Username</label>
          <input
            type="text"
            id="username"
            onChange={handleChange(setUserName)}/>
        </span>
        <span className='signIn-input'>
          <label for='password'>Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange(setPassword)}/>
        </span>
      </div>
      <div className='signIn-button-wrapper'>
        <span
        className='signUp-button text-button'
        onClick={() => setSignIn(false)}>
          <i class="fas fa-caret-left"></i> Sign Up
        </span>
        <span
        className='signIn-button text-button'
        onClick={handleSignIn}>
          Sign In
        </span>
      </div>
    </div>
  )
}
