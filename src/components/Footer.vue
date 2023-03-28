<template>
<section class="footer-section">
  <div class="footer">
    <div class="footer__top">
        <div class="footer__logos">
          <img src="../assets/bertelsmann-logo.png" alt="Bertelsmann Foundation" class="footer__bfna" />
          <img src="../assets/bfna-documentaries-logo.png" alt="Bertelsmann Foundation Documentaries" class="footer__doc" />
        </div>
        <nav class="footer__nav footer--about">
          <a href="https://www.bfna.org/about" class="footer__item"
            >About the Foundation</a
          >
          <a href="https://www.bfna.org/team" class="footer__item"
            >Board of Directors | Team</a
          >
          <a
            href="https://www.bfna.org/bertelsmann-stiftung"
            class="footer__item"
            >Bertelsmann Stiftung</a
          >
          <a
            href="mailto: info@bfna.org"
            target="_blank"
            class="footer__item"
            >Contact</a
          >
          <a href="https://www.bfna.org/privacy-policy" class="footer__item"
            >Privacy Policy</a
          >
        </nav>
        <div class="social">
          <a href="https://www.linkedin.com/company/bertelsmann-foundation-north-america-inc." class="button">
            <svg class="linkedin" role="img" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
              <path d="M268 629h-97V319h97v310zm157 0h-97V319h93v42h1c13-24 44-50 91-50 98 0 116 64 116 148v170h-96V478c0-36-2-82-51-82-50 0-57 39-57 79v154zM220 164c31 0 55 25 55 56s-24 56-55 56-56-25-56-56 25-56 56-56z"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/BertelsmannFoundation/" class="button">
            <svg class="facebook" role="img" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
              <path d="M445 643h-90V419h-75v-87h75v-64c0-75 45-115 112-115 37 0 67 3 67 3v78h-46c-36 0-43 18-43 43v55h86l-11 87h-75v224z"/>
            </svg>
          </a>
          <a href="https://twitter.com/BertelsmannFdn" class="button">
            <svg class="twitter" role="img" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
              <path d="M679 239s-21 34-55 57c7 156-107 329-314 329-103 0-169-50-169-50s81 17 163-45c-83-5-103-77-103-77s23 6 50-2c-93-23-89-110-89-110s23 14 50 14c-84-65-34-148-34-148s76 107 228 116c-22-121 117-177 188-101 37-6 71-27 71-27s-12 41-49 61c30-2 63-17 63-17z"/>
            </svg>
          </a>
        </div>
    </div>
    <div class="footer__columns">
      <div class="footer__col footer__col--text">
        <p class="footer__col-text">Bertelsmann Foundation documentaries focus on governance, economics, elections, social issues, the digital revolution, and most importantly, where these issues intersect.</p>
      </div>
      <div class="footer__col footer__col--items">
        <nav class="footer__nav footer--topics">
          <h2 class="footer__heading">Topics</h2>
          <a href="https://www.bfna.org/democracy" class="footer__item"
            >Democracy</a
          ><br />
          <a href="https://www.bfna.org/future-of-work" class="footer__item"
            >Future of Work</a
          ><br />
          <a
            href="https://www.bfna.org/digital-economy"
            class="footer__item"
            >Digital Economy</a
          ><br />
          <a
            href="https://www.bfna.org/politics-society"
            class="footer__item"
            >Politics & Society</a
          ><br />
        </nav>
        <nav class="footer__nav footer--updates">
          <h2 class="footer__heading">Updates</h2>
          <a
            href="https://www.bfna.org/updates/index.html#publications"
            class="footer__item"
            >Publications</a
          ><br />
          <a
            href="https://www.bfna.org/updates/index.html#infographics"
            class="footer__item"
            >Infographics</a
          ><br />
          <a
            href="https://www.bfna.org/updates/index.html#videos"
            class="footer__item"
            >Videos</a
          ><br />
        </nav>
      </div>
      <div class="footer__col">
        <div class="bfna-subscribe">
          <h4 class="bfna-subscribe-box__title">Subscribe to our newsletter</h4>
          <a href="https://bfna.us20.list-manage.com/subscribe?u=53fc7e266c23506906a0a602f&id=4447bf4515" class="button bfna-subscribe__button" color="primary" visual="primary" target="_blank">Subscribe <img src="../assets/chevron-right.png" alt="Bertelsmann Foundation" class="Arrow right" aria-hidden="true" /></a>
          <p class="bfna-subscribe-box__info">Enter your e-mail and receive our newsletter.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="ccm-footer">
    <a href="https://www.ccmdesign.ca/" class="ccm-footer__link">by ccm.design</a>
  </div>
</section>
</template>

<style lang="scss" scoped>
.footer-section {
  position: relative;
  @media (max-width:768px) {
    padding-bottom: 54px;
    border-top: 1px solid #282F3A;
  }
}

.footer {
  background: #0C0C0C;
  padding: 90px 10%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  @media (max-width:768px) {
    flex-direction: column;
    padding: 32px 40px 77px;
  }
  a {
    color: #FFF;
    text-decoration: none;
    &:hover, &:focus, &:active {
      text-decoration: none;
      color: #FFF;
    }
  }
}

.footer__top { 
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 32px;
  @media (max-width:768px) {
    flex-direction: column;
    gap: 32px;
  }
}

.footer__logos {
  width: 310px;
}

.footer__bfna {
  width: 130px;
  margin-right: 30px;
  @media (max-width:768px) {
    width: min(177px, 60%);
    padding-bottom: 34px;
  }
}

.footer__doc {
  width: 150px;
  @media (max-width:768px) {
    width: min(233px, 60%);
  }
}

.footer--about {
  display: flex;
  flex-flow: row nowrap;
  gap: 16px;
  align-items: center;
  @media (max-width:768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

.social {
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  align-items: center;
  a {
    padding: 4px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,.2);
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg { 
    width: 20px; 
    height: 18px;
    fill: #FFF;
    transform: translateY(1px);
  }
}

  .footer__columns {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 32px;
    width: 100%;
    @media (max-width:768px) {
      flex-direction: column;
    }
  }

  .footer__col--items {
    flex-grow: 1;
    display: flex;
    flex-flow: row nowrap;
    gap: 32px;
    border-left: 1px solid #FFF;
    padding-left: 32px;
    @media (max-width:768px) {
      padding: 0;
      border: none;
    }
  }

  .footer__col--text {
    width: 278px;
  }

    .footer__col-text {
      font-size: 0.875em;
      line-height: 1.22em;
      font-weight: 400;
    }

    .footer__heading {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 1em;
      line-height: 1em;
      margin-bottom: 16px;
    }

    .footer__item {
      font-weight: 400;
      font-size: 1em;
      line-height: 1.62em;
    }

  .bfna-subscribe {
      background: hsl(0,0%,92%);
      padding: 24px 40px;
      max-width: 270px;
      display: flex;
      flex-flow: column nowrap;
      gap: 8px;
      h4, p {  
          color: #0a0a0a;
      }
  }

      .bfna-subscribe-box__title {
          font-size: 1.325em;
          font-weight: 700;
      }

      .bfna-subscribe-box__subtitle {
          font-weight: 500;
      }

      .bfna-subscribe-box__info {
          font-size: 0.875em;
          font-weight: 300;
      }

      .bfna-subscribe__button {
          padding: 8px 24px;
          display: flex;
          justify-content: space-between;
          background-color: #4f8d71;
          border-color: #4f8d71;
      }

          .bfna-subscribe__button span {
              font-size: .75rem;
              margin-left: var(--s2);
          }

.ccm-footer {
  background: #000;
  padding: 8px 48px;
  text-align: right;
}

  .ccm-footer__link {
    color: #949494;
    text-decoration: none;
    font-size: 0.625em;
    line-height: 1.4em;
    &:hover, &:focus, &:active {
      text-decoration: none;
      color: #949494;
    }
  }
</style>

<script>
export default {
  computed: {
  },
  methods: {
  },
};
</script>
