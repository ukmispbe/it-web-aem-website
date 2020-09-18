getPage("/content/waters").recurse {
    activate(it.getPath())
}

getPage("/content/order").recurse {
    activate(it.getPath())
}

getNode("/content/dam/waters").recurse {
    activate(it.getPath())
}