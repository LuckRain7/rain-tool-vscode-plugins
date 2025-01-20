export default {
    vue: joinLines([
        '/**', //
        ' * @description ',
        ' * @param {any} params - ',
        ' * @returns {void}',
        ' */'
    ]),
    javascript: joinLines([
        '/**', //
        ' * @description ',
        ' * @param {any} params - ',
        ' * @returns {void}',
        ' */'
    ]),
    typescript: joinLines([
        '/**', //
        ' * @description ',
        ' * @param {any} params - ',
        ' * @returns {void}',
        ' */'
    ]),
    python: joinLines([
        '"""', //
        ' * @description ',
        ' * @param params: Any',
        ' * @return: None',
        '"""'
    ]),
    bash: joinLines([
        '##', //
        '# @description ',
        '# @param $1 - ',
        '# @return void',
        '##'
    ]),
    go: joinLines([
        '/**', //
        ' * @description ',
        ' * @param params interface{} - ',
        ' * @return void',
        ' */'
    ]),
    rust: joinLines([
        '/**', //
        ' * @description ',
        ' * @param params: Any - ',
        ' * @return void',
        ' */'
    ])
    // need to check
};

function joinLines(lines: string[]): string {
    return lines.join('\n') + '\n';
}
