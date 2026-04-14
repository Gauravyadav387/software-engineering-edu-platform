const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'frontend/src/pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    const apiUrlRegex = /const API_URL = process\.env\.REACT_APP_API_URL \|\| "[^"]+";\n?/g;
    content = content.replace(apiUrlRegex, '');
    
    const lines = content.split(/\r?\n/);
    let lastImportIdx = -1;
    for(let i=0; i<lines.length; i++){
        if (lines[i].startsWith('import ')) {
            lastImportIdx = i;
        }
    }
    
    if (lastImportIdx !== -1) {
        lines.splice(lastImportIdx + 1, 0, '', 'const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";');
    } else {
        lines.unshift('const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";');
    }
    
    fs.writeFileSync(fullPath, lines.join('\n'));
    console.log('Fixed', file);
}
