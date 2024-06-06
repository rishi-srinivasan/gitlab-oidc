# Gitlab OpenID Connect Authentication using CDK TypeScript

CDK app to create IAM Identity Provider and Role using Typescript for Gitlab OpenID Connect (OIDC) authentication.

## Modifications
In [gitlab-oidc-stack.ts](https://github.com/rishi-srinivasan/gitlab-oidc/blob/main/lib/gitlab-oidc-stack.ts) file, change the following:

`gitlabUrl` - URL of your gitlab project

`gitlabProjectPath` - Gitlab project path

## Run commands

* `cdk bootstrap` - Bootstraps the CDK app to your AWS account
* `cdk deploy --all` - Deploys both stacks to your AWS account

## Deployment

After deployment, The role ARN will be printed on the terminal, Copy the role ARN and paste it in the Gitlab runner environment variable.