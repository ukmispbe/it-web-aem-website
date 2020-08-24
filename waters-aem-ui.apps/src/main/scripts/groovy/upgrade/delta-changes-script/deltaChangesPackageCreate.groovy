import com.adobe.acs.commons.packaging.PackageHelper.ConflictResolution
import java.text.SimpleDateFormat
import com.google.gson.*;
import com.google.gson.stream.JsonReader;

 def fromDate = '2020-08-06T00:00:00.000Z'

packageHelper = getService("com.adobe.acs.commons.packaging.PackageHelper")

    StringBuilder firstStringBuilder = new StringBuilder(); 
	final def firstQuery = buildFirstQuery(fromDate)
    final def firstResult = firstQuery.execute()
   createPathJsonAndPackage(firstStringBuilder, firstResult, 1, 0)
    StringBuilder secondStringBuilder = new StringBuilder();
   	final def secondQuery = buildSecondQuery(fromDate)
    final def secondResult = secondQuery.execute()
   createPathJsonAndPackage(secondStringBuilder, secondResult, 2, 0)
       StringBuilder thirdStringBuilder = new StringBuilder();
   	final def thirdQuery = buildThirdQuery(fromDate)
    final def thirdResult = thirdQuery.execute()
   createPathJsonAndPackage(thirdStringBuilder, thirdResult, 3, 0)
        StringBuilder fourthStringBuilder = new StringBuilder();
   	final def fourthQuery = buildFourthQuery(fromDate)
    final def fourthResult = fourthQuery.execute()
   createPathJsonAndPackageForLastItem(fourthStringBuilder, fourthResult, 4, 0)

def buildFirstQuery(startDate) {
  def queryManager = session.workspace.queryManager
  def queryString = "SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/language-master') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/xg') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/ca') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/us') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/au') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/at') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/be') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/br') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/cn') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/cz') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/dk') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/ee') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/fi') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/fr') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/de') and[jcr:content/cq:lastModified] >= '$startDate'"
  queryManager.createQuery(queryString, "JCR-SQL2")
}
def buildSecondQuery(startDate) {
  def queryManager = session.workspace.queryManager
  def queryString = "SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/hk') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/hu') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/is') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/in') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/id') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/ie') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/it') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/jp') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/lv') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/lt') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/my') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/mx') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/nl') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/nz') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/no') and[jcr:content/cq:lastModified] >= '$startDate'"
  queryManager.createQuery(queryString, "JCR-SQL2")
}
def buildThirdQuery(startDate) {
  def queryManager = session.workspace.queryManager
  def queryString = "SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/ph') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/pl') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/pt') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/pr') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/sg') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/kr') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/es') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/se') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/ch') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/tw') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/th') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/gb') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/vn') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/waters/authored-application-notes') and [jcr:content/cq:lastModified] >= '$startDate'"
  queryManager.createQuery(queryString, "JCR-SQL2")
}

def buildFourthQuery(startDate) {
  def queryManager = session.workspace.queryManager
  def queryString = "SELECT * FROM [dam:Asset] AS s WHERE ISDESCENDANTNODE(s,'/content/dam') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/launches') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/content/experience-fragments') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [nt:unstructured] AS s WHERE ISDESCENDANTNODE(s,'/conf/waters') and [jcr:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Template] AS s WHERE ISDESCENDANTNODE(s,'/conf/waters') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/conf/waters') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:PageContent] AS s WHERE ISDESCENDANTNODE(s,'/conf/waters') and [cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE(s,'/etc/waters') and [jcr:content/cq:lastModified] >= '$startDate' UNION SELECT * FROM [cq:Tag] AS s WHERE ISDESCENDANTNODE(s,'/etc/tags/waters') UNION SELECT * FROM [nt:file] AS s WHERE ISDESCENDANTNODE(s,'/etc/notification') and [jcr:created] >= '$startDate' UNION SELECT * FROM [nt:file] AS s WHERE ISDESCENDANTNODE(s,'/apps/i18n') and [jcr:content/jcr:lastModified] >= '$startDate'"
  queryManager.createQuery(queryString, "JCR-SQL2")
}
def createPathJsonAndPackage(stringToParse, result, packageNumber, count){
	stringToParse.append("{ \"paths\": [");
      result.nodes.each {  node ->
      count++
      println node.path
      if(count > 1) {
      stringToParse.append(',\"'+node.path+'/jcr:content\"')
      }
      else {
          stringToParse.append('\"'+node.path+'/jcr:content\"')
      }
    }
    String packageName = 'Delta-Changes-package-'+packageNumber;
    
    stringToParse.append("], \"name\":"+packageName+"}");
	if(count > 0) {
    createPackage(stringToParse.toString())
	}
    println 'Total Pages for '+packageName+' is: '+count 
    println '-----------------------------------------------------------------------------'
    
}
def createPathJsonAndPackageForLastItem(stringToParse, result, packageNumber, count){
	stringToParse.append("{ \"paths\": [");
      result.nodes.each {  node ->
      count++
      println node.path
      if(count > 1) {
      stringToParse.append(',\"'+node.path+'\"')
      }
      else {
          stringToParse.append('\"'+node.path+'\"')
      }
    }
    String packageName = 'Delta-Changes-package-'+packageNumber;
    
    stringToParse.append("], \"name\":"+packageName+"}");
	if(count > 0) {
    createPackage(stringToParse.toString())
	}
    println 'Total Pages for '+packageName+' is: '+count 
    println '-----------------------------------------------------------------------------'
    
}

def createPackage(contentPathString) {
    JsonReader reader = new JsonReader(new StringReader(contentPathString));
reader.setLenient(true);
JsonObject jsonString = new JsonParser().parse(reader).getAsJsonObject();
Gson gson = new Gson();
Map data = gson.fromJson(jsonString, Map.class);

if (!(data instanceof Map)) {
    throw new IllegalArgumentException("data must be a json value")
}

if (!data.name) {
    throw new IllegalArgumentException("a name must be provided")
}

packageHelper.createPackageForPaths(
    data.paths ?: [],
    session,
    data.group ?: "my_packages",
    data.name ,
    data.version ?: new SimpleDateFormat("yyyy-MM-dd'T'hh_mm_ss").format(new Date()),
    ConflictResolution.valueOf(data.conflictResolution ?: "None"),
    data.definition ?: [:])
}
