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

const { execSync } = require('child_process');
const shell = function(cmd : string) {
    execSync(cmd, { encoding: 'utf8' });
};

export function executableIsAvailable(name: string){
    try{ shell(`${name}`); return true;}
    catch(error){return false;}
}