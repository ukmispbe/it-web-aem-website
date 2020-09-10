final def productResourcePath = 'hybris:productResourcePath'
//Provide path
def rootPagePath = "/content/waters/us/en/shop";
//Provide the locale in like below
def locale = "US"
def rootPage = pageManager.getPage(rootPagePath)

Iterator < Page > pageIter = rootPage.listChildren()
def noProductCount = 0;
def noPriceCount = 0;
while (pageIter.hasNext()) {
  def nextPage = pageIter.next();
  final def query = buildQuery(nextPage)
  final def result = query.execute()
  result.nodes.each {
    node ->
    if (node.hasProperty(productResourcePath)) {
      try {
        if (getNode(node.getProperty(productResourcePath).getString()) != null) {
          Node productNode = getNode(node.getProperty(productResourcePath).getString())
          if (getNode(productNode.getPath() + '/prices') != null) {
            Node priceNode = getNode(productNode.getPath() + '/prices')

            NodeIterator nodeIterator = priceNode.getNodes();
            while (nodeIterator.hasNext()) {
              Node dirNode = nodeIterator.nextNode();
              if (dirNode.getName().contains(locale)) {
                break;
              }
              else if (!nodeIterator.hasNext()) {
                noPriceCount++
              }
            }

          }
        }
      }
      catch(javax.jcr.PathNotFoundException e) {
        noProductCount++

      }

    }
  }

}

def buildQuery(page) {
  def queryManager = session.workspace.queryManager
  def queryString = "SELECT * FROM [cq:PageContent] AS s WHERE ISDESCENDANTNODE([$page.path]) AND [hybris:productResourcePath] is not null"
  queryManager.createQuery(queryString, "JCR-SQL2")
}

println "Total Pages with no Products :  " + noProductCount
println "Total Pages with no Price :  " + noPriceCount
def totalCount = noProductCount+noPriceCount
println "Total Not Indexed Page Count : "+ totalCount