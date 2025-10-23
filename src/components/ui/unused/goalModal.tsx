'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

interface ModalProperties {
    header: string;

    open: () => boolean;
    setOpen: (value: boolean) => void;
}

export default function Modal({ header, open, setOpen }: ModalProperties) {

    return (
        <Dialog open={open()} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-brand dark:bg-brand-dark text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                        <div className="bg-brand dark:bg-brand-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <DialogTitle as="h3" className="text-base font-semibold">
                                    {header}
                                </DialogTitle>
                                <div className="flex flex-col mt-2">
                                    
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="bg-brand dark:bg-brand-dark px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                            type="button"
                            onClick={ () => setOpen(false) }
                            className="inline-flex w-full justify-center rounded-md bg-button px-3 py-2 text-sm font-semibold text-white hover:bg-button-hover sm:ml-3 sm:w-auto"
                            >
                            Создать
                            </button>
                            <button
                            type="button"
                            data-autofocus
                            onClick={ () => setOpen(false) }
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-white text-sm font-semibold inset-ring inset-ring-white/5 hover:bg-red-400 sm:mt-0 sm:w-auto"
                            >
                            Отмена
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}