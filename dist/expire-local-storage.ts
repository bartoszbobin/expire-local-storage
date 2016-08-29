class ExpireLocalStorage
{
    public setItem(key : string, data : any, timeInSeconds : number) : boolean
    {
        if (!ExpireLocalStorage.isSupported()) {
            return null;
        }

        const item : IExpirationData<any> = {
            expireAt: ExpireLocalStorage.getCurrentTime() + (timeInSeconds * 1000),
            value: data
        };

        window.localStorage.setItem(key, JSON.stringify(item));
    }

    public getItem<T>(key : string, removeWhenExpired = true) : T
    {
        if (!ExpireLocalStorage.isSupported()) {
            return null;
        }

        const value : string = window.localStorage.getItem(key);
        if (!value) {
            return null;
        }

        const item : IExpirationData<T> = JSON.parse(value);

        if (item.expireAt <= ExpireLocalStorage.getCurrentTime()) {
            if (removeWhenExpired) {
                window.localStorage.removeItem(key);
            }

            return null;
        }

        return item.value;
    }

    private static getCurrentTime() : number
    {
        return new Date().getTime();
    }

    private static isSupported() : boolean
    {
        try {
            return "localStorage" in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    }
}

interface IExpirationData<T>
{
    expireAt : number;
    value: T;
}