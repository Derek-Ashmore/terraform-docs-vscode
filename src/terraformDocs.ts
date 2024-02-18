const fs = require("fs");
var vscode = require('vscode');
const path = require('path');
import * as settings from './settings';
import * as fileUtils from './fileUtils';

const { execSync } = require('child_process');
const shell = function(cmd : string) {
    execSync(cmd, { encoding: 'utf8' });
};

export function execTerraformDocs(folder: string){
    console.log(vscode.workspace.getConfiguration(settings.configuration));
    let command = formatCommandExcecublePortion(settings.terraformDocsBinaryLocation(), settings.terraformDocsExecutable());
    
    if (!configurationExists(folder)){
        command = command.concat(' ', 'markdown table --output-file README.md');
    }
    command = command.concat(' ', folder);

    return execTerraformDocsLocal(folder, command);
}

export function terraformDocsInstalled(folder: string, executable: string){
    let command = formatCommandExcecublePortion(folder, executable);
    return fileUtils.executableIsAvailable(command);
}

export function formatCommandExcecublePortion(settingExecutableBinaryLocation: string, settingTerraformDocsExecutable: string){
    let command = '';
    if (settingExecutableBinaryLocation === null || settingExecutableBinaryLocation === ''){
        command = settingTerraformDocsExecutable;
    }
    else {
        command = settingExecutableBinaryLocation;
        if (command.endsWith(path.sep)) {
            command = command.concat(settingTerraformDocsExecutable);
        }
        else {
            command = command.concat(path.sep, settingTerraformDocsExecutable);
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
    return fs.existsSync(folder.concat('/').concat(settings.terraformDocsConfigurationFile()));
}