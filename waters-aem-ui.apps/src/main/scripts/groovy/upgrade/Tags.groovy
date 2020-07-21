// Tags
// Update code references
move  "/etc/tags/waters" to "/content/cq:tags/waters"
//If waters-ecommerce node is present under /etc/tags, on the env.
move  "/etc/tags/waters-ecommerce" to "/etc/tags/waters-ecommerce"
//If we-retail-client-app node is present under /etc/tags, on the env.
move  "/etc/tags/we-retail-client-app" to "/content/cq:tags/we-retail-client-app"
getNode("/etc/tags").remove()
session.save()
//restart the Day Communique 5 Tagging OSGi bundle at /system/console/bundles/com.day.cq.cq-tagging