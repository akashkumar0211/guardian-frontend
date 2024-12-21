
import dayjs from 'dayjs';  // Import dayjs

export const disabledPreviousDates = (current: any) => {
    return current && current < dayjs().startOf('day');
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const saveDeletedItems = (key: string, deletedItems: Set<string>) => {
    try {
        localStorage?.setItem(key, JSON.stringify(Array.from(deletedItems)));
    } catch (error) {
        console.error("localstorage", error);
    }
};

export const getDeletedItems = (key: string): Set<string> => {
    try {
        const data = localStorage?.getItem(key);
        return new Set(data ? JSON.parse(data) : []);

    } catch (error) {
        console.error("localstorage", error);
        return new Set("")
    }
};

export const capitalizeFirstLetter = (str: string) => {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const handleDownloadPDF = (url: string) => {
    window.open(url)
};

export const passwordValidator = (_: any, value: string) => {
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    if (!value) {
        return Promise.reject(new Error('Please input your password'));
    }
    if (value.length < 8) {
        return Promise.reject(new Error('Password must be at least 8 characters'));
    }
    if (!hasLetter || !hasNumber) {
        return Promise.reject(new Error('Password must contain both letters and numbers'));
    }
    return Promise.resolve();
};

export const durationFormatter=(value:any)=>{
    if (!value) return '-';
    const date = new Date(value);
            const currentDate = new Date();
            const timeDifference = Math.abs(currentDate.getTime() - date.getTime());
            const units: [string, number][] = [
                ['year', 31536000000],
                ['month', 2592000000],
                ['week', 604800000],
                ['day', 86400000],
                ['hour', 3600000],
                ['minute', 60000],
                ['second', 1000],
            ];

            for (const [unit, unitValue] of units) {
                if (timeDifference >= unitValue) {
                    const value = Math.floor(timeDifference / unitValue);
                    return `${value} ${unit}${value !== 1 ? 's' : ''} ago`;
                }
            }

            return '';
}

export const formatType = (type:string) => {
    if (!type) return '';
    let val = type.split("_")?.[0];
    return `${val.charAt(0).toUpperCase() + val.slice(1)}`
};