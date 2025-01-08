import {aws_iam as iam, CfnOutput, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";

interface GitlabOidcProps extends StackProps {
    gitlabUrl: string,
    gitlabProjectPath: {
        development: string[],
        main: string[]
    }
}

export class IdentityProviderStack extends Stack {
    constructor(scope: Construct, id: string, props: GitlabOidcProps) {
        super(scope, id, props);

        const provider = new iam.OpenIdConnectProvider(this, 'identity-provider', {
            url: props.gitlabUrl,
            clientIds: [props.gitlabUrl]
        });

        const oidcPrincipal = new iam.OpenIdConnectPrincipal(provider).withConditions({
            'StringEquals': {
                [props.gitlabUrl.substring(8) + ':sub']: [
                    'project_path:' + props.gitlabProjectPath.development,
                    'project_path:' + props.gitlabProjectPath.main
                ]
            }
        });

        const role = new iam.Role(this, 'Role', {
            roleName: 'gitlab-oidc-role',
            description: 'Role created to perform OIDC Authentication between Gitlab and AWS',
            assumedBy: oidcPrincipal,
        });

        const getCallerIdentityPolicy = new iam.ManagedPolicy(this, 'Policy', {
            statements: [
                new iam.PolicyStatement({
                    sid: 'GitlabOidcPolicy',
                    actions: [
                        'sts:GetCallerIdentity',
                        'cloudformation:*'
                    ],
                    resources: ['*']
                })
            ]
        });

        const adminAccessIdentityPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName(
            'AdministratorAccess');
        const ssmFullAccessIdentityPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonSSMFullAccess');
        const cloudFormationFullAccessIdentityPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName(
            'AWSCloudFormationFullAccess');

        role.addManagedPolicy(getCallerIdentityPolicy);
        role.addManagedPolicy(adminAccessIdentityPolicy);
        role.addManagedPolicy(ssmFullAccessIdentityPolicy);
        role.addManagedPolicy(cloudFormationFullAccessIdentityPolicy);

        new CfnOutput(this, 'gitlab-oidc-role-arn', {
            value: role.roleArn,
            description: 'Role ARN to assume by Gitlab CI/CD'
        });
    }
}