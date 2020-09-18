# AEM 6.5 Upgrade | Repository Restructuring

The topic covers steps to be followed for restructuring JCR repository to upgrade to AEM 6.5 version. The following documents were referred for the changes required.

  - https://docs.adobe.com/content/help/en/experience-manager-65/deploying/restructuring/assets-repository-restructuring-in-aem-6-5.html
  - https://docs.adobe.com/content/help/en/experience-manager-65/deploying/restructuring/sites-repository-restructuring-in-aem-6-5.html
  - https://docs.adobe.com/content/help/en/experience-manager-65/deploying/restructuring/all-repository-restructuring-in-aem-6-5.html

References through the code for all the bullet points in the above documents, was searched for in the repo(using Test environment), using groovy scripts and the code base as well.
Selectively scripts were created for the bullet points applicable to Waters code & content, to move the utilities(custom & OOTB) to the new location and update the references.

## Groovy Scripts

> **Note** 
The move/copy command present under any of the scripts can only be executed once, that is, if any of the scripts containing those commands are executed again, they would throw an ItemExistsException.

For ease of use each script contains additional comments for

- Heading corresponding to the bullet points from the Adobe Documentation
- Readability
- Any manual intervention required

> **Important**
Although currently there are no workflow related scripts but if any are added in future, then the workflows need to be stopped before executing those, to avoid any VersionException. Also the OOTB workflow models have been modified to include custom process steps, which shall be refactored into the code (as part of a planned future story).

## Code Changes
References for the bullet points from the Adobe docs, have been updated throughout the codebase. Comments have also been added to the groovy scripts, for items for which code changes are required, for future reference.
Hybris, Solr and System Notification pages have been moved out of `etc` and to `var`, necessary updates to filter.xml and rest of the code were made.

### ACS Commons
- Bump permissions for ACS Commons Email System User and provide read access to `/apps/settings/notification-templates`
- For any network calls failing related to ACS QR Code functionality, toggle the switch here `/etc/acs-commons/qr-code.html`
