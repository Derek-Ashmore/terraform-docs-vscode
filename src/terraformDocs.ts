const fs = require("fs");
export const terraformDocsExecutable = 'terraform-docs';
export const terraformDocsConfigurationFile = '.terraform-docs.yml';

const { execSync } = require('child_process');
const shell = function(cmd : string) {
    execSync(cmd, { encoding: 'utf8' });
};

export function execTerraformDocs(folder: string){
    let command = `${terraformDocsExecutable} `;
    if (!configurationExists(folder)){
        command = command.concat(' markdown table --output-file README.md ');
    }
    command = command.concat(folder);

    try{ shell(`${command}`); return true;}
    catch(error){
        console.error(error);
        return false;
    }
}

export function configurationExists(folder: string){
    return fs.existsSync(folder.concat('/').concat(terraformDocsConfigurationFile));
}