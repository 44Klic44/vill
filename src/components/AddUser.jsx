import { Dialog } from "@headlessui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Button from "./Button";
import Loading from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice.js";
import { setCredentials } from "../redux/slices/authSlice.js";

const AddUser = ({ open, setOpen, userData }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();


useEffect(() => {
  if (!open) return;

  console.log("🧠 OPEN AddUser, userData:", userData);

  const currentUser = userData?.user || userData || null; 

  if (currentUser) {
    reset({
      name: currentUser.name || "",
      title: currentUser.title || "",
      email: currentUser.email || "",
      role: currentUser.role || "",
    });
  } else {
    reset({
      name: "",
      title: "",
      email: "",
      role: "",
    });
  }
}, [open, userData, reset]);




  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
 
        const res = await updateUser(data).unwrap();

        toast.success(res?.message || "Profile updated successfully");

   
        if (currentUser?._id === userData?._id) {
          dispatch(setCredentials(res?.user));
        }
      } else {
     
        await addNewUser({
          ...data,
          password: data.email,
        }).unwrap();

        toast.success("New user added successfully");
      }

      setOpen(false);
    } catch (err) {
      console.log("Update error:", err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          {userData ? "EDIT USER" : "ADD NEW USER"}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Full name"
            type="text"
            label="Full Name"
            className="w-full rounded"
            register={register("name", { required: "Full name is required!" })}
            error={errors.name?.message}
          />

          <Textbox
            placeholder="Title"
            type="text"
            label="Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required!" })}
            error={errors.title?.message}
          />

          <Textbox
            placeholder="Email Address"
            type="email"
            label="Email Address"
            className="w-full rounded"
            register={register("email", { required: "Email is required!" })}
            error={errors.email?.message}
          />

          <Textbox
            placeholder="Role"
            type="text"
            label="Role"
            className="w-full rounded"
            register={register("role", { required: "Role is required!" })}
            error={errors.role?.message}
          />
        </div>

        {(isLoading || isUpdating) ? (
          <div className="py-5">
            <Loading />
          </div>
        ) : (
          <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              label="Submit"
            />

            <Button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddUser;