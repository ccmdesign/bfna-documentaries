export default function (instance) {
  instance.$contentful.getEntries({
    content_type: 'documentary',
    // locale: 'en-US',
    // order: '-fields.season,-fields.order',
    include: 1
  }).then((documentaryEntries) => {
    const documentaries = documentaryEntries.items.map(({fields}) => {
      return {
        title: fields.title,
        subtitle: fields.subtitle,
        description: fields.description,
        videoUrl: fields.video_url,
        workstream: fields.workstream,
        backgroundImage: fields.background_image.fields.file.url
      }
    })

    // const episodes = documentaryEntries.items.map((entry) => {
    //   const authors = entry.fields.authors.map((author) => ({ name: author.fields.name, picture: author.fields.picture.fields.file }))
    //   const { authors: rawAuthors, ...episode } = entry.fields
    //   episode.authors = authors
    //   return episode
    // })

    instance.$store.commit('setVideoList', documentaries)
  }).catch((err) => {
    alert(`Ìt wasn't possible to load the documentaries.\n\n${err}`)
  })
}
