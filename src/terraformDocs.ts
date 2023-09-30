
export const terraformDocsExecutable = 'terraform-docs';

const { execSync } = require('child_process');
const shell = function(cmd : string) {
    execSync(cmd, { encoding: 'utf8' });
};

export function execTerraformDocs(folder: string){
    let command = `${terraformDocsExecutable} markdown table ${folder}`;
    try{ shell(`${command}`); return true;}
    catch(error){return false;}
}