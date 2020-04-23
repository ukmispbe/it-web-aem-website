package com.waters.aem.core.services.account.impl;

import com.waters.aem.core.services.account.WatersAccountService;
import com.waters.aem.core.services.account.WatersAccountServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = WatersAccountService.class)
@Designate(ocd = WatersAccountServiceConfiguration.class)
public class DefaultWatersAccountService implements WatersAccountService {

    private volatile String signOutUrl;

    private volatile String myAccountUrl;

    private volatile String legacySearchUrl;

    private volatile String registrationSubmitUrl;

    private volatile String emailValidationUrl;

    private volatile String passwordResetUrl;

    private volatile String changePasswordUrl;

    private volatile String userDetailsUrl;

    private volatile String soldToDetailsUrl;

    private volatile String updatePasswordUrl;

    private volatile String updateProfileUrl;

    private volatile String signInEndpoint;

    private volatile String signOutEndpoint;

    private volatile String changeAccountEndpoint;

    private volatile String orderDetailsUrl;

    private volatile String searchUrl;

    private volatile String orderListUrl;

    @Override
    public String getSignOutUrl() {
        return signOutUrl;
    }

    @Override
    public String getMyAccountUrl() {
        return myAccountUrl;
    }

    @Override
    public String getLegacySearchUrl() {
        return legacySearchUrl;
    }

    @Override
    public String getRegistrationSubmitUrl() {
        return registrationSubmitUrl;
    }

    @Override
    public String getEmailValidationUrl() {
        return emailValidationUrl;
    }

    @Override
    public String getPasswordResetUrl() {
        return passwordResetUrl;
    }

    @Override
    public String getChangePasswordUrl() {
        return changePasswordUrl;
    }

    @Override
    public String getUserDetailsUrl() {
        return userDetailsUrl;
    }

    @Override
    public String getSoldToDetailsUrl() {
        return soldToDetailsUrl;
    }

    @Override
    public String getUpdatePasswordUrl() {
        return updatePasswordUrl;
    }

    @Override
    public String getUpdateProfileUrl() {
        return updateProfileUrl;
    }

    @Override
    public String getSignInEndpoint(){
        return signInEndpoint;
    }

    @Override
    public String getSignOutEndpoint() {
        return signOutEndpoint;
    }

    @Override
    public String getChooseAccountEndpoint() {
        return changeAccountEndpoint;
    }

    @Override
    public String getOrderDetailsUrl() {
        return orderDetailsUrl;
    }

    @Override
    public String getSearchUrl (){
        return searchUrl;
    }

    @Override
    public String getOrderListUrl() {
        return orderListUrl;
    }

    @Activate
    @Modified
    protected void activate(final WatersAccountServiceConfiguration configuration) {
        signOutUrl = configuration.signOutUrl();
        myAccountUrl = configuration.myAccountUrl();
        legacySearchUrl = configuration.legacySearchUrl();
        registrationSubmitUrl = configuration.registrationSubmitUrl();
        emailValidationUrl = configuration.emailValidationUrl();
        passwordResetUrl = configuration.pwResetUrl();
        changePasswordUrl = configuration.changePwUrl();
        userDetailsUrl = configuration.userDetailsUrl();
        soldToDetailsUrl = configuration.soldToDetailsUrl();
        updatePasswordUrl = configuration.updatePwUrl();
        updateProfileUrl = configuration.updateProfileUrl();
        signInEndpoint = configuration.signInEndpoint();
        signOutEndpoint = configuration.signOutEndpoint();
        changeAccountEndpoint = configuration.chooseAccountEndpoint();
        orderDetailsUrl = configuration.orderDetailsUrl();
        searchUrl = configuration.searchUrl();
        orderListUrl = configuration.orderListUrl();
    }
}