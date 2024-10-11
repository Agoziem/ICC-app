import { notificationSchema } from "@/schemas/notifications";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Alert from "../Alert/Alert";
import {
  createNotification,
  notificationAPIendpoint,
  updateNotification,
} from "@/data/notificationsAPI/fetcher";
import {
  createnotificationoption,
  updateNotificationOption,
} from "@/data/notificationsAPI/fetcherOption";

/**
 * @param {{ notification: NotificationMessage; editmode: boolean; setEditMode: (value: boolean) => void; formRef:React.RefObject<HTMLFormElement>; }} param0
 * @returns {JSX.Element}
 */
const NotificationForm = ({ notification, editmode, setEditMode, formRef }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { mutate } = useSWR(`${notificationAPIendpoint}/notifications/`);

  // -----------------------------------------------------------------
  // Default values for the form, used for reset and initial state
  // -----------------------------------------------------------------
  const defaultNotificationValues = {
    title: "",
    message: "",
  };

  // -----------------------------------------------------------------
  // Initialize React Hook Form and connect it to Zod via zodResolver
  // -----------------------------------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(
      notificationSchema.pick({
        title: true,
        message: true,
      })
    ),
    mode: "onChange",
    defaultValues: defaultNotificationValues, // Set the initial default values
  });

  // useEffect to reset form values whenever notification or editmode changes
  useEffect(() => {
    if (editmode) {
      reset({
        title: notification.title || "",
        message: notification.message || "",
      });
    }
  }, [notification, editmode, reset]);

  const getRandomInt = (min, max) => {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xffffffff + 1);
    return Math.floor(randomNumber * (max - min)) + min;
  };

  // --------------------------------------
  // Submit function to handle notification creation or edit
  // --------------------------------------
  const onSubmit = async (data) => {
    try {
      setError("");
      setSuccess("");
      const notificationData = {
        ...data,
        id:
          editmode && notification
            ? notification.id
            : getRandomInt(100_000, 1_000_000),
        created_at:
          editmode && notification
            ? notification.created_at
            : new Date().toISOString(),
        viewed: false,
      };
      editmode
        ? mutate(
            updateNotification(notificationData),
            updateNotificationOption(notificationData)
          )
        : mutate(
            createNotification(notificationData),
            createnotificationoption(notificationData)
          );

      setSuccess(`Notification ${editmode ? "edited" : "sent"} successfully!`);
      setEditMode(false);
      reset(defaultNotificationValues); // Reset the form using default values
    } catch (error) {
      setError(
        `Failed to ${
          editmode ? "edit" : "send"
        } notification. Please try again.`
      );
    } finally {
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <div
      className="container mx-auto py-2"
      style={{
        width: "80vw",
        maxWidth: "350px",
      }}
    >
      <form
        ref={formRef}
        className="d-flex flex-column gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h6>{editmode ? "Edit Notification" : "Create Notification"}</h6>
        </div>
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter the notification title"
            className="form-control w-full"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-danger small">
              {String(errors.title.message)}
            </p>
          )}
        </div>

        {/* Message Input */}
        <div className="form-group">
          <label htmlFor="message" className="block font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="Enter your message"
            className="form-control w-full"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-danger small">
              {String(errors.message.message)}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="d-flex flex-column flex-md-row justify-content-end gap-1 gap-md-2">
          {editmode && (
            <button
              className="btn btn-secondary rounded mt-4"
              onClick={() => {
                reset(defaultNotificationValues); // Reset with default values
                setEditMode(false);
              }}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`btn btn-primary rounded mt-4 ${
              isSubmitting ? "loading" : ""
            }`}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting
              ? "Sending..."
              : editmode
              ? "Edit Notification"
              : "Send Notification"}
          </button>
        </div>

        {/* Error Message */}
        {error && <Alert type={"danger"}>{error}</Alert>}

        {/* Success Message */}
        {success && <Alert type={"success"}>{success}</Alert>}
      </form>
    </div>
  );
};

export default NotificationForm;
