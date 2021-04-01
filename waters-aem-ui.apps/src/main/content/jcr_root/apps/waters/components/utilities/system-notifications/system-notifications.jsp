<%@ page session="false" contentType="text/html" pageEncoding="utf-8"
         import="com.day.cq.i18n.I18n, 
         java.text.SimpleDateFormat,
         java.util.Date" %><%
%><%@include file="/libs/foundation/global.jsp" %><%
%><%@taglib prefix="ui" uri="http://www.adobe.com/taglibs/granite/ui/1.0" %><%
%><%@ taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %><%
    
    // 2015-10-22 03:03:00
    final String DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX";
    SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

    I18n i18n = new I18n(slingRequest);

    Date onTime = properties.get("onTime", Date.class);
    Date offTime = properties.get("offTime", Date.class);
    
    if (onTime != null  ) {
        pageContext.setAttribute("onTime", sdf.format(onTime));
    }
    
    if (offTime != null) {
        pageContext.setAttribute("offTime", sdf.format(offTime));
    }

    if (eprocOnTime != null  ) {
        pageContext.setAttribute("eprocOnTime", sdf.format(eprocOnTime));
    }

    if (eprocOffTime != null) {
        pageContext.setAttribute("eprocOffTime", sdf.format(eprocOffTime));
    }
    
%><!DOCTYPE html>
<html class="coral-App">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>

    <title><%= xssAPI.encodeForHTML(i18n.get("System Notification")) %></title>

    <ui:includeClientLib categories="acs-commons.system-notifications.page"/>
    <ui:includeClientLib css="acs-commons.system-notifications.notification"/>
</head>
<body id="acsCommons-System-Notifications-Page" class="coral--light">
<form id="fn-acsCommons-Notifications-form"
      onsubmit="return false;"
      action="${resource.path}"
      method="post"
      class="coral-Wizard"
      data-init="flexwizard">

    <input type="hidden" name="_charset_" value="utf-8">

    <input type="hidden" name="./onTime@TypeHint" value="Date" />
    <input type="hidden" name="./offTime@TypeHint" value="Date" />

    <nav class="js-coral-Wizard-nav coral-Wizard-nav coral--dark">
        <ol class="coral-Wizard-steplist">
            <li class="js-coral-Wizard-steplist-item coral-Wizard-steplist-item"><%= xssAPI.encodeForHTML(i18n.get("System Notification")) %>
            </li>
        </ol>
    </nav>
    <div class="acsCommons-System-Notifications-Page-form">
    <div class="js-coral-Wizard-step coral-Wizard-step">
        <a class="js-coral-Wizard-step-control coral-Button" href="/" data-action="cancel">Back</a>
        <button class="fn-acsCommons-Notifications-save js-coral-Wizard-step-control coral-Button" type="button" data-action="next">Save</button>
        
        <h2 class="coral-Heading coral-Heading--2" style="margin-top: 50px"><%= xssAPI.encodeForHTML(i18n.get("Waters System Notification Ecom")) %></h2>

        <section class="coral-Form-fieldset">

            <div class="acsCommons-System-Notifications-Form-row">
                <label class="coral-Form-fieldlabel">Title</label>
                <input type="text"
                       class="coral-Textfield acsCommons-System-Notifications-Page-input--text"
                       name="./title"
                       value="${xss:encodeForHTML(xssAPI, properties["title"])}"/>
            </div>

            <div class="acsCommons-System-Notifications-Form-row">
                <label class="coral-Form-fieldlabel">Message</label>
                <textarea
                        class="coral-Textfield coral-Textfield--multiline acsCommons-System-Notifications-Page-input--textarea"
                        rows="6"
                        name="./message">${xss:encodeForHTML(xssAPI, properties["message"])}</textarea>
                <a class="coral-Link" href="/libs/cq/i18n/translator.html?path=/apps/waters/i18n" target="_blank">Manage translations</a>
            </div>


            <div class="acsCommons-System-Notifications-Form-row">
                
                <div style="width:50%; float: left;">
                    <label class="coral-Form-fieldlabel">On Time</label>
        
                    <div>
                        <div class="coral-Datepicker coral-InputGroup acsCommons-System-Notifications-Page-input--datepicker"
                             data-displayed-format="llll"
                             data-stored-format="YYYY-MM-DD[T]HH:mm:ss.SSSZ"
                             data-init="datepicker">
                            <input class="coral-InputGroup-input coral-Textfield" value="${xss:encodeForHTMLAttr(xssAPI, onTime)}" type="datetime"
                                   name="./onTime"/>
                            <span class="coral-InputGroup-button">
                                <button class="coral-Button coral-Button--secondary coral-Button--square" type="button"
                                    title="Datetime Picker">
                                    <i class="coral-Icon coral-Icon--sizeS coral-Icon--calendar"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

                <div style="width:50%; float: left;">
                    <label class="coral-Form-fieldlabel">Off Time</label>

                    <div>
                        <div class="coral-Datepicker coral-InputGroup acsCommons-System-Notifications-Page-input--datepicker"
                             data-displayed-format="llll"
                             data-stored-format="YYYY-MM-DD[T]HH:mm:ss.SSSZ"
                             data-init="datepicker">
                            <input class="coral-InputGroup-input coral-Textfield" value="${xss:encodeForHTMLAttr(xssAPI, offTime)}" type="datetime"
                                   name="./offTime"/>
                            <span class="coral-InputGroup-button">
                                <button class="coral-Button coral-Button--secondary coral-Button--square" type="button"
                                        title="Datetime Picker">
                                    <i class="coral-Icon coral-Icon--sizeS coral-Icon--calendar"></i>
                                </button>
                            </span>
                        </div>
                    </div>    
                </div>
                
                <div style="clear:both;"></div>
            </div>

        </section>

        <h2 class="coral-Heading coral-Heading--2" style="margin-top: 50px"><%= xssAPI.encodeForHTML(i18n.get("Waters System Notification Eproc")) %></h2>

                <section class="coral-Form-fieldset">

                    <div class="acsCommons-System-Notifications-Form-row">
                        <label class="coral-Form-fieldlabel">Title</label>
                        <input type="text"
                               class="coral-Textfield acsCommons-System-Notifications-Page-input--text"
                               name="./eprocTitle"
                               value="${xss:encodeForHTML(xssAPI, properties["eprocTitle"])}"/>
                    </div>

                    <div class="acsCommons-System-Notifications-Form-row">
                        <label class="coral-Form-fieldlabel">Message</label>
                        <textarea
                                class="coral-Textfield coral-Textfield--multiline acsCommons-System-Notifications-Page-input--textarea"
                                rows="6"
                                name="./eprocMessage">${xss:encodeForHTML(xssAPI, properties["eprocMessage"])}</textarea>
                        <a class="coral-Link" href="/libs/cq/i18n/translator.html?path=/apps/waters/i18n" target="_blank">Manage translations</a>
                    </div>


                    <div class="acsCommons-System-Notifications-Form-row">

                        <div style="width:50%; float: left;">
                            <label class="coral-Form-fieldlabel">On Time</label>

                            <div>
                                <div class="coral-Datepicker coral-InputGroup acsCommons-System-Notifications-Page-input--datepicker"
                                     data-displayed-format="llll"
                                     data-stored-format="YYYY-MM-DD[T]HH:mm:ss.SSSZ"
                                     data-init="datepicker">
                                    <input class="coral-InputGroup-input coral-Textfield" value="${xss:encodeForHTMLAttr(xssAPI, eprocOnTime)}" type="datetime"
                                           name="./eprocOnTime"/>
                                    <span class="coral-InputGroup-button">
                                        <button class="coral-Button coral-Button--secondary coral-Button--square" type="button"
                                            title="Datetime Picker">
                                            <i class="coral-Icon coral-Icon--sizeS coral-Icon--calendar"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style="width:50%; float: left;">
                            <label class="coral-Form-fieldlabel">Off Time</label>

                            <div>
                                <div class="coral-Datepicker coral-InputGroup acsCommons-System-Notifications-Page-input--datepicker"
                                     data-displayed-format="llll"
                                     data-stored-format="YYYY-MM-DD[T]HH:mm:ss.SSSZ"
                                     data-init="datepicker">
                                    <input class="coral-InputGroup-input coral-Textfield" value="${xss:encodeForHTMLAttr(xssAPI, eprocOffTime)}" type="datetime"
                                           name="./eprocOffTime"/>
                                    <span class="coral-InputGroup-button">
                                        <button class="coral-Button coral-Button--secondary coral-Button--square" type="button"
                                                title="Datetime Picker">
                                            <i class="coral-Icon coral-Icon--sizeS coral-Icon--calendar"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style="clear:both;"></div>
                    </div>

            </section>
    </div>
    </div>
</form>
</body>
</html>
