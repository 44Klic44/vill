import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Loading from "../Loader";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import { useChangePasswordMutation } from "../../redux/slices/api/userApiSlice";
import { toast } from "sonner";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
   

    try {
      const response = await changeUserPassword({
        oldPassword: data.oldPassword,
        password: data.password, 
      }).unwrap();


      toast.success("Password changed successfully");
      reset();
      setOpen(false);
    } catch (err) {
    

      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          Change Password
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Current Password"
            type="password"
            name="oldPassword"
            label="Current Password"
            className="w-full rounded"
            register={register("oldPassword", {
              required: "Current password is required!",
            })}
            error={errors.oldPassword?.message}
          />

          <Textbox
            placeholder="New Password"
            type="password"
            name="password"
            label="New Password"
            className="w-full rounded"
            register={register("password", {
              required: "New password is required!",
            })}
            error={errors.password?.message}
          />
        </div>

        {isLoading ? (
          <div className="py-5">
            <Loading />
          </div>
        ) : (
          <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              label="Save"
            />
            <button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default ChangePassword;