import com.day.cq.replication.Replicator;
import com.day.cq.replication.ReplicationActionType
import javax.jcr.Session;
def replicator = getService(Replicator.class)

def sites = ["us/en"] // "at/de", "de/de","ch/de", "au/en","ca/en", "be/en","cz/en","dk/en","ee/en","fi/en","gb/en","hk/en","id/en","ie/en","in/en","is/en","lt/en","lv/en","my/en","nl/en","no/en","nz/en","ph/en","pl/en","sg/en","se/en","th/en","us/en","xg/en","hu/en","vn/en","pr/en","be/fr","fr/fr","ca/fr","ch/fr","xg/fr", "br/pt","pt/pt", "cn/zh", "tw/zh", "jp/ja","mx/es","es/es","xg/es","it/it","kr/ko","us/en"
def years = ["2004", "2006"] // "2004", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"

sites.each { site ->
    if(site){
        years.each{ year ->
            def nodePath = "/content/waters/" + site + "/library/application-notes/" + year
            if (getResource(nodePath) != null) {
                def pageResource = getPage(nodePath)
                if(pageResource){
                    pageResource.recurse { page ->
                    if(page) {
                        def content = page.node
                        if(content) {
                            def path = content.path
                            if (content && content.get("yearPublished")) {
                                content.get("yearPublished").each{ val ->
                                    def rs = replicator.getReplicationStatus(session, page.path);
                                    if(rs && rs.path){
                                        def innerPagePath = rs.path
                                        activate(innerPagePath)
                                        println "Subpage Published: $innerPagePath"
                                    }
                                }
                            }
                            if(content && content.get("sling:resourceType") == "foundation/components/redirect") {
                                activate(path)
                                println "Published: $path"
                            }
                        }
                    }
                }
              }
            } else  {
                println "Page not found: $nodePath"
            }
        }
    } else  {
                println "Page not found: /content/waters/$site"
        }
}