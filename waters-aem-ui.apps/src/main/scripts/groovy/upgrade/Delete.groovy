//This script will delete the Commerce data and Waters custom tools from etc
getNode("/etc/commerce/products").remove()
getNode("/etc/waters").remove()
session.save()