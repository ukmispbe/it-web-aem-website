import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

def dateInstanceWentDown = "" //Example -> 2020-09-14

getPage("/content/waters").recurse {
    if (getNode(it.getPath()).hasProperty("jcr:content/cq:lastReplicated")) {
        if (OffsetDateTime.parse(getPage(it.getPath()).getContentResource().getValueMap().get("cq:lastReplicated", String.class)).format(DateTimeFormatter.ISO_LOCAL_DATE).compareTo(dateInstanceWentDown) >= 0)
            activate(it.getPath())
    }
}

getPage("/content/order").recurse {
    if (getNode(it.getPath()).hasProperty("jcr:content/cq:lastReplicated")) {
        if (OffsetDateTime.parse(getPage(it.getPath()).getContentResource().getValueMap().get("cq:lastReplicated", String.class)).format(DateTimeFormatter.ISO_LOCAL_DATE).compareTo(dateInstanceWentDown) >= 0)
            activate(it.getPath())
    }
}

getNode("/content/dam/waters").recurse {
    if (getNode(it.getPath()).hasProperty("jcr:content/cq:lastReplicated")) {
        if (OffsetDateTime.parse(getResource(it.getPath() + "/jcr:content").getValueMap().get("cq:lastReplicated", String.class)).format(DateTimeFormatter.ISO_LOCAL_DATE).compareTo(dateInstanceWentDown) >= 0)
            activate(it.getPath())
    }
}