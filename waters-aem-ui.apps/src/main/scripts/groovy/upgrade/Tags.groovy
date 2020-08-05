// Tags
// Update code references
move  "/etc/tags/waters" to "/content/cq:tags/waters"
//If waters-ecommerce node is present under /etc/tags, on the env.
move  "/etc/tags/waters-ecommerce" to "/content/cq:tags/waters-ecommerce"
getNode("/etc/tags").remove()
session.save()
//restart the Day Communique 5 Tagging OSGi bundle at /system/console/bundles/com.day.cq.cq-tagging