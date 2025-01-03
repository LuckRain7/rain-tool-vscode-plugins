export default {
    vue: {firstLine: '<!--', lastLine: '-->', prefix: ' * '},
    javascript: {firstLine: '/**', lastLine: ' */', prefix: ' * '},
    typescript: {firstLine: '/**', lastLine: ' */', prefix: ' * '},
    python: {firstLine: `'''`, lastLine: `'''`, prefix: ' * '},
    go: {firstLine: '/**', lastLine: ' */', prefix: ' * '},
    html: {firstLine: '<!--', lastLine: '-->', prefix: ' * '},
    css: {firstLine: '/*', lastLine: ' */', prefix: ' * '},
    scss: {firstLine: '/*', lastLine: ' */', prefix: ' * '},
    less: {firstLine: '/*', lastLine: ' */', prefix: ' * '},
    sass: {firstLine: '/*', lastLine: ' */', prefix: ' * '},
    rust: {firstLine: '/*', lastLine: ' */', prefix: ' * '},
    markdown: {firstLine: '<!--', lastLine: '-->', prefix: ' * '}
    // need to check
} as SupportedLanguages;

type Config = {
    firstLine: string;
    lastLine: string;
    prefix: string;
};

type SupportedLanguages = {
    [key in 'vue' | 'javascript' | 'typescript']: Config;
};
