// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fileUtils from './fileUtils';
import * as terraformDocs from './terraformDocs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.error('Congratulations, your extension "terraform-docs" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('terraform-docs.generate', (fileUri) => {

		if (fileUtils.hasTerraformContent(fileUri.fsPath)) {
			if (fileUtils.executableIsAvailable(terraformDocs.terraformDocsExecutable)) {
				vscode.window.showInformationMessage('Generating Terraform documentation.....');
				let result: terraformDocs.ExecutionResult = terraformDocs.execTerraformDocs(fileUri.fsPath);
				if (result.success) {
					vscode.window.showInformationMessage('Documentation complete.');
				}
				else {
					vscode.window.showErrorMessage('Error generating documentation! error=' + result.error , { modal: true });
				}
				
			}
			else {
				vscode.window.showInformationMessage('Install Terraform-Docs executable and place it in the path!');
			}
			
		}
		else {
			vscode.window.showInformationMessage('This folder is does not contain Terraform code!');
		}

		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
