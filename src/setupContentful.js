export default function (instance) {
  instance.$contentful.getEntries({
    content_type: 'episode',
    locale: 'en-US',
    order: '-fields.season,-fields.order',
    include: 1
  }).then((episodeEntries) => {
    const episodes = episodeEntries.items.map((entry) => {
      const authors = entry.fields.authors.map((author) => ({ name: author.fields.name, picture: author.fields.picture.fields.file }))
      const { authors: rawAuthors, ...episode } = entry.fields
      episode.authors = authors
      return episode
    })

    instance.$store.commit('setVideoList', episodes)
  }).catch((err) => {
    alert(`Ìt wasn't possible to load the episodes.\n\n${err}`)
  })
}
