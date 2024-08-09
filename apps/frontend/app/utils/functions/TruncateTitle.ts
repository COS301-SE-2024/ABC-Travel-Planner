export function truncateTitle(title: string, length: number): string {
    return title.length > length ? title.substring(0, length) + '...' : title;
}