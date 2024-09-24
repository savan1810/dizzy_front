import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts } from '../../../../store/alert/alertSlice';
import { useNavigate } from 'react-router';
import { setFocusEvent, setFocusMusic, setFocusProduct } from '../../../../store/focuspage/focuspageSlice';
import { updateContentLink, updateEventDate, updateEventTime, updateLink, updateLocation, updateVenue } from '../../../../store/focuseventdata/focuseventdataSlice';

export default function FocusProductOverlay({ isOverlayVisible, setOverlayVisible, setLink, setProductName, setPrice, setDescription, setImagePreview, itemForBackend }) {
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector((state) => state.focuspage.product?.product);
    const productData = useSelector((state) => state.focuspage.product);

    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            setOverlayVisible(false);
        }
    };

    const handleEditClick = () => {
        setLink(product[0]?.links[0]?.url)
        setProductName(product[0]?.productName)
        setPrice(product[0]?.price)
        setDescription(product[0]?.description)
        setImagePreview(product[0]?.image)
        setOverlayVisible(false);
    }

    const handleDeleteClick = () => {
        dispatch(clearAlerts());
        if (productData?.type === "single") {

            dispatch(setFocusProduct({ product: null }));
        }
        else {
            const updatedData = product.filter((item) => {
                return item.image !== itemForBackend?.image
            });
            dispatch(setFocusProduct({ product: updatedData }));
        }
        // dispatch(deleteMusicThunk({ token: token, avatar: avtarForBackend }));
        setOverlayVisible(false);
    };

    return (
        <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-20"
            onClick={handleOverlayClick}
        >
            <div className="p-6 rounded-md w-[90%] max-w-[390px] space-y-[50px] text-white text-[12px]" onClick={e => e.stopPropagation()}>
                <p className="cursor-pointer pb-[10px]" onClick={() => handleEditClick()}>edit</p>
                <p className="cursor-pointer pb-[10px]" onClick={() => handleDeleteClick()}>delete</p>
                <p className="cursor-pointer pb-[10px]" onClick={() => setOverlayVisible(false)}>Cancel</p>
            </div>
        </div>
    )
}
