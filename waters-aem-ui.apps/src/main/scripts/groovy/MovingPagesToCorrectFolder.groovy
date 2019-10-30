import com.day.cq.replication.Replicator;
import com.day.cq.replication.ReplicationActionType
import javax.jcr.Session;

def movePath = "/content/waters/us/en/library/application-notes"
def replicator = getService(Replicator.class)

getPage("/content/waters/authored-application-notes").recurse { page ->
    def content = page.node

    if (content && content.get("yearPublished")) {
        content.get("yearPublished").each{ val ->
            def rs = replicator.getReplicationStatus(session, page.path);
            GregorianCalendar date = rs.getLastPublished();
            def nodeList = val.split("/");
            println nodeList[nodeList.length-1]
            def newPage = pageManager.move(page,movePath+"/"+nodeList[nodeList.length-1]+"/"+page.name,nodeList[nodeList.length-1],false,true, null)
            if(null != date){
                println("Previous Page: " + page.path);
                println("Published on: " + date.getTime());
            } else {
                println("Path is activated: " + "false");
            }
            println("New Page: " + newPage.path);
        }
    }
}
