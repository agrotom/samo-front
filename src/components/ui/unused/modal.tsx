'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import type { JSX } from 'react';

interface Dictionary {
    id: string;
    label: string;
    form: JSX.Element;
}

interface FormData {
    id: string;
    label: string;
}

interface ModalProperties {
    header: string;
    children?: JSX.Element;
    forms?: FormData[];

    onCancel: () => void;
    onSubmit: (data: string[]) => void;

    open: () => boolean;
    setOpen: (value: boolean) => void;
}

export default function Modal({ header, children, forms = [], onCancel, onSubmit, open, setOpen }: ModalProperties) {

    var allForms: JSX.Element[] = [];

    const createForms = () => {
        var formsElement: JSX.Element[] = [];

        forms.forEach(form => {
            formsElement.push(
                <div className='mt-3'>
                    <label className='mr-5' htmlFor={"form_label_" + form.id}>{form.label + ':'}</label>
                    <input id={"form_input_" + form.id}></input>
                </div>
            );

            allForms.push();
        });
        
        return (
            formsElement
        );
    }


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
                                    { children }
                                    { forms.length > 0 && createForms() }
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="bg-brand dark:bg-brand-dark px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                            type="button"
                            onClick={() => { setOpen(false); onSubmit(["asd", "dsaad"]); }}
                            className="inline-flex w-full justify-center rounded-md bg-button px-3 py-2 text-sm font-semibold text-white hover:bg-button-hover sm:ml-3 sm:w-auto"
                            >
                            Создать
                            </button>
                            <button
                            type="button"
                            data-autofocus
                            onClick={() => { setOpen(false); onCancel(); }}
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