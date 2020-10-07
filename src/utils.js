import axios from 'axios'

const defaultDescription = 'Since its origins, democracy has been a work in progress. Today, many question its resilience. The Bertelsmann Foundation and Humanity in Action have teamed up with Andrew Keen, author of How to Fix the Future, to launch this video and podcast series exploring practical responses to the threats facing democracies around the world. Host Andrew Keen interviews prominent thinkers, writers, politicians, technologists, and business leaders who enlighten and challenge us as we seek the answers to How to Fix Democracy.'

const _default = {
  getVideoIdFromYoutubeUrl: function (videoUrl) {
    const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g
    const results = regex.exec(videoUrl)
    return results.length > 1 ? results[1] : null
  },
  getDefaultDescription: function () {
    return defaultDescription
  },
  clearInput: function (input) {
    return input.replace(/\s+/g, ' ').trim()
  },
  getFullName: function (name) {
    name = name.replace(/\s+/g, ' ').trim()
    let firstName = ''
    for (const c of name) {
      if (c === ' ') {
        break
      }
      firstName += c
    }
    return [firstName, name.substring(firstName.length + 1)]
  },
  registerNewsletter: function (nameEl, emailEl, sink) {
    const name = nameEl ? nameEl.value : ''
    const email = emailEl ? emailEl.value : ''
    if (nameEl && !name) {
      return sink([['newsletterFeedback', 'You must inform your name to subscribe to the newsletter.']])
    }
    if (emailEl && !email) {
      return sink([['newsletterFeedback', 'You must inform your e-mail to subscribe to the newsletter.']])
    } else if (!emailEl.checkValidity()) {
      return sink([['newsletterFeedback', 'You must inform a valid e-mail to subscribe to the newsletter.']])
    }
    sink([['newsletterFeedback', ''], ['newsletterSubscribed', 1]])
    const fullName = this.getFullName(name)
    axios.post('https://us20.api.mailchimp.com/3.0/lists/4447bf4515/members', {
      email_address: this.clearInput(email),
      status: 'subscribed',
      merge_fields: {
        FNAME: fullName[0],
        LNAME: fullName[1],
        MMERGE16: fullName[0]
      },
      interests: {
        '3e3dc022eb': true
      }
    }, {
      headers: {
        'Authorization': 'Basic ZW1pbHkucm9kcmlndWV6QGJmbmEub3JnOjlhNzk2Nzc2MjgyM2RkNjg0YmQ1ZmU0ODkyOTBiNmUxLXVzMjA=',
        'Cache-Control': 'no-cache'
      }
    }).then((response) => {
      sink([['newsletterSubscribed', 2]])
    }).catch((err) => {
      sink([['newsletterSubscribed', -1]])
      console.error(err)
    })
  }
}

export default _default
