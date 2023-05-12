import { defineStore } from 'pinia';


export const useDialogStore = defineStore('dialog', {
state: () => {
    return {
        isOpen: false,
        dialogInfo: {
            showCancel: false,
            title: "提示",
            message: "",
            cancelText: "取消",
            confirmText: "確認",
            cancelFunc: undefined,
            confirmFunc: undefined
        }
    };
},
persist: true, // 預設將 state 儲存至 localStorage
actions: {
    open() {
        this.isOpen = true;
    },
    close() {
        this.isOpen = false;
    },
}
});
