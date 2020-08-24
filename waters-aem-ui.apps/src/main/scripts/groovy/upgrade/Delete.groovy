//This script will delete the Commerce data and Waters custom tools from etc
getNode("/etc/notification/email/waters").remove()
getNode("/etc/waters").remove()
session.save()