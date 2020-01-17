import com.day.cq.replication.ReplicationActionType
import com.day.cq.replication.Replicator
import com.day.cq.search.eval.JcrPropertyPredicateEvaluator
import com.day.cq.search.eval.PathPredicateEvaluator
import com.day.cq.wcm.api.NameConstants
import com.day.crx.JcrConstants
import com.icfolson.aem.library.api.page.PageDecorator
import com.waters.aem.core.commerce.constants.WatersCommerceConstants
import com.waters.aem.core.services.SiteRepository
import javax.jcr.Node

import static com.day.cq.search.eval.TypePredicateEvaluator.TYPE

def siteRepo = getService(SiteRepository)

def dryRun = true

def skuList = [
        "WAT022032",
        "WAT270797",
        "WAT080383",
]

def pathsToDelete = []

skuList.each { skuCode ->

    def productResource = getProductResourceForCode(skuCode)
    //add product node path
    if (productResource != null) {
        pathsToDelete.add(productResource.path)
    }

    def languageMasterPagePaths = queryLanguageMasterSkuPagesForCode(skuCode)

    // add all lang master paths
    pathsToDelete.addAll(languageMasterPagePaths)

    languageMasterPagePaths.each { languageMasterPagePath ->
        // add all live copy paths
        pathsToDelete.addAll(getLiveCopies(siteRepo, languageMasterPagePath))
    }
}

println "All paths to be unpublished and deleted"
pathsToDelete.each {
    println it
}

if (!dryRun) {
    // this replicates on paths to delete
    replicatePaths(pathsToDelete)
}

def getProductResourceForCode(skuCode) {
    def lowerCasedSkuCode = skuCode.toLowerCase()
    def substr = lowerCasedSkuCode.substring(0, 3)
    return getResource("/etc/commerce/products/$substr/$lowerCasedSkuCode")
}

def getLiveCopies(siteRepo, path) {
    def liveCopies = []
    def page = getPage(path)?.adaptTo(PageDecorator)

    if (page != null) {
        siteRepo.getLiveCopyPages(page).each {
            liveCopies.add(it.path)
        }
    }

    return liveCopies
}

def queryLanguageMasterSkuPagesForCode(skuCode) {
    def rootPath = "/content/waters/language-masters/en/shop"

    def predicateGroup = new PredicateGroup();
    predicateGroup.add(new Predicate(TYPE).set(TYPE, NameConstants.NT_PAGE));
    predicateGroup.add(new Predicate(PathPredicateEvaluator.PATH)
            .set(PathPredicateEvaluator.PATH, rootPath));
    predicateGroup.add(new Predicate(JcrPropertyPredicateEvaluator.PROPERTY)
            .set(JcrPropertyPredicateEvaluator.PROPERTY,
                    JcrConstants.JCR_CONTENT + "/" + WatersCommerceConstants.PROPERTY_CODE)
            .set(JcrPropertyPredicateEvaluator.VALUE, skuCode));

    final Query query = queryBuilder.createQuery(predicateGroup, resourceResolver.adaptTo(Session.class));

    def skuPagePaths = [];

    def hits = query.getResult().getHits();

    if (!hits.isEmpty()) {
        skuPagePaths = hits*.resource*.path
    }

    return skuPagePaths
}

/**
 * Deletes the AEM nodes provided by the list of node paths.
 * This sends a DELETE replication event and then deletes from author as well.
 *
 * @param paths - paths to replicate (delete)
 */
def replicatePaths(paths) {
    def deletedNodes = []
    def repl = getService(Replicator)
    // def replType = ReplicationActionType.ACTIVATE
    def replType = ReplicationActionType.DELETE

    paths.each { path ->
        if (!path.startsWith("/content/waters/language-masters")) {
            println "Replication action $replType for path $path"
            repl.replicate(session, replType, path)
        }

        if (replType == ReplicationActionType.DELETE) {
            def resource = getResource(path)
            if (resource) {
                deletedNodes.add(resource.path)
                resource.adaptTo(Node).remove()
            }
        }
    }

    save()

    println "\nDeleted nodes on author ($deletedNodes.size): "
    deletedNodes.each { println it }
    println ""
}
