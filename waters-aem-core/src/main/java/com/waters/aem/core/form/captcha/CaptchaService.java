package com.waters.aem.core.form.captcha;

public interface CaptchaService {

    String getJsApi();

    String getSiteKey();

    String getVerifyApi();

    /**
     * Sends a HTTP request to the configured Verify API which validates the provided token
     * @param token token to validate
     * @return true if the token is valid. false if the token is invalid or some other validation error occurred.
     */
    boolean verify(String token);

}
