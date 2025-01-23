const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

function getLatestTag() {
    try {
        return execSync('git describe --tags --abbrev=0').toString().trim();
    } catch (error) {
        console.log('No tags found');
        return null;
    }
}

function getCommitsSinceLastTag() {
    const latestTag = getLatestTag();
    if (!latestTag) {
        return execSync('git log --pretty=format:"%h - %s (%an)"').toString();
    }

    return execSync(`git log ${latestTag}..HEAD --pretty=format:"%h - %s (%an)"`).toString();
}

function generateChangelog(version) {
    const changelogDir = path.join(__dirname, '../changelog');
    const CHANGELOG_MD = path.join(__dirname, '../CHANGELOG.md');

    // 确保 changelog 目录存在
    if (!fs.existsSync(changelogDir)) {
        fs.mkdirSync(changelogDir);
    }

    const commits = getCommitsSinceLastTag();
    const date = new Date().toISOString().split('T')[0];
    const filename = path.join(changelogDir, `v${version}.md`);

    const content = `## V${version} Changelog  (${date})\n\n${commits}`;
    fs.writeFileSync(filename, content);
    console.log(`✨ Changelog has been generated at: changelog/${filename}`);

    // 更新 CHANGELOG.md
    const markdownContent = content
        .split('\n')
        .map((line, index) => {
            return index >= 2 ? `- ${line}` : line;
        })
        .join('\n');
    const changelogContent = fs.readFileSync(CHANGELOG_MD, 'utf-8');
    const updatedChangelog = changelogContent.replace(
        /<!-- ADD -->\n\n/g, // ADD 标记
        `<!-- ADD -->\n\n${markdownContent}\n\n`
    );
    fs.writeFileSync(CHANGELOG_MD, updatedChangelog);
    console.log(`✨ CHANGELOG.md has been updated`);
}

module.exports = {
    generateChangelog
};
