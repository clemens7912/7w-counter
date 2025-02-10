export function clone<T>(items: T): T {
    if (Array.isArray(items)) {
        return items.map(item => clone(item)) as unknown as T;  // Recursively clone arrays
    } else if (typeof items === 'object' && items !== null) {
        return Object.keys(items).reduce((acc, key) => {
            acc[key] = clone((items as { [key: string]: any })[key]);  // Recursively clone objects
            return acc;
        }, {} as { [key: string]: any }) as T;
    }
    return items;  // Return primitive values (strings, numbers, etc.) directly
}
