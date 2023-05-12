import { useNotification } from "@kyvg/vue3-notification";
const { notify }  = useNotification();

export function showInfo(text:string, title?:string) {
    notify({
        title: title? title : undefined,
        text: text,
        type: 'info'
    });
};

export function showError(text:string, title?:string) {
    notify({
        title: title? title : undefined,
        text: text,
        type: 'error'
    });
};

export function showSuccess(text:string, title?:string) {
    notify({
        title: title? title : undefined,
        text: text,
        type: 'success'
    });
};