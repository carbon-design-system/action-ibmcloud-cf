<p align="center">
  <a href="https://github.com/carbon-design-system/carbon-custom-elements/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" alt="Carbon is released under the Apache-2.0 license" />
  </a>
</p>

# `action-ibmcloud-cf`

A GitHub action that allows you to deploy a CF app to IBM Cloud.

## Usage

```yaml
jobs:
  deploy:
    ...
    steps:
      ...
      - name: Deploying carbon-custom-elements storybook to IBM Cloud
        uses: carbon-design-system/action-ibmcloud-cf@v1.2.0
        with:
          cloud-api-key: ${{ secrets.THE_SECRET_OF_CF_TOKEN }}
          cf-org: cf-org-name
          cf-space: cf-spac-name
          cf-group: default
          cf-region: us-south
          cf-api: https://api.us-south.cf.cloud.ibm.com
          cf-app: cf-app-name
          cf-manifest: manifest.yml
          deploy-dir: packages/my-awesome-package
```
