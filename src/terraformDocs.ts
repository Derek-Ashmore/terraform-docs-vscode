const fs = require("fs");
var vscode = require('vscode');
import * as settings from './settings';

export const terraformDocsExecutable = vscode.workspace.getConfiguration(settings.configuration).get(settings.executableBinaryFileName);
export const terraformDocsConfigurationFile = vscode.workspace.getConfiguration(settings.configuration).get(settings.defaultConfigurationFileName);

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

export type ExecutionResult = {
    success: boolean,
    error: string
};

function execTerraformDocsLocal(folder: string, command: string){
    let result: ExecutionResult = {
        success: true,
        error: ''
    };

    try{ shell(`${command}`); return result;}
    catch(error){
        result.success = false;
        console.error(error);
        if (error instanceof Error) {
            result.error = error.message;}
        else {
            result.error = String(error);
        }
        return result;
    }
}

export function configurationExists(folder: string){
    return fs.existsSync(folder.concat('/').concat(terraformDocsConfigurationFile));
}