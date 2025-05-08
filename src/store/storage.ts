export function loadState(key: string): string | undefined {
    try {
        const jsonState = localStorage.getItem(key);

        if(!jsonState) {
            return undefined;
        }

        return jsonState;
    } catch (e) {
        console.error(e);
        return;
    }
}

export function saveState<T>(state: T, key: string) {
    const stringState = JSON.stringify(state);

    localStorage.setItem(key, stringState);
}