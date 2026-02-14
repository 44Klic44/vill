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
import { Transition } from '@headlessui/react'
import { Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { setOpenSidebar } from "./redux/slices/authSlice";

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

   {/* Мобильная навигация */}
    <MobileSidebar/>


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

const  MobileSidebar = ()=> {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={`md:hidden w-full h-full bg-black/40 transition-transform duration-700 transform
             ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 pt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoMdClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};


function App() {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6]'>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Navigate to="/dashboard"/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/tasks" element={<Tasks />} />
         <Route path="/tasks/:status" element={<Tasks />} />
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