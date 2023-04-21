export default function (instance) {
  // primeiro pega a ordenação definida no modelo bfnaDocsDisplayManagement
  let docsOrder = []
  let tempDocs = []

  const getManagedDocs = async () => {
    return instance.$contentful.getEntries({
      content_type: 'bfnaDocsDisplayManagement',
      include: 1
    })
  }

  const setDocsOrder = async () => {
    const data = await getManagedDocs()
    docsOrder.push(data.items[0].fields.featured.sys.id)

    data.items[0].fields.order.forEach((item) => {
      docsOrder.push(item.sys.id)
    })
  }

  setDocsOrder()

  instance.$contentful
    .getEntries({
      content_type: 'documentary',
      include: 1
    })
    .then((documentaryEntries) => {
      let documentaries = []
      documentaryEntries.items.forEach(doc => {
        let fields = doc.fields
        let source = ''
        if (fields.video_url.includes('youtu')) {
          source = 'youtube'
        } else if (fields.video_url.includes('vimeo')) {
          source = 'vimeo'
        }
        let screeningsList = []
        if (fields.screenings) {
          fields.screenings.forEach(element => {
            let screenfields = element.fields
            if (new Date(screenfields.dateEnd) > Date.now()) {
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
          })
          screeningsList.sort((a, b) => new Date(a.dateEnd) - new Date(b.dateEnd))
        }
        let videoInfo = {}
        if (fields.video_info) {
          videoInfo.title = fields.video_info.fields.title
          videoInfo.teaser_url = fields.video_info.fields.teaser_url
          let teaserSource = ''
          if (videoInfo.teaser_url && videoInfo.teaser_url.includes('youtu')) {
            teaserSource = 'youtube'
          } else if (videoInfo.teaser_url && videoInfo.teaser_url.includes('vimeo')) {
            teaserSource = 'vimeo'
          }
          videoInfo.teaser_source = teaserSource
          if (fields.video_info.fields.teaser_thumbnail) {
            videoInfo.thumb = fields.video_info.fields.teaser_thumbnail.fields.file.url
          }
          videoInfo.column_1_text = fields.video_info.fields.column_1_text
          videoInfo.column_1_title = fields.video_info.fields.column_1_title
          videoInfo.column_2_text = fields.video_info.fields.column_2_text
          videoInfo.column_2_title = fields.video_info.fields.column_2_title
          if (fields.video_info.fields.screenshot) {
            videoInfo.screenshot = fields.video_info.fields.screenshot.fields.file.url
          }
          videoInfo.screenshot_extras = []
          if (fields.video_info.fields.screenshot_extras) {
            fields.video_info.fields.screenshot_extras.forEach(element => {
              let screenshotfields = element.fields
              videoInfo.screenshot_extras.push({
                id: element.sys.id,
                url: screenshotfields.file.url,
                title: screenshotfields.title
              })
            })
          }
        }
        let resourcesList = []
        if (fields.resources) {
          fields.resources.forEach(element => {
            let resource = {}
            let resourceType
            if (element.sys.contentType.sys.id === 'resource_link') {
              resourceType = 'link'
              resource = {
                id: element.sys.id,
                title: element.fields.title,
                url: element.fields.link,
                description: element.fields.description,
                type: resourceType
              }
            } else {
              let fileFields = element.fields.file.fields.file
              if (fileFields.contentType.includes('pdf')) {
                resourceType = 'pdf'
              } else if (fileFields.contentType.includes('word')) {
                resourceType = 'doc'
              } else if (fileFields.contentType.includes('video')) {
                resourceType = 'video'
              } else if (fileFields.contentType.includes('zip')) {
                resourceType = 'zip'
              } else if (fileFields.contentType.includes('image')) {
                resourceType = 'image'
              } else {
                resourceType = 'file'
              }
              let size = (fileFields.details.size / 1000).toFixed(2)
              if (size >= 1000) {
                size = (size / 1000).toFixed(2) + 'mb'
              } else {
                size += 'kb'
              }
              let ext = fileFields.url.split('.').pop()

              resource = {
                id: element.sys.id,
                title: element.fields.title,
                description: element.fields.description,
                url: fileFields.url,
                size: size,
                type: resourceType,
                extension: ext
              }
            }
            resourcesList.push(resource)
          })
        }
        let awardList = []
        if (fields.awards) {
          fields.awards.forEach(aw => {
            awardList.push({
              id: aw.sys.id,
              title: aw.fields.title,
              institution: aw.fields.institution,
              year: aw.fields.year
            })
          })
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
          screenings: screeningsList,
          video_info: videoInfo,
          resources: resourcesList,
          awards: awardList
        })
      })

      for (let docId of docsOrder) {
        let item = documentaries.filter((doc) => {
          return docId === doc.id
        })

        if(item.length > 0) {
          tempDocs.push(item[0])
          documentaries.splice(documentaries.indexOf(item[0]), 1)    
        }
      }
      documentaries = tempDocs.concat(documentaries)

      instance.$store.commit('setVideoList', documentaries)
    })
    .catch((err) => {
      alert(`Ìt wasn't possible to load the documentaries.\n\n${err}`)
    })
}
