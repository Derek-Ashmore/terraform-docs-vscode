import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as fileUtils from '../../fileUtils';

const path = require('path');
const testFolder = path.resolve(__dirname, '../../../test-data');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
	test('hasTerraformContent test', () => {
		assert.strictEqual(true, fileUtils.hasTerraformContent(testFolder.concat('/sample-terraform')));
		assert.strictEqual(false, fileUtils.hasTerraformContent(testFolder.concat('/empty-project')));
	});
	test('executableIsAvailable test', () => {
		assert.strictEqual(true, fileUtils.executableIsAvailable('terraform-docs'));
		assert.strictEqual(false, fileUtils.executableIsAvailable('doesnotexist'));
	});
});
