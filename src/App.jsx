import './App.css'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import Tasks from "./pages/Tasks"
import Trash from "./pages/Trash"
import TaskDetails from "./pages/TaskDetails"
import { Toaster } from "sonner"
import { useSelector } from 'react-redux'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

function Layout(){
  const {user} = useSelector((state) => state.auth)
  const location = useLocation()
 const isDev = true // 👈 временно чтобы редактировать страницу dashboard потом удалить!!!
  //  return user ? ( 👈 Это правильная проверка ее нужно будет восстановить !!!
  return user || isDev ? ( //👈 Это временная проверка для редактирования страниц потом удалить !!!
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Левая панель навигации */}
      <div className="w-full md:w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar/>
      </div>

      {/* Основная область с Navbar и контентом */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar - фиксированная верхняя панель */}
        <div className="sticky top-0 z-10 bg-white dark:bg-[#1f1f1f]">
          <Navbar/>
        </div>
        
        {/* Прокручиваемый контент */}
        <div className="flex-1 overflow-y-auto p-4 2xl:px-10">
          <Outlet/>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{from: location}} replace/>
  )
}

function App() {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6]'>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Navigate to="/dashboard"/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/completed/:status" element={<Tasks/>}/>
          <Route path="/in-progress/:status" element={<Tasks/>}/>
          <Route path="/todo/:status" element={<Tasks/>}/>
          <Route path="/team" element={<Users/>}/>
          <Route path="/trashed" element={<Trash/>}/>
          <Route path="/task/:id" element={<TaskDetails/>}/>
        </Route>
        <Route path="/log-in" element={<Login/>}/>
      </Routes>
      <Toaster richColors/>
    </main>
  )
}

export default App