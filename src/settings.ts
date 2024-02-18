var vscode = require('vscode');

export const configuration = 'terraform-docs';
export const executableBinaryLocation = 'executableBinaryLocation';
export const executableBinaryFileName = 'executableBinaryFileName';
export const defaultConfigurationFileName = 'defaultConfigurationFileName';

export function terraformDocsExecutable() {
    return vscode.workspace.getConfiguration(configuration).get(executableBinaryFileName);
}

export function terraformDocsConfigurationFile() {
    return vscode.workspace.getConfiguration(configuration).get(defaultConfigurationFileName);
}

export function terraformDocsBinaryLocation() {
    return vscode.workspace.getConfiguration(configuration).get(executableBinaryLocation);
}