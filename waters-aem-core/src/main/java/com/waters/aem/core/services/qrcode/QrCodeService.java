package com.waters.aem.core.services.qrcode;


public interface QrCodeService {

    /**
     * Get the configured default language root path.
     *
     * @return default language root path
     */
    String getDefaultLanguageRootPath();

    /**
     * Get the configured global experience root path.
     *
     * @return global experience root path
     */
    String getGlobalExperienceRootPath();

    /**
     * Get the configured default redirect page path.
     *
     * @return redirect page path
     */
    String getRedirectPageRelativePath();
}
