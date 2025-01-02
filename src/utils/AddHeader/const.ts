export default {
    vue: {firstLine: '<!--', lastLine: '-->', prefix: ' * '},
    javascript: {firstLine: '/**', lastLine: ' */', prefix: ' * '},
    typescript: {firstLine: '/**', lastLine: ' */', prefix: ' * '}
} as SupportedLanguages;

// ... existing code ...
type Config = {
    firstLine: string;
    lastLine: string;
    prefix: string;
};

type SupportedLanguages = {
    [key in 'vue' | 'javascript' | 'typescript']: Config;
};
