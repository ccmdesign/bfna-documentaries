export default function (instance) {
  instance.$contentful
    .getEntries({
      content_type: "documentary",
      include: 1,
    })
    .then((documentaryEntries) => {
      const documentaries = documentaryEntries.items.map(({ fields }) => {
        let source = ''
        if (fields.video_url.includes("youtu")) {
          source = 'youtube'
        } else if(fields.video_url.includes("vimeo")){
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
          source: source,
        };
      });

      instance.$store.commit("setVideoList", documentaries);
    })
    .catch((err) => {
      alert(`Ìt wasn't possible to load the documentaries.\n\n${err}`);
    });
}
