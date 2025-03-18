/* eslint-disable @typescript-eslint/no-explicit-any */
import toast, { Toaster, ToastOptions } from "react-hot-toast";

// Custom toast styles and icons
const toastStyles = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
};

// Custom icons (using Lucide React icons)
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

// Custom toast component
const CustomToast = ({
  t,
  message,
  type = "info",
  icon: Icon,
}: {
  t: any;
  message: string;
  type: keyof typeof toastStyles;
  icon: any;
}) => {
  return (
    <div
      className={`
        ${toastStyles[type]} 
        flex items-center p-4 rounded-lg shadow-lg 
        transition-all duration-300 ease-in-out
        ${t.visible ? "animate-enter" : "animate-leave"}
      `}
    >
      {Icon && <Icon className="mr-3 w-6 h-6" />}
      <div className="flex-grow">
        <p className="font-medium">{message}</p>
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="ml-4 bg-transparent hover:bg-opacity-10 rounded-full p-1 transition-colors"
      >
        <XCircle className="w-5 h-5 opacity-50 hover:opacity-100" />
      </button>
    </div>
  );
};

// Toast helpers with custom styling
export const successToast = (message: string, options?: ToastOptions) =>
  toast.custom(
    (t) => (
      <CustomToast t={t} message={message} type="success" icon={CheckCircle2} />
    ),
    { ...(options?.duration ? { duration: 4000 } : {}), ...options },
  );

export const errorToast = (message: string, options?: ToastOptions) =>
  toast.custom(
    (t) => <CustomToast t={t} message={message} type="error" icon={XCircle} />,
    { ...(options?.duration ? { duration: 4000 } : {}), ...options },
  );

export const warningToast = (message: string, options?: ToastOptions) =>
  toast.custom(
    (t) => (
      <CustomToast
        t={t}
        message={message}
        type="warning"
        icon={AlertTriangle}
      />
    ),
    { ...(options?.duration ? { duration: 5000 } : {}), ...options },
  );

export const infoToast = (message: string, options?: ToastOptions) =>
  toast.custom(
    (t) => <CustomToast t={t} message={message} type="info" icon={Info} />,
    { ...(options?.duration ? { duration: 4000 } : {}), ...options },
  );

// Toaster component with global configuration
export const ToastProvider = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      className: "w-full max-w-md",
      duration: 4000,
      success: {
        style: {
          background: "green-50",
          color: "green-800",
        },
      },
      error: {
        style: {
          background: "red-50",
          color: "red-800",
        },
      },
    }}
  />
);

export default ToastProvider;
