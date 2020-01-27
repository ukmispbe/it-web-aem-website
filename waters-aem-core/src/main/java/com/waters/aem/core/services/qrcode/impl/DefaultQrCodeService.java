package com.waters.aem.core.services.qrcode.impl;

import com.waters.aem.core.services.qrcode.QrCodeService;
import com.waters.aem.core.services.qrcode.QrCodeServiceConfig;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = QrCodeService.class)
@Designate(ocd = QrCodeServiceConfig.class)
public class DefaultQrCodeService implements QrCodeService{

    private volatile String defaultLanguageRootPath;

    private volatile String globalExperienceRootPath;

    private volatile String shopAllProductsRelativePath;

    @Override
    public String getDefaultLanguageRootPath() {
        return defaultLanguageRootPath;
    }

    @Override
    public String getGlobalExperienceRootPath() {
        return globalExperienceRootPath;
    }

    @Override
    public String getRedirectPageRelativePath() {
        return shopAllProductsRelativePath;
    }

    @Activate
    @Modified
    protected void activate(final QrCodeServiceConfig configuration) {
        defaultLanguageRootPath = configuration.defaultLanguageRootPath();
        globalExperienceRootPath = configuration.globalExperienceRootPath();
        shopAllProductsRelativePath = configuration.redirectPageRelativePath();
    }
}
