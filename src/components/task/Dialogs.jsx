import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";

export default function Dialogs({
  open,
  setOpen,
  msg,
  onClick = () => {},
  type = "delete",
  setMsg = () => {},
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <div className='py-6 w-full flex flex-col gap-4 items-center justify-center'>
        <Dialog.Title as='h3' className=''>
          <p
            className={clsx(
              "p-4 rounded-full",
              type === "restore" || type === "restoreAll"
                ? "text-yellow-600 bg-yellow-100"
                : "text-red-600 bg-red-200"
            )}
          >
            <FaQuestion size={40} />
          </p>
        </Dialog.Title>

        <p className='text-center text-gray-700 text-lg'>
          {msg ?? "Are you sure you want to delete the selected record?"}
        </p>

        <div className='flex justify-center gap-4 pt-2'>
          <Button
            type='button'
            className='bg-gray-200 px-6 py-2 text-sm font-semibold text-gray-800 rounded hover:bg-gray-300'
            onClick={closeDialog}
            label='Cancel'
          />
          <Button
            type='button'
            className={clsx(
              "px-6 py-2 text-sm font-semibold text-white rounded",
              type === "restore" || type === "restoreAll"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-red-600 hover:bg-red-700"
            )}
            onClick={onClick}
            label={type === "restore" ? "Restore" : "Delete"}
          />
        </div>
      </div>
    </ModalWrapper>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <div className='py-6 w-full flex flex-col gap-4 items-center justify-center'>
        <Dialog.Title as='h3' className=''>
          <p className="p-4 rounded-full text-red-600 bg-red-200">
            <FaQuestion size={40} />
          </p>
        </Dialog.Title>
        <p className='text-center text-gray-700 text-lg'>
          Are you sure you want to activate or deactivate this account?
        </p>
        <div className='flex justify-center gap-4 pt-2'>
          <Button
            type='button'
            className='bg-gray-200 px-6 py-2 text-sm font-semibold text-gray-800 rounded hover:bg-gray-300'
            onClick={closeDialog}
            label='No'
          />
          <Button
            type='button'
            className='bg-red-600 px-6 py-2 text-sm font-semibold text-white rounded hover:bg-red-700'
            onClick={onClick}
            label='Yes'
          />
        </div>
      </div>
    </ModalWrapper>
  );
}