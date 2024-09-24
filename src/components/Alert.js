import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { clearAlerts } from '../store/alert/alertSlice';

const Alert = () => {
    const dispatch = useDispatch()
    const alert = useSelector((state) => state.alert);
    useEffect(() => {
        if (alert?.error) {
            toast.error(alert?.error, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                dispatch(clearAlerts());
            }, 2500);
        }

        if (alert?.success) {
            toast.success(alert?.success, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                dispatch(clearAlerts());
            }, 2500);
        }
    }, [alert]);

    return (
        <>
            {
                alert?.loading &&
                <>
                    <div className='fixed inset-0 opacity-0 z-10'></div>
                    <div className='fixed inset-0 flex items-center justify-center z-20'>
                        <ClipLoader
                            color="white"
                            loading={true}
                            size={70}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </>

            }

            <ToastContainer className={'z-50'} />
        </>
    );
};

export default Alert;
