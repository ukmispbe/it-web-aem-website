if (getNode("/etc/waters/notifications/system-notification/jcr:content") != null) {
    getNode("/var/waters/notifications/system-notification/jcr:content").remove()
    save()
    copy "/etc/waters/notifications/system-notification/jcr:content" to "/var/waters/notifications/system-notification/jcr:content"
    getNode("/etc/waters").remove()
    save()
}