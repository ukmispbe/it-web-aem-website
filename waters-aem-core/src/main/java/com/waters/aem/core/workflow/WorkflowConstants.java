package com.waters.aem.core.workflow;

import com.day.cq.commons.jcr.JcrConstants;

public class WorkflowConstants {

    public static final String JCR_CONTENT = "/" + JcrConstants.JCR_CONTENT;

    public static final String HTML_EXTENSION = ".html";

    public static final String INBOX_PATH = "/aem/inbox";

    public static final String REVIEWER_ID = "reviewerId";

    public static final String SCIENTIST_ID = "scientistId";

    public static final String SCIENTIST_REVIEW_STEP = "Scientist Review";

    public static final String SCI_OPS_MANAGER_ID = "sciOpsMgrId";

    public static final String SCI_OPS_REVIEW_STEP = "SciOps Manager Review";

    public static final String MARKET_PRODUCT_MANAGER_ID = "marketMgrId";

    public static final String LEGAL_REVIEWER_ID = "legalReviewerId";

    public static final String LEGAL_REVIEW_STEP = "Legal Review";

    public static final String MARKET_PRODUCT_REVIEW_STEP = "Market/Product Manager Review";

    public static final String MARCOM_MANAGER_ID = "marcomMgrId";

    public static final String MARCOM_REVIEW_STEP = "Marcom Manager Review";

    public static final String REVIEW_STEP = "reviewStep";

    public static final String PROFILE_EMAIL = "profile/email";

    public static final String PUBLISH_REQUEST_REJECTED = "Publish Request Rejected";

    public static final String APPLICATION_NOTES_DESIGN_REVIEW = "Application Notes Design Review";

    public static final String EDITOR_HTML = "/editor.html";

    public static final String REVIEW_NOTIFICATION_TEXT = "The Application Note <b>${pageTitle}</b> is ready for your review and approval.";

    public static final String REJECTION_NOTIFICATION_TEXT = "There have been revisions requested for Application Note <b>${pageTitle}</b>";

    public static final String WORKFLOW_COMPLETED = "WorkflowCompleted";

    public static final String WORKFLOW_COMPLETED_EMAIL_SUBJECT = "Workflow notification: WorkflowCompleted";

    public static final String WORKFLOW_ID = "/etc/workflow/models/request_for_activation/jcr:content/model";

    private WorkflowConstants() {

    }

}
