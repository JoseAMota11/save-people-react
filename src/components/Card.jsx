import { useState } from 'react'
import '../css/Card.css'

function Card() {

  const [ person, setPerson ] = useState({
    name: "",
    lastname: "",
    age: 0,
    email: ""
  })
  const [ people, setPeople ] = useState(JSON.parse(localStorage.getItem("person")) || [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (person.name && person.lastname && person.age && person.email) {
      const newPerson = {...person, id: Date.now().toString()}
      localStorage.setItem("person", JSON.stringify([...people, newPerson]))
      setPeople([...people, newPerson])
      setPerson({
        name: "",
        lastname: "",
        age: 0,
        email: ""
      })
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setPerson({...person, [name]:value})
  }

  return (
    <div className='card__container'>
      <div className="side-a">
        <h2 className='title'>Add a person</h2>
        <form onSubmit={handleSubmit}>
          <input 
          type="text"
          id="name"
          name="name"
          value={person.name}
          onChange={handleChange}
          placeholder="Name"
          />
          <input 
          type="text"
          id="lastname"
          name="lastname"
          value={person.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          />
          <input 
          type="number"
          id="age"
          name="age"
          value={person.age}
          onChange={handleChange}
          placeholder="Age"
          />
          <input 
          type="email"
          id="email"
          name="email"
          value={person.email}
          onChange={handleChange}
          placeholder="Email"
          />
          <button type="submit" className='submit'>Add</button>
        </form>
      </div>
      <div className="side-b">
        <h2 className='title'>People added</h2>
        <div className='people__container'>
          {
            people.length > 0 ? people.map(item => {
              return (
                <div key={item.id} className="person__container">
                  <h3>{item.name} {item.lastname}</h3>
                  <h3>{item.age}</h3>
                  <h3>{item.email}</h3>
                </div>
              )
            })
            :
            <h2 className='no-person'>No person added yet!</h2>
          }
        </div>
      </div>
    </div>
  )
}

export default Card