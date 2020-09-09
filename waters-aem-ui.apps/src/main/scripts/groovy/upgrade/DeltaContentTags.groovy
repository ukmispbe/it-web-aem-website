if (getNode("/etc/tags/waters") != null) {
    if (getNode("/content/cq:tags/waters") != null) {
        getNode("/content/cq:tags/waters").remove()
        save()
    }
    move "/etc/tags/waters" to "/content/cq:tags/waters"
    getNode("/etc/tags").remove()
    save()
}