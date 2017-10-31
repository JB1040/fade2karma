export const BASE_URL = 'http://ec2-35-158-174-254.eu-central-1.compute.amazonaws.com:9000';

export function Extend(a, b) {
    for (const key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
}
