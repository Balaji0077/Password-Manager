import './index.css'

const PasswordList = props => {
  const {item, show, deletePressed} = props
  const {id, web, user, pass, passShow, bg} = item
  const deletebtn = () => {
    return deletePressed(id)
  }
  return (
    <li className="list-container">
      <div className="nameProfile-details-container">
        <div className={`${bg} user-name`}>{user[0].toUpperCase()}</div>
        <div>
          <p className="web-name">{web}</p>
          <p className="username">{user}</p>
          {show ? (
            <p className="username">{passShow}</p>
          ) : (
            <img src={pass} alt="stars" className="password-image" />
          )}
        </div>
      </div>
      <div>
        <button data-testid="delete" onClick={deletebtn} className="delete-btn">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordList
