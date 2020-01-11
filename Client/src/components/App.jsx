import React from 'react'
import { Navbar} from 'react-bootstrap';
import MapViev from './MapViev'

const App = () => (
    <div>
         <Navbar bg="dark" variant="dark">
            <Navbar.Brand>VRP</Navbar.Brand>
        </Navbar>
        <MapViev/>
    </div>
)

export default App
