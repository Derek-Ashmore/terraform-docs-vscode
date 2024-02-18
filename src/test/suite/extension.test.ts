import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as fileUtils from '../../fileUtils';
import * as terraformDocs from '../../terraformDocs';
import * as settings from '../../settings';

const path = require('path');
const testFolder = path.resolve(__dirname, '../../../test-data');
const fs = require("fs");

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');
	deleteFile(testFolder.concat('/sample-terraform-plus-config/README.md'));

	test('hasTerraformContent test', () => {
		assert.strictEqual(true, fileUtils.hasTerraformContent(testFolder.concat('/sample-terraform')));
		assert.strictEqual(false, fileUtils.hasTerraformContent(testFolder.concat('/empty-project')));
	});
	test('executableIsAvailable test', () => {
		assert.strictEqual(true, fileUtils.executableIsAvailable('terraform-docs'));
		assert.strictEqual(false, fileUtils.executableIsAvailable('doesnotexist'));
	});
	test('execTerraformDocs test', () => {
		assert.strictEqual(true, terraformDocs.execTerraformDocs(testFolder.concat('/sample-terraform')).success);
		assert.strictEqual(true, terraformDocs.execTerraformDocs(testFolder.concat('/sample-terraform-plus-config')).success);
		assert.strictEqual(false, terraformDocs.execTerraformDocs(testFolder.concat('/sample-terraform-error')).success);
		assert.strictEqual(true, fs.existsSync(testFolder.concat('/sample-terraform/README.md')));
		assert.strictEqual(true, fs.existsSync(testFolder.concat('/sample-terraform-plus-config/README.md')));
	});
	test('configurationExists test', () => {
		assert.strictEqual(false, terraformDocs.configurationExists(testFolder.concat('/sample-terraform')));
		assert.strictEqual(true, terraformDocs.configurationExists(testFolder.concat('/sample-terraform-plus-config')));
	});
	test('formatCommandExcecublePortion test', () => {
		assert.strictEqual(settings.terraformDocsExecutable(), terraformDocs.formatCommandExcecublePortion('', settings.terraformDocsExecutable()));
		let rightAnswer = '/usr/home/jmu'.concat(path.sep, settings.terraformDocsExecutable());
		assert.strictEqual(rightAnswer, terraformDocs.formatCommandExcecublePortion('/usr/home/jmu'.concat(path.sep), settings.terraformDocsExecutable()));
		assert.strictEqual(rightAnswer, terraformDocs.formatCommandExcecublePortion('/usr/home/jmu', settings.terraformDocsExecutable()));
	});
	test('formatCommandExcecublePortion test', () => {
		assert.strictEqual(true, terraformDocs.terraformDocsInstalled(settings.terraformDocsBinaryLocation(), settings.terraformDocsExecutable()));
		assert.strictEqual(false, terraformDocs.terraformDocsInstalled('/usr/home/jmu', settings.terraformDocsExecutable()));
		assert.strictEqual(false, terraformDocs.terraformDocsInstalled(testFolder, settings.terraformDocsExecutable()));
		assert.strictEqual(false, terraformDocs.terraformDocsInstalled(settings.terraformDocsBinaryLocation(), 'jmu'));
	});
});

function deleteFile(file: string){
	if (fs.existsSync(file)) {
		fs.unlinkSync(file);
	}
} 
