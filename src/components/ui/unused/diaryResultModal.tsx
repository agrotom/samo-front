'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import TextHeader from '../elements/text-header';

interface ModalProperties {
    header?: string;
    children?: React.ReactNode | React.ReactNode[];
    submitText?: string;
    cancelText?: string;

    onCancel?: () => void;
    onSubmit?: () => void;

    open: boolean;
    setOpen: (value: boolean) => void;
}

export default function DiaryResultModal({ header = '', children, onCancel, onSubmit, open, setOpen, submitText = 'ОК', cancelText = 'Отмена' }: ModalProperties) {

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-50 text-primary dark:text-primary-dark">
                <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-brand dark:bg-brand-dark text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                        {
                            header != '' &&
                            <div className="px-6 py-5 border-b-2 border-b-brand-active dark:border-b-brand-active-dark">
                                <TextHeader text={header} />
                            </div>
                        }
                        <div className="px-4 pb-10 pt-6 sm:p-6 sm:pb-10 overflow-y-auto">
                            {
                                children
                            }
                        </div>
                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t-2 border-t-brand-active dark:border-t-brand-active-dark">
                            <button
                                type="button"
                                onClick={() => { setOpen(false); onSubmit?.(); }}
                                className="inline-flex w-full justify-center rounded-md bg-button px-3 py-2 text-sm font-semibold text-white hover:bg-button-hover sm:ml-3 sm:w-auto"
                                >
                                { submitText }
                            </button>
                            {
                                cancelText != '' &&
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => { setOpen(false); onCancel?.(); }}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-white text-sm font-semibold inset-ring inset-ring-white/5 hover:bg-red-400 sm:mt-0 sm:w-auto"
                                    >
                                    { cancelText }
                                </button>
                            }
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}