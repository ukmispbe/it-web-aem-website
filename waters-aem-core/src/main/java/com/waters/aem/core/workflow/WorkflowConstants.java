package com.waters.aem.core.workflow;

import com.day.cq.commons.jcr.JcrConstants;

public class WorkflowConstants {

    public static final String JCR_CONTENT = "/" + JcrConstants.JCR_CONTENT;

    public static final String HTML_EXTENSION = ".html";

    public static final String INBOX_PATH = "/aem/inbox";

    public static final String STEP_TITLE = "reviewStep";

    public static final String REVIEWER_ID = "reviewerId";

    public static final String AUTHOR_ID = "scientistId";

    public static final String SCI_OPS_MANAGER_ID = "sciOpsMgrId";

    public static final String SCI_OPS_REVIEW_STEP = "SciOps Manager Review";

    public static final String MARKET_PRODUCT_MANAGER_ID = "marketMgrId";

    public static final String MARKET_PRODUCT_REVIEW_STEP = "Market/Product Manager Review";

    public static final String MARCOM_MANAGER_ID = "marcomMgrId";

    public static final String MARCOM_REVIEW_STEP = "Marcom Manager Review";

    public static final String REVIEW_STEP = "reviewStep";

    public static final String PROFILE_EMAIL = "profile/email";

    private WorkflowConstants() {

    }

}
