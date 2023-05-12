import { defineStore } from 'pinia';


export const useDialogStore = defineStore('dialog', {
state: () => {
    return {
        isOpen: false,
        dialogInfo: {
            showCancel: false,
            title: "提示",
            message: "",
            cancelText: '取消',
            confirmText: '確認',
            cancelFunc: close,
            confirmFunc: close
        }
    };
},
actions: {
    open() {
        this.isOpen = true;
    },
    close() {
        this.isOpen = false;
    },
}
});
