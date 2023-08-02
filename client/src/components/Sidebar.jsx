import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-palette1">
        <div>
            <img src="/logo.png" alt="Logo" />
        </div>
        <ul>
            <li>
                <Link></Link>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar