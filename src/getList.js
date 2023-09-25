export default function (instance) {
  instance.$contentful
    .getEntries({
      content_type: 'bfnaDocsDisplayManagement',
      include: 1
    })
    .then((documentaryEntries) => {
      const documentaries = documentaryEntries.items[0].fields.featuredOrder.map(({ fields }) => {
        let source = ''
        if (fields.video_url.includes('youtu')) {
          source = 'youtube'
        } else if (fields.video_url.includes('vimeo')) {
          source = 'vimeo'
        }
        return {
          title: fields.title,
          subtitle: fields.subtitle,
          by: fields.by,
          description: fields.description,
          videoUrl: fields.video_url,
          workstream: fields.workstream,
          tags: fields.tags,
          backgroundImage: fields.background_image.fields.file.url,
          source: source
        }
      });
      const trailerData = documentaryEntries.items[0].fields.trailer.fields;
      let trailerSource = ''
      if (trailerData.video_url.includes('youtu')) {
        trailerSource = 'youtube'
      } else if (trailerData.video_url.includes('vimeo')) {
        trailerSource = 'vimeo'
      }
      const trailer = {
        title: trailerData.title,
        subtitle: trailerData.subtitle,
        by: trailerData.by,
        description: trailerData.description,
        videoUrl: trailerData.video_url,
        workstream: trailerData.workstream,
        tags: trailerData.tags,
        backgroundImage: trailerData.background_image.fields.file.url,
        source: trailerSource
      }

      instance.$store.commit('setFeatured', documentaries)
      instance.$store.commit('setTrailer', trailer)
    })
    .catch((err) => {
      alert(`Ìt wasn't possible to load the documentaries.\n\n${err}`)
    })
}
