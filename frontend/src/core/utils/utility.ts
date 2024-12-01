let debounceTimer: any;

export const debouncer = (func: Function, delay = 300) => {
    return function (this: any, ...args: any) {
        const context = this;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};
