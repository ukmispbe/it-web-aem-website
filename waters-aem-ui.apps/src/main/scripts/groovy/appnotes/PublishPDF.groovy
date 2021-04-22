import javax.jcr.Node
import org.apache.commons.lang3.StringUtils
import org.apache.sling.api.resource.ResourceUtil
import com.day.cq.dam.commons.util.DamUtil
import com.day.cq.replication.Replicator
import com.day.cq.replication.ReplicationActionType
import com.day.cq.replication.ReplicationStatus

process('/content/dam/waters/en/app-notes/2004')

def process(path) {
Resource res = resourceResolver.getResource(path)
def replicator = getService("com.day.cq.replication.Replicator")
def count = 0

if (res != null) {
  DamUtil.getAssets(res).each {
   row ->
    try {
        if (row != null && row.getMetadata() && row.path.contains('.pdf')) {

        Resource metadataRes = resourceResolver.getResource(row.path + "/jcr:content/metadata")
        Resource jcrRes = resourceResolver.getResource(row.path + "/jcr:content")
      
        if (jcrRes != null && metadataRes != null) {
            activate(row.path) 
            // e.g /content/dam/waters/en/app-notes/2004/720000953/720000953-fr.pdf
            println "Published: ${row.path}"
            count++
          }
        }
    } catch (Exception e) {
        println "Exception Occurred while adding title" + e
    }
   }
    println "Total: $count"
  }
}
