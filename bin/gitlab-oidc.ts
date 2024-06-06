#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { GitlabOidcStack } from '../lib/gitlab-oidc-stack';

const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
}
new GitlabOidcStack(app, 'GitlabOidcStack', {
    env,
    description: 'Gitlab Open-ID Configuration',
    stackName: 'GitlabOidcStack'
});