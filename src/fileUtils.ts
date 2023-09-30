const fs = require('fs');

export function hasTerraformContent(directory: string) {
    let answer = false;
    fs.readdirSync(directory).forEach( function(file: string) {
        if (file.endsWith('.tf')) {
            answer = true;
        }
    });

    return answer;
}