export default function (instance) {
  instance.$contentful
    .getEntries({
      content_type: "documentary",
      include: 1,
    })
    .then((documentaryEntries) => {
      let documentaries = [] 
      documentaryEntries.items.forEach(doc => {
        let fields = doc.fields;
        let source = ''
        if (fields.video_url.includes("youtu")) {
          source = 'youtube'
        } else if(fields.video_url.includes("vimeo")){
          source = 'vimeo'
        }
        let screeningsList = []
        if (fields.screenings) {
          fields.screenings.forEach(element => {
            let screenfields = element.fields;
            if(new Date(screenfields.dateEnd) > Date.now()){
              screeningsList.push({
                id: element.sys.id,
                availability: screenfields.availability,
                dateEnd: screenfields.dateEnd,
                dateStart: screenfields.dateStart,
                estabilishment: screenfields.estabilishment,
                estabilishmentURL: screenfields.estabilishmentURL,
                place: screenfields.place,
                ticketsURL: screenfields.ticketsURL
              })
            }
          });
        }
        documentaries.push({
          id: doc.sys.id,
          title: fields.title,
          subtitle: fields.subtitle,
          by: fields.by,
          description: fields.description,
          videoUrl: fields.video_url,
          workstream: fields.workstream,
          tags: fields.tags,
          backgroundImage: fields.background_image.fields.file.url,
          source: source,
          screenings: screeningsList
        });
      });

      instance.$store.commit("setVideoList", documentaries);
    })
    .catch((err) => {
      alert(`Ìt wasn't possible to load the documentaries.\n\n${err}`);
    });
}
