var ExpireLocalStorage = (function () {
    function ExpireLocalStorage() {
    }
    ExpireLocalStorage.prototype.setItem = function (key, data, timeInSeconds) {
        if (!ExpireLocalStorage.isSupported()) {
            return null;
        }
        var item = {
            expireAt: ExpireLocalStorage.getCurrentTime() + (timeInSeconds * 1000),
            value: data
        };
        window.localStorage.setItem(key, JSON.stringify(item));
    };
    ExpireLocalStorage.prototype.getItem = function (key, removeWhenExpired) {
        if (removeWhenExpired === void 0) { removeWhenExpired = true; }
        if (!ExpireLocalStorage.isSupported()) {
            return null;
        }
        var value = window.localStorage.getItem(key);
        if (!value) {
            return null;
        }
        var item = JSON.parse(value);
        if (item.expireAt <= ExpireLocalStorage.getCurrentTime()) {
            if (removeWhenExpired) {
                window.localStorage.removeItem(key);
            }
            return null;
        }
        return item.value;
    };
    ExpireLocalStorage.getCurrentTime = function () {
        return new Date().getTime();
    };
    ExpireLocalStorage.isSupported = function () {
        try {
            return "localStorage" in window && window.localStorage !== null;
        }
        catch (e) {
            return false;
        }
    };
    return ExpireLocalStorage;
}());
//# sourceMappingURL=expire-local-storage.js.map