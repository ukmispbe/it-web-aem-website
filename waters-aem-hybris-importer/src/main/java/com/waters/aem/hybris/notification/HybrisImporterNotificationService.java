package com.waters.aem.hybris.notification;

import com.waters.aem.hybris.result.HybrisImporterExecutionResult;

/**
 * Notification service for Hybris import executions.  Email notifications are implemented by default, but additional
 * notification types can be provided by services implementing this interface.
 */
public interface HybrisImporterNotificationService {

    /**
     * Send a notification of a successful import.
     *
     * @param result importer execution result
     */
    void notify(HybrisImporterExecutionResult result);

    /**
     * Send a notification of a failed import.
     *
     * @param throwable exception thrown from failed import
     */
    void notify(Throwable throwable);
}
