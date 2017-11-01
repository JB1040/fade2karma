export const BASE_URL = 'https://api.f2k.gg';

export function Extend(a, b) {
    for (const key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
}
