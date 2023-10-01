const fs = require("fs");
var vscode = require('vscode');
import * as settings from './settings';

export const terraformDocsExecutable = 'terraform-docs';
export const terraformDocsConfigurationFile = '.terraform-docs.yml';

const { execSync } = require('child_process');
const shell = function(cmd : string) {
    execSync(cmd, { encoding: 'utf8' });
};

export function execTerraformDocs(folder: string){
    console.log(vscode.workspace.getConfiguration(settings.configuration));
    let command = formatCommandExcecublePortion(vscode.workspace.getConfiguration(settings.configuration).get(settings.executableBinaryLocation));
    
    if (!configurationExists(folder)){
        command = command.concat(' ', 'markdown table --output-file README.md');
    }
    command = command.concat(' ', folder);

    return execTerraformDocsLocal(folder, command);
}

export function formatCommandExcecublePortion(settingExecutableBinaryLocation: string){
    let command = '';
    if (settingExecutableBinaryLocation === null || settingExecutableBinaryLocation === ''){
        command = terraformDocsExecutable;
    }
    else {
        command = settingExecutableBinaryLocation;
        if (command.endsWith('/') || command.endsWith('\\')) {
            command = command.concat(terraformDocsExecutable);
        }
        else {
            command = command.concat('/', terraformDocsExecutable);
        }
    }

    return command;
}

function execTerraformDocsLocal(folder: string, command: string){
    try{ shell(`${command}`); return true;}
    catch(error){
        console.error(error);
        return false;
    }
}

export function configurationExists(folder: string){
    return fs.existsSync(folder.concat('/').concat(terraformDocsConfigurationFile));
}