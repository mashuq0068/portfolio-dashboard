import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
    return (
        <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: 'text-center',
    duration: 5000,
    style: {
      background: 'white',
      color: 'black',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    );
};

export default ToastProvider;