import { useState, useEffect } from 'react';
import { UserConsumer } from '../../providers/UserProvider';

const AccountForm = ({ id, username, memberlvl, updateUser }) => {
  const [user, setUser] = useState({ username: '', memberlvl: '' })

  useEffect( () => {
    if (id) {
      setUser({ username, memberlvl })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      updateUser(id, user)
    }
    setUser({ username: '', memberlvl: '' })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input 
          name="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
        <label>Membership Level:</label>
        <select
          name="memberlvl"
          onChange={(e) => setUser({ ...user, memberlvl: e.target.value}) }
        >
          {
            memberOpts.map( m => 
              <option
                value={m.value}
              >
                {m.text}
              </option>
            )
          }
        </select>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

const memberOpts = [
  { key: 'b', text: 'Bronze', value: 'Bronze' },
  { key: 's', text: 'Silver', value: 'Silver' },
  { key: 'g', text: 'Gold', value: 'Gold' },
  { key: 'p', text: 'Platinum', value: 'Platinum' },
]

const ConnectedAccountForm = (props) => (
  <UserConsumer>
    { value => <AccountForm {...props} {...value} />}
    {/* { value => <AccountForm {...props} username={value.username} updateUser={value.updateUser} />} */}
  </UserConsumer>
)

export default ConnectedAccountForm;