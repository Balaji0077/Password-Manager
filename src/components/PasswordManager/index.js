import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import PasswordList from '../PasswordList'

const bgColors = [
  'yellowbg',
  'greenbg',
  'orangebg',
  'darkgreenbg',
  'redbg',
  'bluebg',
]

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    protectedPassword: [],
    searchvalue: '',
    showPassword: false,
  }

  prevent = event => {
    event.preventDefault()
  }

  websiteChange = event => {
    return this.setState({website: event.target.value})
  }

  usernameChange = event => {
    return this.setState({username: event.target.value})
  }

  passwordChange = event => {
    return this.setState({password: event.target.value})
  }

  checkout = () => {
    return this.setState(prev => {
      return {showPassword: !prev.showPassword}
    })
  }

  search = event => {
    const value = event.target.value
    return this.setState({
      searchvalue: value,
    })
  }

  deleted = unique => {
    const {protectedPassword} = this.state
    return this.setState({
      protectedPassword: protectedPassword.filter(each => {
        if (each.id !== unique) {
          return each
        }
    })
    })
  }

  addUpdated = () => {
    const {protectedPassword, website, username, password} = this.state
    return this.setState(prev => {
      if(website==="" || username==="" || password==="")
      {
         return console.log("")
      }
      return {
        protectedPassword: [
          ...prev.protectedPassword,
          {
            id: uuidv4(),
            web: website,
            user: username,
            pass: 'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png',
            passShow: password,
            bg: bgColors[Math.floor(Math.random() * 5)],
          },
        ],
        website: '',
        username: '',
        password: '',
      }
    })
  }

  render() {
    const {
      website,
      username,
      password,
      protectedPassword,
      searchvalue,
      showPassword,
    } = this.state
    const searchable = protectedPassword.filter(each => {
      if (each.web.toLowerCase().includes(searchvalue.toLowerCase())) {
        return each
      }
    })
    return (
      <div className="home-container">
        <div className="immediate-container">
          <div className="logo-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="logo"
            />
          </div>
          <div className="user-input-container">
            <div className="user-input-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="user-input-image-sm"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="user-input-image-lg"
              />
            </div>
            <div className="input-container">
              <form className="form" onSubmit={this.prevent}>
                <h1 className="form-heading">Add New Password</h1>
                <div className="website-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-image"
                  />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="input-enter-container"
                    value={website}
                    onChange={this.websiteChange}
                  />
                </div>
                <div className="website-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-image"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="input-enter-container"
                    value={username}
                    onChange={this.usernameChange}
                  />
                </div>
                <div className="website-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-image"
                  />
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    className="input-enter-container"
                    onChange={this.passwordChange}
                  />
                </div>
                <div className="btn-container">
                  <button
                    type="submit"
                    className="add-btn"
                    onClick={this.addUpdated}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="your-password-container">
            <div className="count-search-container">
              <div className="heading-count-container">
                <h1 className="your-password-text">Your Passwords</h1>
                <p className="count-text">{protectedPassword.length}</p>
              </div>
              <div className="search-container">
                <div className="searchicon-bar-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-img"
                  />
                  <input
                    type="search"
                    placeholder="Search"
                    className="search-bar"
                    value={searchvalue}
                    onChange={this.search}
                  />
                </div>
              </div>
            </div>
            <div className="showpasword-container">
              <div className="input-checkbox-container">
                <input
                  type="checkbox"
                  id="check"
                  className="checkbox-img"
                  onChange={this.checkout}
                />
                <label htmlFor="check" className="show-text">
                  Show Passwords
                </label>
              </div>
            </div>
            <ul className="no-password-container">
              {searchable.length === 0 ? (
                <div className="nopass-image">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-password-image"
                  />
                  <p className="password-text">No Passwords</p>
                </div>
              ) : (
                searchable.map(each => (
                  <PasswordList
                    item={each}
                    key={each.id}
                    show={showPassword}
                    deletePressed={this.deleted}
                  />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
