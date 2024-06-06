import {Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {IdentityProviderStack} from "./identitiy-provider-stack";

export class GitlabOidcStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const provider = new IdentityProviderStack(this, 'identity-provider-stack', {
      stackName: 'identity-provider-stack',
      gitlabUrl: 'https://gitlab.oevcloud.org',
      gitlabProjectPath: {
        development: 'projekte-oev-berlin/digital-campus-360/funpoints-dapp/dapp-frontend:ref_type:branch:ref:development',
        main: 'projekte-oev-berlin/digital-campus-360/funpoints-dapp/dapp-frontend:ref_type:branch:ref:main'
      }
    });
  }
}
