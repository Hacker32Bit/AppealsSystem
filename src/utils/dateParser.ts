export function parseDate(input?: string): Date | undefined {
    if (!input) return undefined;

    let parsed: Date;

    if (input.endsWith('Z') || /[+-]\d\d:\d\d$/.test(input)) {
        parsed = new Date(input);
    } else {
        parsed = new Date(input + 'Z'); // assume UTC
    }

    if (isNaN(parsed.getTime())) {
        throw new Error(`Invalid date format: ${input}`);
    }

    return parsed;
}