//Multi-site Manager Blueprint Configurations
getNode("/apps/msm").addNode("waters").addNode("blueprintconfigs")
session.save()
//move "/etc/blueprints/chinese-blue-print" to "/apps/msm/waters/blueprintconfigs/chinese-blue-print"
//move "/etc/blueprints/english-blue-print" to "/apps/msm/waters/blueprintconfigs/english-blue-print"
move "/etc/blueprints/waters" to "/apps/msm/waters/blueprintconfigs/waters"