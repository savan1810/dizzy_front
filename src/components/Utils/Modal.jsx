import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// Ref: https://headlessui.com/react/dialog
function Modal({
    isOpen,
    onClose,
    title,
    clickOutside = false,
    children,
    submitLabel = "Done",
    cancelLabel = "Cancel",
    cancelClass = "",
    onSubmit,
    submitClass = "",
    className = "",
}) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-60"
                onClose={clickOutside ? onClose : () => null}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto text-white">
                    <div className="flex min-h-full items-end justify-center px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {/* Remove the overflow-hidden or use a Portal + a positioning library like Popper.js or Floating UI */}
                            {/* https://github.com/tailwindlabs/headlessui/issues/1420 */}
                            <Dialog.Panel
                                className={`bg-gray-900 w-full transform rounded-t-3xl text-left align-middle shadow-xl transition-all max-w-[380px] ${className}`}
                            >
                                <div className="max-w-[130px] m-auto h-[5px] bg-white mt-3.5 rounded-full" />
                                <Dialog.Title className="flex justify-between items-center text-lg leading-5 pt-4 pb-7 px-6">
                                    <div className="flex-1 text-center text-base">{title}</div>
                                    {/* <div onClick={onClose} className="ml-2 cursor-pointer">
                    X
                  </div> */}
                                </Dialog.Title>
                                <div className="px-1">
                                    <hr className="border-hrColor" />
                                </div>

                                <div className="p-6 pb-0">
                                    <div>{children}</div>

                                    {onSubmit && (
                                        <>
                                            <div
                                                className={`cursor-pointer py-3 hover:text-[red] ${submitClass}`}
                                                onClick={onSubmit}
                                            >
                                                {submitLabel}
                                            </div>
                                            <div className="-mx-4">
                                                <hr className="border-hrColor/50" />
                                            </div>
                                        </>
                                    )}
                                    <div
                                        className={`cursor-pointer hover:text-[red] py-6 ${cancelClass}`}
                                        onClick={onClose}
                                    >
                                        {cancelLabel}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default Modal;
