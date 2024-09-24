import { useNavigate } from "react-router-dom";
import Modal from "../../Utils/Modal";

export default function ModalSaveVideo({ title, isOpen, onClose, options, onAdd }) {
    const navigation = useNavigate();
    const onSelect = (el) => {
        onAdd(el)
        onClose();
    };

    return (
        <Modal title={title} isOpen={isOpen} onClose={onClose} clickOutside>
            {options.map((el, idx) => (
                <div key={idx} onClick={() => onSelect(el.value)}>
                    <div
                        className=
                        "py-3 !text-sm !font-light hover:text-[red] cursor-pointer"
                    >
                        {el.label}
                    </div>
                    <div className="-mx-4">
                        <hr className="border-hrColor" />
                    </div>
                </div>
            ))}
        </Modal>
    );
}
