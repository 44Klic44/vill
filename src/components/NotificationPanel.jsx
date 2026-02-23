import React, { Fragment, useState } from 'react';
import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetNotificationsQuery, useMarkNotiAsReadMutation } from '../redux/slices/api/userApiSlice.js';
import ViewNotification from './task/ViewNotification.jsx';

const ICONS = {
  alert: <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />,
  message: <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />,
};

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data } = useGetNotificationsQuery(); // автоматически обновляется после мутаций
  const [markAsRead] = useMarkNotiAsReadMutation();

  const viewHandler = (el) => {
    setSelected(el);
    markAsRead({ type: "one", id: el._id }); // отметка о прочтении
    setOpen(true);
  };

  const markAllAsRead = async () => {
    await markAsRead({ type: "all", id: "" });
  };

  const callsToAction = [
    { name: "Cancel", onClick: (close) => close() },
    {
      name: "Mark All Read",
      onClick: (close) => {
        markAllAsRead();
        close();
      },
    },
  ];

  return (
    <>
      <Popover className='relative'>
        <Popover.Button className='inline-flex items-center outline-none'>
          <div className='w-8 h-8 flex items-center justify-center text-gray-800 dark:text-white relative'>
            <IoIosNotificationsOutline className='text-2xl' />
            {data?.length > 0 && (
              <span className='absolute text-center top-0 right-1 text-sm font-light text-white font-semibold w-4 h-4 rounded-full bg-red-500'>
                {data?.length}
              </span>
            )}
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel className='absolute -right-16 md:-right-2 z-10 mt-5 w-screen max-w-max px-4'>
            {({ close }) => (
              <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white dark:bg-[#1f1f1f] text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                {data?.length > 0 ? (
                  <>
                    <div className='p-4'>
                      {data?.slice(0, 5).map((item) => (
                        <div
                          key={item._id}
                          className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-[#1c1c1c]'
                        >
                          <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                            {ICONS[item.notiType]}
                          </div>

                          <div
                            className='cursor-pointer'
                            onClick={() => viewHandler(item)}
                          >
                            <div className='flex items-center gap-3 font-semibold text-gray-900 capitalize dark:text-gray-200'>
                              <p> {item.notiType}</p>
                              <span className='text-xs font-normal lowercase'>
                                {moment(item.createdAt).fromNow()}
                              </span>
                            </div>
                            <p className='line-clamp-1 mt-1 text-gray-600 dark:text-gray-500'>
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className='grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:bg-[#1f1f1f]'>
                      {callsToAction.map((item) => (
                        <Link
                          key={item.name}
                          to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            item.onClick(close);
                          }}
                          className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100 dark:hover:bg-[#1c1c1c]'
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className='p-4 text-center text-gray-500'>No notifications</div>
                )}
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>

      <ViewNotification open={open} setOpen={setOpen} el={selected} />
    </>
  );
};

export default NotificationPanel;