# Gitlab OpenID Connect Authentication using CDK TypeScript

CDK app to create IAM Identity Provider and Role using Typescript for Gitlab OpenID Connect (OIDC) authentication.

## Setup

* Update AWS credentials using the AWS CLI command `aws configure` or in the credentials file in .aws directory
* Clone this repository and make the modifications necessary as mentioned in the "Modifications" section
* Deploy the CDK app using the commands in "Run Commands" section
* Copy the role ARN generated and paste it in Gitlab CI/CD settings page (path below) with variable name -> **ROLE_ARN**: 
  *  Gitlab CI/CD settings: Gitlab home page > Settings > CI/CD > Variables
* Create a .gitlab-ci.yml file in the root directory of the project and write the gitlab-ci pipeline as per project requirement

## Modifications
In [gitlab-oidc-stack.ts](https://github.com/rishi-srinivasan/gitlab-oidc/blob/main/lib/gitlab-oidc-stack.ts) file, change the following:

`gitlabUrl` - URL of your gitlab project

`gitlabProjectPath` - Gitlab project path

## Run commands

* `cdk bootstrap` - Bootstraps the CDK app to your AWS account
* `cdk deploy --all` - Deploys both stacks to your AWS account

## Deployment

After deployment, The role ARN will be printed on the terminal, Copy the role ARN and paste it in the Gitlab runner environment variable.