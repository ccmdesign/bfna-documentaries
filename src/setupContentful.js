export default function (instance) {
  instance.$contentful
    .getEntries({
      content_type: "documentary",
      include: 1,
    })
    .then((documentaryEntries) => {
      const documentaries = documentaryEntries.items.map(({ fields }) => {
        return {
          title: fields.title,
          subtitle: fields.subtitle,
          description: fields.description,
          videoUrl: fields.video_url,
          workstream: fields.workstream,
          tags: fields.tags,
          backgroundImage: fields.background_image.fields.file.url,
        };
      });

      instance.$store.commit("setVideoList", documentaries);
    })
    .catch((err) => {
      alert(`Ìt wasn't possible to load the documentaries.\n\n${err}`);
    });
}
