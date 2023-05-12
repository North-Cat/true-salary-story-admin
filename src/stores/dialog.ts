import { defineStore } from 'pinia';


export const useDialogStore = defineStore('dialog', {
state: () => {
    return {
        isOpen: false,
        dialogInfo: {}
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
